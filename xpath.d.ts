import { XPathModels } from '../xpath-models';

export declare let trace: () => any;
export declare let parseError: (str: string, hash) => any;
export declare let parse: (input: string) => XPathModels.XPathExpression;