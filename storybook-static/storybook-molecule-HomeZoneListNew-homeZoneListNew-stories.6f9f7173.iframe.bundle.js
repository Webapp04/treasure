/*! For license information please see storybook-molecule-HomeZoneListNew-homeZoneListNew-stories.6f9f7173.iframe.bundle.js.LICENSE.txt */
(self.webpackChunkairdrop_client=self.webpackChunkairdrop_client||[]).push([[989],{"./node_modules/@babel/runtime/helpers/esm/defineProperty.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return _defineProperty}});var esm_typeof=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/typeof.js");function _toPropertyKey(arg){var key=function _toPrimitive(input,hint){if("object"!==(0,esm_typeof.Z)(input)||null===input)return input;var prim=input[Symbol.toPrimitive];if(void 0!==prim){var res=prim.call(input,hint||"default");if("object"!==(0,esm_typeof.Z)(res))return res;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===hint?String:Number)(input)}(arg,"string");return"symbol"===(0,esm_typeof.Z)(key)?key:String(key)}function _defineProperty(obj,key,value){return(key=_toPropertyKey(key))in obj?Object.defineProperty(obj,key,{value:value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}},"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectSpread2}});var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js");function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread2(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){(0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}},"./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _objectWithoutProperties(source,excluded){if(null==source)return{};var key,i,target=function _objectWithoutPropertiesLoose(source,excluded){if(null==source)return{};var key,i,target={},sourceKeys=Object.keys(source);for(i=0;i<sourceKeys.length;i++)key=sourceKeys[i],excluded.indexOf(key)>=0||(target[key]=source[key]);return target}(source,excluded);if(Object.getOwnPropertySymbols){var sourceSymbolKeys=Object.getOwnPropertySymbols(source);for(i=0;i<sourceSymbolKeys.length;i++)key=sourceSymbolKeys[i],excluded.indexOf(key)>=0||Object.prototype.propertyIsEnumerable.call(source,key)&&(target[key]=source[key])}return target}__webpack_require__.d(__webpack_exports__,{Z:function(){return _objectWithoutProperties}})},"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}__webpack_require__.d(__webpack_exports__,{Z:function(){return _slicedToArray}})},"./node_modules/@babel/runtime/helpers/esm/typeof.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(obj){return typeof obj}:function(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}__webpack_require__.d(__webpack_exports__,{Z:function(){return _typeof}})},"./src/hooks/useWidowDimensions.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";var _Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js"),getWindowDimensions=function getWindowDimensions(){var value="undefined"!=typeof window;return{width:value?window.innerWidth:0,height:value?window.innerHeight:0}};__webpack_exports__.Z=function useWindowDimensions(){var _useState=(0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(getWindowDimensions()),_useState2=(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_slicedToArray_js__WEBPACK_IMPORTED_MODULE_1__.Z)(_useState,2),windowDimensions=_useState2[0],setWindowDimensions=_useState2[1];return(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((function(){function handleResize(){window&&setWindowDimensions({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",handleResize),function(){return window.removeEventListener("resize",handleResize)}}),[]),windowDimensions}},"./src/storybook/atom/Button/button.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{JI:function(){return ButtonCategoryTypes},Ph:function(){return ButtonSizes},ZP:function(){return Button_button}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),objectWithoutProperties=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),classnames=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/classnames/index.js")),classnames_default=__webpack_require__.n(classnames),icon=__webpack_require__("./src/storybook/atom/Icon/icon.jsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["className","variant","size","label","iconPosition","disabled","iconName","onClick"],ButtonCategoryTypes={primary:"primary",secondary:"secondary",outlined:"outlined",shadow:"shadow"},ButtonSizes={small:"small",medium:"medium",large:"large"},Button=function Button(_ref){var _ref$className=_ref.className,className=void 0===_ref$className?"":_ref$className,_ref$variant=_ref.variant,variant=void 0===_ref$variant?"primary":_ref$variant,_ref$size=_ref.size,size=void 0===_ref$size?"medium":_ref$size,label=_ref.label,iconPosition=_ref.iconPosition,_ref$disabled=_ref.disabled,disabled=void 0!==_ref$disabled&&_ref$disabled,_ref$iconName=_ref.iconName,iconName=void 0===_ref$iconName?icon.j.circleplus:_ref$iconName,onClick=_ref.onClick,props=(0,objectWithoutProperties.Z)(_ref,_excluded);return(0,jsx_runtime.jsxs)("button",(0,objectSpread2.Z)((0,objectSpread2.Z)({type:"button",onClick:onClick,className:classnames_default()("button_wrapper",(0,defineProperty.Z)({buttonPrimary:variant===ButtonCategoryTypes.primary,buttonSecondary:variant===ButtonCategoryTypes.secondary,buttonOutlined:variant===ButtonCategoryTypes.outlined,buttonShadow:variant===ButtonCategoryTypes.shadow,buttonSmall:size===ButtonSizes.small,buttonMedium:size===ButtonSizes.medium,buttonLarge:size===ButtonSizes.large,buttonDisabled:disabled},className,Boolean(className))),disabled:disabled},props),{},{children:["start"===iconPosition&&iconName&&(0,jsx_runtime.jsx)(icon.Z,{iconName:iconName,className:"iconStyle"}),label||"","end"===iconPosition&&iconName&&(0,jsx_runtime.jsx)(icon.Z,{iconName:iconName,className:"iconStyle"})]}))};Button.__docgenInfo={description:"",methods:[],displayName:"Button",props:{className:{defaultValue:{value:'""',computed:!1},required:!1},variant:{defaultValue:{value:'"primary"',computed:!1},required:!1},size:{defaultValue:{value:'"medium"',computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},iconName:{defaultValue:{value:"IconsNames.circleplus",computed:!0},required:!1}}};var Button_button=Button},"./src/storybook/molecule/HomeZoneListNew/homeZoneListNew.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{HomeZoneListNew:function(){return homeZoneListNew_stories_HomeZoneListNew},__namedExportsOrder:function(){return __namedExportsOrder},default:function(){return homeZoneListNew_stories}});var objectSpread2=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),useWidowDimensions=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/hooks/useWidowDimensions.js"));var home_arrow=__webpack_require__.p+"static/media/home_arrow.5af5aa967ba56783b02b222c905122a3.svg";var home_arrow_mobile=__webpack_require__.p+"static/media/home_arrow_mobile.f060640dce5f64a65d61b08cfe42e4bc.svg";var home_arrow_blue=__webpack_require__.p+"static/media/home_arrow_blue.99bec684c6e185b9d245148019788a63.svg",zoneItem=__webpack_require__("./src/storybook/molecule/ZoneItem/zoneItem.jsx"),Button_button=__webpack_require__("./src/storybook/atom/Button/button.jsx"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),HomeZoneListNew=function HomeZoneListNew(_ref){var isDark=_ref.isDark,isZone1=_ref.isZone1,isZone2=_ref.isZone2,isZone3=_ref.isZone3,isZone4=_ref.isZone4,zoneChecked=_ref.zoneChecked,_ref$setZoneChecked=_ref.setZoneChecked,setZoneChecked=void 0===_ref$setZoneChecked?function(){}:_ref$setZoneChecked,_ref$zoneAmount=_ref.zoneAmount,zoneAmount=void 0===_ref$zoneAmount?0:_ref$zoneAmount,_ref$setZoneAmount=_ref.setZoneAmount,setZoneAmount=void 0===_ref$setZoneAmount?function(){}:_ref$setZoneAmount,zone2Commission=_ref.zone2Commission,zone3Commission=_ref.zone3Commission,zone4Commission=_ref.zone4Commission,zone5Commission=_ref.zone5Commission,_ref$zoneSumAmount=_ref.zoneSumAmount,zoneSumAmount=void 0===_ref$zoneSumAmount?0:_ref$zoneSumAmount,zoneSumCommission=_ref.zoneSumCommission,handleMintConfirmationModal=_ref.handleMintConfirmationModal,windowDimensions=(0,useWidowDimensions.Z)(),isMobile=(null==windowDimensions?void 0:windowDimensions.width)<=800;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[isZone1||isZone2||isZone3||isZone4?(0,jsx_runtime.jsxs)("div",{className:"homeZoneListNew__topText",children:[isMobile?(0,jsx_runtime.jsx)("img",{alt:"",src:home_arrow_mobile}):(0,jsx_runtime.jsx)("img",{alt:"",src:isDark?home_arrow:home_arrow_blue}),(0,jsx_runtime.jsx)("p",{children:"Click Diamond Below to Mint."})]}):(0,jsx_runtime.jsxs)("div",{className:"homeZoneListNew__topText homeZoneListNew__topText__position",children:[isMobile?(0,jsx_runtime.jsx)("img",{alt:"",src:home_arrow_mobile}):(0,jsx_runtime.jsx)("img",{alt:"",src:isDark?home_arrow:home_arrow_blue}),(0,jsx_runtime.jsx)("p",{children:"Click Diamond Below to Mint."})]}),(0,jsx_runtime.jsxs)("div",{className:"homeZoneListNew__list",children:[isZone1&&(0,jsx_runtime.jsx)(zoneItem.Z,{isDark:isDark,isMobile:isMobile,title:"Diamond Hand",isDisabled:!(null!=zoneChecked&&zoneChecked[0]),amount:null==zoneAmount?void 0:zoneAmount[0],onChecked:function onChecked(){return setZoneChecked(null==zoneChecked?void 0:zoneChecked.map((function(item,key){return 0===key?!(null!=zoneChecked&&zoneChecked[0]):item})))},setAmount:function setAmount(value){return+value<=40&&setZoneAmount(null==zoneAmount?void 0:zoneAmount.map((function(item,key){return 0===key?value:item})))},price:"Free Mint"}),isZone2&&(0,jsx_runtime.jsx)(zoneItem.Z,{isDark:isDark,isMobile:isMobile,title:"Dragon Hand",isDisabled:!(null!=zoneChecked&&zoneChecked[1]),amount:null==zoneAmount?void 0:zoneAmount[1],onChecked:function onChecked(){return setZoneChecked(null==zoneChecked?void 0:zoneChecked.map((function(item,key){return 1===key?!(null!=zoneChecked&&zoneChecked[1]):item})))},setAmount:function setAmount(value){return+value<=40&&setZoneAmount(null==zoneAmount?void 0:zoneAmount.map((function(item,key){return 1===key?value:item})))},price:"".concat(+((null==zoneAmount?void 0:zoneAmount[1])*zone2Commission).toFixed(2)," AVAX")}),isZone3&&(0,jsx_runtime.jsx)(zoneItem.Z,{isDark:isDark,isMobile:isMobile,title:"Emerald",isDisabled:!(null!=zoneChecked&&zoneChecked[2]),withInput:!0,amount:null==zoneAmount?void 0:zoneAmount[2],onChecked:function onChecked(){return setZoneChecked(null==zoneChecked?void 0:zoneChecked.map((function(item,key){return 2===key?!zoneChecked[2]:item})))},setAmount:function setAmount(value){return+value<=40&&setZoneAmount(null==zoneAmount?void 0:zoneAmount.map((function(item,key){return 2===key?value:item})))},price:"".concat(+((null==zoneAmount?void 0:zoneAmount[2])*zone3Commission).toFixed(2)," AVAX")}),isZone4&&(0,jsx_runtime.jsx)(zoneItem.Z,{isDark:isDark,isMobile:isMobile,title:"Sapphire",isDisabled:!(null!=zoneChecked&&zoneChecked[3]),withInput:!0,amount:null==zoneAmount?void 0:zoneAmount[3],onChecked:function onChecked(){return setZoneChecked(null==zoneChecked?void 0:zoneChecked.map((function(item,key){return 3===key?!(null!=zoneChecked&&zoneChecked[3]):item})))},setAmount:function setAmount(value){return+value<=40&&setZoneAmount(null==zoneAmount?void 0:zoneAmount.map((function(item,key){return 3===key?value:item})))},price:"".concat(+((null==zoneAmount?void 0:zoneAmount[3])*zone4Commission).toFixed(2)," AVAX")}),(0,jsx_runtime.jsx)(zoneItem.Z,{isDark:isDark,isMobile:isMobile,title:"Ruby",isDisabled:!(null!=zoneChecked&&zoneChecked[4]),withInput:!0,amount:null==zoneAmount?void 0:zoneAmount[4],onChecked:function onChecked(){return setZoneChecked(null==zoneChecked?void 0:zoneChecked.map((function(item,key){return 4===key?!(null!=zoneChecked&&zoneChecked[4]):item})))},setAmount:function setAmount(value){return+value<=40&&setZoneAmount(null==zoneAmount?void 0:zoneAmount.map((function(item,key){return 4===key?value:item})))},price:"".concat(+((null==zoneAmount?void 0:zoneAmount[4])*zone5Commission).toFixed(2)," AVAX")})]}),(0,jsx_runtime.jsxs)("div",{className:"homeZoneListNew__mintAll",children:[(0,jsx_runtime.jsx)(Button_button.ZP,{onClick:null==handleMintConfirmationModal?void 0:handleMintConfirmationModal.open,label:"Mint ".concat(zoneSumAmount," Keys for ").concat(zoneSumCommission," AVAX"),disabled:zoneSumAmount>40||(null==zoneChecked?void 0:zoneChecked.every((function(item){return!item}))),variant:"shadow",size:"large"}),(0,jsx_runtime.jsxs)("div",{className:"homeZoneListNew__mintAll--text",children:["You can mint max ",40," Keys per transaction."]})]})]})};HomeZoneListNew.__docgenInfo={description:"",methods:[],displayName:"HomeZoneListNew",props:{setZoneChecked:{defaultValue:{value:"() => {}",computed:!1},required:!1},zoneAmount:{defaultValue:{value:"0",computed:!1},required:!1},setZoneAmount:{defaultValue:{value:"() => {}",computed:!1},required:!1},zoneSumAmount:{defaultValue:{value:"0",computed:!1},required:!1}}};var homeZoneListNew=HomeZoneListNew,homeZoneListNew_stories={title:"Molecules/HomeZoneListNew",component:homeZoneListNew,argTypes:{}},homeZoneListNew_stories_HomeZoneListNew=function Template(args){return(0,jsx_runtime.jsx)(homeZoneListNew,(0,objectSpread2.Z)({},args))}.bind({});homeZoneListNew_stories_HomeZoneListNew.args={isMobile:!1,loaderIsActive:!1,isDark:!0};var __namedExportsOrder=["HomeZoneListNew"]},"./src/storybook/molecule/ZoneItem/zoneItem.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,{Z:function(){return zoneItem}});__webpack_require__("./node_modules/react/index.js");var heart_transparent=__webpack_require__.p+"static/media/heart_transparent.ee82053e781dd8240cb451ff0945b47e.svg";var heart_home=__webpack_require__.p+"static/media/heart_home.4c0f3e2affe929307ba20b0de7c38d78.svg";var plus=__webpack_require__.p+"static/media/plus.cedd0c507c61d798d8086e17fe4a9861.svg";var plus_blue=__webpack_require__.p+"static/media/plus_blue.17a92140844a02fcb6f5d08fae6655f1.svg";var minus=__webpack_require__.p+"static/media/minus.3c7509a8d59c80b82ea39403762b11a9.svg";var minus_blue=__webpack_require__.p+"static/media/minus_blue.172f149a564b026a25428c8bf72abf95.svg",jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),ZoneItem=function ZoneItem(_ref){var title=_ref.title,price=_ref.price,amount=_ref.amount,setAmount=_ref.setAmount,onChecked=_ref.onChecked,isDark=_ref.isDark,_ref$withInput=_ref.withInput,withInput=void 0!==_ref$withInput&&_ref$withInput,_ref$isDisabled=_ref.isDisabled,isDisabled=void 0===_ref$isDisabled||_ref$isDisabled,_ref$isMobile=_ref.isMobile,isMobile=void 0!==_ref$isMobile&&_ref$isMobile,onIncrease=function onIncrease(){isDisabled||setAmount(amount+1)},onDecrease=function onDecrease(){isDisabled||amount<=1||setAmount(amount-1)};return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsxs)("div",{className:"zoneItem",children:[(0,jsx_runtime.jsxs)("div",{className:"zoneItem__nameWrapper",onClick:onChecked,children:[(0,jsx_runtime.jsx)("img",{src:isDisabled?heart_transparent:heart_home,alt:"",className:"zoneItem__heart"}),(0,jsx_runtime.jsx)("p",{className:"zoneItem__name ".concat(isDisabled&&"zoneItem__name--disabled"),children:title}),!(!isMobile||withInput)&&(0,jsx_runtime.jsx)("p",{className:"zoneItem__key ".concat(isDisabled&&"zoneItem__key--disabled"),children:"1 Key"})]}),(0,jsx_runtime.jsxs)("div",{className:"zoneItem__priceWrapper",children:[!isMobile&&(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{children:withInput?(0,jsx_runtime.jsxs)("button",{className:"zoneItem__button",disabled:isDisabled,children:[(0,jsx_runtime.jsx)("div",{onClick:onDecrease,children:(0,jsx_runtime.jsx)("img",{src:isDark?minus:minus_blue,alt:""})}),(0,jsx_runtime.jsx)("span",{children:amount}),(0,jsx_runtime.jsx)("div",{onClick:onIncrease,children:(0,jsx_runtime.jsx)("img",{src:isDark?plus:plus_blue,alt:""})})]}):(0,jsx_runtime.jsx)("p",{className:"zoneItem__key ".concat(isDisabled&&"zoneItem__key--disabled"),children:"1 Key"})}),(0,jsx_runtime.jsx)("p",{className:"zoneItem__price",children:price})]})]}),!(!isMobile||!withInput)&&(0,jsx_runtime.jsxs)("button",{className:"zoneItem__button",disabled:isDisabled,children:[(0,jsx_runtime.jsx)("div",{onClick:onDecrease,children:(0,jsx_runtime.jsx)("img",{src:isDark?minus:minus_blue,alt:""})}),(0,jsx_runtime.jsx)("span",{children:amount}),(0,jsx_runtime.jsx)("div",{onClick:onIncrease,children:(0,jsx_runtime.jsx)("img",{src:isDark?plus:plus_blue,alt:""})})]})]})};ZoneItem.__docgenInfo={description:"",methods:[],displayName:"ZoneItem",props:{withInput:{defaultValue:{value:"false",computed:!1},required:!1},isDisabled:{defaultValue:{value:"true",computed:!1},required:!1},isMobile:{defaultValue:{value:"false",computed:!1},required:!1}}};var zoneItem=ZoneItem},"./node_modules/classnames/index.js":function(module,exports){var __WEBPACK_AMD_DEFINE_RESULT__;!function(){"use strict";var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)){if(arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}}else if("object"===argType){if(arg.toString!==Object.prototype.toString&&!arg.toString.toString().includes("[native code]")){classes.push(arg.toString());continue}for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):void 0===(__WEBPACK_AMD_DEFINE_RESULT__=function(){return classNames}.apply(exports,[]))||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)}()}}]);