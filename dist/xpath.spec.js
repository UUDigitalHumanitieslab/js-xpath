Object.defineProperty(exports, "__esModule", { value: true });
var xpath_1 = require("./xpath");
describe("XPath Parser", function () {
    it("Works", function () {
        var parser = new xpath_1.default();
        var parsed = parser.parse("//node");
        expect(parsed).toBeTruthy();
        expect(parsed.toXPath()).toEqual("//node");
    });
});
