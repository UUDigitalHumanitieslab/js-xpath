// based on https://github.com/dimagi/js-xpath/blob/master/src/models.js
export module XPathModels {
    export let isDebugging = false;

    export function debugLog(...args: string[]) {
        if (isDebugging) {
            console.debug(args.join(', '));
        }
    }

    export function validateAxisName(name: string) {
        return name in XPathAxisEnum;
    }

    export class ParseError {
        constructor(public message: string, public hash: { text: string, token: string, line: number, loc: number | null, expected: string | null }){
        }
    }

    export function parseError(
        str: string,
        hash: { text: string, token: string, line: number, loc: number | null, expected: string | null }) {
        throw new ParseError(str, hash);
    }

    export enum XPathInitialContextEnum {
        HASHTAG = "hashtag",
        ROOT = "abs",
        RELATIVE = "rel",
        EXPR = "expr"
    };

    export enum XPathAxisEnum {
        CHILD = "child",
        DESCENDANT = "descendant",
        PARENT = "parent",
        ANCESTOR = "ancestor",
        FOLLOWING_SIBLING = "following-sibling",
        PRECEDING_SIBLING = "preceding-sibling",
        FOLLOWING = "following",
        PRECEDING = "preceding",
        ATTRIBUTE = "attribute",
        NAMESPACE = "namespace",
        SELF = "self",
        DESCENDANT_OR_SELF = "descendant-or-self",
        ANCESTOR_OR_SELF = "ancestor-or-self"
    };

    export enum XPathTestEnum {
        NAME = "name",
        NAME_WILDCARD = "*",
        NAMESPACE_WILDCARD = ":*",
        TYPE_NODE = "node()",
        TYPE_TEXT = "text()",
        TYPE_COMMENT = "comment()",
        TYPE_PROCESSING_INSTRUCTION = "processing-instruction"
    }

    interface IXPathExpression {
        toXPath(): string;
    }

    export type XPathExpression = XPathBaseExpression | XPathOperation | XPathPathExpr | XPathFilterExpr /* TODO: | XPathHashtagFilter */;
    export type XPathBaseExpression = //{ parens: boolean, expr: XPathExpression } /* TODO: correct? */
        | XPathFuncExpr
        | XPathVariableReference
        | XPathLiteral;

    export class XPathVariableReference implements IXPathExpression {
        type: 'variable';
        constructor(public value: string) {
        }

        public toXPath() {
            return `${this.value}`;
        };
    }

    export type XPathOperation = XPathBoolExpr | XPathEqExpr | XPathCmpExpr | XPathArithExpr | XPathUnionExpr | XPathNumNegExpr;
    abstract class XPathOperationBase<T> implements IXPathExpression {
        type: 'operation' = 'operation';
        operationType: T;

        abstract toXPath(): string;
    }

    abstract class XPathOperator<T> extends XPathOperationBase<T>  {
        operationType: T;
        public parens: boolean = false;
        constructor(public properties: { type: T, left: XPathExpression, right: XPathExpression }) {
            super();
            this.operationType = properties.type;
        }

        getChildren() {
            return [this.properties.left, this.properties.right];
        }

        toXPath() {
            var ret: string = this.properties.left.toXPath() + " " + this.expressionTypeEnumToXPathLiteral(this.operationType) + " " + this.properties.right.toXPath();
            if (this.parens === true) {
                return "(" + ret + ")";
            }
            return ret;
        }

        abstract expressionTypeEnumToXPathLiteral(type: T): string;
    }

    // TODO: is this mapping really needed? Why not always use the same?
    type XPathBoolOperator = 'or' | 'and';
    type XPathEqOperator = '==' | '!=';
    type XPathCmpOperator = '<' | '<=' | '>' | '>=';
    type XPathArithOperator = '+' | '-' | '*' | '/' | '%';

    export class XPathBoolExpr extends XPathOperator<XPathBoolOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathBoolOperator) {
            return type;
        }
    }
    export class XPathEqExpr extends XPathOperator<XPathEqOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathEqOperator) {
            return type == '==' ? '=' : '!=';
        }
    }
    export class XPathCmpExpr extends XPathOperator<XPathCmpOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathCmpOperator) {
            return type;
        }
    }
    export class XPathArithExpr extends XPathOperator<XPathArithOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathArithOperator) {
            switch (type) {
                case '%':
                    return 'mod';
                case '/':
                    return 'div';
                default:
                    return type;
            }
        }
    }
    export class XPathUnionExpr extends XPathOperator<'union'> {
        expressionTypeEnumToXPathLiteral(type: 'union') {
            return '|';
        }
    }

    export class XPathNumNegExpr extends XPathOperationBase<'num-neg'> {
        operationType: 'num-neg';
        constructor(public properties: { type: 'num-neg', value: XPathExpression }) {
            super();
            this.operationType = properties.type;
        }

        toXPath() {
            return `-${this.properties.value}`;
        }
    }

    /**
     * Functional call expression.
     */
    export class XPathFuncExpr implements IXPathExpression {
        type: 'function' = 'function';
        args: XPathExpression[];
        constructor(public properties: { id: string, args: XPathExpression[] | null }) {
            this.args = properties.args || [];
        }

        public getChildren() {
            return this.args;
        }

        public toXPath(): string {
            return this.properties.id + "(" + this.args.map(arg => arg.toXPath()).join(", ") + ")";
        }
    }

    export class XPathPathExpr implements IXPathExpression {
        type: 'path' = 'path';
        steps: XPathStep[];
        constructor(private properties: {
            initialContext: XPathInitialContextEnum,
            filter: XPathFilterExpr,
            steps: XPathStep[] | null
        }) {
            this.steps = properties.steps || [];
        }

        public getChildren() {
            return this.steps;
        }

        public toXPath() {
            var parts = this.steps.map(step => step.toXPath()),
                ret: string[] = [],
                curPart: string,
                prevPart: string = '',
                sep: string;

            var root = (this.properties.initialContext === XPathInitialContextEnum.ROOT) ? "/" : "";
            if (this.properties.filter) {
                parts.splice(0, 0, this.properties.filter.toXPath());
            }
            if (parts.length === 0) {
                return root;
            }
            for (var i = 0; i < parts.length; i++) {
                curPart = parts[i];
                if (curPart !== "//" && prevPart !== "//") {
                    // unless the current part starts with a slash, put slashes between
                    // parts. the only exception to this rule is at the beginning,
                    // when we only use a slash if it's an absolute path
                    sep = (i === 0) ? root : "/";
                    ret.push(sep);
                }
                ret.push(curPart);
                prevPart = curPart;
            }
            return ret.join("");
        }
    }

    export class XPathStep implements IXPathExpression {
        type: 'path-step' = 'path-step';
        public predicates: XPathExpression[];
        constructor(public properties: {
            axis: XPathAxisEnum,
            test: XPathTestEnum,
            name: string,
            namespace: string,
            literal: string | null,
            predicates: XPathExpression[] | null
        }) {
            this.predicates = properties.predicates || [];
        }

        public getChildren() {
            return this.predicates;
        }

        private testString() {
            switch (this.properties.test) {
                case XPathTestEnum.NAME:
                    return String(this.properties.name);
                case XPathTestEnum.TYPE_PROCESSING_INSTRUCTION:
                    return "processing-instruction(" + (this.properties.literal || "") + ")";
                case XPathTestEnum.NAMESPACE_WILDCARD:
                    return this.properties.namespace + ":*";
                default:
                    return this.properties.test || null;
            }
        };

        private mainXPath() {
            var axisPrefix = this.properties.axis + "::"; // this is the default
            // Use the abbreviated syntax to shorten the axis
            // or in some cases the whole thing
            switch (this.properties.axis) {
                case XPathAxisEnum.DESCENDANT_OR_SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return "//";
                    }
                    break;
                case XPathAxisEnum.CHILD:
                    axisPrefix = ""; // this is the default
                    break;
                case XPathAxisEnum.ATTRIBUTE:
                    axisPrefix = "@";
                    break;
                case XPathAxisEnum.SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return ".";
                    }
                    break;
                case XPathAxisEnum.PARENT:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return "..";
                    }
                    break;
                default:
                    break;
            }
            return axisPrefix + this.testString();
        };

        private predicateXPath() {
            if (this.predicates.length > 0) {
                return "[" + this.predicates.map(p => p.toXPath()).join("][") + "]";
            }

            return "";
        };

        public toXPath() {
            return this.mainXPath() + this.predicateXPath();
        }
    }

    export class XPathFilterExpr implements IXPathExpression {
        type: 'filter' = 'filter';
        public predicates: XPathExpression[];
        constructor(private properties: {
            expr: XPathBaseExpression,
            predicates: XPathExpression[] | null
        }) {
            this.predicates = properties.predicates || [];
        }

        public getChildren() {
            return this.predicates;
        }

        public toXPath() {
            var predicates = "";
            if (this.predicates.length > 0) {
                predicates = "[" + this.predicates.map(p => p.toXPath()).join("][") + "]";
            }
            var expr = this.properties.expr.toXPath();
            // TODO: should all non-function expressions be parenthesized?
            if (!(this.properties.expr instanceof XPathFuncExpr)) {
                expr = "(" + expr + ")";
            }
            return expr + predicates;
        }
    }

    /*
     * Literals
     */
    type XPathLiteral = XPathStringLiteral | XPathNumericLiteral;
    export class XPathStringLiteral implements IXPathExpression {
        type: 'string' = 'string';
        value: string;
        private stringDelimiter: string;

        constructor(value: string) {
            this.stringDelimiter = value[0];
            this.value = value.substr(1, value.length - 2);
        }

        public toXPath() {
            return `${this.stringDelimiter}${this.value}${this.stringDelimiter}`;
        }
    }

    export class XPathNumericLiteral implements IXPathExpression {
        type: 'numeric' = 'numeric';
        constructor(public value: number) {
        }

        public toXPath() {
            // TODO: this will not convert properly in all cases
            return `${this.value}`;
        }
    }
}

