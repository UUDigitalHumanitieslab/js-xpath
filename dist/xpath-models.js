var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// based on https://github.com/dimagi/js-xpath/blob/master/src/models.js
var XPathModels;
(function (XPathModels) {
    XPathModels.isDebugging = false;
    function debugLog() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (XPathModels.isDebugging) {
            console.debug(args.join(', '));
        }
    }
    XPathModels.debugLog = debugLog;
    function validateAxisName(name) {
        return name in XPathAxisEnum;
    }
    XPathModels.validateAxisName = validateAxisName;
    var ParseError = /** @class */ (function () {
        function ParseError(message, hash) {
            this.message = message;
            this.hash = hash;
        }
        return ParseError;
    }());
    XPathModels.ParseError = ParseError;
    function parseError(str, hash) {
        throw new ParseError(str, hash);
    }
    XPathModels.parseError = parseError;
    var XPathInitialContextEnum;
    (function (XPathInitialContextEnum) {
        XPathInitialContextEnum["HASHTAG"] = "hashtag";
        XPathInitialContextEnum["ROOT"] = "abs";
        XPathInitialContextEnum["RELATIVE"] = "rel";
        XPathInitialContextEnum["EXPR"] = "expr";
    })(XPathInitialContextEnum = XPathModels.XPathInitialContextEnum || (XPathModels.XPathInitialContextEnum = {}));
    ;
    var XPathAxisEnum;
    (function (XPathAxisEnum) {
        XPathAxisEnum["CHILD"] = "child";
        XPathAxisEnum["DESCENDANT"] = "descendant";
        XPathAxisEnum["PARENT"] = "parent";
        XPathAxisEnum["ANCESTOR"] = "ancestor";
        XPathAxisEnum["FOLLOWING_SIBLING"] = "following-sibling";
        XPathAxisEnum["PRECEDING_SIBLING"] = "preceding-sibling";
        XPathAxisEnum["FOLLOWING"] = "following";
        XPathAxisEnum["PRECEDING"] = "preceding";
        XPathAxisEnum["ATTRIBUTE"] = "attribute";
        XPathAxisEnum["NAMESPACE"] = "namespace";
        XPathAxisEnum["SELF"] = "self";
        XPathAxisEnum["DESCENDANT_OR_SELF"] = "descendant-or-self";
        XPathAxisEnum["ANCESTOR_OR_SELF"] = "ancestor-or-self";
    })(XPathAxisEnum = XPathModels.XPathAxisEnum || (XPathModels.XPathAxisEnum = {}));
    ;
    var XPathTestEnum;
    (function (XPathTestEnum) {
        XPathTestEnum["NAME"] = "name";
        XPathTestEnum["NAME_WILDCARD"] = "*";
        XPathTestEnum["NAMESPACE_WILDCARD"] = ":*";
        XPathTestEnum["TYPE_NODE"] = "node()";
        XPathTestEnum["TYPE_TEXT"] = "text()";
        XPathTestEnum["TYPE_COMMENT"] = "comment()";
        XPathTestEnum["TYPE_PROCESSING_INSTRUCTION"] = "processing-instruction";
    })(XPathTestEnum = XPathModels.XPathTestEnum || (XPathModels.XPathTestEnum = {}));
    var XPathVariableReference = /** @class */ (function () {
        function XPathVariableReference(value) {
            this.value = value;
        }
        XPathVariableReference.prototype.toXPath = function () {
            return "" + this.value;
        };
        ;
        return XPathVariableReference;
    }());
    XPathModels.XPathVariableReference = XPathVariableReference;
    var XPathOperationBase = /** @class */ (function () {
        function XPathOperationBase() {
            this.type = 'operation';
        }
        return XPathOperationBase;
    }());
    XPathModels.XPathOperationBase = XPathOperationBase;
    var XPathOperator = /** @class */ (function (_super) {
        __extends(XPathOperator, _super);
        function XPathOperator(properties) {
            var _this = _super.call(this) || this;
            _this.properties = properties;
            _this.parens = false;
            _this.operationType = properties.type;
            return _this;
        }
        XPathOperator.prototype.getChildren = function () {
            return [this.properties.left, this.properties.right];
        };
        XPathOperator.prototype.toXPath = function () {
            var ret = this.properties.left.toXPath() + " " + this.expressionTypeEnumToXPathLiteral(this.operationType) + " " + this.properties.right.toXPath();
            if (this.parens === true) {
                return "(" + ret + ")";
            }
            return ret;
        };
        return XPathOperator;
    }(XPathOperationBase));
    XPathModels.XPathOperator = XPathOperator;
    var XPathBoolExpr = /** @class */ (function (_super) {
        __extends(XPathBoolExpr, _super);
        function XPathBoolExpr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XPathBoolExpr.prototype.expressionTypeEnumToXPathLiteral = function (type) {
            return type;
        };
        return XPathBoolExpr;
    }(XPathOperator));
    XPathModels.XPathBoolExpr = XPathBoolExpr;
    var XPathEqExpr = /** @class */ (function (_super) {
        __extends(XPathEqExpr, _super);
        function XPathEqExpr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XPathEqExpr.prototype.expressionTypeEnumToXPathLiteral = function (type) {
            return type == '==' ? '=' : '!=';
        };
        return XPathEqExpr;
    }(XPathOperator));
    XPathModels.XPathEqExpr = XPathEqExpr;
    var XPathCmpExpr = /** @class */ (function (_super) {
        __extends(XPathCmpExpr, _super);
        function XPathCmpExpr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XPathCmpExpr.prototype.expressionTypeEnumToXPathLiteral = function (type) {
            return type;
        };
        return XPathCmpExpr;
    }(XPathOperator));
    XPathModels.XPathCmpExpr = XPathCmpExpr;
    var XPathArithExpr = /** @class */ (function (_super) {
        __extends(XPathArithExpr, _super);
        function XPathArithExpr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XPathArithExpr.prototype.expressionTypeEnumToXPathLiteral = function (type) {
            switch (type) {
                case '%':
                    return 'mod';
                case '/':
                    return 'div';
                default:
                    return type;
            }
        };
        return XPathArithExpr;
    }(XPathOperator));
    XPathModels.XPathArithExpr = XPathArithExpr;
    var XPathUnionExpr = /** @class */ (function (_super) {
        __extends(XPathUnionExpr, _super);
        function XPathUnionExpr() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        XPathUnionExpr.prototype.expressionTypeEnumToXPathLiteral = function (type) {
            return '|';
        };
        return XPathUnionExpr;
    }(XPathOperator));
    XPathModels.XPathUnionExpr = XPathUnionExpr;
    var XPathNumNegExpr = /** @class */ (function (_super) {
        __extends(XPathNumNegExpr, _super);
        function XPathNumNegExpr(properties) {
            var _this = _super.call(this) || this;
            _this.properties = properties;
            _this.operationType = properties.type;
            return _this;
        }
        XPathNumNegExpr.prototype.getChildren = function () {
            return [this.properties.value];
        };
        XPathNumNegExpr.prototype.toXPath = function () {
            return "-" + this.properties.value;
        };
        return XPathNumNegExpr;
    }(XPathOperationBase));
    XPathModels.XPathNumNegExpr = XPathNumNegExpr;
    /**
     * Functional call expression.
     */
    var XPathFuncExpr = /** @class */ (function () {
        function XPathFuncExpr(properties) {
            this.properties = properties;
            this.type = 'function';
            this.args = properties.args || [];
        }
        XPathFuncExpr.prototype.getChildren = function () {
            return this.args;
        };
        XPathFuncExpr.prototype.toXPath = function () {
            return this.properties.id + "(" + this.args.map(function (arg) { return arg.toXPath(); }).join(", ") + ")";
        };
        return XPathFuncExpr;
    }());
    XPathModels.XPathFuncExpr = XPathFuncExpr;
    var XPathPathExpr = /** @class */ (function () {
        function XPathPathExpr(properties) {
            this.properties = properties;
            this.type = 'path';
            this.steps = properties.steps || [];
        }
        XPathPathExpr.prototype.getChildren = function () {
            return this.steps;
        };
        XPathPathExpr.prototype.toXPath = function () {
            var parts = this.steps.map(function (step) { return step.toXPath(); }), ret = [], curPart, prevPart = '', sep;
            var root = (this.properties.initialContext === XPathInitialContextEnum.ROOT) ? "/" : "";
            if (this.properties.filter) {
                parts.splice(0, 0, this.properties.filter.toXPath());
            }
            if (parts.length === 0) {
                return root;
            }
            for (var i = 0; i < parts.length; i++) {
                curPart = parts[i];
                if (curPart !== "//" && prevPart !== "//") {
                    // unless the current part starts with a slash, put slashes between
                    // parts. the only exception to this rule is at the beginning,
                    // when we only use a slash if it's an absolute path
                    sep = (i === 0) ? root : "/";
                    ret.push(sep);
                }
                ret.push(curPart);
                prevPart = curPart;
            }
            return ret.join("");
        };
        return XPathPathExpr;
    }());
    XPathModels.XPathPathExpr = XPathPathExpr;
    var XPathStep = /** @class */ (function () {
        function XPathStep(properties) {
            this.properties = properties;
            this.type = 'path-step';
            this.predicates = properties.predicates || [];
        }
        XPathStep.prototype.getChildren = function () {
            return this.predicates;
        };
        XPathStep.prototype.testString = function () {
            switch (this.properties.test) {
                case XPathTestEnum.NAME:
                    return String(this.properties.name);
                case XPathTestEnum.TYPE_PROCESSING_INSTRUCTION:
                    return "processing-instruction(" + (this.properties.literal || "") + ")";
                case XPathTestEnum.NAMESPACE_WILDCARD:
                    return this.properties.namespace + ":*";
                default:
                    return this.properties.test || null;
            }
        };
        ;
        XPathStep.prototype.mainXPath = function () {
            var axisPrefix = this.properties.axis + "::"; // this is the default
            // Use the abbreviated syntax to shorten the axis
            // or in some cases the whole thing
            switch (this.properties.axis) {
                case XPathAxisEnum.DESCENDANT_OR_SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return "//";
                    }
                    break;
                case XPathAxisEnum.CHILD:
                    axisPrefix = ""; // this is the default
                    break;
                case XPathAxisEnum.ATTRIBUTE:
                    axisPrefix = "@";
                    break;
                case XPathAxisEnum.SELF:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return ".";
                    }
                    break;
                case XPathAxisEnum.PARENT:
                    if (this.properties.test === XPathTestEnum.TYPE_NODE) {
                        return "..";
                    }
                    break;
                default:
                    break;
            }
            return axisPrefix + this.testString();
        };
        ;
        XPathStep.prototype.predicateXPath = function () {
            if (this.predicates.length > 0) {
                return "[" + this.predicates.map(function (p) { return p.toXPath(); }).join("][") + "]";
            }
            return "";
        };
        ;
        XPathStep.prototype.toXPath = function () {
            return this.mainXPath() + this.predicateXPath();
        };
        return XPathStep;
    }());
    XPathModels.XPathStep = XPathStep;
    var XPathFilterExpr = /** @class */ (function () {
        function XPathFilterExpr(properties) {
            this.properties = properties;
            this.type = 'filter';
            this.predicates = properties.predicates || [];
        }
        XPathFilterExpr.prototype.getChildren = function () {
            return this.predicates;
        };
        XPathFilterExpr.prototype.toXPath = function () {
            var predicates = "";
            if (this.predicates.length > 0) {
                predicates = "[" + this.predicates.map(function (p) { return p.toXPath(); }).join("][") + "]";
            }
            var expr = this.properties.expr.toXPath();
            // TODO: should all non-function expressions be parenthesized?
            if (!(this.properties.expr instanceof XPathFuncExpr)) {
                expr = "(" + expr + ")";
            }
            return expr + predicates;
        };
        return XPathFilterExpr;
    }());
    XPathModels.XPathFilterExpr = XPathFilterExpr;
    var XPathStringLiteral = /** @class */ (function () {
        function XPathStringLiteral(value, location) {
            this.location = location;
            this.type = 'string';
            this.stringDelimiter = value[0];
            this.value = value.substr(1, value.length - 2);
        }
        XPathStringLiteral.prototype.toXPath = function () {
            return "" + this.stringDelimiter + this.value + this.stringDelimiter;
        };
        return XPathStringLiteral;
    }());
    XPathModels.XPathStringLiteral = XPathStringLiteral;
    var XPathNumericLiteral = /** @class */ (function () {
        function XPathNumericLiteral(value, location) {
            this.value = value;
            this.location = location;
            this.type = 'numeric';
        }
        XPathNumericLiteral.prototype.toXPath = function () {
            // TODO: this will not convert properly in all cases
            return "" + this.value;
        };
        return XPathNumericLiteral;
    }());
    XPathModels.XPathNumericLiteral = XPathNumericLiteral;
    var ParseLocation = /** @class */ (function () {
        function ParseLocation(properties) {
            var current = properties[properties.length - 1];
            this.firstColumn = current.first_column;
            this.firstLine = current.first_line;
            this.lastColumn = current.last_column;
            this.lastLine = current.last_line;
        }
        return ParseLocation;
    }());
    XPathModels.ParseLocation = ParseLocation;
})(XPathModels = exports.XPathModels || (exports.XPathModels = {}));
