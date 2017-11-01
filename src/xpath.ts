import { XPathModels } from './xpath-models';
import * as jison from './jison/xpath';
export * from './xpath-models';

// assign the shared scope
jison.parser.yy = {
    xpathModels: XPathModels,
    parseError: XPathModels.parseError
};

/**
 * Class for parsing an XPath string.
 */
export class XPathParser {
    constructor(public hashtagConfig: XPathModels.HashtagConfig = XPathModels.DefaultHashtagConfig) {
    }

    /**
     * Parse an XPath string and returns a parse tree or throw a parse exception.
     * @param input XPath string to parse
     * @exception @see {XPathModels.ParseError}
     */
    public parse(input: string): XPathModels.XPathExpression {
        XPathModels.CurrentHashtagConfig = this.hashtagConfig;
        return jison.parse(input);
    }
}
