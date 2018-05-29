// based on https://github.com/dimagi/js-xpath/blob/master/src/models.js
import { BigNumber } from 'bignumber.js';
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
        toTokens(): XPathToken[]
    }

    export type XPathExpression = XPathBaseExpression | XPathOperation | XPathPathExpr | XPathFilterExpr | XPathHashtagExpression;
    export type XPathBaseExpression =
        | XPathFuncExpr
        | XPathVariableReference
        | XPathLiteral;

    export class XPathVariableReference implements IXPathExpression {
        type: 'variable';
        constructor(public value: string) {
        }

        public toString() {
            return "{var:" + String(this.value) + "}";
        }

        public toHashtag() {
            return this.toXPath();
        }

        public toXPath() {
            return `$${this.value}`;
        }

        public toTokens(): XPathToken[] {
            return [{
                type: 'variable.sigil',
                text: '$'
            }, {
                type: 'variable.value',
                text: this.value
            }];
        }
    }

    export type XPathOperation = XPathBoolExpr | XPathEqExpr | XPathCmpExpr | XPathArithExpr | XPathUnionExpr | XPathNumNegExpr;
    export abstract class XPathOperationBase<T> implements IXPathExpression {
        type: 'operation' = 'operation';
        operationType: T;

        abstract getChildren(): XPathExpression[];
        toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this);
        }
        abstract toXPath(): string;
        abstract toTokens(): XPathToken[]
    }

    export abstract class XPathOperator<T> extends XPathOperationBase<T>  {
        operationType: T;
        public parens: boolean = false;
        constructor(public properties: { type: T, left: XPathExpression, right: XPathExpression }) {
            super();
            this.operationType = properties.type;
        }

        private print<U>(formatter: (expr: XPathExpression) => U[],
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
            return this.print(expr => [expr.toHashtag()], this.expressionTypeEnumToXPathLiteral, ' ', '(', ')').join('');
        }

        toString() {
            return "{binop-expr:" + this.properties.type + "," + String(this.properties.left) + "," + String(this.properties.right) + "}";
        }

        toXPath(): string {
            return this.print(expr => [expr.toXPath()], this.expressionTypeEnumToXPathLiteral, ' ', '(', ')').join('');
        }

        toTokens(): XPathToken[] {
            return this.print<XPathToken>(
                expr => expr.toTokens(),
                (operationType) => {
                    return {
                        text: this.expressionTypeEnumToXPathLiteral(operationType),
                        type: 'operator'
                    }
                }, {
                    text: ' ',
                    type: 'whitespace'
                }, {
                    text: '(',
                    type: 'paren.left'
                }, {
                    text: ' ',
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

        toXPath(): string {
            return `-${this.properties.value.toXPath()}`;
        }

        toTokens(): XPathToken[] {
            return [
                { text: '-', type: 'negation' },
                ...this.properties.value.toTokens()
            ];
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

        public toXPath(): string {
            return this.combine(part => part.toXPath());
        }

        public toTokens(): XPathToken[] {
            let tokens: XPathToken[] = [{
                text: this.properties.id,
                type: 'function.name'
            },
            {
                text: '(',
                type: 'paren.left'
            }];
            for (let i = 0; i < this.args.length; i++) {
                if (i > 0) {
                    tokens.push({ text: ',', type: 'function.separator' });
                    tokens.push({ text: ' ', type: 'whitespace' });
                }
                tokens.push(...this.args[i].toTokens());
            }
            tokens.push(
                {
                    text: ')',
                    type: 'paren.right'
                });

            return tokens;
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

        public toXPath(): string {
            return this.combine(step => step.toXPath());
        }

        public toTokens(): XPathToken[] {
            let parts: XPathToken[][] = this.steps.map(step => step.toTokens()),
                ret: XPathToken[] = [],
                curPart: string,
                prevPart: string = '',
                sep: XPathToken[];

            let root: XPathToken[] = (this.properties.initialContext === XPathInitialContextEnum.ROOT) ? [{
                text: "/",
                type: 'path'
            }] : [];
            if (this.properties.filter) {
                parts.splice(0, 0, this.properties.filter.toTokens());
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
            return this.combine(step => step.mainXPath());
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
            literal: XPathExpression | null,
            predicates: XPathExpression[] | null,
            location: ParseLocation
        }) {
            if (!properties.axis) {
                throw 'No axis specified';
            }
            this.predicates = properties.predicates || [];
        }

        private testTokens(): XPathToken[] {
            switch (this.properties.test) {
                case XPathTestEnum.NAME:
                    return [{
                        text: this.properties.name,
                        type: 'node.name'
                    }];
                case XPathTestEnum.TYPE_PROCESSING_INSTRUCTION:
                    return [{
                        text: "processing-instruction",
                        type: 'function.name'
                    }, {
                        text: '(',
                        type: 'paren.left'
                    }, ... this.properties.literal ? this.properties.literal.toTokens() : [], {
                        text: ")",
                        type: 'paren.right'
                    }];
                case XPathTestEnum.NAMESPACE_WILDCARD:
                    return [{
                        text: this.properties.namespace,
                        type: 'namespace'
                    }, {
                        text: ":*",
                        type: 'path'
                    }];
                default:
                    return this.properties.test ? [{
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

        private combine(mapper: (part: XPathExpression) => string) {
            return this.mainXPath() + this.predicateXPath(mapper);
        }

        public getChildren() {
            return this.predicates;
        }

        public mainXPath(): string {
            return this.mainTokens().map(t => t.text).join('');
        }

        public mainTokens(): XPathToken[] {
            let axisPrefix: XPathToken[] = [{
                text: this.properties.axis,
                type: 'path'
            }, {
                text: "::",
                type: 'operator'
            }];
            // Use the abbreviated syntax to shorten the axis
            // or in some cases the whole thing
            switch (this.properties.axis) {
                case XPathAxisEnum.DESCENDANT_OR_SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return [{
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
                        text: "@",
                        type: 'attribute.sigil'
                    }];
                    break;
                case XPathAxisEnum.SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return [{
                            text: ".",
                            type: 'path'
                        }];
                    }
                    break;
                case XPathAxisEnum.PARENT:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return [{
                            text: "..",
                            type: 'path'
                        }];
                    }
                    break;
            }
            return [...axisPrefix, ... this.testTokens()];
        }

        public toHashtag(): string {
            return CurrentHashtagConfig.toHashtag(this) || this.combine(part => part.toHashtag());
        }

        public toXPath() {
            return this.combine(part => part.toXPath());
        }

        public toTokens() {
            let tokens = this.mainTokens();
            for (let predicate of this.predicates) {
                tokens.push({
                    text: '[',
                    type: 'bracket.left'
                });
                tokens.push(...predicate.toTokens());
                tokens.push({
                    text: ']',
                    type: 'bracket.right'
                });
            }

            return tokens;
        }

        public toString() {
            var stringArray = [];

            stringArray.push("{step:");
            stringArray.push(String(this.properties.axis));
            stringArray.push(",");
            stringArray.push(this.testTokens().map(t => t.text).join(''));
            if (this.predicates.length > 0) {
                stringArray.push(",{");
                stringArray.push(this.predicates.join(","));
                stringArray.push("}");
            }

            stringArray.push("}");
            return stringArray.join("");
        };
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

        public toXPath(): string {
            return this.combine(part => part.toXPath());
        }

        public toTokens(): XPathToken[] {
            let tokens: XPathToken[] = [];

            let expr = this.properties.expr.toTokens();
            if (!(this.properties.expr instanceof XPathFuncExpr)) {
                expr = [
                    { text: "(", type: 'paren.left' },
                    ...expr,
                    { text: ')', type: 'paren.right' }];
            }
            tokens.push(...expr);

            for (let predicate of this.predicates) {
                tokens.push({
                    text: '[',
                    type: 'bracket.left'
                });
                tokens.push(...predicate.toTokens());
                tokens.push({
                    text: ']',
                    type: 'bracket.right'
                });
            }
            return tokens;
        }
    }

    export class XPathHashtagExpression implements IXPathExpression {
        public initialContext: XPathInitialContextEnum;
        public namespace: string;
        public steps: XPathStep[];
        public type: 'hashtag' = 'hashtag';

        constructor(definition: {
            initialContext: XPathInitialContextEnum,
            namespace: string,
            steps: XPathStep[] | null
        }) {
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

        public toXPath() {
            return CurrentHashtagConfig.hashtagToXPath(this.toHashtag()) || "";
        }

        // TODO: allow expanding these
        public toTokens(): XPathToken[] {
            let tokens: XPathToken[] = [{ text: this.namespace, type: 'namespace' }];
            for (let i = 0; i < this.steps.length; i++) {
                let step = this.steps[i]
                tokens.push({
                    text: (i === 0) ? '#' : "/",
                    type: 'path'
                });
                tokens.push(...step.toTokens());
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
    export class XPathStringLiteral implements IXPathExpression {
        type: 'string' = 'string';
        value: string;
        private stringDelimiter: string;

        constructor(value: string, public location: ParseLocation) {
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

        public toTokens(): XPathToken[] {
            return [{
                text: this.stringDelimiter,
                type: 'string.delimiter'
            }, {
                text: this.value,
                type: 'string.value'
            }, {
                text: this.stringDelimiter,
                type: 'string.delimiter'
            }];
        }
    }

    export class XPathNumericLiteral implements IXPathExpression {
        type: 'numeric' = 'numeric';
        value: BigNumber;
        /**
         * @param value the string representation of the number as found in the XPATH
         */
        constructor(value: string, public location: ParseLocation) {
            this.value = new BigNumber(value);
        }

        public toString() {
            return "{num:" + this.value.toString() + "}";
        }

        public toHashtag() {
            return this.toXPath();
        }

        public toXPath() {
            return this.value.toFixed();
        }

        public toTokens(): XPathToken[] {
            return [{
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