Object.defineProperty(exports, "__esModule", { value: true });
var xpath_models_1 = require("./xpath-models");
var jison = require("./jison/xpath");
// assign the shared scope
jison.parser.yy = {
    xpathModels: xpath_models_1.XPathModels,
    parseError: xpath_models_1.XPathModels.parseError
};
var XPathParser = /** @class */ (function () {
    function XPathParser() {
    }
    XPathParser.prototype.parse = function (input) {
        return jison.parse(input);
    };
    return XPathParser;
}());
exports.default = XPathParser;
