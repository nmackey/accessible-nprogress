/*!
 * 
 *   Sun Jan 31 2021 16:25:43 GMT-0600 (Central Standard Time)
 *   Accessible NProgress, (c) 2021 Nicholas Mackey - http://nmackey.com/accessible-nprogress
 *   @license MIT
 *
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("NProgress", [], factory);
	else if(typeof exports === 'object')
		exports["NProgress"] = factory();
	else
		root["NProgress"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ \"./src/util.js\");\n/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles.css */ \"./src/styles.css\");\n\n\nvar DEFAULTS = {\n  minimum: 0.08,\n  easing: 'linear',\n  speed: 200,\n  trickle: true,\n  trickleSpeed: 200,\n  showSpinner: true,\n  barSelector: 'div.bar',\n  barLabel: 'processing request',\n  spinnerSelector: 'div.spinner',\n  spinnerLabel: 'processing request',\n  parent: 'body',\n  template: \"\\n    <div class=\\\"bar\\\" role=\\\"progressbar\\\" aria-valuemin=\\\"0\\\" aria-valuemax=\\\"1\\\">\\n      <div class=\\\"peg\\\"></div>\\n    </div>\\n    <div class=\\\"spinner\\\" role=\\\"progressbar\\\" aria-valuemin=\\\"0\\\" aria-valuemax=\\\"1\\\">\\n      <div class=\\\"spinner-icon\\\"></div>\\n    </div>\\n  \"\n};\n\nvar NProgress = function NProgress() {\n  var localSettings = DEFAULTS;\n  var localStatus = null;\n  var initialPromises = 0;\n  var currentPromises = 0;\n  /**\n   * @return {boolean} If the progress bar is rendered.\n   */\n\n  function isRendered() {\n    return !!document.getElementById('nprogress');\n  }\n  /**\n   * @return {boolean} If there is curent progress.\n   */\n\n\n  function isStarted() {\n    return typeof localStatus === 'number';\n  }\n  /**\n   * Renders the progress bar markup based on the `template` setting.\n   *\n   * @return {HTMLElement} The element rendered.\n   */\n\n\n  function render() {\n    if (isRendered()) {\n      return document.getElementById('nprogress');\n    }\n\n    document.documentElement.classList.add('nprogress-busy');\n    var progress = document.createElement('div');\n    progress.id = 'nprogress';\n    progress.innerHTML = localSettings.template;\n    var perc = isStarted() ? '-100' : (0,_util__WEBPACK_IMPORTED_MODULE_0__.toBarPerc)(localStatus || 0);\n    var bar = progress.querySelector(localSettings.barSelector);\n    bar.setAttribute('aria-label', localSettings.barLabel);\n    bar.style.transform = \"translate3d(\".concat(perc, \"%,0,0)\");\n    bar.style.transition = 'all 0 linear';\n    var spinner = progress.querySelector(localSettings.spinnerSelector);\n\n    if (spinner) {\n      if (!localSettings.showSpinner) {\n        (0,_util__WEBPACK_IMPORTED_MODULE_0__.removeElement)(spinner);\n      } else {\n        spinner.setAttribute('aria-label', localSettings.spinnerLabel);\n      }\n    }\n\n    var parent = document.querySelector(localSettings.parent);\n\n    if (parent) {\n      if (parent !== document.body) {\n        parent.classList.add('nprogress-custom-parent');\n      }\n\n      parent.appendChild(progress);\n    }\n\n    return progress;\n  }\n\n  return {\n    /**\n     * Updates configuration.\n     *\n     * @param {object} options - options to override/set\n     * @return {object} The NProgress object.\n     */\n    configure: function configure(options) {\n      (0,_util__WEBPACK_IMPORTED_MODULE_0__.assign)(localSettings, options);\n      return this;\n    },\n\n    /**\n     * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.\n     *\n     * @param {number} value - progress to set\n     * @return {object} The NProgress object.\n     */\n    set: function set(value) {\n      var _this = this;\n\n      var clamppedValue = (0,_util__WEBPACK_IMPORTED_MODULE_0__.clamp)(value, localSettings.minimum, 1);\n      localStatus = clamppedValue === 1 ? null : clamppedValue;\n      var progress = render(); // Repaint\n\n      progress.offsetWidth; // eslint-disable-line no-unused-expressions\n\n      (0,_util__WEBPACK_IMPORTED_MODULE_0__.queue)(function (next) {\n        // Add transition\n        var speed = localSettings.speed,\n            easing = localSettings.easing;\n        var bar = progress.querySelector(localSettings.barSelector);\n        bar.setAttribute('aria-valuenow', clamppedValue);\n        bar.style.transform = \"translate3d(\".concat((0,_util__WEBPACK_IMPORTED_MODULE_0__.toBarPerc)(clamppedValue), \"%,0,0)\");\n        bar.style.transition = \"all \".concat(speed, \"ms \").concat(easing);\n\n        if (clamppedValue === 1) {\n          // Fade out\n          progress.style.transition = 'none';\n          progress.style.opacity = 1; // Repaint\n\n          progress.offsetWidth; // eslint-disable-line no-unused-expressions\n\n          setTimeout(function () {\n            progress.style.transition = \"all \".concat(speed, \"ms linear\");\n            progress.style.opacity = 0;\n            setTimeout(function () {\n              _this.remove();\n\n              next();\n            }, speed);\n          }, speed);\n        } else {\n          setTimeout(next, speed);\n        }\n      });\n      return this;\n    },\n\n    /**\n     * Shows the progress bar.\n     * This is the same as setting the status to 0%, except that it doesn't go backwards.\n     *\n     * @return {object} The NProgress object.\n     */\n    start: function start() {\n      var _this2 = this;\n\n      if (!localStatus) {\n        this.set(0);\n      }\n\n      var work = function work() {\n        setTimeout(function () {\n          if (!localStatus) {\n            return;\n          }\n\n          _this2.inc();\n\n          work();\n        }, localSettings.trickleSpeed);\n      };\n\n      if (localSettings.trickle) {\n        work();\n      }\n\n      return this;\n    },\n\n    /**\n     * Hides the progress bar.\n     * This is the *sort of* the same as setting the status to 100%, with the\n     * difference being `done()` makes some placebo effect of some realistic motion.\n     *\n     * @param {boolean} force - show the progress bar complete even if its hidden\n     * @return {object} The NProgress object.\n     */\n    done: function done(force) {\n      if (!force && !localStatus) {\n        return this;\n      }\n\n      var halfRandom = 0.5 * Math.random();\n      return this.inc(0.3 + halfRandom).set(1);\n    },\n\n    /**\n     * Increments progress bar by given amount.\n     *\n     * @param {number} [amount] - amount to increment the progress bar by\n     * @return {object} The NProgress object.\n     */\n    inc: function inc() {\n      var amount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0,_util__WEBPACK_IMPORTED_MODULE_0__.randomInc)(localStatus);\n\n      if (!localStatus) {\n        return this.start();\n      }\n\n      var clamppedStatus = (0,_util__WEBPACK_IMPORTED_MODULE_0__.clamp)(localStatus + amount, 0, 0.994);\n      return this.set(clamppedStatus);\n    },\n\n    /**\n     * Removes the element. Opposite of render().\n     */\n    remove: function remove() {\n      document.documentElement.classList.remove('nprogress-busy');\n      document.querySelector(localSettings.parent).classList.remove('nprogress-custom-parent');\n      var progress = document.getElementById('nprogress');\n\n      if (progress) {\n        (0,_util__WEBPACK_IMPORTED_MODULE_0__.removeElement)(progress);\n      }\n    },\n\n    /**\n     * Waits for all supplied promises and increases the progress as the promises resolve.\n     *\n     * @param $promise Promise\n     * @return {object} The NProgress object.\n     */\n    promise: function promise($promise) {\n      var _this3 = this;\n\n      if (currentPromises === 0) {\n        this.start();\n      }\n\n      initialPromises += 1;\n      currentPromises += 1;\n\n      var promiseResolution = function promiseResolution() {\n        currentPromises -= 1;\n\n        if (currentPromises === 0) {\n          initialPromises = 0;\n\n          _this3.done();\n        } else {\n          _this3.set((initialPromises - currentPromises) / initialPromises);\n        }\n      };\n\n      $promise.then(promiseResolution).catch(promiseResolution);\n      return this;\n    },\n\n    get status() {\n      return localStatus;\n    },\n\n    get settings() {\n      return localSettings;\n    }\n\n  };\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NProgress());\n\n//# sourceURL=webpack://NProgress/./src/index.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"assign\": () => (/* binding */ assign),\n/* harmony export */   \"clamp\": () => (/* binding */ clamp),\n/* harmony export */   \"toBarPerc\": () => (/* binding */ toBarPerc),\n/* harmony export */   \"randomInc\": () => (/* binding */ randomInc),\n/* harmony export */   \"removeElement\": () => (/* binding */ removeElement),\n/* harmony export */   \"queue\": () => (/* binding */ queue)\n/* harmony export */ });\n/**\n * Substitute for Object.assign()\n * Modified from: https://stackoverflow.com/a/30498430\n *\n * @param {object} target - target object to merge to\n * @param {...object} objectsToMerge - arbitrary number of objects to merge into 'target'\n * @return {object} target merged object\n */\nfunction assign(target) {\n  var retTarget = Object(target);\n\n  for (var i = 0; i < (arguments.length <= 1 ? 0 : arguments.length - 1); i += 1) {\n    var obj = i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1];\n    var keys = Object.keys(obj);\n\n    for (var j = 0; j < keys.length; j += 1) {\n      retTarget[keys[j]] = obj[keys[j]];\n    }\n  }\n\n  return retTarget;\n}\n/**\n * Ensure n is between min & max\n *\n * @param {number} value - number to clamp\n * @param {number} min - minimum\n * @param {number} max - maximum\n * @return {number} clampped value\n */\n\nfunction clamp(value, min, max) {\n  if (value < min) return min;\n  if (value > max) return max;\n  return value;\n}\n/**\n * Converts a percentage (`0..1`) to a bar translateX\n * percentage (`-100%..0%`).\n *\n * @param {number} value - percentage to convert\n * @return {number} percentage\n */\n\nfunction toBarPerc(value) {\n  return (-1 + value) * 100;\n}\n/**\n * Gets an increment to use based on status\n *\n * @param {number} status - current status of the progress bar\n * @return {number} increment\n */\n\nfunction randomInc(status) {\n  if (status >= 0 && status < 0.2) {\n    return 0.1;\n  }\n\n  if (status >= 0.2 && status < 0.5) {\n    return 0.04;\n  }\n\n  if (status >= 0.5 && status < 0.8) {\n    return 0.02;\n  }\n\n  if (status >= 0.8 && status < 0.99) {\n    return 0.005;\n  }\n\n  return 0;\n}\n/**\n * Removes an element from the DOM.\n *\n * @param {HTMLElement} element - element to remove\n */\n\nfunction removeElement(element) {\n  if (element && element.parentNode) {\n    element.parentNode.removeChild(element);\n  }\n}\n/**\n * Queues a function to be executed.\n *\n * @return {function}\n */\n\nvar queue = function () {\n  var functionQueue = [];\n\n  function next() {\n    var fn = functionQueue.shift();\n\n    if (fn) {\n      fn(next);\n    }\n  }\n\n  return function (fn) {\n    functionQueue.push(fn);\n\n    if (functionQueue.length === 1) {\n      next();\n    }\n  };\n}();\n\n//# sourceURL=webpack://NProgress/./src/util.js?");

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://NProgress/./src/styles.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module exports must be returned from runtime so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__("./src/index.js");
/******/ })()
.default;
});