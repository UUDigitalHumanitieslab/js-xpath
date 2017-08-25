import { XPathModels } from './xpath-models';

export declare let parser: {
    trace: () => any;
    parseError: XPathModels.ParseError;
    yy: any;
}
export declare let parse: (input: string) => XPathModels.XPathExpression;