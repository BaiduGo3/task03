function $(id){
	return document.getElementById(id);
}

function Modal(modal){
	this.modal = modal;
	this.win = modal.children[1].children[0];
	this.ifdrag = false;
}
Modal.prototype.toggle = function(){
	this.modal.style.display = "block";
}
Modal.prototype.hide = function(){
	this.modal.style.display = "none";
}
Modal.prototype.confirm = function(){
	alert("Hello World!");
}
Modal.prototype.drag = function(){
	var win = this.win;
	var ifdrag;
	addEvent(this.win, 'mousedown', dragdown = function(){
		ifdrag = true;
		event = event || window.event;
		disX = event.clientX - win.offsetLeft;
		disY = event.clientY - win.offsetTop;
		addEvent(this, 'mousemove', dragmove = function(event){
			event = event || window.event;
			if(ifdrag) {
				this.style.left = event.clientX - disX + 'px';
				this.style.top = event.clientY - disY + 'px';
			}
		})
		addEvent(this, 'mouseup', function(){
			ifdrag = false;
			// removeEvent(this, 'mousedown', dragdown);
			// removeEvent(this, 'mousemove', dragmove);
		})
	})
	this.ifdrag = ifdrag;
}
var dragdown, dragmove;
var launchbtn = $("launch");
var confirmbtn = $("confirm");
var modalDiv;
var modal;//modal object
var closebtn = document.getElementsByClassName("close");

function addEvent(element, eventName, listener) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, listener);
    } else {
        element["on" + eventName] = listener;
    }
}
function removeEvent(element, eventName, listener){
  if(element.removeEventListener){
    element.removeEventListener(eventName, listener, false);
  }else if(element.detachEvent){
    element.detachEvent("on" + eventName, listener);
  }
}

function init(){
	addEvent(launchbtn, 'click', function(event){
		event = event || window.event;
		var target = event.target || event.srcElement;
		modalDiv = $(target.dataset.target);
		modal = new Modal(modalDiv);
		modal.toggle();
		modal.drag();
	});
	for(var i = 0; i < closebtn.length; i++){
		addEvent(closebtn[i], 'click', function(){
			modal.hide();
		});
	}
	addEvent(confirmbtn, 'click', function(){
		modal.hide();
		modal.confirm();
	})
}

init();