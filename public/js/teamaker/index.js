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
		define([], factory);
	else if(typeof exports === 'object')
		exports["MyLibrary"] = factory();
	else
		root["MyLibrary"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./teamaker/index.js":
/*!***************************!*\
  !*** ./teamaker/index.js ***!
  \***************************/
/***/ (() => {

eval("// import ReactDOM from 'react-dom';\n// import { Provider } from 'react-redux'\n// import store from '../redux_store'\n// import Teamaker from './components/Teamaker.js'\n// window.addEventListener('load', init)\n// /**\n//  * Function loads when window load\n//  * @param {*} e \n//  */\n// function init(e){\n//     var rootElement = document.querySelector(\"#mainContainer\")\n//     ReactDOM.render(\n//         <Provider store={store}>\n//             <Teamaker />\n//         </Provider>,\n//         rootElement\n//     )\n// }\n\n//# sourceURL=webpack://MyLibrary/./teamaker/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./teamaker/index.js"]();
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});