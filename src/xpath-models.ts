// based on https://github.com/dimagi/js-xpath/blob/master/src/models.js
import { BigNumber } from 'bignumber.js';
import { XPathParser } from './xpath';
export module XPathModels {
    export interface HashtagConfig {
        /** 
         * @param namespace - the namespace used in hashtag
         * @return truthy value
         */
        isValidNamespace: (namespace: string) => boolean,
        /**
         * @param hashtagExpr string representation of hashtag ex. #form/question
         * @return the XPath or falsy value if no corresponding XPath found
         */
        hashtagToXPath: (hashtagExpr: string) => string | null,
        /**
         * @param xpath - XPath object (can be any of the objects defined in xpm
         * @returns text representation of XPath in hashtag format (default
                    implementation is to just return the XPath) or null if no mapping exist
         */
        toHashtag: (xpath: IXPathExpression) => string | null
    }

    export let DefaultHashtagConfig: HashtagConfig = {
        isValidNamespace: function (namespace) {
            return false;
        },
        hashtagToXPath: function (hashtagExpr) {
            throw new Error("This should be overridden");
        },
        toHashtag: function (xpath) {
            return xpath.toXPath();
        }
    };

    export let CurrentHashtagConfig: HashtagConfig;

    export let isDebugging = false;

    export type ErrorHash = {
        text: string,
        token: string,
        line: number,
        loc: {
            first_line: number | undefined,
            last_line: number | undefined,
            first_column: number | undefined,
            last_column: number | undefined,
            range: [number, number] | undefined
        } | undefined,
        expected: string | undefined
    }

    export function debugLog(...args: string[]) {
        if (isDebugging) {
            console.debug(args.join(', '));
        }
    }

    export function testAxisName(name: string): string {
        for (let key in XPathAxisEnum) {
            if (name == XPathAxisEnum[key]) {
                return name;
            }
        }

        throw `${name} is not a valid axis name!`;
    }

    export class ParseError {
        constructor(public message: string, public hash: ErrorHash) {
        }
    }

    export function parseError(
        str: string,
        hash: ErrorHash) {
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

    export type XPathToken = {
        expression: IXPathExpression,
        text: string,
        type: 'attribute.sigil' |
        'bracket.left' |
        'bracket.right' |
        'function.name' |
        'function.separator' |
        'namespace' |
        'negation' |
        'node.name' |
        'numeric' |
        'operator' |
        'paren.left' |
        'paren.right' |
        'path' |
        'string.delimiter' |
        'string.value' |
        'variable.sigil' |
        'variable.value' |
        'whitespace';
    }

    export interface IXPathExpression {
        toHashtag(): string;
        toXPath(): string;
        toTokens(expandHashtags?: boolean): XPathToken[]
    }

    export abstract class XPathExpressionBase implements IXPathExpression {
        abstract toHashtag(): string;
        toXPath() {
            return this.toTokens(true).map(t => t.text).join('');
        }

        abstract toTokens(expandHashtags?: boolean): XPathToken[]

        protected parentheses(args: IXPathExpression[], expandHashtags: boolean): XPathToken[] {
            let tokens: XPathToken[] = [
                {
                    expression: this,
                    text: '(',
                    type: 'paren.left'
                }];
            for (let i = 0; i < args.length; i++) {
                if (i > 0) {
                    tokens.push({ expression: this, text: ',', type: 'function.separator' });
                    tokens.push({ expression: this, text: ' ', type: 'whitespace' });
                }
                tokens.push(...args[i].toTokens(expandHashtags));
            }
            tokens.push({
                expression: this,
                text: ')',
                type: 'paren.right'
            });
            return tokens;
        }

        protected brackets(args: IXPathExpression[], expandHashtags: boolean): XPathToken[] {
            let tokens: XPathToken[] = [];
            for (let arg of args) {
                tokens.push({ expression: arg, text: '[', type: 'bracket.left' });
                tokens.push(...arg.toTokens(expandHashtags));
                tokens.push({ expression: arg, text: ']', type: 'bracket.right' });
            }
            return tokens;
        }
    }

    export type XPathExpression = XPathBaseExpression | XPathOperation | XPathPathExpr | XPathFilterExpr | XPathHashtagExpression;
    export type XPathBaseExpression =
        | XPathFuncExpr
        | XPathVariableReference
        | XPathLiteral;

    export class XPathVariableReference extends XPathExpressionBase {
        type: 'variable';
        constructor(public value: string) {
            super();
        }

        public toString() {
            return "{var:" + String(this.value) + "}";
        }

        public toHashtag() {
            return this.toXPath();
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            return [{
                expression: this,
                type: 'variable.sigil',
                text: '$'
            }, {
                expression: this,
                type: 'variable.value',
                text: this.value
            }];
        }
    }

    export type XPathOperation = XPathBoolExpr | XPathEqExpr | XPathCmpExpr | XPathArithExpr | XPathUnionExpr | XPathNumNegExpr;
    export abstract class XPathOperationBase<T> extends XPathExpressionBase {
        type: 'operation' = 'operation';
        operationType: T;

        abstract getChildren(): XPathExpression[];
        toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this);
        }
    }

    export abstract class XPathOperator<T> extends XPathOperationBase<T>  {
        operationType: T;
        public parens: boolean = false;
        constructor(public properties: { type: T, left: XPathExpression, right: XPathExpression }) {
            super();
            this.operationType = properties.type;
        }

        private combine<U>(formatter: (expr: XPathExpression) => U[],
            operationTypeLiteral: (operationType: T) => U,
            space: U,
            leftParen: U,
            rightParen: U): U[] {
            let ret = [
                ...formatter(this.properties.left),
                space,
                operationTypeLiteral(this.operationType),
                space,
                ...formatter(this.properties.right)];
            if (this.parens === true) {
                return [leftParen, ...ret, rightParen];
            }
            return ret;
        }

        getChildren() {
            return [this.properties.left, this.properties.right];
        }

        toHashtag(): string {
            return this.combine(expr => [expr.toHashtag()], this.expressionTypeEnumToXPathLiteral, ' ', '(', ')').join('');
        }

        toString() {
            return "{binop-expr:" + this.properties.type + "," + String(this.properties.left) + "," + String(this.properties.right) + "}";
        }

        toTokens(expandHashtags = true): XPathToken[] {
            return this.combine<XPathToken>(
                expr => expr.toTokens(expandHashtags),
                (operationType) => {
                    return {
                        expression: this,
                        text: this.expressionTypeEnumToXPathLiteral(operationType),
                        type: 'operator'
                    }
                }, {
                    expression: this,
                    text: ' ',
                    type: 'whitespace'
                }, {
                    expression: this,
                    text: '(',
                    type: 'paren.left'
                }, {
                    expression: this,
                    text: ')',
                    type: 'paren.right'
                });
        }

        abstract expressionTypeEnumToXPathLiteral(type: T): string;
    }

    // TODO: is this mapping really needed? Why not always use the same?
    export type XPathBoolOperator = 'or' | 'and';
    export type XPathEqOperator = '==' | '!=';
    export type XPathCmpOperator = '<' | '<=' | '>' | '>=';
    export type XPathArithOperator = '+' | '-' | '*' | '/' | '%';

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

        getChildren() {
            return [this.properties.value];
        }

        toString() {
            return "{unop-expr:" + this.properties.type + "," + String(this.properties.value) + "}";
        }

        toHashtag(): string {
            return `-${this.properties.value.toHashtag()}`;
        }

        toTokens(expandHashtags = true): XPathToken[] {
            return [
                {
                    expression: this,
                    text: '-',
                    type: 'negation'
                },
                ...this.properties.value.toTokens(expandHashtags)
            ];
        }
    }

    /**
     * Functional call expression.
     */
    export class XPathFuncExpr extends XPathExpressionBase {
        type: 'function' = 'function';
        args: XPathExpression[];
        constructor(public properties: { id: string, args: XPathExpression[] | null }) {
            super();
            this.args = properties.args || [];
        }

        private combine(mapper: (part: XPathExpression) => string) {
            return this.properties.id + "(" + this.args.map(mapper).join(", ") + ")";
        }

        public getChildren() {
            return this.args;
        }

        public toString() {
            return `{func-expr:${this.properties.id},{${this.properties.args.join(',')}}}`;
        }

        public toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this) || this.combine(part => part.toHashtag());
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            return [{
                expression: this,
                text: this.properties.id,
                type: 'function.name'
            },
            ...this.parentheses(this.args, expandHashtags)];
        }
    }

    export class XPathPathExpr extends XPathExpressionBase {
        type: 'path' = 'path';
        steps: XPathStep[];
        constructor(private properties: {
            initialContext: XPathInitialContextEnum,
            filter: XPathFilterExpr,
            steps: XPathStep[] | null
        }) {
            super();
            this.steps = properties.steps || [];
        }

        private combine(partMap: (step: XPathStep) => string): string {
            var parts = this.steps.map(partMap),
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

        public getChildren() {
            return this.steps;
        }

        public toString() {
            return `{path-expr:${this.properties.initialContext === XPathInitialContextEnum.EXPR
                ? String(this.properties.filter)
                : this.properties.initialContext},{${this.steps.join(',')}}}`;
        }

        public toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this) || this.combine(part => part.toHashtag());
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            let parts: XPathToken[][] = this.steps.map(step => step.toTokens(expandHashtags)),
                ret: XPathToken[] = [],
                curPart: string,
                prevPart: string = '',
                sep: XPathToken[];

            let root: XPathToken[] = (this.properties.initialContext === XPathInitialContextEnum.ROOT) ? [{
                expression: this,
                text: "/",
                type: 'path'
            }] : [];
            if (this.properties.filter) {
                parts.splice(0, 0, this.properties.filter.toTokens(expandHashtags));
            }
            if (parts.length === 0) {
                return root;
            }
            for (let i = 0; i < parts.length; i++) {
                curPart = parts[i].map(p => p.text).join('');
                if (curPart !== "//" && prevPart !== "//") {
                    // unless the current part starts with a slash, put slashes between
                    // parts. the only exception to this rule is at the beginning,
                    // when we only use a slash if it's an absolute path
                    sep = (i === 0) ? root : [{
                        expression: this,
                        text: "/",
                        type: 'path'
                    }];
                    ret.push(...sep);
                }
                ret.push(...parts[i]);
                prevPart = curPart;
            }
            return ret;

        }

        public pathWithoutPredicates(): string {
            return this.combine(step => step.mainXPath(true));
        }
    }

    export class XPathStep extends XPathExpressionBase {
        type: 'path-step' = 'path-step';
        public predicates: XPathExpression[];
        constructor(public properties: {
            axis: XPathAxisEnum,
            test: XPathTestEnum,
            name: string,
            namespace: string,
            literal: XPathExpression | null,
            predicates: XPathExpression[] | null,
            location: ParseLocation
        }) {
            super();
            if (!properties.axis) {
                throw 'No axis specified';
            }
            this.predicates = properties.predicates || [];
        }

        private testTokens(expandHashtags: boolean): XPathToken[] {
            switch (this.properties.test) {
                case XPathTestEnum.NAME:
                    return [{
                        expression: this,
                        text: this.properties.name,
                        type: 'node.name'
                    }];
                case XPathTestEnum.TYPE_PROCESSING_INSTRUCTION:
                    return [{
                        expression: this,
                        text: "processing-instruction",
                        type: 'function.name'
                    }, {
                        expression: this,
                        text: '(',
                        type: 'paren.left'
                    }, ... this.properties.literal ? this.properties.literal.toTokens(expandHashtags) : [], {
                        expression: this,
                        text: ")",
                        type: 'paren.right'
                    }];
                case XPathTestEnum.NAMESPACE_WILDCARD:
                    return [{
                        expression: this,
                        text: this.properties.namespace,
                        type: 'namespace'
                    }, {
                        expression: this,
                        text: ":*",
                        type: 'path'
                    }];
                default:
                    return this.properties.test ? [{
                        expression: this,
                        text: this.properties.test,
                        type: 'path'
                    }] : [];
            }
        }

        private predicateXPath(mapper: (part: XPathExpression) => string) {
            if (this.predicates.length > 0) {
                return "[" + this.predicates.map(mapper).join("][") + "]";
            }

            return "";
        }

        private combine(expandHashtags: boolean, mapper: (part: XPathExpression) => string) {
            return this.mainXPath(expandHashtags) + this.predicateXPath(mapper);
        }

        public getChildren() {
            return this.predicates;
        }

        public mainXPath(expandHashtags: boolean): string {
            return this.mainTokens(expandHashtags).map(t => t.text).join('');
        }

        public mainTokens(expandHashtags: boolean): XPathToken[] {
            let axisPrefix: XPathToken[] = [{
                expression: this,
                text: this.properties.axis,
                type: 'path'
            }, {
                expression: this,
                text: "::",
                type: 'operator'
            }];
            // Use the abbreviated syntax to shorten the axis
            // or in some cases the whole thing
            switch (this.properties.axis) {
                case XPathAxisEnum.DESCENDANT_OR_SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return [{
                            expression: this,
                            text: "//",
                            type: 'path'
                        }];
                    }
                    break;
                case XPathAxisEnum.CHILD:
                    axisPrefix = []; // this is the default
                    break;
                case XPathAxisEnum.ATTRIBUTE:
                    axisPrefix = [{
                        expression: this,
                        text: "@",
                        type: 'attribute.sigil'
                    }];
                    break;
                case XPathAxisEnum.SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return [{
                            expression: this,
                            text: ".",
                            type: 'path'
                        }];
                    }
                    break;
                case XPathAxisEnum.PARENT:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return [{
                            expression: this,
                            text: "..",
                            type: 'path'
                        }];
                    }
                    break;
            }
            return [...axisPrefix, ... this.testTokens(expandHashtags)];
        }

        public toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this) || this.combine(false, part => part.toHashtag());
        }

        public toTokens(expandHashtags = true) {
            return [... this.mainTokens(expandHashtags), ...this.brackets(this.predicates, expandHashtags)];
        }

        public toString() {
            var stringArray = [];

            stringArray.push("{step:");
            stringArray.push(String(this.properties.axis));
            stringArray.push(",");
            stringArray.push(this.testTokens(true).map(t => t.text).join(''));
            if (this.predicates.length > 0) {
                stringArray.push(",{");
                stringArray.push(this.predicates.join(","));
                stringArray.push("}");
            }

            stringArray.push("}");
            return stringArray.join("");
        };
    }

    export class XPathFilterExpr extends XPathExpressionBase {
        type: 'filter' = 'filter';
        public predicates: XPathExpression[];
        constructor(private properties: {
            expr: XPathBaseExpression,
            predicates: XPathExpression[] | null
        }) {
            super();
            this.predicates = properties.predicates || [];
        }

        private combine(mapper: (part: XPathExpression) => string): string {
            var predicates = "";
            if (this.predicates.length > 0) {
                predicates = "[" + this.predicates.map(mapper).join("][") + "]";
            }
            var expr = this.properties.expr.toXPath();
            if (!(this.properties.expr instanceof XPathFuncExpr)) {
                expr = "(" + expr + ")";
            }
            return expr + predicates;
        }

        public getChildren() {
            return this.predicates;
        }

        public toString() {
            return `{filt-expr:${this.properties.expr.toString()},{${this.predicates.join(',')}}}`;
        }

        public toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this) || this.combine(part => part.toHashtag());
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            let tokens: XPathToken[] = [];

            let expr = this.properties.expr.toTokens(expandHashtags);
            if (!(this.properties.expr instanceof XPathFuncExpr)) {
                expr = [
                    { expression: this, text: "(", type: 'paren.left' },
                    ...expr,
                    { expression: this, text: ')', type: 'paren.right' }];
            }

            tokens.push(...expr);
            tokens.push(...this.brackets(this.predicates, expandHashtags));
            return tokens;
        }
    }

    export class XPathHashtagExpression extends XPathExpressionBase {
        public initialContext: XPathInitialContextEnum;
        public namespace: string;
        public steps: string[];
        public type: 'hashtag' = 'hashtag';

        constructor(definition: {
            initialContext: XPathInitialContextEnum,
            namespace: string,
            steps: string[] | null
        }) {
            super();
            if (!CurrentHashtagConfig.isValidNamespace(definition.namespace)) {
                throw new Error(definition.namespace + " is not a valid # expression");
            }
            this.initialContext = definition.initialContext;
            this.namespace = definition.namespace;
            this.steps = definition.steps || [];
        }

        public toString() {
            return `{hashtag-expr:${this.namespace},{${this.steps.join(",")}}}`;
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            if (expandHashtags) {
                let xpath = CurrentHashtagConfig.hashtagToXPath(this.toHashtag()) || "";
                let parser = new XPathParser(CurrentHashtagConfig);
                return parser.parse(xpath).toTokens(false);
            }

            let tokens: XPathToken[] = [{ expression: this, text: this.namespace, type: 'namespace' }];
            for (let i = 0; i < this.steps.length; i++) {
                let step = this.steps[i];
                tokens.push({
                    expression: this,
                    text: (i === 0) ? '#' : "/",
                    type: 'path'
                });
                tokens.push({
                    expression: this,
                    text: step,
                    type: 'path'
                });
            }
            return tokens;

        }

        public toHashtag() {
            let parts = [this.namespace].concat(this.steps.map(step => step.toString())),
                ret: string[] = [];
            for (let i = 0; i < parts.length; i++) {
                // hashtag to start then /
                ret.push((i === 0) ? '#' : "/");
                ret.push(parts[i]);
            }
            return ret.join("");
        }
    }

    /*
     * Literals
     */
    export type XPathLiteral = XPathStringLiteral | XPathNumericLiteral;
    export class XPathStringLiteral extends XPathExpressionBase {
        type: 'string' = 'string';
        value: string;
        private stringDelimiter: string;

        constructor(value: string, public location: ParseLocation) {
            super();
            this.stringDelimiter = value[0];
            this.value = value.substr(1, value.length - 2);
        }

        private get valueDisplay() {
            return `${this.stringDelimiter}${this.value}${this.stringDelimiter}`;
        }

        public toString() {
            return "{str:" + this.valueDisplay + "}";
        }

        public toHashtag() {
            return this.valueDisplay;
        }

        public toXPath() {
            return this.valueDisplay;
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            return [{
                expression: this,
                text: this.stringDelimiter,
                type: 'string.delimiter'
            }, {
                expression: this,
                text: this.value,
                type: 'string.value'
            }, {
                expression: this,
                text: this.stringDelimiter,
                type: 'string.delimiter'
            }];
        }
    }

    export class XPathNumericLiteral extends XPathExpressionBase {
        type: 'numeric' = 'numeric';
        value: BigNumber;
        /**
         * @param value the string representation of the number as found in the XPATH
         */
        constructor(value: string, public location: ParseLocation) {
            super();
            this.value = new BigNumber(value);
        }

        public toString() {
            return "{num:" + this.value.toString() + "}";
        }

        public toHashtag() {
            return this.toXPath();
        }

        public toTokens(expandHashtags = true): XPathToken[] {
            return [{
                expression: this,
                text: this.value.toFixed(),
                type: 'numeric'
            }];
        }
    }

    export class ParseLocation {
        /**
         * One-based character offset
         */
        public firstColumn: number;
        /**
         * One-based line number
         */
        public firstLine: number;
        /**
         * One-based last column, inclusive.
         */
        public lastColumn: number;
        /**
         * One-based last line number, inclusive.
         */
        public lastLine: number;

        constructor(properties: {
            first_column: number,
            first_line: number,
            last_column: number,
            last_line: number
        }[], offset = -1) {
            let current = properties[properties.length - 1];
            this.firstColumn = current.first_column;
            this.firstLine = current.first_line;
            this.lastColumn = current.last_column;
            this.lastLine = current.last_line;
        }
    }
}
