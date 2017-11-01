export declare module XPathModels {
    interface HashtagConfig {
        /**
         * @param namespace - the namespace used in hashtag
         * @return truthy value
         */
        isValidNamespace: (namespace: string) => boolean;
        /**
         * @param hashtagExpr string representation of hashtag ex. #form/question
         * @return the XPath or falsy value if no corresponding XPath found
         */
        hashtagToXPath: (hashtagExpr: string) => string | false;
        /**
         * @param xpath - XPath object (can be any of the objects defined in xpm
         * @returns text representation of XPath in hashtag format (default
                    implementation is to just return the XPath)
         */
        toHashtag: (xpath: IXPathExpression) => string;
    }
    let DefaultHashtagConfig: HashtagConfig;
    let CurrentHashtagConfig: HashtagConfig;
    let isDebugging: boolean;
    type ErrorHash = {
        text: string;
        token: string;
        line: number;
        loc: {
            first_line: number | undefined;
            last_line: number | undefined;
            first_column: number | undefined;
            last_column: number | undefined;
            range: [number, number] | undefined;
        } | undefined;
        expected: string | undefined;
    };
    function debugLog(...args: string[]): void;
    function validateAxisName(name: string): boolean;
    class ParseError {
        message: string;
        hash: ErrorHash;
        constructor(message: string, hash: ErrorHash);
    }
    function parseError(str: string, hash: ErrorHash): void;
    enum XPathInitialContextEnum {
        HASHTAG = "hashtag",
        ROOT = "abs",
        RELATIVE = "rel",
        EXPR = "expr",
    }
    enum XPathAxisEnum {
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
        ANCESTOR_OR_SELF = "ancestor-or-self",
    }
    enum XPathTestEnum {
        NAME = "name",
        NAME_WILDCARD = "*",
        NAMESPACE_WILDCARD = ":*",
        TYPE_NODE = "node()",
        TYPE_TEXT = "text()",
        TYPE_COMMENT = "comment()",
        TYPE_PROCESSING_INSTRUCTION = "processing-instruction",
    }
    interface IXPathExpression {
        toXPath(): string;
    }
    type XPathExpression = XPathBaseExpression | XPathOperation | XPathPathExpr | XPathFilterExpr | XPathHashtagExpression;
    type XPathBaseExpression = XPathFuncExpr | XPathVariableReference | XPathLiteral;
    class XPathVariableReference implements IXPathExpression {
        value: string;
        type: 'variable';
        constructor(value: string);
        toXPath(): string;
    }
    type XPathOperation = XPathBoolExpr | XPathEqExpr | XPathCmpExpr | XPathArithExpr | XPathUnionExpr | XPathNumNegExpr;
    abstract class XPathOperationBase<T> implements IXPathExpression {
        type: 'operation';
        operationType: T;
        abstract getChildren(): XPathExpression[];
        abstract toXPath(): string;
    }
    abstract class XPathOperator<T> extends XPathOperationBase<T> {
        properties: {
            type: T;
            left: XPathExpression;
            right: XPathExpression;
        };
        operationType: T;
        parens: boolean;
        constructor(properties: {
            type: T;
            left: XPathExpression;
            right: XPathExpression;
        });
        getChildren(): XPathExpression[];
        toXPath(): string;
        abstract expressionTypeEnumToXPathLiteral(type: T): string;
    }
    type XPathBoolOperator = 'or' | 'and';
    type XPathEqOperator = '==' | '!=';
    type XPathCmpOperator = '<' | '<=' | '>' | '>=';
    type XPathArithOperator = '+' | '-' | '*' | '/' | '%';
    class XPathBoolExpr extends XPathOperator<XPathBoolOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathBoolOperator): XPathBoolOperator;
    }
    class XPathEqExpr extends XPathOperator<XPathEqOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathEqOperator): "!=" | "=";
    }
    class XPathCmpExpr extends XPathOperator<XPathCmpOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathCmpOperator): XPathCmpOperator;
    }
    class XPathArithExpr extends XPathOperator<XPathArithOperator> {
        expressionTypeEnumToXPathLiteral(type: XPathArithOperator): "+" | "-" | "*" | "mod" | "div";
    }
    class XPathUnionExpr extends XPathOperator<'union'> {
        expressionTypeEnumToXPathLiteral(type: 'union'): string;
    }
    class XPathNumNegExpr extends XPathOperationBase<'num-neg'> {
        properties: {
            type: 'num-neg';
            value: XPathExpression;
        };
        operationType: 'num-neg';
        constructor(properties: {
            type: 'num-neg';
            value: XPathExpression;
        });
        getChildren(): XPathExpression[];
        toXPath(): string;
    }
    /**
     * Functional call expression.
     */
    class XPathFuncExpr implements IXPathExpression {
        properties: {
            id: string;
            args: XPathExpression[] | null;
        };
        type: 'function';
        args: XPathExpression[];
        constructor(properties: {
            id: string;
            args: XPathExpression[] | null;
        });
        getChildren(): XPathExpression[];
        toXPath(): string;
    }
    class XPathPathExpr implements IXPathExpression {
        private properties;
        type: 'path';
        steps: XPathStep[];
        constructor(properties: {
            initialContext: XPathInitialContextEnum;
            filter: XPathFilterExpr;
            steps: XPathStep[] | null;
        });
        getChildren(): XPathStep[];
        toXPath(): string;
    }
    class XPathStep implements IXPathExpression {
        properties: {
            axis: XPathAxisEnum;
            test: XPathTestEnum;
            name: string;
            namespace: string;
            literal: string | null;
            predicates: XPathExpression[] | null;
            location: ParseLocation;
        };
        type: 'path-step';
        predicates: XPathExpression[];
        constructor(properties: {
            axis: XPathAxisEnum;
            test: XPathTestEnum;
            name: string;
            namespace: string;
            literal: string | null;
            predicates: XPathExpression[] | null;
            location: ParseLocation;
        });
        getChildren(): XPathExpression[];
        private testString();
        private mainXPath();
        private predicateXPath();
        toXPath(): string;
        toString(): string;
    }
    class XPathFilterExpr implements IXPathExpression {
        private properties;
        type: 'filter';
        predicates: XPathExpression[];
        constructor(properties: {
            expr: XPathBaseExpression;
            predicates: XPathExpression[] | null;
        });
        getChildren(): XPathExpression[];
        toXPath(): string;
    }
    class XPathHashtagExpression implements IXPathExpression {
        initialContext: XPathInitialContextEnum;
        namespace: string;
        steps: XPathStep[];
        constructor(definition: {
            initialContext: XPathInitialContextEnum;
            namespace: string;
            steps: XPathStep[] | null;
        });
        toXPath(): string;
        toHashtag(): string;
    }
    type XPathLiteral = XPathStringLiteral | XPathNumericLiteral;
    class XPathStringLiteral implements IXPathExpression {
        location: ParseLocation;
        type: 'string';
        value: string;
        private stringDelimiter;
        constructor(value: string, location: ParseLocation);
        toXPath(): string;
    }
    class XPathNumericLiteral implements IXPathExpression {
        value: number;
        location: ParseLocation;
        type: 'numeric';
        constructor(value: number, location: ParseLocation);
        toXPath(): string;
    }
    class ParseLocation {
        firstColumn: number;
        firstLine: number;
        lastColumn: number;
        lastLine: number;
        constructor(properties: {
            first_column: number;
            first_line: number;
            last_column: number;
            last_line: number;
        }[]);
    }
}
