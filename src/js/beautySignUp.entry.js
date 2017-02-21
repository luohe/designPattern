/**
 * Created by Administrator on 2017/2/7.
 */
import './lib/remResponse';
import $ from 'zepto';



//性别
$(document).on('click','.sexSel', function () {
	var buttons1 = [
		{
			text: '请选择',
			label: true
		},
		{
			text: '男',
			onClick: function() {
				$(".sexSel").html("男<span class='selIcon'></span>").css({
					color:"black"
				});
				$("#sex").val(1)
			}
		},
		{
			text: '女',
			bold: true,
			color: 'danger',
			onClick: function() {
				$(".sexSel").html("女<span class='selIcon'></span>").css({
					color:"black"
				});
				$("#sex").val(2)
			}
		}
	];
	var buttons2 = [
		{
			text: '确定',
			bg: 'danger'
		}
	];
	var groups = [buttons1];
	$.actions(groups);
});



//出生年月
let year=[],month = [],day=[],curDay;

let countDay = (index)=>{
	for (let i=0;i<index;i++){
		let index = i+1;
		if(index>0&&index<10){index="0"+index}
		day.push(index);
	}
};

let getCountDay = (year,month) => {
	let yearN = year;
	let monthN = parseInt(month);
	let curDate = new Date(yearN,monthN,0);
	return curDate.getDate();
};

var pickOpenMask = ()=>{
	$(".page-current .content").append($("<div class='picker-mask'></div>"));
};
var pickCloseMask = ()=>{
	$(".picker-mask").remove();
};

let dayPick = ()=>{
	$(".day input").picker({
		toolbarTemplate: toolbarTem("日期"),
		rotateEffect:true,
		readOnly:false,
		onOpen:function () {
			pickOpenMask()
		},
		onClose:function () {
			pickCloseMask()
		},
		cols: [
			{
				textAlign: 'center',
				cssClass:"pickerF",
				values: day
			}
		]
	});
};

countDay(31);

for (let i=0;i<31;i++){
	let index = i+1;
	if(index>0&&index<10){index="0"+index}
	day.push(index);
}

for (let i=0;i<12;i++){
	let index = i+1;
	if(index>0&&index<10){index="0"+index}
	month.push(index);
}

var toolbarTem = (title)=>{
	return `<header class="bar bar-nav">\
  <button class="button button-link pull-right close-picker">确定</button>\
  <h1 class="title">${title}</h1>\
  </header>`
};




for (let i=1993;i<=2000;i++){
	year.push(i);
}

$(".year input").picker({
	toolbarTemplate: toolbarTem("年份"),
	rotateEffect:true,
	cols: [
		{
			textAlign: 'center',
			cssClass:"pickerF",
			values: year
		}
	],
	onOpen:()=>{
		let year = $("#month").val();
		let dayDom = $("#day");
		curDay = dayDom.val();
		pickOpenMask();
		if(!year) return;
		dayDom.remove();
		$("<input id='day' type='text' placeholder='日' readonly>").insertBefore($(".day .selIcon"));
		$("#day").val(curDay);
	},
	onClose: ()=> {
		let year = $("#year").val();
		let month = parseInt($("#month").val());
		pickCloseMask();
		if(month){
			day=[];
			let dayNum = getCountDay(year,month);
			let dayDom = $("#day");
			countDay(dayNum);
			dayPick();
			if(dayDom.val()>dayNum){
				dayDom.remove();
				$("<input id='day' type='text' placeholder='日' readonly>").insertBefore($(".day .selIcon"));
				$("#day").val("01");
				dayPick();
			}
		}
	}
});

$(".month input").picker({
	toolbarTemplate: toolbarTem("月份"),
	rotateEffect:true,
	cols: [
		{
			textAlign: 'center',
			cssClass:"pickerF",
			values: month
		}
	],
	onOpen:()=>{
		let year = $("#year").val();
		let dayDom = $("#day");
		curDay = dayDom.val();
		pickOpenMask();
		if(!year) return;
		dayDom.remove();
		$("<input id='day' type='text' placeholder='日' readonly>").insertBefore($(".day .selIcon"));
		$("#day").val(curDay);
	},
	onClose: ()=> {
		let year = $("#year").val();
		let month = parseInt($("#month").val());
		pickCloseMask();
		if(year){
			day=[];
			let dayNum = getCountDay(year,month);
			let dayDom = $("#day");
			countDay(dayNum);
			dayPick();
			if(dayDom.val()>dayNum){
				dayDom.remove();
				$("<input id='day' type='text' placeholder='日' readonly>").insertBefore($(".day .selIcon"));
				$("#day").val("01");
				dayPick();
			}
		}
	}
});

dayPick();

//参赛赛区
let division = ["南京","苏州"];
let divisionCode = {
	"南京":"320100",
	"苏州":"320500"
};
$(".division input[type='text']").picker({
	toolbarTemplate: toolbarTem("请选择参赛赛区"),
	cols: [
		{
			textAlign: 'center',
			cssClass:"pickerF",
			values: division
		}
	],
	onClose: (val)=> {
		let areaNum =divisionCode[val.value[0]] ;
		console.log(areaNum);
		$("#areaNum").val(areaNum)
	}
});

//图片删除
$(document).on("click",".thumbnail",function (ev) {
	if(ev.target.toString() == $(".delIcon")[0].toString()){
		$(ev.target).addClass("delIconAnimal");
		$(this).addClass("thumbnailAnimal");
	}
});

$(document).on("webkitAnimationEnd",".thumbnail",function (ev) {
	if(this==ev.target){
		$(this).remove();
	}
});

//协议
//--图片预加载:防止画面抖动；
// let disagreeImg = new Image();
// disagreeImg.src = "../images/disagreeIcon_7b19d1.png";

$(document).on("click",".radioIcon",function () {
		if($(this)[0].className.indexOf("agreementIcon")==-1) {
				$(this).addClass("agreementIcon")
		}else{
			$(this).removeClass("agreementIcon")
		}
});




 window.validation =  (obj)=> {
	let signUpInfo = {};
	let option = {
		en_name:null,
		sex:null,
		year:null,
		month:null,
		day:null,
		nationality:null,
		nation:null,
		height:null,
		bust:null,
		waistline:null,
		hipline:null,
		match_area_name:null,
		mobile:null
	};
	obj = obj || option;
	 Object.assign(signUpInfo,obj);
	
	//英文名验证
	//  console.log(!/[a-zA-Z]{3,20}/.test(signUpInfo.en_name));
	if(!/[a-zA-Z]{3,20}/.test(signUpInfo.en_name)||signUpInfo.en_name==null){
		$.toast('请输入英文名：3-20个字符', 2000, 'error top');
		return;
	}
	
	//性别
	if(!/[男女]/.test(signUpInfo.sex)){
		$.toast('请选择性别', 2000, 'error top');
		return;
	}
	
	//年
	if(!/[0-9]{4}/.test(signUpInfo.year)){
		$.toast('请选择年份', 2000, 'error top');
		return;
	}
	
	 //月
	 if(!/[0-9]{2}/.test(signUpInfo.month)){
		 $.toast('请选择月份', 2000, 'error top');
		 return;
	 }
	
	 //日
	 if(!/[0-9]{2}/.test(signUpInfo.day)){
		 $.toast('请选择日期', 2000, 'error top');
		 return;
	 }
	
	 //国籍
	 if(!signUpInfo.nationality){
		 $.toast('国籍不能为空', 2000, 'error top');
		 return;
	 }
	 
	 //民族
	 if(!signUpInfo.nation){
		 $.toast('民族不能为空', 2000, 'error top');
		 return;
	 }
	 
	 //身高
	 if(!signUpInfo.height){
		 $.toast('身高不能为空', 2000, 'error top');
		 return;
	 }
	
	 //胸围
	 if(!signUpInfo.bust){
		 $.toast('胸围不能为空', 2000, 'error top');
		 return;
	 }
	
	 //腰围
	 if(!signUpInfo.waistline){
		 $.toast('腰围不能为空', 2000, 'error top');
		 return;
	 }
	
	 //臀围
	 if(!signUpInfo.hipline){
		 $.toast('臀围不能为空', 2000, 'error top');
		 return;
	 }
	 
	 //赛区
	 if(!signUpInfo.match_area_name){
		 $.toast('请选择赛区', 2000, 'error top');
		 return;
	 }
	 
	//phoneNumber
	 if(!/^1[34578]\d{9}$/.test(signUpInfo.mobile)){
		 $.toast('请输入手机号', 2000, 'error top');
		 return;
	 }
	 return true;
};

$.init();

