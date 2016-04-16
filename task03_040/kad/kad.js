function $(id){
	return document.getElementsByClassName(id);
}

var weeks = ['日', '一', '二', '三', '四', '五', '六'];
var text = document.getElementById("text");
var modal = $("calendar")[0];
var title = $("title")[0];
var week = $("week")[0];
var date = $("date")[0];

function Calendar(modal){
	this.modal = modal;
	this.date = new Date();
	this.open = true;
}
Calendar.prototype.toggle = function(){
	this.modal.style.display = "block";
}
Calendar.prototype.hide = function(){
	this.modal.style.display = "none";
}
Calendar.prototype.init = function(){
	this.currentDate = {
		year: this.date.getFullYear(),
		month: this.date.getUTCMonth() + 1,
		day: this.date.getDate()
	};
	title.innerHTML = "";
	var selectYear = document.createElement("select");
	selectYear.id = "year";
	for(var y = 1993; y < 2060; y++){
		var option = document.createElement("option");
		option.innerHTML = y;
		if (y == parseInt(this.currentDate.year)) {
	      option.selected = "selected";
	    }
		selectYear.appendChild(option);
	}
	title.appendChild(selectYear);
	var selectMonth = document.createElement("select");
	selectMonth.id = "month";
	for(var m = 1; m <= 12; m++){
		var option = document.createElement("option");
		option.innerHTML = m;
		if(m == parseInt(this.currentDate.month)){
			option.selected = "selected";
		}
		selectMonth.appendChild(option);
	}
	title.appendChild(selectMonth);

	week.innerHTML = "";
	var ul = document.createElement("ul");
	for(var w = 0; w < weeks.length; w++){
		var li = document.createElement("li");
		li.innerHTML = weeks[w];
		ul.appendChild(li);
	}
	week.appendChild(ul);
}
//更新当前选中日期
Calendar.prototype.update = function(obj){
	this.currentDate.year = obj.year;
	this.currentDate.month = obj.month;
	this.currentDate.day = obj.day;
}
//渲染日期面板
Calendar.prototype.render = function(){
	date.innerHTML = "";
	var curmonth = prefixZero(this.currentDate.month);
	// console.log(new Date("2016/04/01"), new Date("2016-04-01"));
	var format = formatDate(this.currentDate.year, curmonth, "01");
	var this_month = new Date(format);
	var firstday = this_month.getDay();//拿到这个月开始是星期几
	this_month.setMonth(curmonth, 0);
	var fulldate = this_month.getDate();//拿到这个月总共多少天
	this_month.setMonth(curmonth - 1, 0);
	var lastdate = this_month.getDate();//拿到上个月最后一天
	var count = 1;
	var flag = false;
	var ul = document.createElement("ul");

	for(var w = 0; w < firstday; w++){
		var li = document.createElement("li");
		li.style.opacity = "0.5";
		ul.appendChild(li);
	}
	while(count <= fulldate){
		if(firstday == 7){
			var br = document.createElement("br");
			ul.appendChild(br);
			firstday = 0;
		}
		var li = document.createElement("li");
		li.innerHTML = count;
		if(count == this.currentDate.day){
			li.style.backgroundColor = "purple";
		}
		ul.appendChild(li);
		count++;
		firstday++;
	}
	date.appendChild(ul);
}

//处理日期前缀'0'
function prefixZero(str){
	return str >= 10 ? str : '0'+str;
}
//日期格式化
function formatDate(year, month, day){
	return year + '-' + month + '-' + day;
}

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

var calendar = new Calendar(modal);
var dateobj;

function init(){
	calendar.init();
	dateobj = calendar.currentDate;
	calendar.render();
	var selectYear = document.getElementById("year");
	addEvent(selectYear, "change", function(){
		dateobj.year = this.value;
		dateobj.day = null;
		calendar.update(dateobj);
		calendar.render();
	})
	var selectMonth = document.getElementById("month");
	addEvent(selectMonth, "change", function(){
		dateobj.month = this.value;
		dateobj.day = null;
		calendar.update(dateobj);
		calendar.render();
	})
	addEvent(date, "click", function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		if(target && target.tagName === "li".toUpperCase()){
			dateobj.day = target.innerHTML;
			var inputtext = formatDate(dateobj.year, prefixZero(dateobj.month), prefixZero(dateobj.day));
			text.value = inputtext;
			calendar.hide();
		}
	})
	addEvent(text, "focus", function(){
		calendar.toggle();
		calendar.render(dateobj);
	})
}
init();