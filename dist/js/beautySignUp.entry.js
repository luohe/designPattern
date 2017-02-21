/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _zepto = __webpack_require__(3);
	
	var _zepto2 = _interopRequireDefault(_zepto);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//性别
	/**
	 * Created by Administrator on 2017/2/7.
	 */
	(0, _zepto2.default)(document).on('click', '.sexSel', function () {
		var buttons1 = [{
			text: '请选择',
			label: true
		}, {
			text: '男',
			onClick: function onClick() {
				(0, _zepto2.default)(".sexSel").html("男<span class='selIcon'></span>").css({
					color: "black"
				});
				(0, _zepto2.default)("#sex").val(1);
			}
		}, {
			text: '女',
			bold: true,
			color: 'danger',
			onClick: function onClick() {
				(0, _zepto2.default)(".sexSel").html("女<span class='selIcon'></span>").css({
					color: "black"
				});
				(0, _zepto2.default)("#sex").val(2);
			}
		}];
		var buttons2 = [{
			text: '确定',
			bg: 'danger'
		}];
		var groups = [buttons1];
		_zepto2.default.actions(groups);
	});
	
	//出生年月
	var year = [],
	    month = [],
	    day = [],
	    curDay = void 0;
	
	var countDay = function countDay(index) {
		for (var i = 0; i < index; i++) {
			var _index = i + 1;
			if (_index > 0 && _index < 10) {
				_index = "0" + _index;
			}
			day.push(_index);
		}
	};
	
	var getCountDay = function getCountDay(year, month) {
		var yearN = year;
		var monthN = parseInt(month);
		var curDate = new Date(yearN, monthN, 0);
		return curDate.getDate();
	};
	
	var pickOpenMask = function pickOpenMask() {
		(0, _zepto2.default)(".page-current .content").append((0, _zepto2.default)("<div class='picker-mask'></div>"));
	};
	var pickCloseMask = function pickCloseMask() {
		(0, _zepto2.default)(".picker-mask").remove();
	};
	
	var dayPick = function dayPick() {
		(0, _zepto2.default)(".day input").picker({
			toolbarTemplate: toolbarTem("日期"),
			rotateEffect: true,
			readOnly: false,
			onOpen: function onOpen() {
				pickOpenMask();
			},
			onClose: function onClose() {
				pickCloseMask();
			},
			cols: [{
				textAlign: 'center',
				cssClass: "pickerF",
				values: day
			}]
		});
	};
	
	countDay(31);
	
	for (var i = 0; i < 31; i++) {
		var index = i + 1;
		if (index > 0 && index < 10) {
			index = "0" + index;
		}
		day.push(index);
	}
	
	for (var _i = 0; _i < 12; _i++) {
		var _index2 = _i + 1;
		if (_index2 > 0 && _index2 < 10) {
			_index2 = "0" + _index2;
		}
		month.push(_index2);
	}
	
	var toolbarTem = function toolbarTem(title) {
		return '<header class="bar bar-nav">  <button class="button button-link pull-right close-picker">\u786E\u5B9A</button>  <h1 class="title">' + title + '</h1>  </header>';
	};
	
	for (var _i2 = 1993; _i2 <= 2000; _i2++) {
		year.push(_i2);
	}
	
	(0, _zepto2.default)(".year input").picker({
		toolbarTemplate: toolbarTem("年份"),
		rotateEffect: true,
		cols: [{
			textAlign: 'center',
			cssClass: "pickerF",
			values: year
		}],
		onOpen: function onOpen() {
			var year = (0, _zepto2.default)("#month").val();
			var dayDom = (0, _zepto2.default)("#day");
			curDay = dayDom.val();
			pickOpenMask();
			if (!year) return;
			dayDom.remove();
			(0, _zepto2.default)("<input id='day' type='text' placeholder='日' readonly>").insertBefore((0, _zepto2.default)(".day .selIcon"));
			(0, _zepto2.default)("#day").val(curDay);
		},
		onClose: function onClose() {
			var year = (0, _zepto2.default)("#year").val();
			var month = parseInt((0, _zepto2.default)("#month").val());
			pickCloseMask();
			if (month) {
				day = [];
				var dayNum = getCountDay(year, month);
				var dayDom = (0, _zepto2.default)("#day");
				countDay(dayNum);
				dayPick();
				if (dayDom.val() > dayNum) {
					dayDom.remove();
					(0, _zepto2.default)("<input id='day' type='text' placeholder='日' readonly>").insertBefore((0, _zepto2.default)(".day .selIcon"));
					(0, _zepto2.default)("#day").val("01");
					dayPick();
				}
			}
		}
	});
	
	(0, _zepto2.default)(".month input").picker({
		toolbarTemplate: toolbarTem("月份"),
		rotateEffect: true,
		cols: [{
			textAlign: 'center',
			cssClass: "pickerF",
			values: month
		}],
		onOpen: function onOpen() {
			var year = (0, _zepto2.default)("#year").val();
			var dayDom = (0, _zepto2.default)("#day");
			curDay = dayDom.val();
			pickOpenMask();
			if (!year) return;
			dayDom.remove();
			(0, _zepto2.default)("<input id='day' type='text' placeholder='日' readonly>").insertBefore((0, _zepto2.default)(".day .selIcon"));
			(0, _zepto2.default)("#day").val(curDay);
		},
		onClose: function onClose() {
			var year = (0, _zepto2.default)("#year").val();
			var month = parseInt((0, _zepto2.default)("#month").val());
			pickCloseMask();
			if (year) {
				day = [];
				var dayNum = getCountDay(year, month);
				var dayDom = (0, _zepto2.default)("#day");
				countDay(dayNum);
				dayPick();
				if (dayDom.val() > dayNum) {
					dayDom.remove();
					(0, _zepto2.default)("<input id='day' type='text' placeholder='日' readonly>").insertBefore((0, _zepto2.default)(".day .selIcon"));
					(0, _zepto2.default)("#day").val("01");
					dayPick();
				}
			}
		}
	});
	
	dayPick();
	
	//参赛赛区
	var division = ["南京", "苏州"];
	var divisionCode = {
		"南京": "320100",
		"苏州": "320500"
	};
	(0, _zepto2.default)(".division input[type='text']").picker({
		toolbarTemplate: toolbarTem("请选择参赛赛区"),
		cols: [{
			textAlign: 'center',
			cssClass: "pickerF",
			values: division
		}],
		onClose: function onClose(val) {
			var areaNum = divisionCode[val.value[0]];
			console.log(areaNum);
			(0, _zepto2.default)("#areaNum").val(areaNum);
		}
	});
	
	//图片删除
	(0, _zepto2.default)(document).on("click", ".thumbnail", function (ev) {
		if (ev.target.toString() == (0, _zepto2.default)(".delIcon")[0].toString()) {
			(0, _zepto2.default)(ev.target).addClass("delIconAnimal");
			(0, _zepto2.default)(this).addClass("thumbnailAnimal");
		}
	});
	
	(0, _zepto2.default)(document).on("webkitAnimationEnd", ".thumbnail", function (ev) {
		if (this == ev.target) {
			(0, _zepto2.default)(this).remove();
		}
	});
	
	//协议
	//--图片预加载:防止画面抖动；
	// let disagreeImg = new Image();
	// disagreeImg.src = "../images/disagreeIcon_7b19d1.png";
	
	(0, _zepto2.default)(document).on("click", ".radioIcon", function () {
		if ((0, _zepto2.default)(this)[0].className.indexOf("agreementIcon") == -1) {
			(0, _zepto2.default)(this).addClass("agreementIcon");
		} else {
			(0, _zepto2.default)(this).removeClass("agreementIcon");
		}
	});
	
	window.validation = function (obj) {
		var signUpInfo = {};
		var option = {
			en_name: null,
			sex: null,
			year: null,
			month: null,
			day: null,
			nationality: null,
			nation: null,
			height: null,
			bust: null,
			waistline: null,
			hipline: null,
			match_area_name: null,
			mobile: null
		};
		obj = obj || option;
		Object.assign(signUpInfo, obj);
	
		//英文名验证
		//  console.log(!/[a-zA-Z]{3,20}/.test(signUpInfo.en_name));
		if (!/[a-zA-Z]{3,20}/.test(signUpInfo.en_name) || signUpInfo.en_name == null) {
			_zepto2.default.toast('请输入英文名：3-20个字符', 2000, 'error top');
			return;
		}
	
		//性别
		if (!/[男女]/.test(signUpInfo.sex)) {
			_zepto2.default.toast('请选择性别', 2000, 'error top');
			return;
		}
	
		//年
		if (!/[0-9]{4}/.test(signUpInfo.year)) {
			_zepto2.default.toast('请选择年份', 2000, 'error top');
			return;
		}
	
		//月
		if (!/[0-9]{2}/.test(signUpInfo.month)) {
			_zepto2.default.toast('请选择月份', 2000, 'error top');
			return;
		}
	
		//日
		if (!/[0-9]{2}/.test(signUpInfo.day)) {
			_zepto2.default.toast('请选择日期', 2000, 'error top');
			return;
		}
	
		//国籍
		if (!signUpInfo.nationality) {
			_zepto2.default.toast('国籍不能为空', 2000, 'error top');
			return;
		}
	
		//民族
		if (!signUpInfo.nation) {
			_zepto2.default.toast('民族不能为空', 2000, 'error top');
			return;
		}
	
		//身高
		if (!signUpInfo.height) {
			_zepto2.default.toast('身高不能为空', 2000, 'error top');
			return;
		}
	
		//胸围
		if (!signUpInfo.bust) {
			_zepto2.default.toast('胸围不能为空', 2000, 'error top');
			return;
		}
	
		//腰围
		if (!signUpInfo.waistline) {
			_zepto2.default.toast('腰围不能为空', 2000, 'error top');
			return;
		}
	
		//臀围
		if (!signUpInfo.hipline) {
			_zepto2.default.toast('臀围不能为空', 2000, 'error top');
			return;
		}
	
		//赛区
		if (!signUpInfo.match_area_name) {
			_zepto2.default.toast('请选择赛区', 2000, 'error top');
			return;
		}
	
		//phoneNumber
		if (!/^1[34578]\d{9}$/.test(signUpInfo.mobile)) {
			_zepto2.default.toast('请输入手机号', 2000, 'error top');
			return;
		}
		return true;
	};
	
	_zepto2.default.init();

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	(function (doc, win) {
		var docEl = doc.documentElement,
		    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		    recalc = function recalc() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			var initWidth = 750;
			if (clientWidth >= initWidth) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 40 * (clientWidth / initWidth) + 'px';
			}
		};
	
		if (!doc.addEventListener) return;
		win.addEventListener(resizeEvt, recalc, false);
		doc.addEventListener('DOMContentLoaded', recalc, false);
	})(document, window);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Zepto;

/***/ }
/******/ ]);
//# sourceMappingURL=beautySignUp.entry.js.map