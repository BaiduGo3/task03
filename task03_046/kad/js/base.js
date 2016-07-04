function $(id){
	return document.getElementById(id);
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

// requestAnimationFrame = (function(){
//     return  window.requestAnimationFrame   ||
//         window.webkitRequestAnimationFrame ||
//         window.mozRequestAnimationFrame    ||
//         window.oRequestAnimationFrame      ||
//         window.msRequestAnimationFrame     ||
//         function(callback){
//             window.setTimeout(callback, 1000 / 60);
//         };
// })();

requestAnimationFrame = window.requestAnimationFrame 
                    || window.webkitRequestAnimationFrame 
                    || window.msRequestAnimationFrame 
                    || window.mozRequestAnimationFrame;