import { XPathParser, XPathModels } from './xpath';

describe('XPath Tokens', () => {
    let parser: XPathParser;

    beforeEach(() => {
        parser = new XPathParser();
    });

    function runCommon(testCases: { [input: string]: XPathModels.XPathToken["type"][] }) {
        for (let i in testCases) {
            if (testCases.hasOwnProperty(i)) {
                try {
                    // TODO: console.log(parser.parse(i).toTokens().map(t => `[${t.text}:${t.type}]`).join(''));
                    let types = parser.parse(i).toTokens().map(t => t.type).filter(t => t != "whitespace");
                    expect(types).toEqual(testCases[i], "" + i + " parsed correctly.")
                } catch (err) {
                    fail(err);
                    throw err;
                }
            }
        }
    };

    it("parses numbers", function () {
        runCommon({
            "10": ["numeric"],
            "123.": ["numeric"],
            "734.04": ["numeric"],
            "0.12345": ["numeric"],
            ".666": ["numeric"],
            "00000333.3330000": ["numeric"],
            "1230000000000000000000": ["numeric"],
            "1230000000000000000000.0": ["numeric"],
            "0.00000000000000000123": ["numeric"],
            "0": ["numeric"],
            "0.": ["numeric"],
            ".0": ["numeric"],
            "0.0": ["numeric"]
        });
    });

    it("parses strings", function () {
        runCommon({
            "\"\"": ["string.delimiter", "string.value", "string.delimiter"],
            "\"   \"": ["string.delimiter", "string.value", "string.delimiter"],
            "''": ["string.delimiter", "string.value", "string.delimiter"],
            "'\"'": ["string.delimiter", "string.value", "string.delimiter"],
            "\"'\"": ["string.delimiter", "string.value", "string.delimiter"],
            "'mary had a little lamb'": ["string.delimiter", "string.value", "string.delimiter"]
        });
    });


    it("parses variables", function () {
        runCommon({
            "$var": ["variable.sigil", "variable.value"],
            "$qualified:name": ["variable.sigil", "variable.value"],
        });
    });

    it("parses operators", function () {
        runCommon({
            "5 + 5": ["numeric", "operator", "numeric"],
            "-5": ["negation", "numeric"],
            "- 5": ["negation", "numeric"],
            "----5": ["negation", "negation", "negation", "negation", "numeric"],
            "6 * - 7": ["numeric", "operator", "negation", "numeric"],
            "0--0": ["numeric", "operator", "negation", "numeric"],
            "5 * 5": ["numeric", "operator", "numeric"],
            "5 div 5": ["numeric", "operator", "numeric"],
            "5 mod 5": ["numeric", "operator", "numeric"],
            "3mod4": ["numeric", "operator", "numeric"],
            "3 mod6": ["numeric", "operator", "numeric"],
            "3mod 7": ["numeric", "operator", "numeric"],
            "5 divseparate-token": ["numeric", "operator", "node.name"],
            "5 = 5": ["numeric", "operator", "numeric"],
            "5 != 5": ["numeric", "operator", "numeric"],
            "5 < 5": ["numeric", "operator", "numeric"],
            "5 <= 5": ["numeric", "operator", "numeric"],
            "5 > 5": ["numeric", "operator", "numeric"],
            "5 >= 5": ["numeric", "operator", "numeric"],
            "5 and 5": ["numeric", "operator", "numeric"],
            "5 or 5": ["numeric", "operator", "numeric"],
            "5 | 5": ["numeric", "operator", "numeric"],
        });
    });

    it("parses function calls", function () {
        runCommon({
            "function()": ["function.name", "paren.left", "paren.right"],
            "func:tion()": ["function.name", "paren.left", "paren.right"],
            "function(   )": ["function.name", "paren.left", "paren.right"],
            "function (5)": ["function.name", "paren.left", "numeric", "paren.right"],
            "function   ( 5, 'arg', 4 * 12)": ["function.name", "paren.left", "numeric", "function.separator", "string.delimiter", "string.value", "string.delimiter", "function.separator", "numeric", "operator", "numeric", "paren.right"],
            "4andfunc()": ["numeric", "operator", "function.name", "paren.left", "paren.right"],
        });
    });

    it("parses function calls that are actually node tests", function () {
        runCommon({
            "node()": ["path"],
            "text()": ["path"],
            "comment()": ["path"],
            "processing-instruction()": ["function.name", "paren.left", "paren.right"],
            "processing-instruction('asdf')": ["function.name", "paren.left", "string.delimiter", "string.value", "string.delimiter", "paren.right"],
        });
    });

    it("parses filter expressions", function () {
        runCommon({
            "bunch-o-nodes()[3]": ["function.name", "paren.left", "paren.right", "bracket.left", "numeric", "bracket.right"],
            "bunch-o-nodes()[3]['predicates'!='galore']": ["function.name", "paren.left", "paren.right", "bracket.left", "numeric", "bracket.right",
                "bracket.left", "string.delimiter", "string.value", "string.delimiter", "operator", "string.delimiter", "string.value", "string.delimiter", "bracket.right"],
            "(bunch-o-nodes)[3]": ["paren.left", "node.name", "paren.right", "bracket.left", "numeric", "bracket.right"],
            "bunch-o-nodes[3]": ["node.name", "bracket.left", "numeric", "bracket.right"],
        });
    });

    it("parses path steps", function () {
        runCommon({
            ".": ["path"],
            "..": ["path"],
        });
    });

    it("parses name tests", function () {
        runCommon({
            "name": ["node.name"],
            "qual:name": ["node.name"],
            "_rea--ll:y.funk..y_N4M3": ["node.name"],
            "namespace:*": ["namespace", "path"],
            "*": ["path"],
            "*****": ["path", "operator", "path", "operator", "path"],
        });
    });

    it("parses axes", function () {
        runCommon({
            // abbreviated to *
            "child::*": ["path"],
            "parent::*": ["path", "operator", "path"],
            "descendant::*": ["path", "operator", "path"],
            "ancestor::*": ["path", "operator", "path"],
            "following-sibling::*": ["path", "operator", "path"],
            "preceding-sibling::*": ["path", "operator", "path"],
            "following::*": ["path", "operator", "path"],
            "preceding::*": ["path", "operator", "path"],
            // abbreviated to @*
            "attribute::*": ["attribute.sigil", "path"],
            "namespace::*": ["path", "operator", "path"],
            "self::*": ["path", "operator", "path"],
            "descendant-or-self::*": ["path", "operator", "path"],
            "ancestor-or-self::*": ["path", "operator", "path"],
            "@attr": ["attribute.sigil", "node.name"],
            "@*": ["attribute.sigil", "path"],
            "@ns:*": ["attribute.sigil", "namespace", "path"]
        });
    });

    it("parses predicates", function () {
        runCommon({
            "descendant::node()[@attr='blah'][4]": [
                "path",
                "operator",
                "path",
                "bracket.left",
                "attribute.sigil",
                "node.name",
                "operator",
                "string.delimiter",
                "string.value",
                "string.delimiter",
                "bracket.right",
                "bracket.left",
                "numeric",
                "bracket.right"],
        });
    });

    it("parses paths", function () {
        runCommon({
            "rel/ative/path": ["node.name", "path", "node.name", "path", "node.name",],
            "/abs/olute/path['etc']": ["path", "node.name", "path", "node.name", "path", "node.name", "bracket.left", "string.delimiter", "string.value", "string.delimiter", "bracket.right"],
            "filter()/expr/path": ["function.name", "paren.left", "paren.right", "path", "node.name", "path", "node.name"],
            "fil()['ter']/expr/path": ["function.name", "paren.left", "paren.right", "bracket.left", "string.delimiter", "string.value", "string.delimiter", "bracket.right", "path", "node.name", "path", "node.name"],
            "(another-filter)/expr/path": ["paren.left", "node.name", "paren.right", "path", "node.name", "path", "node.name"],
            "/": ["path"],
            "//all": ["path", "node.name"],
            "a/.//../z": ["node.name", "path", "path", "path", "path", "path", "node.name"],
            "6andpath": ["numeric", "operator", "node.name"]
        });
    });

    it("parses paths containing functions", function () {
        runCommon({
            '//node[4 > node[@rel="--" and @pt="let"]/number(@begin)]': ['path',
                'node.name',
                'bracket.left',
                'numeric',
                'operator',
                'node.name',
                'bracket.left',
                'attribute.sigil',
                'node.name',
                'operator',
                'string.delimiter',
                'string.value',
                'string.delimiter',
                'operator',
                'attribute.sigil',
                'node.name',
                'operator',
                'string.delimiter',
                'string.value',
                'string.delimiter',
                'bracket.right',
                'path',
                'function.name',
                'paren.left',
                'attribute.sigil',
                'node.name',
                'paren.right',
                'bracket.right']
        });
    })

    // TODO: just one more to go!
    // it("parses real world examples", function () {
    //     runCommon({
    //         "/foo/bar = 2.0": "{binop-expr:==,{path-expr:abs,{{step:child,foo},{step:child,bar}}},{num:2}}",
    //         "/patient/sex = 'male' and /patient/age > 15": "{binop-expr:and,{binop-expr:==,{path-expr:abs,{{step:child,patient},{step:child,sex}}},{str:'male'}},{binop-expr:>,{path-expr:abs,{{step:child,patient},{step:child,age}}},{num:15}}}",
    //         "../jr:hist-data/labs[@type=\"cd4\"]": "{path-expr:rel,{{step:parent,node()},{step:child,jr:hist-data},{step:child,labs,{{binop-expr:==,{path-expr:rel,{{step:attribute,type}}},{str:\"cd4\"}}}}}}",
    //         "function_call(26*(7+3), //*, /im/child::an/ancestor::x[3][true()]/path)": "{func-expr:function_call,{{binop-expr:*,{num:26},{binop-expr:+,{num:7},{num:3}}},{path-expr:abs,{{step:descendant-or-self,node()},{step:child,*}}},{path-expr:abs,{{step:child,im},{step:child,an},{step:ancestor,x,{{num:3},{func-expr:true,{}}}},{step:child,path}}}}}"
    //     });
    // });
});
