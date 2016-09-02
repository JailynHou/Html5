
//设置画布2d作图环境
var cxt=document.getElementById('canvas').getContext('2d');

//获取工具组按钮的标签
var Paint=document.getElementById('means_paint');
var Eraser=document.getElementById('means_eraser');
var Magnifier=document.getElementById('means_magnifier');
var Brush=document.getElementById('means_brush');
var Straw=document.getElementById('means_straw');
var Text=document.getElementById('means_text');

//获取形状组标签
var Line=document.getElementById('shape_line');
var Rectfill=document.getElementById('shape_rectfill');
var Arcfill=document.getElementById('shape_arcfill');
var Poly=document.getElementById('shape_poly');
var Rect=document.getElementById('shape_rect');
var Arc=document.getElementById('shape_arc');

//获取线宽标签
var Line_1=document.getElementById('size_line1px');
var Line_3=document.getElementById('size_line3px');
var Line_5=document.getElementById('size_line5px');
var Line_8=document.getElementById('size_line8px');

//获取颜色组标签
var Color_black=document.getElementById('black');
var Color_white=document.getElementById('white');
var Color_red=document.getElementById('red');
var Color_blue=document.getElementById('blue');
var Color_yellow=document.getElementById('yellow');
var Color_pink=document.getElementById('pink');
var Color_purple=document.getElementById('purple');
var Color_cyan=document.getElementById('cyan');
var Color_orange=document.getElementById('orange');
var Color_grey=document.getElementById('grey');

//把12个工具和形状标签放在一个数组内
var actions=[Paint,Eraser,Magnifier,Brush,Straw,Text,Line,Rectfill,Arcfill,Poly,Rect,Arc];
//把4个线宽标签放在一个数组内
var sizes=[Line_1,Line_3,Line_5,Line_8];
//把10个颜色标签放在一个数组内
var colors=[black,white,red,blue,yellow,pink,purple,cyan,orange,grey];

//设置初始值
  //默认初始为画笔工具
drawPaint(0);
  //默认线宽为1px
setSize(0);
  //默认颜色为黑色
setColor(this,0);

//保存画布函数
function saveImg(){}
//清除画布函数
function clearImg(){
	cxt.clearRect(0,0,880,330);
}

//设置状态函数
function setStatus(Arr,num,type){
    for(var i=0;i<Arr.length;i++){
    	//改变选中标签css属性
    	if(i==num){
    		//设置改变css样式是背景色还是边框
    		if (type==1) {
    			Arr[i].style.background="yellow";
    		}
    		else{
    			Arr[i].style.border="1px solid #fff";
    		}
    	}
    	//设置未被选中组中其他标签改变颜色
    	else{
    		if (type==1) {
    			Arr[i].style.background="#ccc";
    		}
    		else{
    			Arr[i].style.border="1px solid #000";
    		}
    	}
    }
}

//定义全局函数
var startX=0;
var startY=0;
var endX=0;
var endY=0;
  //设置标志位，检测鼠标是否按下
var flag=0;
  //设置橡皮檫状态标识位
var eraserflag=0;
//列出所有按钮函数
  //工具组
    //铅笔函数
function drawPaint(num){
	setStatus(actions,num,1);
	//鼠标按下时设置开始点
	canvas.onmousedown=function(evt){
       evt=window.event||evt;//针对w3c和IE
       startX=evt.pageX-this.offsetLeft;
       startY=evt.pageY-this.offsetTop;
       //alert(startX+"~~"+startY);
       cxt.beginPath();
       cxt.moveTo(startX,startY);
       flag=1;
	}
	//鼠标移动时，不断画图
	canvas.onmousemove=function(evt){
       evt=window.event||evt;
       endX=evt.pageX-this.offsetLeft;
       endY=evt.pageY-this.offsetTop;
       //判断一下鼠标是否按下
       if (flag) {
       	cxt.lineTo(endX,endY);
        cxt.stroke();
       }   
	}
	//鼠标抬起结束绘图
	canvas.onmouseup=function(){
       flag=0;
	}
	canvas.onmouseout=function(){
	   flag=0;
	}
}
//橡皮函数
function drawEraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		//canvas檫除方法 cxt.clearRect();
		cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		eraserflag=1;
	}
	canvas.onmousemove=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		//檫除方法，用到clearRect()函数
		if(eraserflag){
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		}		
	}
	canvas.onmouseup=function(){
		eraserflag=0;
	}
	canvas.onmouseout=function(){
		eraserflag=0;
	}

}
//放大镜函数
function drawMagnifier(num){
	setStatus(actions,num,1);
	//用户输入数据的大小
	var scale=window.prompt('请输入要放大的百分比[只能是整数型]','100');
	//alert(scale);
	//把数据转换为画布大小
	var scaleW=880*scale/100;
	var scaleH=330*scale/100;
	//将数据设置到对应的html标签上
	canvas.style.width=parseInt(scaleW)+'px';
	canvas.style.height=parseInt(scaleH)+'px';
}
//油漆桶函数
function drawBrush(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(){
		//把画布涂成指定颜色->画一个填充的矩形（即画布大小）
		cxt.fillRect(0,0,880,300);
	}
	canvas.onmouseout=null;
	canvas.onmouseup=null;
	canvas.onmousemove=null;
}
//吸管函数
function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var strawX=evt.pageX-this.offsetLeft;
		var strawY=evt.pageY-this.offsetTop;
		//获取当前点的像素颜色信息,方法为getImageData(开始点X，开始点Y，宽度，高度)
		  //obj.data=[红，绿，蓝，透明度]  //一像素的数据
		  /*obj.data=[红，绿，蓝，透明度，
		              红，绿，蓝，透明度,
		              红，绿，蓝，透明度,
		              ...               ]  //多像素的数据
		   */
		   //颜色取值范围0~255；透明度取值范围0~1；
		var obj=cxt.getImageData(strawX,strawY,1,1);
		//alert(obj.data[0]);
		var color='rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		//alert(color);
		//将吸管吸出的颜色用到应用中
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
		//颜色吸取之后自动转到铅笔工具
		drawPaint(0);		
	}
	canvas.onmouseout=null;
	canvas.onmouseup=null;
	canvas.onmousemove=null;
}
//文本函数
function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
        startX=evt.pageX-this.offsetLeft;
        startY=evt.pageY-this.offsetTop;
        //获取用户输入信息
        //window.prompt('对话框提示'，'默认值');
        var valText=window.prompt('这是一个对话框','');
        //alert(valText);
        //输入文字写入到画布中对应的坐标点去
        if (valText!=null) {
        	cxt.font= 'normal 30px normal';
        	cxt.fillText(valText,startX,startY);
        }
	}
}
//直线函数
function drawLine(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		//如果存在IE浏览器，则把window.event赋值给evt,否则把evt赋值给它（由于IE浏览器与其他浏览器有所区别）
		evt=window.event||evt;
		//获取起始点的坐标（相对于canvas画布的距离）
		   //先获取鼠标距离页面顶端的距离和左端的距离
		        //（即鼠标在页面内的坐标）：evt.pageX   evt.pageY
		   //再获取画布距离页面顶端的距离和左端的距离
		       //this.offsetTop   this.offsetLeft
		//计算当前鼠标相对于画布原点（0，0）的坐标
		//alert(evt.pageX+"~~"+evt.pageY);
		//alert(this.offsetLeft+"~~"+this.offsetTop);
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
		//设置直线的起始点
		cxt.beginPath();
		cxt.moveTo(startX,startY);
	}
	  
    canvas.onmouseup=function(evt){
		evt=window.event||evt;
		endX=evt.pageX-this.offsetLeft;
		endY=evt.pageY-this.offsetTop;
		//alert(endX+"~~"+endY);
		//设置直线的终点位置
		cxt.lineTo(endX,endY);
		cxt.closePath();
        cxt.stroke();
	}

	//注销其他事件操作
    canvas.onmouseout=null;
	canvas.onmousemove=null;
}
//实心矩形函数
function drawRectfill(num){
	setStatus(actions,num,1);
	//当鼠标在画布点击时触发函数
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		//获取相对于画布的起始点
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
	}
    //当鼠标弹起时触发画线函数
	canvas.onmouseup=function(evt){
	   evt=window.event||evt;
       //获取鼠标弹起坐标
       endX=evt.pageX-this.offsetLeft;
       endY=evt.pageY-this.offsetTop;
       //计算矩形的长和宽：rectH rectW
       var rectW=endX-startX;
       var rectH=endY-startY;
       //画矩形
       cxt.fillRect(startX,startY,rectW,rectH);
    }
    	//注销鼠标其他无关事件
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//实心圆形函数
function drawArcfill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
        startY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		endX=evt.pageX-this.offsetLeft;
        endY=evt.pageY-this.offsetTop;
        //计算c的距离
        var a=endX-startX;
        var b=endY-startY;
        //计算半径
        var c=Math.sqrt(a*a+b*b);
        //绘图
        cxt.beginPath();
        cxt.arc(startX,startY,c,0,360,false);
        cxt.closePath();
        cxt.fill();
	}
	//注销其他操作
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//三角函数
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		//三角形中间点
		startX=evt.pageX-this.offsetLeft;
        startY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		//三角形右下角点
		endX=evt.pageX-this.offsetLeft;
        endY=evt.pageY-this.offsetTop;
        //三角形左下角点
        var bX=2*startX-endX;
        var bY=endY;
        //设置笔触
        cxt.beginPath();
        //设置端点
        cxt.moveTo(endX,endY);
        //三角形上面顶点
        var aX=startX;
        var aW=endX-startX;
        var aY=endY-Math.sqrt(3*aW*aW);
        //设置端点
        cxt.lineTo(bX,bY);
        cxt.lineTo(aX,aY);
        //闭合路径
        cxt.closePath();
        //画三角形
        cxt.stroke();
	}
	//注销其他操作
	canvas.onmouseout=null;
	canvas.onmousemove=null;
}
//矩形函数
function drawRect(num){
	setStatus(actions,num,1);
	//当鼠标在画布点击时触发函数
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		//获取相对于画布的起始点
		startX=evt.pageX-this.offsetLeft;
		startY=evt.pageY-this.offsetTop;
	}
    //当鼠标弹起时触发画线函数
	canvas.onmouseup=function(evt){
	   evt=window.event||evt;
       //获取鼠标弹起坐标
       endX=evt.pageX-this.offsetLeft;
       endY=evt.pageY-this.offsetTop;
       //计算矩形的长和宽：rectH rectW
       var rectW=endX-startX;
       var rectH=endY-startY;
       //画矩形
       cxt.strokeRect(startX,startY,rectW,rectH);
    }
    	//注销鼠标其他无关事件
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//圆形函数
function drawArc(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		startX=evt.pageX-this.offsetLeft;
        startY=evt.pageY-this.offsetTop;
	}
	canvas.onmouseup=function(evt){
		evt=window.event||evt;
		endX=evt.pageX-this.offsetLeft;
        endY=evt.pageY-this.offsetTop;
        //计算c的距离
        var a=endX-startX;
        var b=endY-startY;
        //计算半径
        var c=Math.sqrt(a*a+b*b);
        //绘图
        cxt.beginPath();
        cxt.arc(startX,startY,c,0,360,false);
        cxt.closePath();
        cxt.stroke();
	}
	//注销其他操作
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//线宽函数
function setSize(num){
    setStatus(sizes,num,1);
    switch(num){
    	case 0:
    	    cxt.lineWidth=1;
    	    break;
    	case 1:
    	    cxt.lineWidth=3;
    	    break;
    	case 2:
    	    cxt.lineWidth=5;
    	    break;
        case 3:
            cxt.lineWidth=8;
            break;
        default:
            cxt.lineWidth=1;
    }
}
//颜色函数
function setColor(obj,num){
	setStatus(colors,num,0);
	//设置画笔颜色和填充颜色
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
} 