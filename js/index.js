var botton=document.getElementById("botton");
var flag=true,timeout,num=0;
var yy=new mobilePhoneShake({
	speed:1000,//阀值，值越小，能检测到摇动的手机摆动幅度越小
	callback:function(x,y,z){//将设备放置在水平表面，屏幕向上，则其x,y,z信息如下：{x: 0,y: 0,z: 9.81};
		num++;
		botton.querySelector("em").innerHTML=num;
		//yy.start();//开始检测
		//yy.stop();//移除检测
	},
	onchange:function(x,y,z){
		document.getElementById("msg").innerHTML="x:"+x+"<br>y:"+y+"<br>z:"+z;
	}
});
botton.onclick=function(){
	if(flag){
		flag=false;
		var t=this;
		t.innerHTML="用时：<i>00:00:00</i> 摇动次数：<em>0</em>"
		num=0;
		var time=new Date().getTime();
		timeout=setInterval(function(){
			var NowTime = new Date().getTime();
			var n = NowTime-time;  
			var ws=n2(n % 100);//微秒(后两位);
			var nn = Math.ceil(n/100)% 60 %10;
			var ws2=nn;//微秒(第一位)
			var s = (n - n % 1000) / 1000;
			s= n2(s % 60);//秒
			var m = Math.floor(((n - n % 1000) / 1000)/60);
			m= n2(m);//分
			t.querySelector("i").innerHTML=m+":"+s+":"+ws2+":"+ws;
		},1);
		yy.start();
	}else{
		flag=true
		clearInterval(timeout);
		yy.stop();
	}
}
function n2(n)
{
	if(n < 10)return "0" + n.toString();
	return n.toString();
}