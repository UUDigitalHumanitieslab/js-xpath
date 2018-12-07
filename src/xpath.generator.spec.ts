import { XPathParser, XPathModels } from './xpath';

/*
 * This test package is heavily adapted from the previous test suite:
 * https://github.com/dimagi/js-xpath/blob/master/test/generatorTests.js
 * Which is heavily adapted from the previous test suite:
 * https://bitbucket.org/javarosa/javarosa/src/tip/core/test/org/javarosa/xpath/test/XPathParseTest.java
 * 
 */
describe('XPath Generators', () => {
    let parser: XPathParser;
    beforeEach(() => {
        parser = new XPathParser();
    });

    function runGeneratorTests(testCases: { [input: string]: string }) {
        for (let i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                try {
                    let parsed = parser.parse(i);
                    expect(parsed.toXPath()).toEqual(testCases[i], "" + i + " generated correctly.");
                    // It seems reasonable to expect that the generated xpath
                    // should parse back to the same object, although this may 
                    // not always hold true.
                    expect(parsed.toString()).toEqual(parser.parse(parsed.toXPath()).toString(), "XPath " + i + " produced same result when reparsed.");
                    expect(parsed.toString()).toEqual(parser.parse(parsed.toHashtag()).toString(), "Hashtag " + i + " produced same result when reparsed.");
                } catch (err) {
                    fail("" + err + " for input: " + i);
                }
            }
        }
    }

    it("generator numbers", () => {
        runGeneratorTests({
            "123.": "123",
            "734.04": "734.04",
            "0.12345": "0.12345",
            ".666": "0.666",
            "00000333.3330000": "333.333",
            "1230000000000000000000": "1230000000000000000000",
            "0.00000000000000000123": "0.00000000000000000123",
            "0": "0",
            "0.": "0",
            ".0": "0",
            "0.0": "0"
        });
    });


    it("generator strings", () => {
        runGeneratorTests({
            "\"\"": "\"\"",
            "\"   \"": "\"   \"",
            "''": "''",
            "'\"'": "'\"'",
            "\"'\"": "\"'\"",
            "'mary had a little lamb'": "'mary had a little lamb'"
        });
    });

    it("generator variables", () => {
        runGeneratorTests({
            "$var": "$var",
            "$qualified:name": "$qualified:name"
        });
    });


    it("generator parens nesting", () => {
        runGeneratorTests({
            "(5)": "5",
            "(( (( (5 )) )))  ": "5",
        });
    });

    it("generator operators", () => {
        runGeneratorTests({
            "5 + 5": "5 + 5",
            "-5": "-5",
            "- 5": "-5",
            "----5": "----5",
            "6 * - 7": "6 * -7",
            "0--0": "0 - -0",
            "5 * 5": "5 * 5",
            "5 div 5": "5 div 5",
            "5 mod 5": "5 mod 5",
            "3mod4": "3 mod 4",
            "3 mod6": "3 mod 6",
            "3mod 7": "3 mod 7",
            "5 div separate-token": "5 div separate-token",
            "5 = 5": "5 = 5",
            "5 != 5": "5 != 5",
            "5 < 5": "5 < 5",
            "5 <= 5": "5 <= 5",
            "5 > 5": "5 > 5",
            "5 >= 5": "5 >= 5",
            "5 and 5": "5 and 5",
            "5 or 5": "5 or 5",
            "5 | 5": "5 | 5"
        });
    });

    it("generator operator associativity", () => {
        runGeneratorTests({
            "1 or 2 or 3": "1 or 2 or 3",
            "1 and 2 and 3": "1 and 2 and 3",
            "1 = 2 != 3 != 4 = 5": "1 = 2 != 3 != 4 = 5",
            "1 < 2 >= 3 <= 4 > 5": "1 < 2 >= 3 <= 4 > 5",
            "1 + 2 - 3 - 4 + 5": "1 + 2 - 3 - 4 + 5",
            "1 mod 2 div 3 div 4 * 5": "1 mod 2 div 3 div 4 * 5",
            "1|2|3": "1 | 2 | 3",
        });
    });

    it("generator operator precedence", () => {
        runGeneratorTests({
            "1 < 2 = 3 > 4 and 5 <= 6 != 7 >= 8 or 9 and 10": "1 < 2 = 3 > 4 and 5 <= 6 != 7 >= 8 or 9 and 10",
            "1 * 2 + 3 div 4 < 5 mod 6 | 7 - 8": "1 * 2 + 3 div 4 < 5 mod 6 | 7 - 8",
            "- 4 * 6": "-4 * 6",
            "6*(3+4)and(5or2)": "6 * (3 + 4) and (5 or 2)",
            "(1 - 2) - 3": "(1 - 2) - 3",
            "1 - (2 - 3)": "1 - (2 - 3)"
        });
    });


    it("generator function calls", () => {
        runGeneratorTests({
            "function()": "function()",
            "func:tion()": "func:tion()",
            "function(   )": "function()",
            "function (5)": "function(5)",
            "function   ( 5, 'arg', 4 * 12)": "function(5, 'arg', 4 * 12)",
            "4and func()": "4 and func()",
        });
    });


    it("generator function calls that are actually node tests", () => {
        runGeneratorTests({
            "node()": "node()",
            "text()": "text()",
            "comment()": "comment()",
            "processing-instruction()": "processing-instruction()",
            "processing-instruction('asdf')": "processing-instruction('asdf')",
        });
    });

    it("generator filter expressions", () => {
        runGeneratorTests({
            "bunch-o-nodes()[3]": "bunch-o-nodes()[3]",
            "bunch-o-nodes()[3]['predicates'!='galore']": "bunch-o-nodes()[3]['predicates' != 'galore']",
            "(bunch-o-nodes)[3]": "(bunch-o-nodes)[3]",
            "bunch-o-nodes[3]": "bunch-o-nodes[3]",
        });
    });

    it("generator path steps", () => {
        runGeneratorTests({
            ".": ".",
            "..": "..",
        });
    });

    it("generator name tests", () => {
        runGeneratorTests({
            "name": "name",
            "qual:name": "qual:name",
            "_rea--ll:y.funk..y_N4M3": "_rea--ll:y.funk..y_N4M3",
            "namespace:*": "namespace:*",
            "*": "*",
            "*****": "* * * * *",
        });
    });

    it("generator axes", () => {
        runGeneratorTests({
            "child::*": "*",
            "parent::*": "parent::*",
            "descendant::*": "descendant::*",
            "ancestor::*": "ancestor::*",
            "following-sibling::*": "following-sibling::*",
            "preceding-sibling::*": "preceding-sibling::*",
            "following::*": "following::*",
            "preceding::*": "preceding::*",
            "attribute::*": "@*",
            "namespace::*": "namespace::*",
            "self::*": "self::*",
            "descendant-or-self::*": "descendant-or-self::*",
            "ancestor-or-self::*": "ancestor-or-self::*",
            "@attr": "@attr",
            "@*": "@*",
            "@ns:*": "@ns:*",
        });
    });

    it("generator predicates", () => {
        runGeneratorTests({
            "descendant::node()[@attr='blah'][4]": "descendant::node()[@attr = 'blah'][4]",
        });
    });

    it("generator paths", () => {
        runGeneratorTests({
            "rel/ative/path": "rel/ative/path",
            "/abs/olute/path['etc']": "/abs/olute/path['etc']",
            "filter()/expr/path": "filter()/expr/path",
            "fil()['ter']/expr/path": "fil()['ter']/expr/path",
            "(another-filter)/expr/path": "(another-filter)/expr/path",
            "/": "/",
            "//all": "//all",
            "a/.//../z": "a/.//../z",
            "6and path": "6 and path",
        });
    });

    it("generator real world examples", () => {
        runGeneratorTests({
            "/patient/sex = 'male' and /patient/age > 15": "/patient/sex = 'male' and /patient/age > 15",
            "../jr:hist-data/labs[@type=\"cd4\"]": "../jr:hist-data/labs[@type = \"cd4\"]",
            "function_call(26*(7+3), //*, /im/child::an/ancestor::x[3][true()]/path)": "function_call(26 * (7 + 3), //*, /im/an/ancestor::x[3][true()]/path)",
        });
    });

    it("generate without predicates", () => {
        let testCases: { [path: string]: string } = {
            "/data/blue": "/data/blue",
            "/data/blue[$random = 'predicate']": "/data/blue",
        };
        for (let path in testCases) {
            if (testCases.hasOwnProperty(path)) {
                try {
                    let parsed = parser.parse(path) as XPathModels.XPathPathExpr;
                    expect(parsed.pathWithoutPredicates()).toEqual(testCases[path], "" + path + " generated correctly.");
                    expect(parsed.toXPath()).toEqual(path, "" + path + " generated correctly.");
                } catch (err) {
                    fail("" + err + " for input: " + path);
                }
            }
        }
    });
});
