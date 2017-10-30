import { XPathParser } from './xpath';

describe("XPath Parser",
    () => {
        it("Works", () => {
            let parser = new XPathParser();
            let parsed = parser.parse("//node");
            expect(parsed).toBeTruthy();
            expect(parsed.toXPath()).toEqual("//node");
        });
    });