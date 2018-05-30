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
     * Parses an XPath string and returns a parse tree or throw a parse exception.
     * @param input XPath string to parse
     * @exception @see {XPathModels.ParseError}
     */
    public parse(input: string): XPathModels.XPathExpression {
        XPathModels.CurrentHashtagConfig = this.hashtagConfig;
        return jison.parse(input);
    }

    /**
     * Parses an XPath string and returns an annotated version of the input string.
     * @param input XPath string to parse
     * @exception @see {XPathModels.ParseError}
     */
    public annotate(input: string): XPathModels.XPathToken[] {
        let parsed = this.parse(input);
        let tokens = parsed.toTokens(false).filter(t => t.type != 'whitespace');
        let index = 0;

        // preserve whitespace
        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            // token starts here
            let textOffset = input.substring(index).indexOf(token.text);
            if (textOffset == -1) {
                throw `Misaligned input and parse at ${index}. Could not find ${token.text} in input.`;
            }
            if (textOffset > 0) {
                // inject token containing whitespace
                tokens.splice(i, 0, {
                    expression: parsed,
                    text: input.substr(index, textOffset),
                    type: 'whitespace'
                });
                index += textOffset;
                i++;
            }

            index += token.text.length;
        }

        if (index < input.length) {
            tokens.push({
                expression: parsed,
                text: input.substring(index),
                type: 'whitespace'
            });
        }

        return tokens;
    }
}
