/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/app/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./ClientApp/main.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ClientApp/app.vue":
/*!***************************!*\
  !*** ./ClientApp/app.vue ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_vue_vue_type_template_id_0470902a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=0470902a& */ \"./ClientApp/app.vue?vue&type=template&id=0470902a&\");\n/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ \"./ClientApp/app.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _app_vue_vue_type_template_id_0470902a___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _app_vue_vue_type_template_id_0470902a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"ClientApp/app.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./ClientApp/app.vue?");

/***/ }),

/***/ "./ClientApp/app.vue?vue&type=script&lang=js&":
/*!****************************************************!*\
  !*** ./ClientApp/app.vue?vue&type=script&lang=js& ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./ClientApp/app.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./ClientApp/app.vue?");

/***/ }),

/***/ "./ClientApp/app.vue?vue&type=template&id=0470902a&":
/*!**********************************************************!*\
  !*** ./ClientApp/app.vue?vue&type=template&id=0470902a& ***!
  \**********************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_0470902a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=template&id=0470902a& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./ClientApp/app.vue?vue&type=template&id=0470902a&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_0470902a___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_0470902a___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./ClientApp/app.vue?");

/***/ }),

/***/ "./ClientApp/main.js":
/*!***************************!*\
  !*** ./ClientApp/main.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/fontawesome.css */ \"./node_modules/@fortawesome/fontawesome-free/css/fontawesome.css\");\n/* harmony import */ var _fortawesome_fontawesome_free_css_fontawesome_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_fontawesome_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _fortawesome_fontawesome_free_css_solid_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/solid.css */ \"./node_modules/@fortawesome/fontawesome-free/css/solid.css\");\n/* harmony import */ var _fortawesome_fontawesome_free_css_solid_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_free_css_solid_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var vue_chartjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! vue-chartjs */ \"./node_modules/vue-chartjs/es/index.js\");\n/* harmony import */ var _app_vue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.vue */ \"./ClientApp/app.vue\");\n/* harmony import */ var vue_moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue-moment */ \"./node_modules/vue-moment/dist/vue-moment.js\");\n/* harmony import */ var vue_moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(vue_moment__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].use(vue_moment__WEBPACK_IMPORTED_MODULE_5___default.a);\nvue__WEBPACK_IMPORTED_MODULE_2__[\"default\"].component('line-chart', {\n  extends: vue_chartjs__WEBPACK_IMPORTED_MODULE_3__[\"default\"].Line,\n\n  mounted() {\n    this.renderChart({\n      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],\n      datasets: [{\n        label: 'Data One',\n        backgroundColor: '#f87979',\n        data: [40, 39, 10, 40, 39, 80, 40]\n      }]\n    }, {\n      responsive: true,\n      maintainAspectRatio: false\n    });\n  }\n\n});\nnew vue__WEBPACK_IMPORTED_MODULE_2__[\"default\"]({\n  el: '#app',\n  components: {\n    App: _app_vue__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/main.js?");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/index.js?!./ClientApp/app.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/app.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nprogress */ \"./node_modules/nprogress/nprogress.js\");\n/* harmony import */ var nprogress__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nprogress__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\nconst instance = axios__WEBPACK_IMPORTED_MODULE_1___default.a.create();\ninstance.interceptors.request.use(config => {\n  nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.start();\n  return config;\n});\ninstance.interceptors.response.use(response => {\n  nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.done();\n  return response;\n}, error => {\n  nprogress__WEBPACK_IMPORTED_MODULE_0___default.a.done();\n  throw error;\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data() {\n    return {\n      hasNextRows: false,\n      items: [],\n      selectedNationality: '',\n      selectedProvince: 'batangas',\n      selectedHospital: ''\n    };\n  },\n\n  created() {\n    this.get();\n  },\n\n  methods: {\n    async get() {\n      const vm = this;\n      const resultRecordCount = 200;\n      let resultOffset = 0;\n      let url1 = `https://services5.arcgis.com/mnYJ21GiFTR97WFg/arcgis/rest/services/PH_masterlist/FeatureServer/0/query`;\n      vm.items = [];\n\n      do {\n        //let where = encodeURIComponent(`residence LIKE '%Quezon%'`);\n        //let where = (`residence LIKE '%Quezon%'`);\n        let where = encodeURIComponent(`1=1`);\n\n        if (vm.selectedProvince) {\n          where = encodeURIComponent(`residence LIKE '%${vm.selectedProvince}%'`);\n        }\n\n        let url2 = url1 + `?f=json&where=${where}&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&cacheHint=false&resultOffset=${resultOffset}&resultRecordCount=${resultRecordCount}`;\n\n        try {\n          await instance.get(url2).then(resp => {\n            const data = resp.data;\n            data.features.map(item => {\n              if (item.attributes.nationalit == 'For validation') item.attributes.nationalit = '';\n              if (item.attributes.residence == 'For validation') item.attributes.residence = '';\n              if (item.attributes.confirmed == 'For validation') item.attributes.confirmed = '';\n              if (item.attributes.facility == 'For validation') item.attributes.facility = '';\n            });\n            vm.items = vm.items.concat(data.features);\n            vm.hasNextRows = data.exceededTransferLimit;\n          });\n        } catch (e) {\n          alert(e);\n        }\n\n        resultOffset += resultRecordCount + 1;\n      } while (vm.hasNextRows);\n    },\n\n    async onProviceChanged() {\n      //alert(this.selectedProvince)\n      const vm = this;\n      await vm.get();\n    }\n\n  }\n});\n\n//# sourceURL=webpack:///./ClientApp/app.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./ClientApp/app.vue?vue&type=template&id=0470902a&":
/*!****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./ClientApp/app.vue?vue&type=template&id=0470902a& ***!
  \****************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {},\n    [\n      _c(\n        \"div\",\n        { staticClass: \"d-flex flex-column flex-md-row justify-content-end\" },\n        [\n          _c(\"div\", { staticClass: \"form-group\" }, [\n            _c(\"div\", { staticClass: \"input-group mb-3\" }, [\n              _vm._m(0),\n              _vm._v(\" \"),\n              _c(\n                \"select\",\n                {\n                  directives: [\n                    {\n                      name: \"model\",\n                      rawName: \"v-model\",\n                      value: _vm.selectedProvince,\n                      expression: \"selectedProvince\"\n                    }\n                  ],\n                  staticClass: \"custom-select\",\n                  on: {\n                    change: [\n                      function($event) {\n                        var $$selectedVal = Array.prototype.filter\n                          .call($event.target.options, function(o) {\n                            return o.selected\n                          })\n                          .map(function(o) {\n                            var val = \"_value\" in o ? o._value : o.value\n                            return val\n                          })\n                        _vm.selectedProvince = $event.target.multiple\n                          ? $$selectedVal\n                          : $$selectedVal[0]\n                      },\n                      _vm.onProviceChanged\n                    ]\n                  }\n                },\n                [\n                  _c(\"option\", { attrs: { value: \"\" } }, [_vm._v(\"All\")]),\n                  _vm._v(\" \"),\n                  _c(\"option\", { attrs: { value: \"batangas\" } }, [\n                    _vm._v(\"Batangas\")\n                  ]),\n                  _vm._v(\" \"),\n                  _c(\"option\", { attrs: { value: \"laguna\" } }, [\n                    _vm._v(\"Laguna\")\n                  ])\n                ]\n              )\n            ])\n          ]),\n          _vm._v(\" \"),\n          _vm._m(1)\n        ]\n      ),\n      _vm._v(\" \"),\n      _c(\"line-chart\"),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"table-responsive\" }, [\n        _vm._v(\"\\n        Total: \" + _vm._s(_vm.items.length) + \"\\n        \"),\n        _c(\"table\", { staticClass: \"table table-bordered table-sm\" }, [\n          _vm._m(2),\n          _vm._v(\" \"),\n          _c(\n            \"tbody\",\n            _vm._l(_vm.items, function(feat, index) {\n              return _c(\"tr\", [\n                _c(\"td\", [_vm._v(_vm._s(index + 1))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.FID))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.PH_masterl))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.edad))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.kasarian))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.nationalit))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.residence))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.travel_hx))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.symptoms))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.confirmed))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.facility))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.status))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.epi_link))]),\n                _vm._v(\" \"),\n                _c(\"td\", [_vm._v(_vm._s(feat.attributes.petsa))])\n              ])\n            }),\n            0\n          )\n        ])\n      ])\n    ],\n    1\n  )\n}\nvar staticRenderFns = [\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"input-group-prepend\" }, [\n      _c(\n        \"span\",\n        { staticClass: \"input-group-text\", attrs: { id: \"basic-addon1\" } },\n        [_vm._v(\"Province\")]\n      )\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"div\", { staticClass: \"form-group ml-md-2\" }, [\n      _c(\"button\", { staticClass: \"btn btn-primary\" }, [\n        _c(\"span\", { staticClass: \"fas fa-fw fa-sync\" })\n      ])\n    ])\n  },\n  function() {\n    var _vm = this\n    var _h = _vm.$createElement\n    var _c = _vm._self._c || _h\n    return _c(\"thead\", [\n      _c(\"tr\", [\n        _c(\"td\", [_vm._v(\"#\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"FID\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"PH_masterl\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"edad\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"kasarian\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"nationalit\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"residence\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"travel_hx\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"symptoms\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"confirmed\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"facility\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"status\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"epi_link\")]),\n        _vm._v(\" \"),\n        _c(\"td\", [_vm._v(\"petsa\")])\n      ])\n    ])\n  }\n]\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./ClientApp/app.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ })

/******/ });