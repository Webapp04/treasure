"use strict";(self.webpackChunkairdrop_client=self.webpackChunkairdrop_client||[]).push([[152],{"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){var _i=null==arr?null:"undefined"!=typeof Symbol&&arr[Symbol.iterator]||arr["@@iterator"];if(null!=_i){var _s,_e,_x,_r,_arr=[],_n=!0,_d=!1;try{if(_x=(_i=_i.call(arr)).next,0===i){if(Object(_i)!==_i)return;_n=!1}else for(;!(_n=(_s=_x.call(_i)).done)&&(_arr.push(_s.value),_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{if(!_n&&null!=_i.return&&(_r=_i.return(),Object(_r)!==_r))return}finally{if(_d)throw _e}}return _arr}}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(o){if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);return"Object"===n&&o.constructor&&(n=o.constructor.name),"Map"===n||"Set"===n?Array.from(o):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(o,minLen):void 0}}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}__webpack_require__.d(__webpack_exports__,{Z:function(){return _slicedToArray}})},"./src/constant/blockchain.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Ey:function(){return MAX_LEVEL},Rj:function(){return BASE_REWARD},kq:function(){return MAX_CHEST_TIER}});var _MARKETPLACE_STATUS,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),process=__webpack_require__("./node_modules/process/browser.js"),MAX_LEVEL=(process.env.REACT_APP_NFKEY_ADDRESS,process.env.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,150),MAX_CHEST_TIER=7,BASE_REWARD=.125;_MARKETPLACE_STATUS={},(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(_MARKETPLACE_STATUS,0,{title:"Pending"}),(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(_MARKETPLACE_STATUS,1,{title:"Minted"}),(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(_MARKETPLACE_STATUS,2,{title:"On sale"}),(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(_MARKETPLACE_STATUS,3,{title:"Auction"}),(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(_MARKETPLACE_STATUS,4,{title:"Ruffle"}),(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__.Z)(_MARKETPLACE_STATUS,5,{title:"Staked"})},"./src/storybook/molecule/FounderKeyTab/founderKeyTab.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return founderKeyTab}});var slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/react/index.js"),blockchain=__webpack_require__("./src/constant/blockchain.js"),smallKeyTimer=__webpack_require__("./src/storybook/molecule/SmallKeyTimer/smallKeyTimer.jsx"),utils=__webpack_require__("./src/utils/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),FounderKeyTab=function FounderKeyTab(_ref){var _ref$tokenId=_ref.tokenId,tokenId=void 0===_ref$tokenId?0:_ref$tokenId,_ref$tier=_ref.tier,tier=void 0===_ref$tier?0:_ref$tier,tierTresr=_ref.tierTresr,_ref$staked=_ref.staked,staked=void 0===_ref$staked||_ref$staked,isAnimated=_ref.isAnimated,contractAddress=_ref.contractAddress,_ref$onNFKey=_ref.onNFKey,onNFKey=void 0===_ref$onNFKey?function(){}:_ref$onNFKey,_ref$spaceThumbnailSm=_ref.spaceThumbnailSmall,spaceThumbnailSmall=void 0===_ref$spaceThumbnailSm?"https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg":_ref$spaceThumbnailSm,days=_ref.days,hours=_ref.hours,minutes=_ref.minutes,seconds=_ref.seconds,nftSelected=_ref.nftSelected,_useState=(0,react.useState)(0),_useState2=(0,slicedToArray.Z)(_useState,2),timeToUpgrade=_useState2[0],_useState3=(_useState2[1],(0,react.useState)(0)),_useState4=(0,slicedToArray.Z)(_useState3,2),startUpgradeDelay=_useState4[0],_useState5=(_useState4[1],(0,react.useState)(0)),_useState6=(0,slicedToArray.Z)(_useState5,2),percentToUpgrade=_useState6[0],setPercentToUpgrade=_useState6[1],_useState7=(0,react.useState)(0),_useState8=(0,slicedToArray.Z)(_useState7,2),timerID=_useState8[0],chestProgressLine=(_useState8[1],blockchain.kq/tierTresr),chestProgressLineWidth=chestProgressLine<=1?100:100/chestProgressLine,isActive=tokenId===(null==nftSelected?void 0:nftSelected.tokenId);return(0,react.useEffect)((function(){return clearInterval(timerID),(0,utils.sA)((new Date).getTime()/1e3,timeToUpgrade)&&setPercentToUpgrade(100),function(){return clearInterval(timerID)}}),[timeToUpgrade,startUpgradeDelay]),(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab ".concat(isActive?"active":""," hover:border-[#2D46D6]"),onClick:function onClick(){!isActive&&onNFKey(tokenId,contractAddress)},children:[(0,jsx_runtime.jsx)("div",{className:"NFFounderKeyTab__image",style:{background:"linear-gradient(45.44deg, #4964FE ".concat(percentToUpgrade,"%, rgba(73, 100, 254, 0) 48.31%)")},children:(0,jsx_runtime.jsx)("img",{src:spaceThumbnailSmall,alt:""})}),isAnimated?(0,jsx_runtime.jsx)(jsx_runtime.Fragment,{}):(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab__info",children:[(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab__info--title",children:[(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab__info--title__name ".concat(isActive?"NFFounderKeyTab__info--title__name--active":""),children:["Founder’s Key #",tokenId]}),(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab__info--title__count ".concat(isActive?"NFFounderKeyTab__info--title__count--active":""),children:["Level ",tier]})]}),staked?(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab__info--wrapper",children:[(0,jsx_runtime.jsxs)("div",{className:"NFFounderKeyTab__info--progressLine",children:[(0,jsx_runtime.jsx)("div",{className:"NFFounderKeyTab__info--progressLine__bar yellow ".concat(isActive?"yellow__active":""),style:{width:"".concat(chestProgressLineWidth,"%")}}),(0,jsx_runtime.jsxs)("div",{className:"progressLine__text",style:{mixBlendMode:"difference"},children:["Tier ",tierTresr,"/",blockchain.kq]})]}),(0,jsx_runtime.jsx)(smallKeyTimer.Z,{days:days,hours:hours,minutes:minutes,seconds:seconds,isActive:isActive})]}):(0,jsx_runtime.jsx)("div",{className:"NFFounderKeyTab__info--inactive ".concat(isActive?"NFFounderKeyTab__info--inactive__active":""),children:"inactive"})]})]})};FounderKeyTab.__docgenInfo={description:"",methods:[],displayName:"FounderKeyTab",props:{tokenId:{defaultValue:{value:"0",computed:!1},required:!1},tier:{defaultValue:{value:"0",computed:!1},required:!1},staked:{defaultValue:{value:"true",computed:!1},required:!1},onNFKey:{defaultValue:{value:"() => {}",computed:!1},required:!1},spaceThumbnailSmall:{defaultValue:{value:'"https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg"',computed:!1},required:!1}}};var founderKeyTab=FounderKeyTab},"./src/storybook/molecule/FounderKeyTab/founderKeyTab.stories.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{FounderKeyTab:function(){return FounderKeyTab},__namedExportsOrder:function(){return __namedExportsOrder}});var _Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/objectSpread2.js"),_founderKeyTab__WEBPACK_IMPORTED_MODULE_1__=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./src/storybook/molecule/FounderKeyTab/founderKeyTab.jsx")),react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/react/jsx-runtime.js");__webpack_exports__.default={title:"Molecules/FounderKeyTab",component:_founderKeyTab__WEBPACK_IMPORTED_MODULE_1__.Z,argTypes:{isAnimated:{control:{type:"boolean"}},staked:{control:{type:"boolean"}}}};var FounderKeyTab=function Template(args){return(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_founderKeyTab__WEBPACK_IMPORTED_MODULE_1__.Z,(0,_Users_apple_Documents_treasure_node_modules_babel_runtime_helpers_esm_objectSpread2_js__WEBPACK_IMPORTED_MODULE_3__.Z)({},args))}.bind({});FounderKeyTab.args={tokenId:0,tier:0,staked:!0,isAnimated:!1,onNFKey:function onNFKey(){},spaceThumbnailSmall:"https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/100x100.jpg"};var __namedExportsOrder=["FounderKeyTab"]},"./src/storybook/molecule/SmallKeyTimer/smallKeyTimer.jsx":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{Z:function(){return smallKeyTimer}});var react=__webpack_require__("./node_modules/react/index.js"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js"),smallKeyTimer=function SmallKeyTimer(_ref){var days=_ref.days,hours=_ref.hours,minutes=_ref.minutes,seconds=_ref.seconds,isActive=_ref.isActive;return(0,react.useMemo)((function(){return(0,jsx_runtime.jsxs)("div",{className:"smallKeyTimer ".concat(isActive?"smallKeyTimer__isActive":""),children:[(0,jsx_runtime.jsx)("div",{children:days>0?days:"00"}),(0,jsx_runtime.jsx)("div",{children:":"}),(0,jsx_runtime.jsx)("div",{children:hours>0?hours:"00"}),(0,jsx_runtime.jsx)("div",{children:":"}),(0,jsx_runtime.jsx)("div",{children:minutes>0?minutes:"00"}),(0,jsx_runtime.jsx)("div",{children:":"}),(0,jsx_runtime.jsx)("div",{children:seconds>0?seconds:"00"})]})}),[days,hours,minutes,seconds])}},"./src/utils/index.js":function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{AB:function(){return formatterUS},sA:function(){return compareUnixDates},tm:function(){return setActiveNavLink}});__webpack_require__("./node_modules/moment/moment.js");var setActiveNavLink=function setActiveNavLink(_ref){return _ref.isActive?"active":""},compareUnixDates=function compareUnixDates(date1,date2){return Math.floor(date1)>Math.floor(date2)},formatterUS=function formatterUS(number){var maximumFractionDigits=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2;return new Intl.NumberFormat("en-US",{maximumFractionDigits:maximumFractionDigits}).format(number)||0}}}]);