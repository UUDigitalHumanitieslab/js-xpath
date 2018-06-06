import { XPathParser } from './xpath';

describe('XPath Annotate', () => {
    let parser: XPathParser;

    beforeEach(() => {
        parser = new XPathParser();
    });

    function runCommon(testCases: string[]) {
        for (let testCase of testCases) {
            try {
                let annotated = parser.annotate(testCase);
                expect(annotated.map(a => a.text).join('')).toEqual(testCase, "" + testCase + " parsed correctly.");
            } catch (err) {
                fail("" + err + " for input: " + testCase);
            }
        }
    };

    it("preserves whitespace", function () {
        runCommon(["(5)",
            "(( (( (5 )) )))  ",
            "1 or 2 or 3",
            "1 and 2 and 3",
            "1 = 2 != 3 != 4 = 5",
            "1 < 2 >= 3 <= 4 > 5",
            "1 + 2 - 3 - 4 + 5",
            "1 mod 2 div 3 div 4 * 5",
            "1|2|3",
            "/patient/sex = 'male' and /patient/age > 15",
            "../jr:hist-data/labs[@type=\"cd4\"]",
            "function_call(26*(7+3), //*, /im/child::an/ancestor::x[3][true()]/path)",
            "function()",
            "func:tion()",
            "function(   )",
            "function (5)",
            "function   ( 5, 'arg', 4 * 12)",
            "4andfunc()",
            "1 < 2 = 3 > 4 and 5 <= 6 != 7 >= 8 or 9 and 10",
            "1 * 2 + 3 div 4 < 5 mod 6 | 7 - 8",
            "- 4 * 6",
            "6*(3+4)and(5or2)",
            "(1 - 2) - 3",
            "1 - (2 - 3)",
            '$node3/node[@rel = "hd" and @pt = "n"]'
        ]);
    });
});