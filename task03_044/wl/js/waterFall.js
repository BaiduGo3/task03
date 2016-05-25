//瀑布流相册
function WaterFall(opts){
	this.col = opts.col || 4;
	this.gap = opts.gap || 16;
	this.container = document.querySelector(opts.containerId);
	this.boxClsName = opts.boxClsName;
	this.boxes = this.container.querySelectorAll(this.boxClsName);
	this.boxWidth;
	this.imgWidth;
	this.heightArr = [];
	this.colContral = opts.colInput;
	this.gapContral = opts.gapInput;
	this.addContral = opts.addBtn;
	this.setImgWidth();
	this.render();
	this.clickEvent();
}

WaterFall.prototype = {
	//设置图片宽度
	setImgWidth: function(){
		var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
		this.boxWidth = Math.floor(0.9 * screenWidth / this.col);
		this.imgWidth = this.boxWidth - this.gap - 2;
		this.container.style.cssText = "width:" + this.col * this.boxWidth + "px;margin:0 auto";
	},
	//渲染瀑布流图片
	render: function(){
		this.boxes = this.container.querySelectorAll(this.boxClsName);
		for(var i=0,len=this.boxes.length;i<len;i++){
			var img = this.boxes[i].querySelector("img");
			img.style.width = this.imgWidth + "px";
			this.boxes[i].querySelector(".imageInfo").style.width = this.imgWidth + "px";
			this.boxes[i].style.padding = "0 0 "+ this.gap + "px " + this.gap + "px";
			var boxHeight = this.boxes[i].offsetHeight;
			if(i<this.col){
				this.boxes[i].style.position = "static";
				this.heightArr[i] = boxHeight;
			}else{
				var min = this.getMin();
				this.boxes[i].style.position = "absolute";
				this.boxes[i].style.left = this.boxes[min.index].offsetLeft + "px";
				this.boxes[i].style.top = min.height + "px";
				this.heightArr[min.index] += this.boxes[i].offsetHeight;
			}
		}
	},
	//获取高度数组中最小的高度和索引
	getMin:function(){
		var minH = this.heightArr[0];
		var index = 0;
		for(var i=1,len=this.heightArr.length;i<len;i++){
			if(this.heightArr[i] < minH){
				minH = this.heightArr[i];
				index = i;
			}
		}
		return {height:minH,index:index};
	},
	//点击图片放大事件代理
	addImgEvent:function(ele,tag,type,handler){
		addEvent(ele,type,function(event){
			event = event || window.event;
			var target = event.target || event.srcElement;
			if(target && target.tagName === tag.toUpperCase()){
				handler.call(this,target.src);
			}
		});
	},
	//添加点击事件
	clickEvent:function(){
		var _this = this;
		//添加图片点击事件
		_this.addImgEvent(_this.container,"img","click",_this.imgFullScreen);
		//添加列数输入框失去焦点事件，修改列数
		addEvent(_this.colContral,"blur",function(){
			var col = this.value.trim();
			var reg = /^[3-8]{1}$/;
			if(reg.test(col)){
				_this.changeAttr(true,col);
			}else{
				alert("请输入适当的数字");
			}
		});
		//添加列间隙输入框失去焦点事件，修改列间隙
		addEvent(_this.gapContral,"blur",function(){
			var gap = this.value.trim();
			if(gap>=10 && gap<=100){
				_this.changeAttr(false,gap);
			}else{
				alert("请输入适当的数字");
			}
		});
		//添加屏幕滚动条滚动事件，加载新图片
		addEvent(window,"scroll",function(){
			if(checkScrollSlide()){
				for(var i=1;i<=25;i++){
					var box = document.createElement("div");
					box.className = "box";
					box.style.padding = "0 0 "+ _this.gap + "px " + _this.gap + "px";
					_this.container.appendChild(box);

					var pic = document.createElement("div");
					pic.className = "pic";
					box.appendChild(pic);

					var img = document.createElement("img");
					img.src = "image/wn" + i + ".jpg";
					img.alt = "";
					img.style.width = _this.imgWidth + "px";
					pic.appendChild(img);

					var imgContent = document.createElement("div");
					imgContent.className = "imageInfo";
					imgContent.innerHTML = "<h4>khuntoria</h4><time>2010.6.1</time>";
					pic.appendChild(imgContent);

					var min = _this.getMin();
					box.style.position = "absolute";
					box.style.left = min.index * _this.boxWidth + "px";
					box.style.top = min.height + "px";
					_this.heightArr[min.index] += box.offsetHeight;
				}
			}
		});
		//当最后一张照片露出一半时放回true，否则放回false
		function checkScrollSlide(){
			_this.boxes = _this.container.querySelectorAll(_this.boxClsName);
			var lastBox = _this.boxes[_this.boxes.length-1];
			var lastBoxHeight = lastBox.offsetTop + Math.floor(lastBox.offsetHeight/2);
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;
			return lastBoxHeight < (scrollTop + screenHeight);
		}
	},
	//改变列数或列间隙
	changeAttr:function(isCol,val){
		if(isCol){
			this.col = val;
		}else{
			this.gap = val;
		}
		this.heightArr = [];
		this.setImgWidth();
		this.render();
	},	
	//图片全屏显示
	imgFullScreen:function(src){
		var maskLayer = document.createElement("div");
		maskLayer.className = "maskLayer";
		var opacityBg = document.createElement("div");
		opacityBg.className = "opacityBg";
		var img = document.createElement("img");
		img.src = src;
		img.alt = "";
		var screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
		var screenHeight = window.innerHeight;
		document.body.appendChild(maskLayer);
		maskLayer.appendChild(opacityBg);
		maskLayer.appendChild(img);
		addEvent(opacityBg,"click",function(){
			maskLayer.remove();
		});
	}
}