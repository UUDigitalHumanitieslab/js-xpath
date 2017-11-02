(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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
var bignumber_js_1 = __webpack_require__(3);
var XPathModels;
(function (XPathModels) {
    XPathModels.DefaultHashtagConfig = {
        isValidNamespace: function (namespace) {
            return false;
        },
        hashtagToXPath: function (hashtagExpr) {
            throw new Error("This should be overridden");
        },
        toHashtag: function (xpath) {
            return xpath.toXPath();
        }
    };
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
    function testAxisName(name) {
        for (var key in XPathAxisEnum) {
            if (name == XPathAxisEnum[key]) {
                return name;
            }
        }
        throw name + " is not a valid axis name!";
    }
    XPathModels.testAxisName = testAxisName;
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
        XPathVariableReference.prototype.toString = function () {
            return "{var:" + String(this.value) + "}";
        };
        XPathVariableReference.prototype.toHashtag = function () {
            return this.toXPath();
        };
        XPathVariableReference.prototype.toXPath = function () {
            return "$" + this.value;
        };
        return XPathVariableReference;
    }());
    XPathModels.XPathVariableReference = XPathVariableReference;
    var XPathOperationBase = /** @class */ (function () {
        function XPathOperationBase() {
            this.type = 'operation';
        }
        XPathOperationBase.prototype.toHashtag = function () {
            return XPathModels.CurrentHashtagConfig.toHashtag(this);
        };
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
        XPathOperator.prototype.print = function (formatter) {
            var ret = formatter(this.properties.left) + " " + this.expressionTypeEnumToXPathLiteral(this.operationType) + " " + formatter(this.properties.right);
            if (this.parens === true) {
                return "(" + ret + ")";
            }
            return ret;
        };
        XPathOperator.prototype.getChildren = function () {
            return [this.properties.left, this.properties.right];
        };
        XPathOperator.prototype.toHashtag = function () {
            return this.print(function (expr) { return expr.toHashtag(); });
        };
        XPathOperator.prototype.toString = function () {
            return "{binop-expr:" + this.properties.type + "," + String(this.properties.left) + "," + String(this.properties.right) + "}";
        };
        XPathOperator.prototype.toXPath = function () {
            return this.print(function (expr) { return expr.toXPath(); });
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
        XPathNumNegExpr.prototype.toString = function () {
            return "{unop-expr:" + this.properties.type + "," + String(this.properties.value) + "}";
        };
        XPathNumNegExpr.prototype.toHashtag = function () {
            return "-" + this.properties.value.toHashtag();
        };
        XPathNumNegExpr.prototype.toXPath = function () {
            return "-" + this.properties.value.toXPath();
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
        XPathFuncExpr.prototype.combine = function (mapper) {
            return this.properties.id + "(" + this.args.map(mapper).join(", ") + ")";
        };
        XPathFuncExpr.prototype.getChildren = function () {
            return this.args;
        };
        XPathFuncExpr.prototype.toString = function () {
            return "{func-expr:" + this.properties.id + ",{" + this.properties.args.join(',') + "}}";
        };
        XPathFuncExpr.prototype.toHashtag = function () {
            return XPathModels.CurrentHashtagConfig.toHashtag(this) || this.combine(function (part) { return part.toHashtag(); });
        };
        XPathFuncExpr.prototype.toXPath = function () {
            return this.combine(function (part) { return part.toXPath(); });
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
        XPathPathExpr.prototype.combine = function (partMap) {
            var parts = this.steps.map(partMap), ret = [], curPart, prevPart = '', sep;
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
        XPathPathExpr.prototype.toString = function () {
            return "{path-expr:" + (this.properties.initialContext === XPathInitialContextEnum.EXPR
                ? String(this.properties.filter)
                : this.properties.initialContext) + ",{" + this.steps.join(',') + "}}";
        };
        XPathPathExpr.prototype.toHashtag = function () {
            return XPathModels.CurrentHashtagConfig.toHashtag(this) || this.combine(function (part) { return part.toHashtag(); });
        };
        XPathPathExpr.prototype.toXPath = function () {
            return this.combine(function (step) { return step.toXPath(); });
        };
        XPathPathExpr.prototype.pathWithoutPredicates = function () {
            return this.combine(function (step) { return step.mainXPath(); });
        };
        return XPathPathExpr;
    }());
    XPathModels.XPathPathExpr = XPathPathExpr;
    var XPathStep = /** @class */ (function () {
        function XPathStep(properties) {
            this.properties = properties;
            this.type = 'path-step';
            if (!properties.axis) {
                throw 'No axis specified';
            }
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
        XPathStep.prototype.predicateXPath = function (mapper) {
            if (this.predicates.length > 0) {
                return "[" + this.predicates.map(mapper).join("][") + "]";
            }
            return "";
        };
        XPathStep.prototype.combine = function (mapper) {
            return this.mainXPath() + this.predicateXPath(mapper);
        };
        XPathStep.prototype.toHashtag = function () {
            return XPathModels.CurrentHashtagConfig.toHashtag(this) || this.combine(function (part) { return part.toHashtag(); });
        };
        XPathStep.prototype.toXPath = function () {
            return this.combine(function (part) { return part.toXPath(); });
        };
        XPathStep.prototype.toString = function () {
            var stringArray = [];
            stringArray.push("{step:");
            stringArray.push(String(this.properties.axis));
            stringArray.push(",");
            stringArray.push(this.testString());
            if (this.predicates.length > 0) {
                stringArray.push(",{");
                stringArray.push(this.predicates.join(","));
                stringArray.push("}");
            }
            stringArray.push("}");
            return stringArray.join("");
        };
        ;
        return XPathStep;
    }());
    XPathModels.XPathStep = XPathStep;
    var XPathFilterExpr = /** @class */ (function () {
        function XPathFilterExpr(properties) {
            this.properties = properties;
            this.type = 'filter';
            this.predicates = properties.predicates || [];
        }
        XPathFilterExpr.prototype.combine = function (mapper) {
            var predicates = "";
            if (this.predicates.length > 0) {
                predicates = "[" + this.predicates.map(mapper).join("][") + "]";
            }
            var expr = this.properties.expr.toXPath();
            if (!(this.properties.expr instanceof XPathFuncExpr)) {
                expr = "(" + expr + ")";
            }
            return expr + predicates;
        };
        XPathFilterExpr.prototype.getChildren = function () {
            return this.predicates;
        };
        XPathFilterExpr.prototype.toString = function () {
            return "{filt-expr:" + this.properties.expr.toString() + ",{" + this.predicates.join(',') + "}}";
        };
        XPathFilterExpr.prototype.toHashtag = function () {
            return XPathModels.CurrentHashtagConfig.toHashtag(this) || this.combine(function (part) { return part.toHashtag(); });
        };
        XPathFilterExpr.prototype.toXPath = function () {
            return this.combine(function (part) { return part.toXPath(); });
        };
        return XPathFilterExpr;
    }());
    XPathModels.XPathFilterExpr = XPathFilterExpr;
    var XPathHashtagExpression = /** @class */ (function () {
        function XPathHashtagExpression(definition) {
            if (!XPathModels.CurrentHashtagConfig.isValidNamespace(definition.namespace)) {
                throw new Error(definition.namespace + " is not a valid # expression");
            }
            this.initialContext = definition.initialContext;
            this.namespace = definition.namespace;
            this.steps = definition.steps || [];
        }
        XPathHashtagExpression.prototype.toString = function () {
            return "{hashtag-expr:" + this.namespace + ",{" + this.steps.join(",") + "}}";
        };
        XPathHashtagExpression.prototype.toXPath = function () {
            return XPathModels.CurrentHashtagConfig.hashtagToXPath(this.toHashtag()) || "";
        };
        XPathHashtagExpression.prototype.toHashtag = function () {
            var parts = [this.namespace].concat(this.steps.map(function (step) { return step.toString(); })), ret = [];
            for (var i = 0; i < parts.length; i++) {
                // hashtag to start then /
                ret.push((i === 0) ? '#' : "/");
                ret.push(parts[i]);
            }
            return ret.join("");
        };
        return XPathHashtagExpression;
    }());
    XPathModels.XPathHashtagExpression = XPathHashtagExpression;
    var XPathStringLiteral = /** @class */ (function () {
        function XPathStringLiteral(value, location) {
            this.location = location;
            this.type = 'string';
            this.stringDelimiter = value[0];
            this.value = value.substr(1, value.length - 2);
        }
        Object.defineProperty(XPathStringLiteral.prototype, "valueDisplay", {
            get: function () {
                return "" + this.stringDelimiter + this.value + this.stringDelimiter;
            },
            enumerable: true,
            configurable: true
        });
        XPathStringLiteral.prototype.toString = function () {
            return "{str:" + this.valueDisplay + "}";
        };
        XPathStringLiteral.prototype.toHashtag = function () {
            return this.valueDisplay;
        };
        XPathStringLiteral.prototype.toXPath = function () {
            return this.valueDisplay;
        };
        return XPathStringLiteral;
    }());
    XPathModels.XPathStringLiteral = XPathStringLiteral;
    var XPathNumericLiteral = /** @class */ (function () {
        /**
         * @param value the string representation of the number as found in the XPATH
         */
        function XPathNumericLiteral(value, location) {
            this.location = location;
            this.type = 'numeric';
            this.value = new bignumber_js_1.BigNumber(value);
        }
        XPathNumericLiteral.prototype.toString = function () {
            return "{num:" + this.value.toString() + "}";
        };
        XPathNumericLiteral.prototype.toHashtag = function () {
            return this.toXPath();
        };
        XPathNumericLiteral.prototype.toXPath = function () {
            return this.value.toFixed();
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var xpath_models_1 = __webpack_require__(0);
var jison = __webpack_require__(4);
__export(__webpack_require__(0));
// assign the shared scope
jison.parser.yy = {
    xpathModels: xpath_models_1.XPathModels,
    parseError: xpath_models_1.XPathModels.parseError
};
/**
 * Class for parsing an XPath string.
 */
var XPathParser = /** @class */ (function () {
    function XPathParser(hashtagConfig) {
        if (hashtagConfig === void 0) { hashtagConfig = xpath_models_1.XPathModels.DefaultHashtagConfig; }
        this.hashtagConfig = hashtagConfig;
    }
    /**
     * Parse an XPath string and returns a parse tree or throw a parse exception.
     * @param input XPath string to parse
     * @exception @see {XPathModels.ParseError}
     */
    XPathParser.prototype.parse = function (input) {
        xpath_models_1.XPathModels.CurrentHashtagConfig = this.hashtagConfig;
        return jison.parse(input);
    };
    return XPathParser;
}());
exports.XPathParser = XPathParser;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! bignumber.js v4.1.0 https://github.com/MikeMcl/bignumber.js/LICENCE */

;(function (globalObj) {
    'use strict';

    /*
      bignumber.js v4.1.0
      A JavaScript library for arbitrary-precision arithmetic.
      https://github.com/MikeMcl/bignumber.js
      Copyright (c) 2017 Michael Mclaughlin <M8ch88l@gmail.com>
      MIT Expat Licence
    */


    var BigNumber,
        isNumeric = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i,
        mathceil = Math.ceil,
        mathfloor = Math.floor,
        notBool = ' not a boolean or binary digit',
        roundingMode = 'rounding mode',
        tooManyDigits = 'number type has more than 15 significant digits',
        ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_',
        BASE = 1e14,
        LOG_BASE = 14,
        MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
        // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
        POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
        SQRT_BASE = 1e7,

        /*
         * The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
         * the arguments to toExponential, toFixed, toFormat, and toPrecision, beyond which an
         * exception is thrown (if ERRORS is true).
         */
        MAX = 1E9;                                   // 0 to MAX_INT32


    /*
     * Create and return a BigNumber constructor.
     */
    function constructorFactory(config) {
        var div, parseNumeric,

            // id tracks the caller function, so its name can be included in error messages.
            id = 0,
            P = BigNumber.prototype,
            ONE = new BigNumber(1),


            /********************************* EDITABLE DEFAULTS **********************************/


            /*
             * The default values below must be integers within the inclusive ranges stated.
             * The values can also be changed at run-time using BigNumber.config.
             */

            // The maximum number of decimal places for operations involving division.
            DECIMAL_PLACES = 20,                     // 0 to MAX

            /*
             * The rounding mode used when rounding to the above decimal places, and when using
             * toExponential, toFixed, toFormat and toPrecision, and round (default value).
             * UP         0 Away from zero.
             * DOWN       1 Towards zero.
             * CEIL       2 Towards +Infinity.
             * FLOOR      3 Towards -Infinity.
             * HALF_UP    4 Towards nearest neighbour. If equidistant, up.
             * HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
             * HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
             * HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
             * HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
             */
            ROUNDING_MODE = 4,                       // 0 to 8

            // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

            // The exponent value at and beneath which toString returns exponential notation.
            // Number type: -7
            TO_EXP_NEG = -7,                         // 0 to -MAX

            // The exponent value at and above which toString returns exponential notation.
            // Number type: 21
            TO_EXP_POS = 21,                         // 0 to MAX

            // RANGE : [MIN_EXP, MAX_EXP]

            // The minimum exponent value, beneath which underflow to zero occurs.
            // Number type: -324  (5e-324)
            MIN_EXP = -1e7,                          // -1 to -MAX

            // The maximum exponent value, above which overflow to Infinity occurs.
            // Number type:  308  (1.7976931348623157e+308)
            // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
            MAX_EXP = 1e7,                           // 1 to MAX

            // Whether BigNumber Errors are ever thrown.
            ERRORS = true,                           // true or false

            // Change to intValidatorNoErrors if ERRORS is false.
            isValidInt = intValidatorWithErrors,     // intValidatorWithErrors/intValidatorNoErrors

            // Whether to use cryptographically-secure random number generation, if available.
            CRYPTO = false,                          // true or false

            /*
             * The modulo mode used when calculating the modulus: a mod n.
             * The quotient (q = a / n) is calculated according to the corresponding rounding mode.
             * The remainder (r) is calculated as: r = a - n * q.
             *
             * UP        0 The remainder is positive if the dividend is negative, else is negative.
             * DOWN      1 The remainder has the same sign as the dividend.
             *             This modulo mode is commonly known as 'truncated division' and is
             *             equivalent to (a % n) in JavaScript.
             * FLOOR     3 The remainder has the same sign as the divisor (Python %).
             * HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
             * EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
             *             The remainder is always positive.
             *
             * The truncated division, floored division, Euclidian division and IEEE 754 remainder
             * modes are commonly used for the modulus operation.
             * Although the other rounding modes can also be used, they may not give useful results.
             */
            MODULO_MODE = 1,                         // 0 to 9

            // The maximum number of significant digits of the result of the toPower operation.
            // If POW_PRECISION is 0, there will be unlimited significant digits.
            POW_PRECISION = 0,                       // 0 to MAX

            // The format specification used by the BigNumber.prototype.toFormat method.
            FORMAT = {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
                secondaryGroupSize: 0,
                fractionGroupSeparator: '\xA0',      // non-breaking space
                fractionGroupSize: 0
            };


        /******************************************************************************************/


        // CONSTRUCTOR


        /*
         * The BigNumber constructor and exported function.
         * Create and return a new instance of a BigNumber object.
         *
         * n {number|string|BigNumber} A numeric value.
         * [b] {number} The base of n. Integer, 2 to 64 inclusive.
         */
        function BigNumber( n, b ) {
            var c, e, i, num, len, str,
                x = this;

            // Enable constructor usage without new.
            if ( !( x instanceof BigNumber ) ) {

                // 'BigNumber() constructor call without new: {n}'
                if (ERRORS) raise( 26, 'constructor call without new', n );
                return new BigNumber( n, b );
            }

            // 'new BigNumber() base not an integer: {b}'
            // 'new BigNumber() base out of range: {b}'
            if ( b == null || !isValidInt( b, 2, 64, id, 'base' ) ) {

                // Duplicate.
                if ( n instanceof BigNumber ) {
                    x.s = n.s;
                    x.e = n.e;
                    x.c = ( n = n.c ) ? n.slice() : n;
                    id = 0;
                    return;
                }

                if ( ( num = typeof n == 'number' ) && n * 0 == 0 ) {
                    x.s = 1 / n < 0 ? ( n = -n, -1 ) : 1;

                    // Fast path for integers.
                    if ( n === ~~n ) {
                        for ( e = 0, i = n; i >= 10; i /= 10, e++ );
                        x.e = e;
                        x.c = [n];
                        id = 0;
                        return;
                    }

                    str = n + '';
                } else {
                    if ( !isNumeric.test( str = n + '' ) ) return parseNumeric( x, str, num );
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }
            } else {
                b = b | 0;
                str = n + '';

                // Ensure return value is rounded to DECIMAL_PLACES as with other bases.
                // Allow exponential notation to be used with base 10 argument.
                if ( b == 10 ) {
                    x = new BigNumber( n instanceof BigNumber ? n : str );
                    return round( x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE );
                }

                // Avoid potential interpretation of Infinity and NaN as base 44+ values.
                // Any number in exponential form will fail due to the [Ee][+-].
                if ( ( num = typeof n == 'number' ) && n * 0 != 0 ||
                  !( new RegExp( '^-?' + ( c = '[' + ALPHABET.slice( 0, b ) + ']+' ) +
                    '(?:\\.' + c + ')?$',b < 37 ? 'i' : '' ) ).test(str) ) {
                    return parseNumeric( x, str, num, b );
                }

                if (num) {
                    x.s = 1 / n < 0 ? ( str = str.slice(1), -1 ) : 1;

                    if ( ERRORS && str.replace( /^0\.0*|\./, '' ).length > 15 ) {

                        // 'new BigNumber() number type has more than 15 significant digits: {n}'
                        raise( id, tooManyDigits, n );
                    }

                    // Prevent later check for length on converted number.
                    num = false;
                } else {
                    x.s = str.charCodeAt(0) === 45 ? ( str = str.slice(1), -1 ) : 1;
                }

                str = convertBase( str, 10, b, x.s );
            }

            // Decimal point?
            if ( ( e = str.indexOf('.') ) > -1 ) str = str.replace( '.', '' );

            // Exponential form?
            if ( ( i = str.search( /e/i ) ) > 0 ) {

                // Determine exponent.
                if ( e < 0 ) e = i;
                e += +str.slice( i + 1 );
                str = str.substring( 0, i );
            } else if ( e < 0 ) {

                // Integer.
                e = str.length;
            }

            // Determine leading zeros.
            for ( i = 0; str.charCodeAt(i) === 48; i++ );

            // Determine trailing zeros.
            for ( len = str.length; str.charCodeAt(--len) === 48; );
            str = str.slice( i, len + 1 );

            if (str) {
                len = str.length;

                // Disallow numbers with over 15 significant digits if number type.
                // 'new BigNumber() number type has more than 15 significant digits: {n}'
                if ( num && ERRORS && len > 15 && ( n > MAX_SAFE_INTEGER || n !== mathfloor(n) ) ) {
                    raise( id, tooManyDigits, x.s * n );
                }

                e = e - i - 1;

                 // Overflow?
                if ( e > MAX_EXP ) {

                    // Infinity.
                    x.c = x.e = null;

                // Underflow?
                } else if ( e < MIN_EXP ) {

                    // Zero.
                    x.c = [ x.e = 0 ];
                } else {
                    x.e = e;
                    x.c = [];

                    // Transform base

                    // e is the base 10 exponent.
                    // i is where to slice str to get the first element of the coefficient array.
                    i = ( e + 1 ) % LOG_BASE;
                    if ( e < 0 ) i += LOG_BASE;

                    if ( i < len ) {
                        if (i) x.c.push( +str.slice( 0, i ) );

                        for ( len -= LOG_BASE; i < len; ) {
                            x.c.push( +str.slice( i, i += LOG_BASE ) );
                        }

                        str = str.slice(i);
                        i = LOG_BASE - str.length;
                    } else {
                        i -= len;
                    }

                    for ( ; i--; str += '0' );
                    x.c.push( +str );
                }
            } else {

                // Zero.
                x.c = [ x.e = 0 ];
            }

            id = 0;
        }


        // CONSTRUCTOR PROPERTIES


        BigNumber.another = constructorFactory;

        BigNumber.ROUND_UP = 0;
        BigNumber.ROUND_DOWN = 1;
        BigNumber.ROUND_CEIL = 2;
        BigNumber.ROUND_FLOOR = 3;
        BigNumber.ROUND_HALF_UP = 4;
        BigNumber.ROUND_HALF_DOWN = 5;
        BigNumber.ROUND_HALF_EVEN = 6;
        BigNumber.ROUND_HALF_CEIL = 7;
        BigNumber.ROUND_HALF_FLOOR = 8;
        BigNumber.EUCLID = 9;


        /*
         * Configure infrequently-changing library-wide settings.
         *
         * Accept an object or an argument list, with one or many of the following properties or
         * parameters respectively:
         *
         *   DECIMAL_PLACES  {number}  Integer, 0 to MAX inclusive
         *   ROUNDING_MODE   {number}  Integer, 0 to 8 inclusive
         *   EXPONENTIAL_AT  {number|number[]}  Integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to 0 incl., 0 to MAX incl.]
         *   RANGE           {number|number[]}  Non-zero integer, -MAX to MAX inclusive or
         *                                      [integer -MAX to -1 incl., integer 1 to MAX incl.]
         *   ERRORS          {boolean|number}   true, false, 1 or 0
         *   CRYPTO          {boolean|number}   true, false, 1 or 0
         *   MODULO_MODE     {number}           0 to 9 inclusive
         *   POW_PRECISION   {number}           0 to MAX inclusive
         *   FORMAT          {object}           See BigNumber.prototype.toFormat
         *      decimalSeparator       {string}
         *      groupSeparator         {string}
         *      groupSize              {number}
         *      secondaryGroupSize     {number}
         *      fractionGroupSeparator {string}
         *      fractionGroupSize      {number}
         *
         * (The values assigned to the above FORMAT object properties are not checked for validity.)
         *
         * E.g.
         * BigNumber.config(20, 4) is equivalent to
         * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
         *
         * Ignore properties/parameters set to null or undefined.
         * Return an object with the properties current values.
         */
        BigNumber.config = BigNumber.set = function () {
            var v, p,
                i = 0,
                r = {},
                a = arguments,
                o = a[0],
                has = o && typeof o == 'object'
                  ? function () { if ( o.hasOwnProperty(p) ) return ( v = o[p] ) != null; }
                  : function () { if ( a.length > i ) return ( v = a[i++] ) != null; };

            // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
            // 'config() DECIMAL_PLACES not an integer: {v}'
            // 'config() DECIMAL_PLACES out of range: {v}'
            if ( has( p = 'DECIMAL_PLACES' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                DECIMAL_PLACES = v | 0;
            }
            r[p] = DECIMAL_PLACES;

            // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
            // 'config() ROUNDING_MODE not an integer: {v}'
            // 'config() ROUNDING_MODE out of range: {v}'
            if ( has( p = 'ROUNDING_MODE' ) && isValidInt( v, 0, 8, 2, p ) ) {
                ROUNDING_MODE = v | 0;
            }
            r[p] = ROUNDING_MODE;

            // EXPONENTIAL_AT {number|number[]}
            // Integer, -MAX to MAX inclusive or [integer -MAX to 0 inclusive, 0 to MAX inclusive].
            // 'config() EXPONENTIAL_AT not an integer: {v}'
            // 'config() EXPONENTIAL_AT out of range: {v}'
            if ( has( p = 'EXPONENTIAL_AT' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, 0, 2, p ) && isValidInt( v[1], 0, MAX, 2, p ) ) {
                        TO_EXP_NEG = v[0] | 0;
                        TO_EXP_POS = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    TO_EXP_NEG = -( TO_EXP_POS = ( v < 0 ? -v : v ) | 0 );
                }
            }
            r[p] = [ TO_EXP_NEG, TO_EXP_POS ];

            // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
            // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
            // 'config() RANGE not an integer: {v}'
            // 'config() RANGE cannot be zero: {v}'
            // 'config() RANGE out of range: {v}'
            if ( has( p = 'RANGE' ) ) {

                if ( isArray(v) ) {
                    if ( isValidInt( v[0], -MAX, -1, 2, p ) && isValidInt( v[1], 1, MAX, 2, p ) ) {
                        MIN_EXP = v[0] | 0;
                        MAX_EXP = v[1] | 0;
                    }
                } else if ( isValidInt( v, -MAX, MAX, 2, p ) ) {
                    if ( v | 0 ) MIN_EXP = -( MAX_EXP = ( v < 0 ? -v : v ) | 0 );
                    else if (ERRORS) raise( 2, p + ' cannot be zero', v );
                }
            }
            r[p] = [ MIN_EXP, MAX_EXP ];

            // ERRORS {boolean|number} true, false, 1 or 0.
            // 'config() ERRORS not a boolean or binary digit: {v}'
            if ( has( p = 'ERRORS' ) ) {

                if ( v === !!v || v === 1 || v === 0 ) {
                    id = 0;
                    isValidInt = ( ERRORS = !!v ) ? intValidatorWithErrors : intValidatorNoErrors;
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = ERRORS;

            // CRYPTO {boolean|number} true, false, 1 or 0.
            // 'config() CRYPTO not a boolean or binary digit: {v}'
            // 'config() crypto unavailable: {crypto}'
            if ( has( p = 'CRYPTO' ) ) {

                if ( v === true || v === false || v === 1 || v === 0 ) {
                    if (v) {
                        v = typeof crypto == 'undefined';
                        if ( !v && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                            CRYPTO = true;
                        } else if (ERRORS) {
                            raise( 2, 'crypto unavailable', v ? void 0 : crypto );
                        } else {
                            CRYPTO = false;
                        }
                    } else {
                        CRYPTO = false;
                    }
                } else if (ERRORS) {
                    raise( 2, p + notBool, v );
                }
            }
            r[p] = CRYPTO;

            // MODULO_MODE {number} Integer, 0 to 9 inclusive.
            // 'config() MODULO_MODE not an integer: {v}'
            // 'config() MODULO_MODE out of range: {v}'
            if ( has( p = 'MODULO_MODE' ) && isValidInt( v, 0, 9, 2, p ) ) {
                MODULO_MODE = v | 0;
            }
            r[p] = MODULO_MODE;

            // POW_PRECISION {number} Integer, 0 to MAX inclusive.
            // 'config() POW_PRECISION not an integer: {v}'
            // 'config() POW_PRECISION out of range: {v}'
            if ( has( p = 'POW_PRECISION' ) && isValidInt( v, 0, MAX, 2, p ) ) {
                POW_PRECISION = v | 0;
            }
            r[p] = POW_PRECISION;

            // FORMAT {object}
            // 'config() FORMAT not an object: {v}'
            if ( has( p = 'FORMAT' ) ) {

                if ( typeof v == 'object' ) {
                    FORMAT = v;
                } else if (ERRORS) {
                    raise( 2, p + ' not an object', v );
                }
            }
            r[p] = FORMAT;

            return r;
        };


        /*
         * Return a new BigNumber whose value is the maximum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.max = function () { return maxOrMin( arguments, P.lt ); };


        /*
         * Return a new BigNumber whose value is the minimum of the arguments.
         *
         * arguments {number|string|BigNumber}
         */
        BigNumber.min = function () { return maxOrMin( arguments, P.gt ); };


        /*
         * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
         * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
         * zeros are produced).
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         *
         * 'random() decimal places not an integer: {dp}'
         * 'random() decimal places out of range: {dp}'
         * 'random() crypto unavailable: {crypto}'
         */
        BigNumber.random = (function () {
            var pow2_53 = 0x20000000000000;

            // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
            // Check if Math.random() produces more than 32 bits of randomness.
            // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
            // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
            var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
              ? function () { return mathfloor( Math.random() * pow2_53 ); }
              : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
                  (Math.random() * 0x800000 | 0); };

            return function (dp) {
                var a, b, e, k, v,
                    i = 0,
                    c = [],
                    rand = new BigNumber(ONE);

                dp = dp == null || !isValidInt( dp, 0, MAX, 14 ) ? DECIMAL_PLACES : dp | 0;
                k = mathceil( dp / LOG_BASE );

                if (CRYPTO) {

                    // Browsers supporting crypto.getRandomValues.
                    if (crypto.getRandomValues) {

                        a = crypto.getRandomValues( new Uint32Array( k *= 2 ) );

                        for ( ; i < k; ) {

                            // 53 bits:
                            // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
                            // 11111 11111111 11111111 11111111 11100000 00000000 00000000
                            // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
                            //                                     11111 11111111 11111111
                            // 0x20000 is 2^21.
                            v = a[i] * 0x20000 + (a[i + 1] >>> 11);

                            // Rejection sampling:
                            // 0 <= v < 9007199254740992
                            // Probability that v >= 9e15, is
                            // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
                            if ( v >= 9e15 ) {
                                b = crypto.getRandomValues( new Uint32Array(2) );
                                a[i] = b[0];
                                a[i + 1] = b[1];
                            } else {

                                // 0 <= v <= 8999999999999999
                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 2;
                            }
                        }
                        i = k / 2;

                    // Node.js supporting crypto.randomBytes.
                    } else if (crypto.randomBytes) {

                        // buffer
                        a = crypto.randomBytes( k *= 7 );

                        for ( ; i < k; ) {

                            // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
                            // 0x100000000 is 2^32, 0x1000000 is 2^24
                            // 11111 11111111 11111111 11111111 11111111 11111111 11111111
                            // 0 <= v < 9007199254740992
                            v = ( ( a[i] & 31 ) * 0x1000000000000 ) + ( a[i + 1] * 0x10000000000 ) +
                                  ( a[i + 2] * 0x100000000 ) + ( a[i + 3] * 0x1000000 ) +
                                  ( a[i + 4] << 16 ) + ( a[i + 5] << 8 ) + a[i + 6];

                            if ( v >= 9e15 ) {
                                crypto.randomBytes(7).copy( a, i );
                            } else {

                                // 0 <= (v % 1e14) <= 99999999999999
                                c.push( v % 1e14 );
                                i += 7;
                            }
                        }
                        i = k / 7;
                    } else {
                        CRYPTO = false;
                        if (ERRORS) raise( 14, 'crypto unavailable', crypto );
                    }
                }

                // Use Math.random.
                if (!CRYPTO) {

                    for ( ; i < k; ) {
                        v = random53bitInt();
                        if ( v < 9e15 ) c[i++] = v % 1e14;
                    }
                }

                k = c[--i];
                dp %= LOG_BASE;

                // Convert trailing digits to zeros according to dp.
                if ( k && dp ) {
                    v = POWS_TEN[LOG_BASE - dp];
                    c[i] = mathfloor( k / v ) * v;
                }

                // Remove trailing elements which are zero.
                for ( ; c[i] === 0; c.pop(), i-- );

                // Zero?
                if ( i < 0 ) {
                    c = [ e = 0 ];
                } else {

                    // Remove leading elements which are zero and adjust exponent accordingly.
                    for ( e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

                    // Count the digits of the first element of c to determine leading zeros, and...
                    for ( i = 1, v = c[0]; v >= 10; v /= 10, i++);

                    // adjust the exponent accordingly.
                    if ( i < LOG_BASE ) e -= LOG_BASE - i;
                }

                rand.e = e;
                rand.c = c;
                return rand;
            };
        })();


        // PRIVATE FUNCTIONS


        // Convert a numeric string of baseIn to a numeric string of baseOut.
        function convertBase( str, baseOut, baseIn, sign ) {
            var d, e, k, r, x, xc, y,
                i = str.indexOf( '.' ),
                dp = DECIMAL_PLACES,
                rm = ROUNDING_MODE;

            if ( baseIn < 37 ) str = str.toLowerCase();

            // Non-integer.
            if ( i >= 0 ) {
                k = POW_PRECISION;

                // Unlimited precision.
                POW_PRECISION = 0;
                str = str.replace( '.', '' );
                y = new BigNumber(baseIn);
                x = y.pow( str.length - i );
                POW_PRECISION = k;

                // Convert str as if an integer, then restore the fraction part by dividing the
                // result by its base raised to a power.
                y.c = toBaseOut( toFixedPoint( coeffToString( x.c ), x.e ), 10, baseOut );
                y.e = y.c.length;
            }

            // Convert the number as integer.
            xc = toBaseOut( str, baseIn, baseOut );
            e = k = xc.length;

            // Remove trailing zeros.
            for ( ; xc[--k] == 0; xc.pop() );
            if ( !xc[0] ) return '0';

            if ( i < 0 ) {
                --e;
            } else {
                x.c = xc;
                x.e = e;

                // sign is needed for correct rounding.
                x.s = sign;
                x = div( x, y, dp, rm, baseOut );
                xc = x.c;
                r = x.r;
                e = x.e;
            }

            d = e + dp + 1;

            // The rounding digit, i.e. the digit to the right of the digit that may be rounded up.
            i = xc[d];
            k = baseOut / 2;
            r = r || d < 0 || xc[d + 1] != null;

            r = rm < 4 ? ( i != null || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                       : i > k || i == k &&( rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
                         rm == ( x.s < 0 ? 8 : 7 ) );

            if ( d < 1 || !xc[0] ) {

                // 1^-dp or 0.
                str = r ? toFixedPoint( '1', -dp ) : '0';
            } else {
                xc.length = d;

                if (r) {

                    // Rounding up may mean the previous digit has to be rounded up and so on.
                    for ( --baseOut; ++xc[--d] > baseOut; ) {
                        xc[d] = 0;

                        if ( !d ) {
                            ++e;
                            xc = [1].concat(xc);
                        }
                    }
                }

                // Determine trailing zeros.
                for ( k = xc.length; !xc[--k]; );

                // E.g. [4, 11, 15] becomes 4bf.
                for ( i = 0, str = ''; i <= k; str += ALPHABET.charAt( xc[i++] ) );
                str = toFixedPoint( str, e );
            }

            // The caller will add the sign.
            return str;
        }


        // Perform division in the specified base. Called by div and convertBase.
        div = (function () {

            // Assume non-zero x and k.
            function multiply( x, k, base ) {
                var m, temp, xlo, xhi,
                    carry = 0,
                    i = x.length,
                    klo = k % SQRT_BASE,
                    khi = k / SQRT_BASE | 0;

                for ( x = x.slice(); i--; ) {
                    xlo = x[i] % SQRT_BASE;
                    xhi = x[i] / SQRT_BASE | 0;
                    m = khi * xlo + xhi * klo;
                    temp = klo * xlo + ( ( m % SQRT_BASE ) * SQRT_BASE ) + carry;
                    carry = ( temp / base | 0 ) + ( m / SQRT_BASE | 0 ) + khi * xhi;
                    x[i] = temp % base;
                }

                if (carry) x = [carry].concat(x);

                return x;
            }

            function compare( a, b, aL, bL ) {
                var i, cmp;

                if ( aL != bL ) {
                    cmp = aL > bL ? 1 : -1;
                } else {

                    for ( i = cmp = 0; i < aL; i++ ) {

                        if ( a[i] != b[i] ) {
                            cmp = a[i] > b[i] ? 1 : -1;
                            break;
                        }
                    }
                }
                return cmp;
            }

            function subtract( a, b, aL, base ) {
                var i = 0;

                // Subtract b from a.
                for ( ; aL--; ) {
                    a[aL] -= i;
                    i = a[aL] < b[aL] ? 1 : 0;
                    a[aL] = i * base + a[aL] - b[aL];
                }

                // Remove leading zeros.
                for ( ; !a[0] && a.length > 1; a.splice(0, 1) );
            }

            // x: dividend, y: divisor.
            return function ( x, y, dp, rm, base ) {
                var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
                    yL, yz,
                    s = x.s == y.s ? 1 : -1,
                    xc = x.c,
                    yc = y.c;

                // Either NaN, Infinity or 0?
                if ( !xc || !xc[0] || !yc || !yc[0] ) {

                    return new BigNumber(

                      // Return NaN if either NaN, or both Infinity or 0.
                      !x.s || !y.s || ( xc ? yc && xc[0] == yc[0] : !yc ) ? NaN :

                        // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
                        xc && xc[0] == 0 || !yc ? s * 0 : s / 0
                    );
                }

                q = new BigNumber(s);
                qc = q.c = [];
                e = x.e - y.e;
                s = dp + e + 1;

                if ( !base ) {
                    base = BASE;
                    e = bitFloor( x.e / LOG_BASE ) - bitFloor( y.e / LOG_BASE );
                    s = s / LOG_BASE | 0;
                }

                // Result exponent may be one less then the current value of e.
                // The coefficients of the BigNumbers from convertBase may have trailing zeros.
                for ( i = 0; yc[i] == ( xc[i] || 0 ); i++ );
                if ( yc[i] > ( xc[i] || 0 ) ) e--;

                if ( s < 0 ) {
                    qc.push(1);
                    more = true;
                } else {
                    xL = xc.length;
                    yL = yc.length;
                    i = 0;
                    s += 2;

                    // Normalise xc and yc so highest order digit of yc is >= base / 2.

                    n = mathfloor( base / ( yc[0] + 1 ) );

                    // Not necessary, but to handle odd bases where yc[0] == ( base / 2 ) - 1.
                    // if ( n > 1 || n++ == 1 && yc[0] < base / 2 ) {
                    if ( n > 1 ) {
                        yc = multiply( yc, n, base );
                        xc = multiply( xc, n, base );
                        yL = yc.length;
                        xL = xc.length;
                    }

                    xi = yL;
                    rem = xc.slice( 0, yL );
                    remL = rem.length;

                    // Add zeros to make remainder as long as divisor.
                    for ( ; remL < yL; rem[remL++] = 0 );
                    yz = yc.slice();
                    yz = [0].concat(yz);
                    yc0 = yc[0];
                    if ( yc[1] >= base / 2 ) yc0++;
                    // Not necessary, but to prevent trial digit n > base, when using base 3.
                    // else if ( base == 3 && yc0 == 1 ) yc0 = 1 + 1e-15;

                    do {
                        n = 0;

                        // Compare divisor and remainder.
                        cmp = compare( yc, rem, yL, remL );

                        // If divisor < remainder.
                        if ( cmp < 0 ) {

                            // Calculate trial digit, n.

                            rem0 = rem[0];
                            if ( yL != remL ) rem0 = rem0 * base + ( rem[1] || 0 );

                            // n is how many times the divisor goes into the current remainder.
                            n = mathfloor( rem0 / yc0 );

                            //  Algorithm:
                            //  1. product = divisor * trial digit (n)
                            //  2. if product > remainder: product -= divisor, n--
                            //  3. remainder -= product
                            //  4. if product was < remainder at 2:
                            //    5. compare new remainder and divisor
                            //    6. If remainder > divisor: remainder -= divisor, n++

                            if ( n > 1 ) {

                                // n may be > base only when base is 3.
                                if (n >= base) n = base - 1;

                                // product = divisor * trial digit.
                                prod = multiply( yc, n, base );
                                prodL = prod.length;
                                remL = rem.length;

                                // Compare product and remainder.
                                // If product > remainder.
                                // Trial digit n too high.
                                // n is 1 too high about 5% of the time, and is not known to have
                                // ever been more than 1 too high.
                                while ( compare( prod, rem, prodL, remL ) == 1 ) {
                                    n--;

                                    // Subtract divisor from product.
                                    subtract( prod, yL < prodL ? yz : yc, prodL, base );
                                    prodL = prod.length;
                                    cmp = 1;
                                }
                            } else {

                                // n is 0 or 1, cmp is -1.
                                // If n is 0, there is no need to compare yc and rem again below,
                                // so change cmp to 1 to avoid it.
                                // If n is 1, leave cmp as -1, so yc and rem are compared again.
                                if ( n == 0 ) {

                                    // divisor < remainder, so n must be at least 1.
                                    cmp = n = 1;
                                }

                                // product = divisor
                                prod = yc.slice();
                                prodL = prod.length;
                            }

                            if ( prodL < remL ) prod = [0].concat(prod);

                            // Subtract product from remainder.
                            subtract( rem, prod, remL, base );
                            remL = rem.length;

                             // If product was < remainder.
                            if ( cmp == -1 ) {

                                // Compare divisor and new remainder.
                                // If divisor < new remainder, subtract divisor from remainder.
                                // Trial digit n too low.
                                // n is 1 too low about 5% of the time, and very rarely 2 too low.
                                while ( compare( yc, rem, yL, remL ) < 1 ) {
                                    n++;

                                    // Subtract divisor from remainder.
                                    subtract( rem, yL < remL ? yz : yc, remL, base );
                                    remL = rem.length;
                                }
                            }
                        } else if ( cmp === 0 ) {
                            n++;
                            rem = [0];
                        } // else cmp === 1 and n will be 0

                        // Add the next digit, n, to the result array.
                        qc[i++] = n;

                        // Update the remainder.
                        if ( rem[0] ) {
                            rem[remL++] = xc[xi] || 0;
                        } else {
                            rem = [ xc[xi] ];
                            remL = 1;
                        }
                    } while ( ( xi++ < xL || rem[0] != null ) && s-- );

                    more = rem[0] != null;

                    // Leading zero?
                    if ( !qc[0] ) qc.splice(0, 1);
                }

                if ( base == BASE ) {

                    // To calculate q.e, first get the number of digits of qc[0].
                    for ( i = 1, s = qc[0]; s >= 10; s /= 10, i++ );
                    round( q, dp + ( q.e = i + e * LOG_BASE - 1 ) + 1, rm, more );

                // Caller is convertBase.
                } else {
                    q.e = e;
                    q.r = +more;
                }

                return q;
            };
        })();


        /*
         * Return a string representing the value of BigNumber n in fixed-point or exponential
         * notation rounded to the specified decimal places or significant digits.
         *
         * n is a BigNumber.
         * i is the index of the last digit required (i.e. the digit that may be rounded up).
         * rm is the rounding mode.
         * caller is caller id: toExponential 19, toFixed 20, toFormat 21, toPrecision 24.
         */
        function format( n, i, rm, caller ) {
            var c0, e, ne, len, str;

            rm = rm != null && isValidInt( rm, 0, 8, caller, roundingMode )
              ? rm | 0 : ROUNDING_MODE;

            if ( !n.c ) return n.toString();
            c0 = n.c[0];
            ne = n.e;

            if ( i == null ) {
                str = coeffToString( n.c );
                str = caller == 19 || caller == 24 && ne <= TO_EXP_NEG
                  ? toExponential( str, ne )
                  : toFixedPoint( str, ne );
            } else {
                n = round( new BigNumber(n), i, rm );

                // n.e may have changed if the value was rounded up.
                e = n.e;

                str = coeffToString( n.c );
                len = str.length;

                // toPrecision returns exponential notation if the number of significant digits
                // specified is less than the number of digits necessary to represent the integer
                // part of the value in fixed-point notation.

                // Exponential notation.
                if ( caller == 19 || caller == 24 && ( i <= e || e <= TO_EXP_NEG ) ) {

                    // Append zeros?
                    for ( ; len < i; str += '0', len++ );
                    str = toExponential( str, e );

                // Fixed-point notation.
                } else {
                    i -= ne;
                    str = toFixedPoint( str, e );

                    // Append zeros?
                    if ( e + 1 > len ) {
                        if ( --i > 0 ) for ( str += '.'; i--; str += '0' );
                    } else {
                        i += e - len;
                        if ( i > 0 ) {
                            if ( e + 1 == len ) str += '.';
                            for ( ; i--; str += '0' );
                        }
                    }
                }
            }

            return n.s < 0 && c0 ? '-' + str : str;
        }


        // Handle BigNumber.max and BigNumber.min.
        function maxOrMin( args, method ) {
            var m, n,
                i = 0;

            if ( isArray( args[0] ) ) args = args[0];
            m = new BigNumber( args[0] );

            for ( ; ++i < args.length; ) {
                n = new BigNumber( args[i] );

                // If any number is NaN, return NaN.
                if ( !n.s ) {
                    m = n;
                    break;
                } else if ( method.call( m, n ) ) {
                    m = n;
                }
            }

            return m;
        }


        /*
         * Return true if n is an integer in range, otherwise throw.
         * Use for argument validation when ERRORS is true.
         */
        function intValidatorWithErrors( n, min, max, caller, name ) {
            if ( n < min || n > max || n != truncate(n) ) {
                raise( caller, ( name || 'decimal places' ) +
                  ( n < min || n > max ? ' out of range' : ' not an integer' ), n );
            }

            return true;
        }


        /*
         * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
         * Called by minus, plus and times.
         */
        function normalise( n, c, e ) {
            var i = 1,
                j = c.length;

             // Remove trailing zeros.
            for ( ; !c[--j]; c.pop() );

            // Calculate the base 10 exponent. First get the number of digits of c[0].
            for ( j = c[0]; j >= 10; j /= 10, i++ );

            // Overflow?
            if ( ( e = i + e * LOG_BASE - 1 ) > MAX_EXP ) {

                // Infinity.
                n.c = n.e = null;

            // Underflow?
            } else if ( e < MIN_EXP ) {

                // Zero.
                n.c = [ n.e = 0 ];
            } else {
                n.e = e;
                n.c = c;
            }

            return n;
        }


        // Handle values that fail the validity test in BigNumber.
        parseNumeric = (function () {
            var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                dotAfter = /^([^.]+)\.$/,
                dotBefore = /^\.([^.]+)$/,
                isInfinityOrNaN = /^-?(Infinity|NaN)$/,
                whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

            return function ( x, str, num, b ) {
                var base,
                    s = num ? str : str.replace( whitespaceOrPlus, '' );

                // No exception on ±Infinity or NaN.
                if ( isInfinityOrNaN.test(s) ) {
                    x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
                } else {
                    if ( !num ) {

                        // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
                        s = s.replace( basePrefix, function ( m, p1, p2 ) {
                            base = ( p2 = p2.toLowerCase() ) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
                            return !b || b == base ? p1 : m;
                        });

                        if (b) {
                            base = b;

                            // E.g. '1.' to '1', '.1' to '0.1'
                            s = s.replace( dotAfter, '$1' ).replace( dotBefore, '0.$1' );
                        }

                        if ( str != s ) return new BigNumber( s, base );
                    }

                    // 'new BigNumber() not a number: {n}'
                    // 'new BigNumber() not a base {b} number: {n}'
                    if (ERRORS) raise( id, 'not a' + ( b ? ' base ' + b : '' ) + ' number', str );
                    x.s = null;
                }

                x.c = x.e = null;
                id = 0;
            }
        })();


        // Throw a BigNumber Error.
        function raise( caller, msg, val ) {
            var error = new Error( [
                'new BigNumber',     // 0
                'cmp',               // 1
                'config',            // 2
                'div',               // 3
                'divToInt',          // 4
                'eq',                // 5
                'gt',                // 6
                'gte',               // 7
                'lt',                // 8
                'lte',               // 9
                'minus',             // 10
                'mod',               // 11
                'plus',              // 12
                'precision',         // 13
                'random',            // 14
                'round',             // 15
                'shift',             // 16
                'times',             // 17
                'toDigits',          // 18
                'toExponential',     // 19
                'toFixed',           // 20
                'toFormat',          // 21
                'toFraction',        // 22
                'pow',               // 23
                'toPrecision',       // 24
                'toString',          // 25
                'BigNumber'          // 26
            ][caller] + '() ' + msg + ': ' + val );

            error.name = 'BigNumber Error';
            id = 0;
            throw error;
        }


        /*
         * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
         * If r is truthy, it is known that there are more digits after the rounding digit.
         */
        function round( x, sd, rm, r ) {
            var d, i, j, k, n, ni, rd,
                xc = x.c,
                pows10 = POWS_TEN;

            // if x is not Infinity or NaN...
            if (xc) {

                // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
                // n is a base 1e14 number, the value of the element of array x.c containing rd.
                // ni is the index of n within x.c.
                // d is the number of digits of n.
                // i is the index of rd within n including leading zeros.
                // j is the actual index of rd within n (if < 0, rd is a leading zero).
                out: {

                    // Get the number of digits of the first element of xc.
                    for ( d = 1, k = xc[0]; k >= 10; k /= 10, d++ );
                    i = sd - d;

                    // If the rounding digit is in the first element of xc...
                    if ( i < 0 ) {
                        i += LOG_BASE;
                        j = sd;
                        n = xc[ ni = 0 ];

                        // Get the rounding digit at index j of n.
                        rd = n / pows10[ d - j - 1 ] % 10 | 0;
                    } else {
                        ni = mathceil( ( i + 1 ) / LOG_BASE );

                        if ( ni >= xc.length ) {

                            if (r) {

                                // Needed by sqrt.
                                for ( ; xc.length <= ni; xc.push(0) );
                                n = rd = 0;
                                d = 1;
                                i %= LOG_BASE;
                                j = i - LOG_BASE + 1;
                            } else {
                                break out;
                            }
                        } else {
                            n = k = xc[ni];

                            // Get the number of digits of n.
                            for ( d = 1; k >= 10; k /= 10, d++ );

                            // Get the index of rd within n.
                            i %= LOG_BASE;

                            // Get the index of rd within n, adjusted for leading zeros.
                            // The number of leading zeros of n is given by LOG_BASE - d.
                            j = i - LOG_BASE + d;

                            // Get the rounding digit at index j of n.
                            rd = j < 0 ? 0 : n / pows10[ d - j - 1 ] % 10 | 0;
                        }
                    }

                    r = r || sd < 0 ||

                    // Are there any non-zero digits after the rounding digit?
                    // The expression  n % pows10[ d - j - 1 ]  returns all digits of n to the right
                    // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
                      xc[ni + 1] != null || ( j < 0 ? n : n % pows10[ d - j - 1 ] );

                    r = rm < 4
                      ? ( rd || r ) && ( rm == 0 || rm == ( x.s < 0 ? 3 : 2 ) )
                      : rd > 5 || rd == 5 && ( rm == 4 || r || rm == 6 &&

                        // Check whether the digit to the left of the rounding digit is odd.
                        ( ( i > 0 ? j > 0 ? n / pows10[ d - j ] : 0 : xc[ni - 1] ) % 10 ) & 1 ||
                          rm == ( x.s < 0 ? 8 : 7 ) );

                    if ( sd < 1 || !xc[0] ) {
                        xc.length = 0;

                        if (r) {

                            // Convert sd to decimal places.
                            sd -= x.e + 1;

                            // 1, 0.1, 0.01, 0.001, 0.0001 etc.
                            xc[0] = pows10[ ( LOG_BASE - sd % LOG_BASE ) % LOG_BASE ];
                            x.e = -sd || 0;
                        } else {

                            // Zero.
                            xc[0] = x.e = 0;
                        }

                        return x;
                    }

                    // Remove excess digits.
                    if ( i == 0 ) {
                        xc.length = ni;
                        k = 1;
                        ni--;
                    } else {
                        xc.length = ni + 1;
                        k = pows10[ LOG_BASE - i ];

                        // E.g. 56700 becomes 56000 if 7 is the rounding digit.
                        // j > 0 means i > number of leading zeros of n.
                        xc[ni] = j > 0 ? mathfloor( n / pows10[ d - j ] % pows10[j] ) * k : 0;
                    }

                    // Round up?
                    if (r) {

                        for ( ; ; ) {

                            // If the digit to be rounded up is in the first element of xc...
                            if ( ni == 0 ) {

                                // i will be the length of xc[0] before k is added.
                                for ( i = 1, j = xc[0]; j >= 10; j /= 10, i++ );
                                j = xc[0] += k;
                                for ( k = 1; j >= 10; j /= 10, k++ );

                                // if i != k the length has increased.
                                if ( i != k ) {
                                    x.e++;
                                    if ( xc[0] == BASE ) xc[0] = 1;
                                }

                                break;
                            } else {
                                xc[ni] += k;
                                if ( xc[ni] != BASE ) break;
                                xc[ni--] = 0;
                                k = 1;
                            }
                        }
                    }

                    // Remove trailing zeros.
                    for ( i = xc.length; xc[--i] === 0; xc.pop() );
                }

                // Overflow? Infinity.
                if ( x.e > MAX_EXP ) {
                    x.c = x.e = null;

                // Underflow? Zero.
                } else if ( x.e < MIN_EXP ) {
                    x.c = [ x.e = 0 ];
                }
            }

            return x;
        }


        // PROTOTYPE/INSTANCE METHODS


        /*
         * Return a new BigNumber whose value is the absolute value of this BigNumber.
         */
        P.absoluteValue = P.abs = function () {
            var x = new BigNumber(this);
            if ( x.s < 0 ) x.s = 1;
            return x;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of Infinity.
         */
        P.ceil = function () {
            return round( new BigNumber(this), this.e + 1, 2 );
        };


        /*
         * Return
         * 1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
         * 0 if they have the same value,
         * or null if the value of either is NaN.
         */
        P.comparedTo = P.cmp = function ( y, b ) {
            id = 1;
            return compare( this, new BigNumber( y, b ) );
        };


        /*
         * Return the number of decimal places of the value of this BigNumber, or null if the value
         * of this BigNumber is ±Infinity or NaN.
         */
        P.decimalPlaces = P.dp = function () {
            var n, v,
                c = this.c;

            if ( !c ) return null;
            n = ( ( v = c.length - 1 ) - bitFloor( this.e / LOG_BASE ) ) * LOG_BASE;

            // Subtract the number of trailing zeros of the last number.
            if ( v = c[v] ) for ( ; v % 10 == 0; v /= 10, n-- );
            if ( n < 0 ) n = 0;

            return n;
        };


        /*
         *  n / 0 = I
         *  n / N = N
         *  n / I = 0
         *  0 / n = 0
         *  0 / 0 = N
         *  0 / N = N
         *  0 / I = 0
         *  N / n = N
         *  N / 0 = N
         *  N / N = N
         *  N / I = N
         *  I / n = I
         *  I / 0 = I
         *  I / N = N
         *  I / I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
         * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.dividedBy = P.div = function ( y, b ) {
            id = 3;
            return div( this, new BigNumber( y, b ), DECIMAL_PLACES, ROUNDING_MODE );
        };


        /*
         * Return a new BigNumber whose value is the integer part of dividing the value of this
         * BigNumber by the value of BigNumber(y, b).
         */
        P.dividedToIntegerBy = P.divToInt = function ( y, b ) {
            id = 4;
            return div( this, new BigNumber( y, b ), 0, 1 );
        };


        /*
         * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.equals = P.eq = function ( y, b ) {
            id = 5;
            return compare( this, new BigNumber( y, b ) ) === 0;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a whole
         * number in the direction of -Infinity.
         */
        P.floor = function () {
            return round( new BigNumber(this), this.e + 1, 3 );
        };


        /*
         * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.greaterThan = P.gt = function ( y, b ) {
            id = 6;
            return compare( this, new BigNumber( y, b ) ) > 0;
        };


        /*
         * Return true if the value of this BigNumber is greater than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.greaterThanOrEqualTo = P.gte = function ( y, b ) {
            id = 7;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === 1 || b === 0;

        };


        /*
         * Return true if the value of this BigNumber is a finite number, otherwise returns false.
         */
        P.isFinite = function () {
            return !!this.c;
        };


        /*
         * Return true if the value of this BigNumber is an integer, otherwise return false.
         */
        P.isInteger = P.isInt = function () {
            return !!this.c && bitFloor( this.e / LOG_BASE ) > this.c.length - 2;
        };


        /*
         * Return true if the value of this BigNumber is NaN, otherwise returns false.
         */
        P.isNaN = function () {
            return !this.s;
        };


        /*
         * Return true if the value of this BigNumber is negative, otherwise returns false.
         */
        P.isNegative = P.isNeg = function () {
            return this.s < 0;
        };


        /*
         * Return true if the value of this BigNumber is 0 or -0, otherwise returns false.
         */
        P.isZero = function () {
            return !!this.c && this.c[0] == 0;
        };


        /*
         * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
         * otherwise returns false.
         */
        P.lessThan = P.lt = function ( y, b ) {
            id = 8;
            return compare( this, new BigNumber( y, b ) ) < 0;
        };


        /*
         * Return true if the value of this BigNumber is less than or equal to the value of
         * BigNumber(y, b), otherwise returns false.
         */
        P.lessThanOrEqualTo = P.lte = function ( y, b ) {
            id = 9;
            return ( b = compare( this, new BigNumber( y, b ) ) ) === -1 || b === 0;
        };


        /*
         *  n - 0 = n
         *  n - N = N
         *  n - I = -I
         *  0 - n = -n
         *  0 - 0 = 0
         *  0 - N = N
         *  0 - I = -I
         *  N - n = N
         *  N - 0 = N
         *  N - N = N
         *  N - I = N
         *  I - n = I
         *  I - 0 = I
         *  I - N = N
         *  I - I = N
         *
         * Return a new BigNumber whose value is the value of this BigNumber minus the value of
         * BigNumber(y, b).
         */
        P.minus = P.sub = function ( y, b ) {
            var i, j, t, xLTy,
                x = this,
                a = x.s;

            id = 10;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
            if ( a != b ) {
                y.s = -b;
                return x.plus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Either Infinity?
                if ( !xc || !yc ) return xc ? ( y.s = -b, y ) : new BigNumber( yc ? x : NaN );

                // Either zero?
                if ( !xc[0] || !yc[0] ) {

                    // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                    return yc[0] ? ( y.s = -b, y ) : new BigNumber( xc[0] ? x :

                      // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
                      ROUNDING_MODE == 3 ? -0 : 0 );
                }
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Determine which is the bigger number.
            if ( a = xe - ye ) {

                if ( xLTy = a < 0 ) {
                    a = -a;
                    t = xc;
                } else {
                    ye = xe;
                    t = yc;
                }

                t.reverse();

                // Prepend zeros to equalise exponents.
                for ( b = a; b--; t.push(0) );
                t.reverse();
            } else {

                // Exponents equal. Check digit by digit.
                j = ( xLTy = ( a = xc.length ) < ( b = yc.length ) ) ? a : b;

                for ( a = b = 0; b < j; b++ ) {

                    if ( xc[b] != yc[b] ) {
                        xLTy = xc[b] < yc[b];
                        break;
                    }
                }
            }

            // x < y? Point xc to the array of the bigger number.
            if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

            b = ( j = yc.length ) - ( i = xc.length );

            // Append zeros to xc if shorter.
            // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
            if ( b > 0 ) for ( ; b--; xc[i++] = 0 );
            b = BASE - 1;

            // Subtract yc from xc.
            for ( ; j > a; ) {

                if ( xc[--j] < yc[j] ) {
                    for ( i = j; i && !xc[--i]; xc[i] = b );
                    --xc[i];
                    xc[j] += BASE;
                }

                xc[j] -= yc[j];
            }

            // Remove leading zeros and adjust exponent accordingly.
            for ( ; xc[0] == 0; xc.splice(0, 1), --ye );

            // Zero?
            if ( !xc[0] ) {

                // Following IEEE 754 (2008) 6.3,
                // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
                y.s = ROUNDING_MODE == 3 ? -1 : 1;
                y.c = [ y.e = 0 ];
                return y;
            }

            // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
            // for finite x and y.
            return normalise( y, xc, ye );
        };


        /*
         *   n % 0 =  N
         *   n % N =  N
         *   n % I =  n
         *   0 % n =  0
         *  -0 % n = -0
         *   0 % 0 =  N
         *   0 % N =  N
         *   0 % I =  0
         *   N % n =  N
         *   N % 0 =  N
         *   N % N =  N
         *   N % I =  N
         *   I % n =  N
         *   I % 0 =  N
         *   I % N =  N
         *   I % I =  N
         *
         * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
         * BigNumber(y, b). The result depends on the value of MODULO_MODE.
         */
        P.modulo = P.mod = function ( y, b ) {
            var q, s,
                x = this;

            id = 11;
            y = new BigNumber( y, b );

            // Return NaN if x is Infinity or NaN, or y is NaN or zero.
            if ( !x.c || !y.s || y.c && !y.c[0] ) {
                return new BigNumber(NaN);

            // Return x if y is Infinity or x is zero.
            } else if ( !y.c || x.c && !x.c[0] ) {
                return new BigNumber(x);
            }

            if ( MODULO_MODE == 9 ) {

                // Euclidian division: q = sign(y) * floor(x / abs(y))
                // r = x - qy    where  0 <= r < abs(y)
                s = y.s;
                y.s = 1;
                q = div( x, y, 0, 3 );
                y.s = s;
                q.s *= s;
            } else {
                q = div( x, y, 0, MODULO_MODE );
            }

            return x.minus( q.times(y) );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber negated,
         * i.e. multiplied by -1.
         */
        P.negated = P.neg = function () {
            var x = new BigNumber(this);
            x.s = -x.s || null;
            return x;
        };


        /*
         *  n + 0 = n
         *  n + N = N
         *  n + I = I
         *  0 + n = n
         *  0 + 0 = 0
         *  0 + N = N
         *  0 + I = I
         *  N + n = N
         *  N + 0 = N
         *  N + N = N
         *  N + I = N
         *  I + n = I
         *  I + 0 = I
         *  I + N = N
         *  I + I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber plus the value of
         * BigNumber(y, b).
         */
        P.plus = P.add = function ( y, b ) {
            var t,
                x = this,
                a = x.s;

            id = 12;
            y = new BigNumber( y, b );
            b = y.s;

            // Either NaN?
            if ( !a || !b ) return new BigNumber(NaN);

            // Signs differ?
             if ( a != b ) {
                y.s = -b;
                return x.minus(y);
            }

            var xe = x.e / LOG_BASE,
                ye = y.e / LOG_BASE,
                xc = x.c,
                yc = y.c;

            if ( !xe || !ye ) {

                // Return ±Infinity if either ±Infinity.
                if ( !xc || !yc ) return new BigNumber( a / 0 );

                // Either zero?
                // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
                if ( !xc[0] || !yc[0] ) return yc[0] ? y : new BigNumber( xc[0] ? x : a * 0 );
            }

            xe = bitFloor(xe);
            ye = bitFloor(ye);
            xc = xc.slice();

            // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
            if ( a = xe - ye ) {
                if ( a > 0 ) {
                    ye = xe;
                    t = yc;
                } else {
                    a = -a;
                    t = xc;
                }

                t.reverse();
                for ( ; a--; t.push(0) );
                t.reverse();
            }

            a = xc.length;
            b = yc.length;

            // Point xc to the longer array, and b to the shorter length.
            if ( a - b < 0 ) t = yc, yc = xc, xc = t, b = a;

            // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
            for ( a = 0; b; ) {
                a = ( xc[--b] = xc[b] + yc[b] + a ) / BASE | 0;
                xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
            }

            if (a) {
                xc = [a].concat(xc);
                ++ye;
            }

            // No need to check for zero, as +x + +y != 0 && -x + -y != 0
            // ye = MAX_EXP + 1 possible
            return normalise( y, xc, ye );
        };


        /*
         * Return the number of significant digits of the value of this BigNumber.
         *
         * [z] {boolean|number} Whether to count integer-part trailing zeros: true, false, 1 or 0.
         */
        P.precision = P.sd = function (z) {
            var n, v,
                x = this,
                c = x.c;

            // 'precision() argument not a boolean or binary digit: {z}'
            if ( z != null && z !== !!z && z !== 1 && z !== 0 ) {
                if (ERRORS) raise( 13, 'argument' + notBool, z );
                if ( z != !!z ) z = null;
            }

            if ( !c ) return null;
            v = c.length - 1;
            n = v * LOG_BASE + 1;

            if ( v = c[v] ) {

                // Subtract the number of trailing zeros of the last element.
                for ( ; v % 10 == 0; v /= 10, n-- );

                // Add the number of digits of the first element.
                for ( v = c[0]; v >= 10; v /= 10, n++ );
            }

            if ( z && x.e + 1 > n ) n = x.e + 1;

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * dp decimal places using rounding mode rm, or to 0 and ROUNDING_MODE respectively if
         * omitted.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'round() decimal places out of range: {dp}'
         * 'round() decimal places not an integer: {dp}'
         * 'round() rounding mode not an integer: {rm}'
         * 'round() rounding mode out of range: {rm}'
         */
        P.round = function ( dp, rm ) {
            var n = new BigNumber(this);

            if ( dp == null || isValidInt( dp, 0, MAX, 15 ) ) {
                round( n, ~~dp + this.e + 1, rm == null ||
                  !isValidInt( rm, 0, 8, 15, roundingMode ) ? ROUNDING_MODE : rm | 0 );
            }

            return n;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
         * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
         *
         * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         *
         * If k is out of range and ERRORS is false, the result will be ±0 if k < 0, or ±Infinity
         * otherwise.
         *
         * 'shift() argument not an integer: {k}'
         * 'shift() argument out of range: {k}'
         */
        P.shift = function (k) {
            var n = this;
            return isValidInt( k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 16, 'argument' )

              // k < 1e+21, or truncate(k) will produce exponential notation.
              ? n.times( '1e' + truncate(k) )
              : new BigNumber( n.c && n.c[0] && ( k < -MAX_SAFE_INTEGER || k > MAX_SAFE_INTEGER )
                ? n.s * ( k < 0 ? 0 : 1 / 0 )
                : n );
        };


        /*
         *  sqrt(-n) =  N
         *  sqrt( N) =  N
         *  sqrt(-I) =  N
         *  sqrt( I) =  I
         *  sqrt( 0) =  0
         *  sqrt(-0) = -0
         *
         * Return a new BigNumber whose value is the square root of the value of this BigNumber,
         * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
         */
        P.squareRoot = P.sqrt = function () {
            var m, n, r, rep, t,
                x = this,
                c = x.c,
                s = x.s,
                e = x.e,
                dp = DECIMAL_PLACES + 4,
                half = new BigNumber('0.5');

            // Negative/NaN/Infinity/zero?
            if ( s !== 1 || !c || !c[0] ) {
                return new BigNumber( !s || s < 0 && ( !c || c[0] ) ? NaN : c ? x : 1 / 0 );
            }

            // Initial estimate.
            s = Math.sqrt( +x );

            // Math.sqrt underflow/overflow?
            // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
            if ( s == 0 || s == 1 / 0 ) {
                n = coeffToString(c);
                if ( ( n.length + e ) % 2 == 0 ) n += '0';
                s = Math.sqrt(n);
                e = bitFloor( ( e + 1 ) / 2 ) - ( e < 0 || e % 2 );

                if ( s == 1 / 0 ) {
                    n = '1e' + e;
                } else {
                    n = s.toExponential();
                    n = n.slice( 0, n.indexOf('e') + 1 ) + e;
                }

                r = new BigNumber(n);
            } else {
                r = new BigNumber( s + '' );
            }

            // Check for zero.
            // r could be zero if MIN_EXP is changed after the this value was created.
            // This would cause a division by zero (x/t) and hence Infinity below, which would cause
            // coeffToString to throw.
            if ( r.c[0] ) {
                e = r.e;
                s = e + dp;
                if ( s < 3 ) s = 0;

                // Newton-Raphson iteration.
                for ( ; ; ) {
                    t = r;
                    r = half.times( t.plus( div( x, t, dp, 1 ) ) );

                    if ( coeffToString( t.c   ).slice( 0, s ) === ( n =
                         coeffToString( r.c ) ).slice( 0, s ) ) {

                        // The exponent of r may here be one less than the final result exponent,
                        // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
                        // are indexed correctly.
                        if ( r.e < e ) --s;
                        n = n.slice( s - 3, s + 1 );

                        // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
                        // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
                        // iteration.
                        if ( n == '9999' || !rep && n == '4999' ) {

                            // On the first iteration only, check to see if rounding up gives the
                            // exact result as the nines may infinitely repeat.
                            if ( !rep ) {
                                round( t, t.e + DECIMAL_PLACES + 2, 0 );

                                if ( t.times(t).eq(x) ) {
                                    r = t;
                                    break;
                                }
                            }

                            dp += 4;
                            s += 4;
                            rep = 1;
                        } else {

                            // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
                            // result. If not, then there are further digits and m will be truthy.
                            if ( !+n || !+n.slice(1) && n.charAt(0) == '5' ) {

                                // Truncate to the first rounding digit.
                                round( r, r.e + DECIMAL_PLACES + 2, 1 );
                                m = !r.times(r).eq(x);
                            }

                            break;
                        }
                    }
                }
            }

            return round( r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m );
        };


        /*
         *  n * 0 = 0
         *  n * N = N
         *  n * I = I
         *  0 * n = 0
         *  0 * 0 = 0
         *  0 * N = N
         *  0 * I = N
         *  N * n = N
         *  N * 0 = N
         *  N * N = N
         *  N * I = N
         *  I * n = I
         *  I * 0 = N
         *  I * N = N
         *  I * I = I
         *
         * Return a new BigNumber whose value is the value of this BigNumber times the value of
         * BigNumber(y, b).
         */
        P.times = P.mul = function ( y, b ) {
            var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
                base, sqrtBase,
                x = this,
                xc = x.c,
                yc = ( id = 17, y = new BigNumber( y, b ) ).c;

            // Either NaN, ±Infinity or ±0?
            if ( !xc || !yc || !xc[0] || !yc[0] ) {

                // Return NaN if either is NaN, or one is 0 and the other is Infinity.
                if ( !x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc ) {
                    y.c = y.e = y.s = null;
                } else {
                    y.s *= x.s;

                    // Return ±Infinity if either is ±Infinity.
                    if ( !xc || !yc ) {
                        y.c = y.e = null;

                    // Return ±0 if either is ±0.
                    } else {
                        y.c = [0];
                        y.e = 0;
                    }
                }

                return y;
            }

            e = bitFloor( x.e / LOG_BASE ) + bitFloor( y.e / LOG_BASE );
            y.s *= x.s;
            xcL = xc.length;
            ycL = yc.length;

            // Ensure xc points to longer array and xcL to its length.
            if ( xcL < ycL ) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

            // Initialise the result array with zeros.
            for ( i = xcL + ycL, zc = []; i--; zc.push(0) );

            base = BASE;
            sqrtBase = SQRT_BASE;

            for ( i = ycL; --i >= 0; ) {
                c = 0;
                ylo = yc[i] % sqrtBase;
                yhi = yc[i] / sqrtBase | 0;

                for ( k = xcL, j = i + k; j > i; ) {
                    xlo = xc[--k] % sqrtBase;
                    xhi = xc[k] / sqrtBase | 0;
                    m = yhi * xlo + xhi * ylo;
                    xlo = ylo * xlo + ( ( m % sqrtBase ) * sqrtBase ) + zc[j] + c;
                    c = ( xlo / base | 0 ) + ( m / sqrtBase | 0 ) + yhi * xhi;
                    zc[j--] = xlo % base;
                }

                zc[j] = c;
            }

            if (c) {
                ++e;
            } else {
                zc.splice(0, 1);
            }

            return normalise( y, zc, e );
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber rounded to a maximum of
         * sd significant digits using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toDigits() precision out of range: {sd}'
         * 'toDigits() precision not an integer: {sd}'
         * 'toDigits() rounding mode not an integer: {rm}'
         * 'toDigits() rounding mode out of range: {rm}'
         */
        P.toDigits = function ( sd, rm ) {
            var n = new BigNumber(this);
            sd = sd == null || !isValidInt( sd, 1, MAX, 18, 'precision' ) ? null : sd | 0;
            rm = rm == null || !isValidInt( rm, 0, 8, 18, roundingMode ) ? ROUNDING_MODE : rm | 0;
            return sd ? round( n, sd, rm ) : n;
        };


        /*
         * Return a string representing the value of this BigNumber in exponential notation and
         * rounded using ROUNDING_MODE to dp fixed decimal places.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toExponential() decimal places not an integer: {dp}'
         * 'toExponential() decimal places out of range: {dp}'
         * 'toExponential() rounding mode not an integer: {rm}'
         * 'toExponential() rounding mode out of range: {rm}'
         */
        P.toExponential = function ( dp, rm ) {
            return format( this,
              dp != null && isValidInt( dp, 0, MAX, 19 ) ? ~~dp + 1 : null, rm, 19 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounding
         * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
         *
         * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
         * but e.g. (-0.00001).toFixed(0) is '-0'.
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFixed() decimal places not an integer: {dp}'
         * 'toFixed() decimal places out of range: {dp}'
         * 'toFixed() rounding mode not an integer: {rm}'
         * 'toFixed() rounding mode out of range: {rm}'
         */
        P.toFixed = function ( dp, rm ) {
            return format( this, dp != null && isValidInt( dp, 0, MAX, 20 )
              ? ~~dp + this.e + 1 : null, rm, 20 );
        };


        /*
         * Return a string representing the value of this BigNumber in fixed-point notation rounded
         * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
         * of the FORMAT object (see BigNumber.config).
         *
         * FORMAT = {
         *      decimalSeparator : '.',
         *      groupSeparator : ',',
         *      groupSize : 3,
         *      secondaryGroupSize : 0,
         *      fractionGroupSeparator : '\xA0',    // non-breaking space
         *      fractionGroupSize : 0
         * };
         *
         * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toFormat() decimal places not an integer: {dp}'
         * 'toFormat() decimal places out of range: {dp}'
         * 'toFormat() rounding mode not an integer: {rm}'
         * 'toFormat() rounding mode out of range: {rm}'
         */
        P.toFormat = function ( dp, rm ) {
            var str = format( this, dp != null && isValidInt( dp, 0, MAX, 21 )
              ? ~~dp + this.e + 1 : null, rm, 21 );

            if ( this.c ) {
                var i,
                    arr = str.split('.'),
                    g1 = +FORMAT.groupSize,
                    g2 = +FORMAT.secondaryGroupSize,
                    groupSeparator = FORMAT.groupSeparator,
                    intPart = arr[0],
                    fractionPart = arr[1],
                    isNeg = this.s < 0,
                    intDigits = isNeg ? intPart.slice(1) : intPart,
                    len = intDigits.length;

                if (g2) i = g1, g1 = g2, g2 = i, len -= i;

                if ( g1 > 0 && len > 0 ) {
                    i = len % g1 || g1;
                    intPart = intDigits.substr( 0, i );

                    for ( ; i < len; i += g1 ) {
                        intPart += groupSeparator + intDigits.substr( i, g1 );
                    }

                    if ( g2 > 0 ) intPart += groupSeparator + intDigits.slice(i);
                    if (isNeg) intPart = '-' + intPart;
                }

                str = fractionPart
                  ? intPart + FORMAT.decimalSeparator + ( ( g2 = +FORMAT.fractionGroupSize )
                    ? fractionPart.replace( new RegExp( '\\d{' + g2 + '}\\B', 'g' ),
                      '$&' + FORMAT.fractionGroupSeparator )
                    : fractionPart )
                  : intPart;
            }

            return str;
        };


        /*
         * Return a string array representing the value of this BigNumber as a simple fraction with
         * an integer numerator and an integer denominator. The denominator will be a positive
         * non-zero value less than or equal to the specified maximum denominator. If a maximum
         * denominator is not specified, the denominator will be the lowest value necessary to
         * represent the number exactly.
         *
         * [md] {number|string|BigNumber} Integer >= 1 and < Infinity. The maximum denominator.
         *
         * 'toFraction() max denominator not an integer: {md}'
         * 'toFraction() max denominator out of range: {md}'
         */
        P.toFraction = function (md) {
            var arr, d0, d2, e, exp, n, n0, q, s,
                k = ERRORS,
                x = this,
                xc = x.c,
                d = new BigNumber(ONE),
                n1 = d0 = new BigNumber(ONE),
                d1 = n0 = new BigNumber(ONE);

            if ( md != null ) {
                ERRORS = false;
                n = new BigNumber(md);
                ERRORS = k;

                if ( !( k = n.isInt() ) || n.lt(ONE) ) {

                    if (ERRORS) {
                        raise( 22,
                          'max denominator ' + ( k ? 'out of range' : 'not an integer' ), md );
                    }

                    // ERRORS is false:
                    // If md is a finite non-integer >= 1, round it to an integer and use it.
                    md = !k && n.c && round( n, n.e + 1, 1 ).gte(ONE) ? n : null;
                }
            }

            if ( !xc ) return x.toString();
            s = coeffToString(xc);

            // Determine initial denominator.
            // d is a power of 10 and the minimum max denominator that specifies the value exactly.
            e = d.e = s.length - x.e - 1;
            d.c[0] = POWS_TEN[ ( exp = e % LOG_BASE ) < 0 ? LOG_BASE + exp : exp ];
            md = !md || n.cmp(d) > 0 ? ( e > 0 ? d : n1 ) : n;

            exp = MAX_EXP;
            MAX_EXP = 1 / 0;
            n = new BigNumber(s);

            // n0 = d1 = 0
            n0.c[0] = 0;

            for ( ; ; )  {
                q = div( n, d, 0, 1 );
                d2 = d0.plus( q.times(d1) );
                if ( d2.cmp(md) == 1 ) break;
                d0 = d1;
                d1 = d2;
                n1 = n0.plus( q.times( d2 = n1 ) );
                n0 = d2;
                d = n.minus( q.times( d2 = d ) );
                n = d2;
            }

            d2 = div( md.minus(d0), d1, 0, 1 );
            n0 = n0.plus( d2.times(n1) );
            d0 = d0.plus( d2.times(d1) );
            n0.s = n1.s = x.s;
            e *= 2;

            // Determine which fraction is closer to x, n0/d0 or n1/d1
            arr = div( n1, d1, e, ROUNDING_MODE ).minus(x).abs().cmp(
                  div( n0, d0, e, ROUNDING_MODE ).minus(x).abs() ) < 1
                    ? [ n1.toString(), d1.toString() ]
                    : [ n0.toString(), d0.toString() ];

            MAX_EXP = exp;
            return arr;
        };


        /*
         * Return the value of this BigNumber converted to a number primitive.
         */
        P.toNumber = function () {
            return +this;
        };


        /*
         * Return a BigNumber whose value is the value of this BigNumber raised to the power n.
         * If m is present, return the result modulo m.
         * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
         * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using
         * ROUNDING_MODE.
         *
         * The modular power operation works efficiently when x, n, and m are positive integers,
         * otherwise it is equivalent to calculating x.toPower(n).modulo(m) (with POW_PRECISION 0).
         *
         * n {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
         * [m] {number|string|BigNumber} The modulus.
         *
         * 'pow() exponent not an integer: {n}'
         * 'pow() exponent out of range: {n}'
         *
         * Performs 54 loop iterations for n of 9007199254740991.
         */
        P.toPower = P.pow = function ( n, m ) {
            var k, y, z,
                i = mathfloor( n < 0 ? -n : +n ),
                x = this;

            if ( m != null ) {
                id = 23;
                m = new BigNumber(m);
            }

            // Pass ±Infinity to Math.pow if exponent is out of range.
            if ( !isValidInt( n, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER, 23, 'exponent' ) &&
              ( !isFinite(n) || i > MAX_SAFE_INTEGER && ( n /= 0 ) ||
                parseFloat(n) != n && !( n = NaN ) ) || n == 0 ) {
                k = Math.pow( +x, n );
                return new BigNumber( m ? k % m : k );
            }

            if (m) {
                if ( n > 1 && x.gt(ONE) && x.isInt() && m.gt(ONE) && m.isInt() ) {
                    x = x.mod(m);
                } else {
                    z = m;

                    // Nullify m so only a single mod operation is performed at the end.
                    m = null;
                }
            } else if (POW_PRECISION) {

                // Truncating each coefficient array to a length of k after each multiplication
                // equates to truncating significant digits to POW_PRECISION + [28, 41],
                // i.e. there will be a minimum of 28 guard digits retained.
                // (Using + 1.5 would give [9, 21] guard digits.)
                k = mathceil( POW_PRECISION / LOG_BASE + 2 );
            }

            y = new BigNumber(ONE);

            for ( ; ; ) {
                if ( i % 2 ) {
                    y = y.times(x);
                    if ( !y.c ) break;
                    if (k) {
                        if ( y.c.length > k ) y.c.length = k;
                    } else if (m) {
                        y = y.mod(m);
                    }
                }

                i = mathfloor( i / 2 );
                if ( !i ) break;
                x = x.times(x);
                if (k) {
                    if ( x.c && x.c.length > k ) x.c.length = k;
                } else if (m) {
                    x = x.mod(m);
                }
            }

            if (m) return y;
            if ( n < 0 ) y = ONE.div(y);

            return z ? y.mod(z) : k ? round( y, POW_PRECISION, ROUNDING_MODE ) : y;
        };


        /*
         * Return a string representing the value of this BigNumber rounded to sd significant digits
         * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
         * necessary to represent the integer part of the value in fixed-point notation, then use
         * exponential notation.
         *
         * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
         * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
         *
         * 'toPrecision() precision not an integer: {sd}'
         * 'toPrecision() precision out of range: {sd}'
         * 'toPrecision() rounding mode not an integer: {rm}'
         * 'toPrecision() rounding mode out of range: {rm}'
         */
        P.toPrecision = function ( sd, rm ) {
            return format( this, sd != null && isValidInt( sd, 1, MAX, 24, 'precision' )
              ? sd | 0 : null, rm, 24 );
        };


        /*
         * Return a string representing the value of this BigNumber in base b, or base 10 if b is
         * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
         * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
         * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
         * TO_EXP_NEG, return exponential notation.
         *
         * [b] {number} Integer, 2 to 64 inclusive.
         *
         * 'toString() base not an integer: {b}'
         * 'toString() base out of range: {b}'
         */
        P.toString = function (b) {
            var str,
                n = this,
                s = n.s,
                e = n.e;

            // Infinity or NaN?
            if ( e === null ) {

                if (s) {
                    str = 'Infinity';
                    if ( s < 0 ) str = '-' + str;
                } else {
                    str = 'NaN';
                }
            } else {
                str = coeffToString( n.c );

                if ( b == null || !isValidInt( b, 2, 64, 25, 'base' ) ) {
                    str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                      ? toExponential( str, e )
                      : toFixedPoint( str, e );
                } else {
                    str = convertBase( toFixedPoint( str, e ), b | 0, 10, s );
                }

                if ( s < 0 && n.c[0] ) str = '-' + str;
            }

            return str;
        };


        /*
         * Return a new BigNumber whose value is the value of this BigNumber truncated to a whole
         * number.
         */
        P.truncated = P.trunc = function () {
            return round( new BigNumber(this), this.e + 1, 1 );
        };


        /*
         * Return as toString, but do not accept a base argument, and include the minus sign for
         * negative zero.
         */
        P.valueOf = P.toJSON = function () {
            var str,
                n = this,
                e = n.e;

            if ( e === null ) return n.toString();

            str = coeffToString( n.c );

            str = e <= TO_EXP_NEG || e >= TO_EXP_POS
                ? toExponential( str, e )
                : toFixedPoint( str, e );

            return n.s < 0 ? '-' + str : str;
        };


        P.isBigNumber = true;

        if ( config != null ) BigNumber.config(config);

        return BigNumber;
    }


    // PRIVATE HELPER FUNCTIONS


    function bitFloor(n) {
        var i = n | 0;
        return n > 0 || n === i ? i : i - 1;
    }


    // Return a coefficient array as a string of base 10 digits.
    function coeffToString(a) {
        var s, z,
            i = 1,
            j = a.length,
            r = a[0] + '';

        for ( ; i < j; ) {
            s = a[i++] + '';
            z = LOG_BASE - s.length;
            for ( ; z--; s = '0' + s );
            r += s;
        }

        // Determine trailing zeros.
        for ( j = r.length; r.charCodeAt(--j) === 48; );
        return r.slice( 0, j + 1 || 1 );
    }


    // Compare the value of BigNumbers x and y.
    function compare( x, y ) {
        var a, b,
            xc = x.c,
            yc = y.c,
            i = x.s,
            j = y.s,
            k = x.e,
            l = y.e;

        // Either NaN?
        if ( !i || !j ) return null;

        a = xc && !xc[0];
        b = yc && !yc[0];

        // Either zero?
        if ( a || b ) return a ? b ? 0 : -j : i;

        // Signs differ?
        if ( i != j ) return i;

        a = i < 0;
        b = k == l;

        // Either Infinity?
        if ( !xc || !yc ) return b ? 0 : !xc ^ a ? 1 : -1;

        // Compare exponents.
        if ( !b ) return k > l ^ a ? 1 : -1;

        j = ( k = xc.length ) < ( l = yc.length ) ? k : l;

        // Compare digit by digit.
        for ( i = 0; i < j; i++ ) if ( xc[i] != yc[i] ) return xc[i] > yc[i] ^ a ? 1 : -1;

        // Compare lengths.
        return k == l ? 0 : k > l ^ a ? 1 : -1;
    }


    /*
     * Return true if n is a valid number in range, otherwise false.
     * Use for argument validation when ERRORS is false.
     * Note: parseInt('1e+1') == 1 but parseFloat('1e+1') == 10.
     */
    function intValidatorNoErrors( n, min, max ) {
        return ( n = truncate(n) ) >= min && n <= max;
    }


    function isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]';
    }


    /*
     * Convert string of baseIn to an array of numbers of baseOut.
     * Eg. convertBase('255', 10, 16) returns [15, 15].
     * Eg. convertBase('ff', 16, 10) returns [2, 5, 5].
     */
    function toBaseOut( str, baseIn, baseOut ) {
        var j,
            arr = [0],
            arrL,
            i = 0,
            len = str.length;

        for ( ; i < len; ) {
            for ( arrL = arr.length; arrL--; arr[arrL] *= baseIn );
            arr[ j = 0 ] += ALPHABET.indexOf( str.charAt( i++ ) );

            for ( ; j < arr.length; j++ ) {

                if ( arr[j] > baseOut - 1 ) {
                    if ( arr[j + 1] == null ) arr[j + 1] = 0;
                    arr[j + 1] += arr[j] / baseOut | 0;
                    arr[j] %= baseOut;
                }
            }
        }

        return arr.reverse();
    }


    function toExponential( str, e ) {
        return ( str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str ) +
          ( e < 0 ? 'e' : 'e+' ) + e;
    }


    function toFixedPoint( str, e ) {
        var len, z;

        // Negative exponent?
        if ( e < 0 ) {

            // Prepend zeros.
            for ( z = '0.'; ++e; z += '0' );
            str = z + str;

        // Positive exponent
        } else {
            len = str.length;

            // Append zeros.
            if ( ++e > len ) {
                for ( z = '0', e -= len; --e; z += '0' );
                str += z;
            } else if ( e < len ) {
                str = str.slice( 0, e ) + '.' + str.slice(e);
            }
        }

        return str;
    }


    function truncate(n) {
        n = parseFloat(n);
        return n < 0 ? mathceil(n) : mathfloor(n);
    }


    // EXPORT


    BigNumber = constructorFactory();
    BigNumber['default'] = BigNumber.BigNumber = BigNumber;


    // AMD.
    if ( true ) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function () { return BigNumber; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Node.js and other environments that support module.exports.
    } else if ( typeof module != 'undefined' && module.exports ) {
        module.exports = BigNumber;

    // Browser.
    } else {
        if ( !globalObj ) globalObj = typeof self != 'undefined' ? self : Function('return this')();
        globalObj.BigNumber = BigNumber;
    }
})(this);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, module) {/* parser generated by jison 0.4.17 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var xpath = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,8],$V1=[1,10],$V2=[1,12],$V3=[1,15],$V4=[1,19],$V5=[1,20],$V6=[1,14],$V7=[1,23],$V8=[1,24],$V9=[1,34],$Va=[1,28],$Vb=[1,29],$Vc=[1,30],$Vd=[1,31],$Ve=[1,32],$Vf=[1,33],$Vg=[1,16],$Vh=[1,17],$Vi=[1,36],$Vj=[1,37],$Vk=[1,38],$Vl=[1,39],$Vm=[1,40],$Vn=[1,41],$Vo=[1,42],$Vp=[1,43],$Vq=[1,44],$Vr=[1,45],$Vs=[1,46],$Vt=[1,47],$Vu=[1,48],$Vv=[1,49],$Vw=[5,12,16,17,18,19,20,21,22,23,24,25,26,27,28,29,32,41],$Vx=[1,53],$Vy=[5,12,16,17,18,19,20,21,22,23,24,25,26,27,28,29,32,34,36,40,41],$Vz=[2,58],$VA=[1,61],$VB=[1,62],$VC=[1,63],$VD=[1,65],$VE=[5,12,16,17,18,19,20,21,22,23,24,25,26,27,28,29,32,34,36,41],$VF=[30,51,52,53,54,55,56],$VG=[5,12,16,17,18,19,20,21,22,23,24,25,26,27,28,32,41],$VH=[5,12,16,17,18,19,32,41],$VI=[5,12,16,17,18,19,20,21,22,23,32,41],$VJ=[5,12,16,17,18,19,20,21,22,23,24,25,32,41],$VK=[12,32],$VL=[5,12,16,17,18,19,20,21,22,23,24,25,26,27,28,29,32,34,41];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"xpath_expr":3,"expr":4,"EOF":5,"base_expr":6,"op_expr":7,"path_expr":8,"filter_expr":9,"hashtag_expr":10,"LPAREN":11,"RPAREN":12,"func_call":13,"VAR":14,"literal":15,"OR":16,"AND":17,"EQ":18,"NEQ":19,"LT":20,"LTE":21,"GT":22,"GTE":23,"PLUS":24,"MINUS":25,"MULT":26,"DIV":27,"MOD":28,"UNION":29,"QNAME":30,"arg_list":31,"COMMA":32,"loc_path":33,"SLASH":34,"rel_loc_path":35,"DBL_SLASH":36,"predicate":37,"HASH":38,"hashtag_path":39,"LBRACK":40,"RBRACK":41,"step":42,"step_unabbr":43,"DOT":44,"DBL_DOT":45,"step_body":46,"node_test":47,"axis_specifier":48,"DBL_COLON":49,"AT":50,"WILDCARD":51,"NSWILDCARD":52,"NODETYPE_NODE":53,"NODETYPE_TEXT":54,"NODETYPE_COMMENT":55,"NODETYPE_PROCINSTR":56,"STR":57,"NUM":58,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",11:"LPAREN",12:"RPAREN",14:"VAR",16:"OR",17:"AND",18:"EQ",19:"NEQ",20:"LT",21:"LTE",22:"GT",23:"GTE",24:"PLUS",25:"MINUS",26:"MULT",27:"DIV",28:"MOD",29:"UNION",30:"QNAME",32:"COMMA",34:"SLASH",36:"DBL_SLASH",38:"HASH",40:"LBRACK",41:"RBRACK",44:"DOT",45:"DBL_DOT",49:"DBL_COLON",50:"AT",51:"WILDCARD",52:"NSWILDCARD",53:"NODETYPE_NODE",54:"NODETYPE_TEXT",55:"NODETYPE_COMMENT",56:"NODETYPE_PROCINSTR",57:"STR",58:"NUM"},
productions_: [0,[3,2],[4,1],[4,1],[4,1],[4,1],[4,1],[6,3],[6,1],[6,1],[6,1],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,3],[7,2],[7,3],[13,4],[13,3],[31,3],[31,1],[8,1],[8,3],[8,3],[8,3],[8,3],[9,2],[9,2],[10,4],[10,2],[39,1],[39,3],[37,3],[33,1],[33,2],[33,2],[33,1],[35,1],[35,3],[35,3],[42,1],[42,1],[42,1],[43,2],[43,1],[46,1],[46,2],[48,2],[48,1],[47,1],[47,1],[47,1],[47,3],[47,3],[47,3],[47,3],[47,4],[15,1],[15,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1]; 
break;
case 2: case 3: case 4: case 5: case 6:
  this.$ = $$[$0]; 
break;
case 7:
 $$[$0-1].parens = true; this.$ = $$[$0-1]; 
break;
case 9:
 this.$ = new yy.xpathModels.XPathVariableReference($$[$0]); 
break;
case 11:
 this.$ = new yy.xpathModels.XPathBoolExpr({"type": "or", "left": $$[$0-2], "right": $$[$0]}); 
break;
case 12:
 this.$ = new yy.xpathModels.XPathBoolExpr({"type": "and", "left": $$[$0-2], "right": $$[$0]}); 
break;
case 13:
 this.$ = new yy.xpathModels.XPathEqExpr({"type": "==", "left": $$[$0-2], "right": $$[$0]}); 
break;
case 14:
 this.$ = new yy.xpathModels.XPathEqExpr({"type": "!=", "left": $$[$0-2], "right": $$[$0]}); 
break;
case 15:
 this.$ = new yy.xpathModels.XPathCmpExpr({"type": "<", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 16:
 this.$ = new yy.xpathModels.XPathCmpExpr({"type": "<=", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 17:
 this.$ = new yy.xpathModels.XPathCmpExpr({"type": ">", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 18:
 this.$ = new yy.xpathModels.XPathCmpExpr({"type": ">=", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 19:
 this.$ = new yy.xpathModels.XPathArithExpr({"type": "+", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 20:
 this.$ = new yy.xpathModels.XPathArithExpr({"type": "-", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 21:
 this.$ = new yy.xpathModels.XPathArithExpr({"type": "*", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 22:
 this.$ = new yy.xpathModels.XPathArithExpr({"type": "/", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 23:
 this.$ = new yy.xpathModels.XPathArithExpr({"type": "%", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 24:
 this.$ = new yy.xpathModels.XPathNumNegExpr({"type": "num-neg", "value":$$[$0]}); 
break;
case 25:
 this.$ = new yy.xpathModels.XPathUnionExpr({"type": "union", "left":$$[$0-2], "right": $$[$0]}); 
break;
case 26:
 this.$ = new yy.xpathModels.XPathFuncExpr({id: $$[$0-3], args: $$[$0-1]}); 
break;
case 27:
 this.$ = new yy.xpathModels.XPathFuncExpr({id: $$[$0-2], args: []}); 
break;
case 28:
 var args = $$[$0-2];
                                      args.push($$[$0]);
                                      this.$ = args; 
break;
case 29:
 this.$ = [$$[$0]]; 
break;
case 31:
 this.$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: $$[$0-2], steps: $$[$0]}); 
break;
case 32:
 var steps = $$[$0];
                                                      steps.splice(0, 0, new yy.xpathModels.XPathStep({
                                                                                axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF, 
                                                                                test: yy.xpathModels.XPathTestEnum.TYPE_NODE,
                                                                                location: new yy.xpathModels.ParseLocation(_$)}));
                                                      this.$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: $$[$0-2], steps: steps}); 
break;
case 33:
 // could eliminate filterExpr wrapper, but this makes tests pass as-is
                                                      var filterExpr = new yy.xpathModels.XPathFilterExpr({expr: $$[$0-2]});
                                                      this.$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: filterExpr, steps: $$[$0]}); 
break;
case 34:
 var steps = $$[$0];
                                                      // could eliminate filterExpr wrapper, but this makes tests pass as-is
                                                      var filterExpr = new yy.xpathModels.XPathFilterExpr({expr: $$[$0-2]});
                                                      steps.splice(0, 0, new yy.xpathModels.XPathStep({
                                                                                axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF, 
                                                                                test: yy.xpathModels.XPathTestEnum.TYPE_NODE,
                                                                                location: new yy.xpathModels.ParseLocation(_$)}));
                                                      this.$ = new yy.xpathModels.XPathPathExpr({
                                                                    initialContext: yy.xpathModels.XPathInitialContextEnum.EXPR,
                                                                    filter: filterExpr, steps: steps}); 
break;
case 35:
 this.$ = new yy.xpathModels.XPathFilterExpr({expr: $$[$0-1], predicates: [$$[$0]]}); 
break;
case 36:
 var filterExpr = $$[$0-1];
                                        filterExpr.predicates.push($$[$0]);
                                        this.$ = filterExpr; 
break;
case 37:
 this.$ = new yy.xpathModels.XPathHashtagExpression({initialContext: yy.xpathModels.XPathInitialContextEnum.HASHTAG,
                                                                      namespace: $$[$0-2],
                                                                      steps: $$[$0]}); 
break;
case 38:
 this.$ = new yy.xpathModels.XPathHashtagExpression({initialContext: yy.xpathModels.XPathInitialContextEnum.HASHTAG,
                                                                      namespace: $$[$0],
                                                                      steps: []}); 
break;
case 39:
this.$ = [$$[$0]];
break;
case 40:
var path = $$[$0-2]; path.push($$[$0]); this.$ = path;
break;
case 41:
 this.$ = $$[$0-1]; 
break;
case 42:
 this.$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.RELATIVE,
                                                                      steps: $$[$0]}); 
break;
case 43:
 this.$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.ROOT,
                                                                      steps: $$[$0]}); 
break;
case 44:
 var steps = $$[$0];
                                              // insert descendant step into beginning
                                              steps.splice(0, 0, new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF,
                                                      test: yy.xpathModels.XPathTestEnum.TYPE_NODE,
                                                      location: new yy.xpathModels.ParseLocation(_$)}));
                                              this.$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.ROOT,
                                                                      steps: steps}); 
break;
case 45:
 this.$ = new yy.xpathModels.XPathPathExpr({initialContext: yy.xpathModels.XPathInitialContextEnum.ROOT,
                                                              steps: []});
break;
case 46:
 this.$ = [$$[$0]];
break;
case 47:
 var path = $$[$0-2];
                                            path.push($$[$0]);
                                            this.$ = path; 
break;
case 48:
 var path = $$[$0-2];
                                            path.push(new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.DESCENDANT_OR_SELF,
                                                    test: yy.xpathModels.XPathTestEnum.TYPE_NODE,
                                                    location: new yy.xpathModels.ParseLocation(_$)}));
                                            path.push($$[$0]);
                                            this.$ = path; 
break;
case 49: case 53:
 this.$ = $$[$0]; 
break;
case 50:
 this.$ = new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.SELF, 
                                                          test: yy.xpathModels.XPathTestEnum.TYPE_NODE,
                                                          location: new yy.xpathModels.ParseLocation(_$)}); 
break;
case 51:
 this.$ = new yy.xpathModels.XPathStep({axis: yy.xpathModels.XPathAxisEnum.PARENT, 
                                                          test: yy.xpathModels.XPathTestEnum.TYPE_NODE,
                                                          location: new yy.xpathModels.ParseLocation(_$)}); 
break;
case 52:
 var step = $$[$0-1];
                                            step.predicates.push($$[$0]);
                                            this.$ = step; 
break;
case 54:
 var nodeTest = $$[$0]; // temporary dict with appropriate args
                                          nodeTest.axis = yy.xpathModels.XPathAxisEnum.CHILD;
                                          nodeTest.location = new yy.xpathModels.ParseLocation(_$);
                                          this.$ = new yy.xpathModels.XPathStep(nodeTest); 
break;
case 55:
 var nodeTest = $$[$0];  // temporary dict with appropriate args
                                          nodeTest.axis = $$[$0-1]; // add axis
                                          nodeTest.location = new yy.xpathModels.ParseLocation(_$);
                                          this.$ = new yy.xpathModels.XPathStep(nodeTest); 
break;
case 56:
 this.$ = yy.xpathModels.testAxisName($$[$0-1]); 
break;
case 57:
 this.$ = yy.xpathModels.XPathAxisEnum.ATTRIBUTE; 
break;
case 58:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.NAME, "name": $$[$0]}; 
break;
case 59:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.NAME_WILDCARD}; 
break;
case 60:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.NAMESPACE_WILDCARD, "namespace": $$[$0]}; 
break;
case 61:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_NODE}; 
break;
case 62:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_TEXT}; 
break;
case 63:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_COMMENT}; 
break;
case 64:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_PROCESSING_INSTRUCTION, "literal": null}; 
break;
case 65:
 this.$ = {"test": yy.xpathModels.XPathTestEnum.TYPE_PROCESSING_INSTRUCTION, "literal": $$[$0-1]}; 
break;
case 66:
 this.$ = new yy.xpathModels.XPathStringLiteral($$[$0], new yy.xpathModels.ParseLocation(_$)); 
break;
case 67:
 this.$ = new yy.xpathModels.XPathNumericLiteral($$[$0], new yy.xpathModels.ParseLocation(_$)); 
break;
}
},
table: [{3:1,4:2,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{1:[3]},{5:[1,35],16:$Vi,17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv},o($Vw,[2,2],{37:52,34:[1,50],36:[1,51],40:$Vx}),o($Vw,[2,3]),o($Vw,[2,4]),o($Vw,[2,5],{37:56,34:[1,54],36:[1,55],40:$Vx}),o($Vw,[2,6]),{4:57,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},o($Vy,[2,8]),o($Vy,[2,9]),o($Vy,[2,10]),{4:58,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},o($Vw,[2,30]),{30:[1,59]},o($Vy,$Vz,{11:[1,60],49:$VA}),o($Vy,[2,66]),o($Vy,[2,67]),o($Vw,[2,42],{34:$VB,36:$VC}),o($Vw,[2,45],{42:21,43:22,46:25,47:26,48:27,35:64,30:$VD,44:$V7,45:$V8,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf}),{30:$VD,35:66,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},o($VE,[2,46]),o($VE,[2,49],{37:67,40:$Vx}),o($VE,[2,50]),o($VE,[2,51]),o($Vy,[2,53]),o($Vy,[2,54]),{30:[1,69],47:68,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},o($Vy,[2,59]),o($Vy,[2,60]),{11:[1,70]},{11:[1,71]},{11:[1,72]},{11:[1,73]},o($VF,[2,57]),{1:[2,1]},{4:74,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:75,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:76,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:77,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:78,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:79,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:80,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:81,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:82,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:83,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:84,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:85,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:86,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{4:87,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{30:$VD,35:88,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},{30:$VD,35:89,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},o($Vy,[2,35]),{4:90,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},{30:$VD,35:91,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},{30:$VD,35:92,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},o($Vy,[2,36]),{12:[1,93],16:$Vi,17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv},o($VG,[2,24],{29:$Vv}),o($Vw,[2,38],{34:[1,94]}),{4:97,6:3,7:4,8:5,9:6,10:7,11:$V0,12:[1,96],13:9,14:$V1,15:11,25:$V2,30:$V3,31:95,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},o($VF,[2,56]),{30:$VD,42:98,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},{30:$VD,42:99,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf},o($Vw,[2,43],{34:$VB,36:$VC}),o($Vy,$Vz,{49:$VA}),o($Vw,[2,44],{34:$VB,36:$VC}),o($Vy,[2,52]),o($Vy,[2,55]),o($Vy,$Vz),{12:[1,100]},{12:[1,101]},{12:[1,102]},{12:[1,103],57:[1,104]},o([5,12,32,41],[2,11],{16:$Vi,17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o([5,12,16,32,41],[2,12],{17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VH,[2,13],{20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VH,[2,14],{20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VI,[2,15],{24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VI,[2,16],{24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VI,[2,17],{24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VI,[2,18],{24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VJ,[2,19],{26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VJ,[2,20],{26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VG,[2,21],{29:$Vv}),o($VG,[2,22],{29:$Vv}),o($VG,[2,23],{29:$Vv}),o($Vw,[2,25]),o($Vw,[2,33],{34:$VB,36:$VC}),o($Vw,[2,34],{34:$VB,36:$VC}),{16:$Vi,17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv,41:[1,105]},o($Vw,[2,31],{34:$VB,36:$VC}),o($Vw,[2,32],{34:$VB,36:$VC}),o($Vy,[2,7]),{30:[1,107],39:106},{12:[1,108],32:[1,109]},o($Vy,[2,27]),o($VK,[2,29],{16:$Vi,17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VE,[2,47]),o($VE,[2,48]),o($Vy,[2,61]),o($Vy,[2,62]),o($Vy,[2,63]),o($Vy,[2,64]),{12:[1,110]},o($Vy,[2,41]),o($Vw,[2,37],{34:[1,111]}),o($VL,[2,39]),o($Vy,[2,26]),{4:112,6:3,7:4,8:5,9:6,10:7,11:$V0,13:9,14:$V1,15:11,25:$V2,30:$V3,33:13,34:$V4,35:18,36:$V5,38:$V6,42:21,43:22,44:$V7,45:$V8,46:25,47:26,48:27,50:$V9,51:$Va,52:$Vb,53:$Vc,54:$Vd,55:$Ve,56:$Vf,57:$Vg,58:$Vh},o($Vy,[2,65]),{30:[1,113]},o($VK,[2,28],{16:$Vi,17:$Vj,18:$Vk,19:$Vl,20:$Vm,21:$Vn,22:$Vo,23:$Vp,24:$Vq,25:$Vr,26:$Vs,27:$Vt,28:$Vu,29:$Vv}),o($VL,[2,40])],
defaultActions: {35:[2,1]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        function _parseError (msg, hash) {
            this.message = msg;
            this.hash = hash;
        }
        _parseError.prototype = Error;

        throw new _parseError(str, hash);
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {  /*
Copyright (c) 2010-2011, Dimagi Inc., and individual contributors.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of the Dimagi, nor the names of its contributors may 
      be used to endorse or promote products derived from this software 
      without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL DIMAGI INC. BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0:/* ignore whitespace */ 
break;
case 1: yy.xpathModels.debugLog("NODETYPE", yy_.yytext); return "NODETYPE_NODE"; 
break;
case 2: yy.xpathModels.debugLog("NODETYPE", yy_.yytext); return "NODETYPE_TEXT"; 
break;
case 3: yy.xpathModels.debugLog("NODETYPE", yy_.yytext); return "NODETYPE_COMMENT"; 
break;
case 4: yy.xpathModels.debugLog("NODETYPE", yy_.yytext); return "NODETYPE_PROCINSTR"; 
break;
case 5: this.begin("OP_CONTEXT"); yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-1); yy.xpathModels.debugLog("VAR", yy_.yytext); return "VAR"; 
break;
case 6: this.begin("OP_CONTEXT"); 
                                     yy_.yytext = yy_.yytext.substr(0, yy_.yyleng-2);
                                     yy.xpathModels.debugLog("NSWILDCARD", yy_.yytext); return "NSWILDCARD"; 
break;
case 7: this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("QNAME", yy_.yytext); return "QNAME"; 
break;
case 8: this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("WILDCARD", yy_.yytext); return "WILDCARD"; 
break;
case 9: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("MULT", yy_.yytext); return "MULT"; 
break;
case 10: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("AND", yy_.yytext); return "AND"; 
break;
case 11: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("OR", yy_.yytext); return "OR"; 
break;
case 12: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("DIV", yy_.yytext); return "DIV"; 
break;
case 13: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("MOD", yy_.yytext); return "MOD"; 
break;
case 14: this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("NUM", yy_.yytext); return "NUM"; 
break;
case 15: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("EQ", yy_.yytext); return "EQ"; 
break;
case 16: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("NEQ", yy_.yytext); return "NEQ"; 
break;
case 17: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LTE", yy_.yytext); return "LTE"; 
break;
case 18: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LT", yy_.yytext); return "LT"; 
break;
case 19: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("GTE", yy_.yytext); return "GTE"; 
break;
case 20: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("GT", yy_.yytext); return "GT"; 
break;
case 21: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("PLUS", yy_.yytext); return "PLUS"; 
break;
case 22: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("MINUS", yy_.yytext); return "MINUS"; 
break;
case 23: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("UNION", yy_.yytext); return "UNION"; 
break;
case 24: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("DBL", yy_.yytext); return "DBL_SLASH"; 
break;
case 25: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("SLASH", yy_.yytext); return "SLASH"; 
break;
case 26: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LBRACK", yy_.yytext); return "LBRACK"; 
break;
case 27: this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("RBRACK", yy_.yytext); return "RBRACK"; 
break;
case 28: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("LPAREN", yy_.yytext); return "LPAREN"; 
break;
case 29: this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("RPAREN", yy_.yytext); return "RPAREN"; 
break;
case 30: this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("DBL", yy_.yytext); return "DBL_DOT"; 
break;
case 31: this.begin("OP_CONTEXT");  yy.xpathModels.debugLog("DOT", yy_.yytext); return "DOT"; 
break;
case 32: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("AT", yy_.yytext); return "AT"; 
break;
case 33: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("DBL", yy_.yytext); return "DBL_COLON"; 
break;
case 34: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("COMMA", yy_.yytext); return "COMMA"; 
break;
case 35: this.begin("VAL_CONTEXT"); yy.xpathModels.debugLog("HASH", yy_.yytext); return "HASH"; 
break;
case 36: this.begin("OP_CONTEXT"); yy.xpathModels.debugLog("STR", yy_.yytext); return "STR"; 
break;
case 37:return 5;
break;
}
},
rules: [/^(?:((\s+)))/,/^(?:node(?=(((\s+))?\()))/,/^(?:text(?=(((\s+))?\()))/,/^(?:comment(?=(((\s+))?\()))/,/^(?:processing-instruction(?=(((\s+))?\()))/,/^(?:\$([A-Za-z_][A-Za-z0-9._-]*(:[A-Za-z_][A-Za-z0-9._-]*)?))/,/^(?:([A-Za-z_][A-Za-z0-9._-]*):\*)/,/^(?:([A-Za-z_][A-Za-z0-9._-]*(:[A-Za-z_][A-Za-z0-9._-]*)?))/,/^(?:\*)/,/^(?:\*)/,/^(?:(and))/,/^(?:(or))/,/^(?:(div))/,/^(?:(mod))/,/^(?:(([0-9])+(\.([0-9])*)?|(\.([0-9])+)))/,/^(?:=)/,/^(?:!=)/,/^(?:<=)/,/^(?:<)/,/^(?:>=)/,/^(?:>)/,/^(?:\+)/,/^(?:-)/,/^(?:\|)/,/^(?:\/\/)/,/^(?:\/)/,/^(?:\[)/,/^(?:\])/,/^(?:\()/,/^(?:\))/,/^(?:\.\.)/,/^(?:\.)/,/^(?:@)/,/^(?:::)/,/^(?:,)/,/^(?:#)/,/^(?:("[^"\""]*"|'[^'\'']*'))/,/^(?:$)/],
conditions: {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true},"OP_CONTEXT":{"rules":[0,1,2,3,4,5,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true},"VAL_CONTEXT":{"rules":[0,1,2,3,4,5,6,7,8,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37],"inclusive":true}}
});
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (true) {
exports.parser = xpath;
exports.Parser = xpath.Parser;
exports.parse = function () { return xpath.parse.apply(xpath, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = __webpack_require__(6).readFileSync(__webpack_require__(7).normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && __webpack_require__.c[__webpack_require__.s] === module) {
  exports.main(process.argv.slice(1));
}
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(5)(module)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 6 */
/***/ (function(module, exports) {



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ })
/******/ ]);
});