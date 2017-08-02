import { XPathModels } from './xpath-models';

export declare let trace: () => any;
export declare let parseError: XPathModels.ParseError;
export declare let parse: (input: string) => XPathModels.XPathExpression;