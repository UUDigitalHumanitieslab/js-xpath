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

    let xpath: XPathParser;
    beforeEach(() => {
        xpath = new XPathParser();
    });

    function runCommon(testCases: { [input: string]: string }, validHashtagNamespaces: string[]) {
        xpath.hashtagConfig = makeXPathConfig(validHashtagNamespaces, {});
        for (var i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                try {
                    expect(xpath.parse(i).toString()).toEqual(testCases[i], "" + i + " parsed correctly.");
                } catch (err) {
                    fail("" + err + " for input: " + i);
                }
            }
        }
    }

    function runFailures(testCases: { [input: string]: new (...args: any[]) => Error }, validHashtagNamespaces: string[]) {
        function tmpFunc() {
            xpath.parse(i);
        }
        xpath.hashtagConfig = makeXPathConfig(validHashtagNamespaces, {});
        for (var i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                expect(tmpFunc).toThrowError(testCases[i], "" + i + " correctly failed to parse.");
            }
        }
    }

    function runGeneratorTests(testcases: { [input: string]: string }, translationDict: { [input: string]: string }, namespaces: string[]) {
        xpath.hashtagConfig = makeXPathConfig(namespaces, translationDict);
        for (var i in testcases) {
            if (testcases.hasOwnProperty(i)) {
                try {
                    let parsed = xpath.parse(i);
                    expect(parsed.toXPath()).toEqual(testcases[i], "" + i + " generated correctly.");
                    // It seems reasonable to expect that the generated xpath
                    // should parse back to the same object, although this may 
                    // not always hold true.
                    // TODO: expect(parsed.toString()).toEqual(xpath.parse(parsed.toHashtag()).toString(), "" + i + " produced same result when reparsed.");
                } catch (err) {
                    fail("" + err + " for input: " + i);
                }
            }
        }
    }

    xit("parses hashtags", function () {
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

    xit("parses generator hashtags", function () {
        var transDict = {
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
        xpath.hashtagConfig = makeXPathConfig(['form', 'case'], {});

        var testCases = {
            "#form/question1": "/data/question1",
        };
        for (let i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                let parsed = xpath.parse(i);
                try {
                    parsed.toXPath();
                    fail("This should not be translatable");
                } catch (err) {
                }
            }
        }
    });

    xit("parses from xpath to hashtag", function () {
        var translationDict = {
            '#form': '/data',
            '#form/question': '/data/question',
            '#form/question2': '/data/question2',
            '#form/group/question': '/data/group/question',
            '#case/question': "instance('casedb')/cases/case[@case_id = case_id]/question",
        };

        xpath.hashtagConfig = makeXPathConfig(['form', 'case'], translationDict);

        var testcases = {
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
                let parsed = xpath.parse(i);
                // TODO: expect(parsed.toHashtag()).toEqual(testcases[i]);
            }
        }
    });
});
