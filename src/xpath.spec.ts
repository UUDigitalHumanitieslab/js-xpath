import { XPathParser } from './xpath';

describe("XPath Parser",
    () => {
        it("Works", () => {
            let parser = new XPathParser();
            let parsed = parser.parse("//node");
            expect(parsed).toBeTruthy();
            expect(parsed.toXPath()).toEqual("//node");
        });

        it("Can switch on type", () => {
            let parser = new XPathParser();
            let parsed = parser.parse("//node");
            switch (parsed.type) {
                case 'variable':
                    // this is just to check compile time that this switch didn't break
                    fail('Is not a variable');
                    break;
            }
        });
    });