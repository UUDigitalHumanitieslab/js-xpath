import { XPathModels } from '../xpath-models';
export let parser: jison;
export function parse(input: string): XPathModels.XPathExpression;
export type jison = {
    yy: {
        xpathModels: any,
        parseError: any
    }
}