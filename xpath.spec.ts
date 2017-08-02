import * as parser from './xpath';
import { XPathModels } from './xpath-models';

describe("XPath Parser",
    () => {
        beforeAll(() => {
            // assign the shared scope
            (parser as any).yy = { xpathModels: XPathModels };
        });

        it("Works", () => {
            let parsed = parser.parse("//node");
            expect(parsed).toBeTruthy();
            expect(parsed.toXPath()).toEqual("//node");
        });
    });