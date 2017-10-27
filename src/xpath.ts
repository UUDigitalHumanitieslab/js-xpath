import { XPathModels } from './xpath-models';
import * as jison from './jison/xpath';

// assign the shared scope
jison.parser.yy = {
    xpathModels: XPathModels,
    parseError: XPathModels.parseError
};

export default class XPathParser {
    public parse(input: string): XPathModels.XPathExpression {
        return jison.parse(input);
    }
}
