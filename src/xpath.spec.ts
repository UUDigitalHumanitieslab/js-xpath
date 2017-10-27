import XPathParser from './xpath';
import { XPathModels } from './xpath-models';

describe("XPath Parser",
    () => {
        it("Works", () => {
            let parser = new XPathParser();
            let parsed = parser.parse("//node");
            expect(parsed).toBeTruthy();
            expect(parsed.toXPath()).toEqual("//node");
        });
    });