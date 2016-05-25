function $(id){
	return document.getElementById(id);
}

function addEvent(ele,type,handler){
	if(ele.addEventListener){
		ele.addEventListener(type,handler,false);
	}else if(ele.attachEvent){
		ele['e'+type+handler] = handler;
		ele[type+handler] = function(){ele['e'+type+handler](window.event);}
		ele.attachEvent("on"+type,ele[type+handler]);
	}
	else{
		ele["on"+type] = handler;
	}
}

String.prototype.trim = function(){
	return this.replace(/(^\s+)|(\s+$)/g,'');
}

