import { XPathParser, XPathModels } from './xpath';

/*
 * This test package is heavily adapted from the previous test suite:
 * https://github.com/dimagi/js-xpath/blob/master/test/hashtagTests.js
 * 
 */

describe('XPath Hashtags', () => {
    function makeXPathConfig(validHashtagNamespaces: string[], translationDict: { [input: string]: string }): XPathModels.HashtagConfig {
        return {
            isValidNamespace: (value) => {
                return validHashtagNamespaces.indexOf(value) !== -1;
            },
            hashtagToXPath: (hashtagExpr) => {
                if (translationDict[hashtagExpr]) {
                    return translationDict[hashtagExpr];
                }
                throw new Error("Can't translate this hashtag to an XPath");
            },
            toHashtag: (xpath) => {
                function toHashtag(xpathExpr: string) {
                    for (let key in translationDict) {
                        if (translationDict.hasOwnProperty(key)) {
                            if (translationDict[key] === xpathExpr)
                                return key;
                        }
                    }
                    return null;
                }

                return toHashtag(xpath.toXPath());
            },
        };
    }

    let parser: XPathParser;
    beforeEach(() => {
        parser = new XPathParser();
    });

    function runCommon(testCases: { [input: string]: string }, validHashtagNamespaces: string[]) {
        parser.hashtagConfig = makeXPathConfig(validHashtagNamespaces, {});
        for (var i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                try {
                    expect(parser.parse(i).toString()).toEqual(testCases[i], "" + i + " parsed correctly.");
                } catch (err) {
                    fail("" + err + " for input: " + i);
                }
            }
        }
    }

    function runFailures(testCases: { [input: string]: new (...args: any[]) => Error }, validHashtagNamespaces: string[]) {
        parser.hashtagConfig = makeXPathConfig(validHashtagNamespaces, {});
        for (let i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                expect(() => {
                    parser.parse(i);
                    console.error(`${i} failed to fail.`);
                }).toThrow();
            }
        }
    }

    function runGeneratorTests(testcases: { [input: string]: string }, translationDict: { [input: string]: string }, namespaces: string[]) {
        parser.hashtagConfig = makeXPathConfig(namespaces, translationDict);
        for (var i in testcases) {
            if (testcases.hasOwnProperty(i)) {
                try {
                    let parsed = parser.parse(i);
                    expect(parsed.toXPath()).toEqual(testcases[i], "" + i + " generated correctly.");
                    // It seems reasonable to expect that the generated xpath
                    // should parse back to the same object, although this may 
                    // not always hold true.
                    expect(parsed.toString()).toEqual(parser.parse(parsed.toHashtag()).toString(), "" + i + " produced same result when reparsed.");
                } catch (err) {
                    fail("" + err + " for input: " + i);
                }
            }
        }
    }

    it("parses hashtags", function () {
        var namespaces = ['form', 'case'];
        runCommon({
            "#form/question": "{hashtag-expr:form,{question}}",
            "#form/group/question": "{hashtag-expr:form,{group,question}}",
            "#case/type/prop": "{hashtag-expr:case,{type,prop}}",
        }, namespaces);
        runFailures({
            "#": null,
            "#case/type/prop[filter=filter]": null,
            "#/case/type/prop": null,
            "#whale/orca": null,
        }, namespaces);
    });

    it("parses generator hashtags", function () {
        let transDict = {
            '#form/question': '/data/question',
            '#form/group/question': '/data/group/question',
            '#case/question': "instance('casedb')/cases/case[@case_id = case_id]/question",
        },
            testCases = {
                "#form/question": "/data/question",
                "#form/group/question": "/data/group/question",
                "#form/question = #case/question": "/data/question = instance('casedb')/cases/case[@case_id = case_id]/question",
                "#form/question     =    #case/question": "/data/question = instance('casedb')/cases/case[@case_id = case_id]/question",
                "/data/filtered[@id = #form/question]": "/data/filtered[@id = /data/question]"
            };

        runGeneratorTests(testCases, transDict, ['form', 'case']);
    });

    it("parses hashtags with no xpath", function () {
        parser.hashtagConfig = makeXPathConfig(['form', 'case'], {});

        let testCases = {
            "#form/question1": "/data/question1",
        };
        for (let i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                let parsed = parser.parse(i);
                try {
                    parsed.toXPath();
                    fail("This should not be translatable");
                } catch (err) {
                }
            }
        }
    });

    it("parses from xpath to hashtag", function () {
        let translationDict = {
            '#form': '/data',
            '#form/question': '/data/question',
            '#form/question2': '/data/question2',
            '#form/group/question': '/data/group/question',
            '#case/question': "instance('casedb')/cases/case[@case_id = case_id]/question",
        };

        parser.hashtagConfig = makeXPathConfig(['form', 'case'], translationDict);

        let testcases: { [input: string]: string } = {
            "/data": "#form",
            "/data/question": "#form/question",
            "/data/question + /data/question2": "#form/question + #form/question2",
            "/data/question = instance('casedb')/cases/case[@case_id = case_id]/question": "#form/question = #case/question",
            "/data/filtered[/data/question = 1]": "/data/filtered[#form/question = 1]",
            "function   ( 5, 'arg', 4 * 12, /data/filtered[/data/question = 1])": "function(5, 'arg', 4 * 12, /data/filtered[#form/question = 1])",
            "bunch-o-nodes()[3][/data/question !='galore']": "bunch-o-nodes()[3][#form/question != 'galore']",
            "-some-function(/data/question)": "-some-function(#form/question)",
        };

        for (let i in testcases) {
            if (testcases.hasOwnProperty(i)) {
                let parsed = parser.parse(i);
                expect(parsed.toHashtag()).toEqual(testcases[i]);
            }
        }
    });
});
