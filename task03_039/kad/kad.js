function Stu(name, cha, math, eng){
	this.name = name;
	this.cha = cha;
	this.math = math;
	this.eng = eng;
	this.sum = cha + math + eng;
}

function Table(data){
	this.data = data;
}
Table.prototype.render = function(tbody){
	tbody.innerHTML = "";
	for(var j = 1; j < 10; j++){
		for(var i = 0; i < this.data.length; i++){
			var tr = "<tr><td>" + this.data[i].name + "</td><td>" + this.data[i].cha + "</td><td>" + this.data[i].math +"</td><td>" + data[i].eng + "</td><td>" + data[i].sum + "</td></tr>";
	    	tbody.innerHTML += tr;
		}
	}
}

var data = [new Stu("小明",80,90,70),
			new Stu("小红",90,60,90),
			new Stu("小亮",60,100,70)];

var tableObj = new Table(data);
var table =  document.getElementsByTagName("table")[0];
var thead = document.getElementsByTagName("thead")[0]
var tbody = document.getElementsByTagName("tbody")[0];

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}

function init(){
	tableObj.render(tbody);
	addEvent(window, 'scroll', function(){
		var top = table.offsetTop;
		var height = table.clientHeight + top;
		if(this.scrollY > top){
			thead.style.position = "fixed";
			thead.style.top = 0;
			if(this.scrollY > height){
				thead.style.position = "absolute";
			}
		}else{
			thead.style.position = "static";
		}
	})
}
init();