;(function(window){
	var F={
		addEvent:function(o,t,f,c){
			if(o.addEventListener){
				try {
					o.addEventListener(t,f,!!c)
				}
				// 黑莓等系统不支持 handleEvent 方法
				catch(e) {
					if(typeof f === 'object' && f.handleEvent) {
						o.addEventListener(t, function(e){
							f.handleEvent.call(f, e);//以第一参数为事件对象
						},!!c);
					}else{
						throw e;
					}
				}
			}else{
				if(o.attachEvent){
					if(typeof f === 'object' && f.handleEvent) {
						o.attachEvent('on' + t, function(){
							f.handleEvent.call(f);
						});
					} else {//这里注意ie8的环境变化
						o["e"+t+f] = f;
						o[t+f] = function(){o["e"+t+f]( window.event );}
						o.attachEvent("on"+t, o[t+f] );
					}
				}else{
					o["on"+t]=f;
				}
			}
		},
		removeEvent:function(o,t,f,c){
			if(o.removeEventListener){
				o.removeEventListener(t,f,!!c)
			}else{
				if(o.detachEvent){
					o.detachEvent("on"+t, o[t+f] );
					o[t+f] = null;
				}else{
					o["on"+t]=null
				}
			}
		},
		extend:function(target,source){
			for (var p in source){
				if(target.hasOwnProperty(p)){
					if(typeof source[p]==='object'){
						arguments.callee(target[p],source[p]);
					}else{
						target[p] = source[p];
					}
				}else{
					target[p] = source[p];
				}
			}
			return target;
		},
		deviceMotionHandler:function(eventData){
			var acceleration = eventData.accelerationIncludingGravity;  
			var curTime = new Date().getTime();		
			if ((curTime - last_update) > 100) {//每100毫秒判断一次 
				var diffTime = curTime - last_update;  
				last_update = curTime; 
				
				//将设备放置在水平表面，屏幕向上，则其accelerationIncludingGravity信息如下：{x: 0,y: 0,z: 9.81};
				var x = acceleration.x;  
				var y = acceleration.y;  
				var z = acceleration.z; 
				var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;
				if (speed > options.speed) {
					options.callback&&options.callback(x,y,z);
				}
				options.onchange&&options.onchange(x,y,z);
				last_x = x;
				last_y = y; 
				last_z = z;
			}
			
		}
	},
	last_update= 0,
	last_x=0,
	last_y=0,
	last_z=0,
	options={
		speed:800,
		onchange:null,
		callback:null
	};
	mobilePhoneShake=function (opt){
		F.extend(options,opt);
	};
	mobilePhoneShake.prototype={
		start:function(){
			if (window.DeviceMotionEvent) {
				F.addEvent(window,'devicemotion',F.deviceMotionHandler);
			} else {  
				alert('not support mobile event');  
			}
		},
		stop:function(){
			if (window.DeviceMotionEvent) {
				F.removeEvent(window,'devicemotion',F.deviceMotionHandler);
			} else {  
				alert('not support mobile event');  
			}  
		}
	}
})(window);