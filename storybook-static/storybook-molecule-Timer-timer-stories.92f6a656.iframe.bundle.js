"use strict";(self.webpackChunkairdrop_client=self.webpackChunkairdrop_client||[]).push([[249],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./src/storybook/molecule/Timer/timer.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return timer}});__webpack_require__("./node_modules/react/index.js");var jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),Timer=function Timer(_ref){var _ref$hours=_ref.hours,hours=void 0===_ref$hours?0:_ref$hours,_ref$minutes=_ref.minutes,minutes=void 0===_ref$minutes?0:_ref$minutes,_ref$seconds=_ref.seconds,seconds=void 0===_ref$seconds?0:_ref$seconds,_ref$days=_ref.days,days=void 0===_ref$days?0:_ref$days;return(0,jsx_runtime.jsxs)("div",{className:"timer",children:[(0,jsx_runtime.jsxs)("div",{className:"timer__element",children:[(0,jsx_runtime.jsx)("div",{className:"timer__element--count",children:days>0?days:"00"}),(0,jsx_runtime.jsx)("div",{className:"timer__element--label",children:"Days"})]}),(0,jsx_runtime.jsxs)("div",{className:"timer__element",children:[(0,jsx_runtime.jsx)("div",{className:"timer__element--count",children:hours>0?hours:"00"}),(0,jsx_runtime.jsx)("div",{className:"timer__element--label",children:"hrs"})]}),(0,jsx_runtime.jsxs)("div",{className:"timer__element",children:[(0,jsx_runtime.jsx)("div",{className:"timer__element--count",children:minutes>0?minutes:"00"}),(0,jsx_runtime.jsx)("div",{className:"timer__element--label",children:"mins"})]}),(0,jsx_runtime.jsxs)("div",{className:"timer__element",children:[(0,jsx_runtime.jsx)("div",{className:"timer__element--count",children:seconds>0?seconds:"00"}),(0,jsx_runtime.jsx)("div",{className:"timer__element--label",children:"secs"})]})]})};Timer.__docgenInfo={description:"",methods:[],displayName:"Timer",props:{hours:{defaultValue:{value:"0",computed:!1},required:!1},minutes:{defaultValue:{value:"0",computed:!1},required:!1},seconds:{defaultValue:{value:"0",computed:!1},required:!1},days:{defaultValue:{value:"0",computed:!1},required:!1}}};var timer=Timer},"./src/storybook/molecule/Timer/timer.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Timer:function(){return Timer},__namedExportsOrder:function(){return __namedExportsOrder}});var _Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_timer__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/storybook/molecule/Timer/timer.jsx")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"Molecules/Timer",component:_timer__WEBPACK_IMPORTED_MODULE_1__.Z,argTypes:{}};var Timer=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_timer__WEBPACK_IMPORTED_MODULE_1__.Z,(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},args))}.bind({});Timer.args={};var __namedExportsOrder=["Timer"]}}]);