import { XPathModels } from './xpath-models';
export * from './xpath-models';
/**
 * Class for parsing an XPath string.
 */
export declare class XPathParser {
    hashtagConfig: XPathModels.HashtagConfig;
    constructor(hashtagConfig?: XPathModels.HashtagConfig);
    /**
     * Parse an XPath string and returns a parse tree or throw a parse exception.
     * @param input XPath string to parse
     * @exception @see {XPathModels.ParseError}
     */
    parse(input: string): XPathModels.XPathExpression;
}
