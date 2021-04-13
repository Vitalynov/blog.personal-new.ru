/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./#src/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./#src/js/app.js":
/*!************************!*\
  !*** ./#src/js/app.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _plagin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plagin */ \"./#src/js/plagin.js\");\n/* harmony import */ var _moduls_openBtns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moduls/openBtns */ \"./#src/js/moduls/openBtns.js\");\n/* harmony import */ var _moduls_burger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./moduls/burger */ \"./#src/js/moduls/burger.js\");\n/* \r\nПримеры webpack\r\nЭкспорты:\r\n    export let one = 1;\r\n           let two = 2\r\n    export {two}\r\n    export defoult function arr(){ - передаем по дефолту\r\n        console.log('Helo!');\r\n}\r\nИмпорты:\r\n    import {one} from './moduls/function'; - именованный синтаксис\r\n    import {one, tow} from './moduls/function'; - именованный синтаксис\r\n    import {one as num} from './moduls/function'; - переименование переменной one в num\r\n    import * as data from './moduls/function'; \r\n        console log (`${data.one} and ${data.tow}`)\r\n    import arr from './moduls/function'; - принимаем по дефолту\r\n        arr();\r\n*/\n// импорт блоков Swiper\n\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  'use strict';\n\n  _plagin__WEBPACK_IMPORTED_MODULE_0__[\"$\"].modal = function () {\n    //Функция создания модального окна\n    function _createModal() {\n      var modalWindow = document.createElement('div');\n      modalWindow.classList.add('modal');\n      modalWindow.setAttribute('data-clouse', 'true');\n      modalWindow.insertAdjacentHTML('afterbegin', \"<div class=\\\"modal__content\\\">\\n                </div>\");\n      document.body.append(modalWindow);\n      return modalWindow;\n    }\n\n    var $modal = _createModal(); //создание методов модального окна open, clouse, setContent, destroy\n\n\n    var modal = {\n      open: function open() {\n        $modal.classList.add('modal-whowe');\n        document.body.classList.add('no-scroll');\n      },\n      clouse: function clouse() {\n        $modal.classList.remove('modal-whowe');\n        setTimeout(function () {\n          modal.destroy();\n        }, 300);\n        document.body.classList.remove('no-scroll');\n      },\n      setContent: function setContent(classAdd, contentHtml) {\n        $modal.querySelector(\".modal__content\").classList.add(classAdd);\n        $modal.querySelector(\".modal__content\").innerHTML = contentHtml;\n      }\n    };\n    $modal.addEventListener('click', function (e) {\n      var target = e.target;\n\n      if (target.dataset.clouse) {\n        modal.clouse();\n      }\n    });\n    return Object.assign(modal, {\n      destroy: function destroy() {\n        $modal.parentElement.removeChild($modal);\n      }\n    });\n  };\n\n  Object(_moduls_openBtns__WEBPACK_IMPORTED_MODULE_1__[\"openModalBtn\"])();\n  Object(_moduls_burger__WEBPACK_IMPORTED_MODULE_2__[\"burgerToggleMenu\"])();\n});\n\n//# sourceURL=webpack:///./#src/js/app.js?");

/***/ }),

/***/ "./#src/js/moduls/burger.js":
/*!**********************************!*\
  !*** ./#src/js/moduls/burger.js ***!
  \**********************************/
/*! exports provided: burgerToggleMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"burgerToggleMenu\", function() { return burgerToggleMenu; });\n//require(\"@babel/polyfill\");\n\n/* Burger */\nvar burgerToggleMenu = function burgerToggleMenu() {\n  var burger = document.getElementById('burgerToggle'),\n      page = document.getElementById('page'),\n      body = document.body;\n  burger.addEventListener('click', function (e) {\n    if (body.classList.contains('showe-sidebar')) {\n      closeSidebar();\n    } else {\n      showSidebar();\n    }\n  });\n\n  function showSidebar() {\n    var mask = document.createElement('div');\n    mask.classList.add('page__mask');\n    mask.addEventListener('click', closeSidebar);\n    page.append(mask);\n    body.classList.add('showe-sidebar', 'no-scroll');\n  }\n\n  function closeSidebar() {\n    console.log('Klick');\n    body.classList.remove('showe-sidebar', 'no-scroll');\n    document.querySelector('.page__mask').remove();\n  }\n};\n\n//# sourceURL=webpack:///./#src/js/moduls/burger.js?");

/***/ }),

/***/ "./#src/js/moduls/openBtns.js":
/*!************************************!*\
  !*** ./#src/js/moduls/openBtns.js ***!
  \************************************/
/*! exports provided: openModalBtn */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"openModalBtn\", function() { return openModalBtn; });\n/* harmony import */ var _plagin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plagin */ \"./#src/js/plagin.js\");\n\nvar openModalBtn = function openModalBtn() {\n  //Вешаем КЛИК на весь документ и дилигируем событие\n  document.addEventListener('click', function (e) {\n    //e.preventDefault();\n    //присваиваем в переменную btnType КЛИК с кнопками data-btn\n    var btnType = e.target.dataset.btn; //функция открытия модального окна \n\n    var openModal = function openModal(classAdd, content) {\n      //формируем модалку в DOM-дереве докумета\n      var modal = _plagin__WEBPACK_IMPORTED_MODULE_0__[\"$\"].modal();\n      console.log(modal); //вставляем в модальное окно выбранный контент в зависимости от нажатой кнопки\n\n      modal.setContent(classAdd, content); //устанавливаем задержку открыия модального окна на 0.15 сек., что бы востановить анимацию\n\n      setTimeout(function () {\n        modal.open();\n      }, 150);\n    }; //Если КЛИК на кнопке с атрибутом data-btn, то вызывам данные из .JSON файла\n\n\n    if (btnType) {\n      //Вызывам данные из .JSON файла\n      fetch('json/modalContent.json').then(function (data) {\n        return data.json();\n      }) //получаем данные data в .JSON формате.\n      .then(function (res) {\n        //получаем данные res в формате Objekt.\n        //Проверяем, какая кнопка нажата, такие и передаем данные для формирования контента модального окна\n        switch (btnType) {\n          case 'contactModal':\n            openModal(res.contactModal.classAdd, res.contactModal.content);\n            break;\n\n          case 'shareModal':\n            openModal(res.shareModal.classAdd, res.shareModal.content);\n            break;\n\n          case 'storyModal':\n            openModal(res.storyModal.classAdd, res.storyModal.content);\n            break;\n        }\n      }) //Если произошла ошибка, то она высветится на экране.\n      [\"catch\"](function () {\n        if (btnType) {\n          //let modal = $.modal({});\n          //modal.setContent('Проверьте интернет...', '');\n          openModal('Проверьте интернет...', '');\n          setTimeout(function () {\n            modal.open();\n          }, 150);\n        }\n      });\n    }\n  });\n};\n\n//# sourceURL=webpack:///./#src/js/moduls/openBtns.js?");

/***/ }),

/***/ "./#src/js/plagin.js":
/*!***************************!*\
  !*** ./#src/js/plagin.js ***!
  \***************************/
/*! exports provided: $ */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"$\", function() { return $; });\nvar $ = {};\n\n//# sourceURL=webpack:///./#src/js/plagin.js?");

/***/ })

/******/ });