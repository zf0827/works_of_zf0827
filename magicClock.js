/**
 * 欢迎！未来的潮人！
 * 请在这个文件中完成魔法时钟的制作
 * 您甚至不需要编辑其他文件，但我们鼓励更多的探索！
 * 现在您可以删掉这段注释，开始实践。
 */
var canvas=document.getElementById("ClockCanvas");
var ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;
canvas.style.border = '1px solid #ccc';
var img1 = new Image();
img1.src='./src/ClockBoard.png';
var img2 = new Image();
img2.src='./src/HourHand.png';
var img3 = new Image();
img3.src='./src/MinuteHand.png';
var img4 = new Image();
img4.src='./src/Bolt.png';
ctx.translate(301.30204297656246,499.3333311235352);

var style = window.getComputedStyle(canvas, null);
var borderLeft = parseFloat(style["border-left-width"]);
var borderTop = parseFloat(style["border-top-width"]);
var paddingLeft = parseFloat(style["padding-left"]);
var paddingTop = parseFloat(style["padding-top"]);


var isDown = false;
var xx1 = -35 + 301.30204297656246;
var yy1 = -400 + 499.3333311235352;
var xx2 = xx1 + 70;
var yy2 = yy1 + 25*7;
var prey;
var isLock = false;

var xx3 = 200,yy3 = 400,xx4 = 400,yy4 = 600;
var preagh;
var preh;
window.onload = function() {
    // console.log(11);
    ctx.drawImage(img1,200-301.30204297656246,400-499.3333311235352,200,200);
    ctx.drawImage(img2,-8,-80,16,80);
    ctx.drawImage(img3,-10,-100,20,100);
    ctx.drawImage(img4,-35,-400,70,250*0.7); 
    // ctx.rotate((Math.PI / 180) * 25);
    // ctx.drawImage(img3,-10,-100,20,100);
};
//lets move
// setTimeout(function(){
//     ctx1.drawImage(bgImg,0,0,wWidth,wHeight);
// },10)

function drawByTime(){//根据系统时间绘制
    // console.log(22);
    const nwt = getTime();
    const arr = nwt.split(":");
    var nwh = parseInt(arr[0]);
    var nwm = parseInt(arr[1]);
    preh = nwh;
    if(nwh > 12) nwh -= 12;
    var agh = (Math.PI*nwh/6);
    var agm = (Math.PI*nwm/30);
    agh += agm/12;
    preagh = agh;
    
    ctx.save();
    ctx.drawImage(img1,200-301.30204297656246,400-499.3333311235352,200,200);
    ctx.restore();
    ctx.save();
    ctx.rotate(agh);
    ctx.drawImage(img2,-8,-80,16,80);
    ctx.restore();
    ctx.save();
    ctx.rotate(agm);
    ctx.drawImage(img3,-10,-100,20,100);
    ctx.restore();
}
function Runin(){//启动随时间流逝地绘画
    drawByTime();
    if(isLock){
        isDown = false;
        freezeTime();
        return;
    }
    window.requestAnimationFrame(Runin);
}
window.requestAnimationFrame(Runin);


//以下是cheat部分
var nicnbo = 1;
var myflag = false;
var typ = 0;
var prem;
function drawByTime_ex(){
    // console.log(22);
    const nwt = getTime();
    console.log(nwt);
    const arr = nwt.split(":");
    var nwh = parseInt(arr[0]);
    var nwm = parseInt(arr[1]);
    var realh = nwh;
    if(nwh > 12) nwh -= 12;
    var agh = (Math.PI*nwh/6);
    var agm = (Math.PI*nwm/30);
    agh += agm/12;
    preagh = agh;
    
    ctx.save();
    ctx.drawImage(img1,200-301.30204297656246,400-499.3333311235352,200,200);
    ctx.restore();
    ctx.save();
    ctx.rotate(agh);
    ctx.drawImage(img2,-8,-80,16,80);
    ctx.restore();
    ctx.save();
    ctx.rotate(agm);
    ctx.drawImage(img3,-10,-100,20,100);
    ctx.restore();
    // console.log(realh,nwm,nicnbo,preh,prem);
    
    if(typ == 1&&realh == 5&&nwm == 51){
        console.log(11111111111111);
        myflag = true;
        return;
    }
    if(typ == 2&&realh == 9&&nwm == 0){
        console.log(22222222222222);
        myflag = true;
        return;
    }
    if(typ == 3&&realh == 11&&nwm == 57){
        console.log(33333333333333);
        myflag = true;
        return;
    }
    if(preh==realh&&prem==nwm){
        ++nicnbo;
    }else nicnbo = 1;
    preh = realh;prem = nwm;
    nwm += nicnbo;
    if(nwm>=60){
        nwm-=60;
        ++realh;
    }
    if(realh==23&&nwm>=55){
        myflag = true;
        return;
    }
    var tt = realh + ":" + nwm;
    setTime(tt);
}
function cheater_init(){
    ctx.save();
    ctx.translate(-301.30204297656246,-499.3333311235352);
    ctx.fillStyle = "orange";
    ctx.fillRect(50,50,50,50);
    ctx.restore();
}
cheater_init();
// setInterval(drawByTime,1);
// function printTime(){
//     console.log(getTime());
// }
// setInterval(printTime,500);
function dig(){
    myflag = false;
    drawByTime_ex();
    // console.log(111);
    if(myflag) return;
    window.requestAnimationFrame(dig);
}
function runCheater(){
    if(typ==1){
        var stt = "01:01";
        setTime(stt);
    }
    // console.log(111,getTime());
    window.requestAnimationFrame(dig);
}
canvas.addEventListener("click", function __handler__(evt) {
    
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft;
    y -= rect.top - borderTop - paddingTop;
   if(x>=50&&x<=100&&y>=50&&y<=100){
        ++typ;runCheater();
   }
});

function getDeg(xx,yy){//坐标到角度
    var delx = xx - 301.30204297656246,dely = yy - 499.3333311235352;
    // console.log(delx,dely);
    if(delx == 0){
        if(dely > 0) return Math.PI;
        else return 0;
    }
    var nwdeg = Math.atan(dely / delx) + Math.PI*1.5;
    if(delx > 0) nwdeg -= Math.PI;
    return nwdeg;
}
canvas.addEventListener("mousedown", function __handler__(evt) {//拉动指针
    
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft;
    y -= rect.top - borderTop - paddingTop;
    var nwdeg = getDeg(x,y);
    if(isLock){
        if(x>=xx3&&x<=xx4&&y>=yy3&&y<=yy4&&Math.abs(nwdeg-preagh) < 0.35){
            // console.log(nwdeg/(2*Math.PI)*360);
            isDown = true;
        }
        else isDown = false;    
    }
});
canvas.addEventListener("mousemove", function __handler__(evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft;
    y -= rect.top - borderTop - paddingTop;
    var nwdeg = getDeg(x,y);
    if(isLock&&isDown){
        var reh = Math.floor(nwdeg*6/Math.PI);
        var rem = (nwdeg - (Math.PI*reh/6))/Math.PI*360;
        if(preh>=12&&preh<=23&&reh!=0) reh += 12;
        if((preh==11||preh==12)&&reh==0) reh = 12;
        
        var nwT = reh + ":" + rem;
        // console.log(preh,nwT);
        preh = reh;
        setTime(nwT);
        drawByTime();
    }
});
canvas.addEventListener("mousedown", function __handler__(evt) {//拉动钥匙
    
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft;
    y -= rect.top - borderTop - paddingTop;
    if(!isLock){
        if(x>=xx1&&x<=xx2&&y>=yy1&&y<=yy2){
            isDown = true;
            prey = y;
        }
        else isDown = false;    
    }
    // console.log(xx1,xx2,yy1,yy2,isDown);
});
canvas.addEventListener("mousemove", function __handler__(evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft;
    y -= rect.top - borderTop - paddingTop;
    if(isDown&&!isLock){
        yy1 += y - prey;
        yy2 += y - prey;
        ctx.save();
        ctx.translate(-301.30204297656246,-499.3333311235352);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        cheater_init();
        ctx.drawImage(img4,xx1-301.30204297656246,yy1-499.3333311235352,70,250*0.7); 
        prey = y;
        if(yy2 >= 500){
            isLock = true;
        }
    }
});
var ooisDown = false;
canvas.addEventListener("mousedown", function __handler__(evt) {
    
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft; 
    y -= rect.top - borderTop - paddingTop;
    if(isLock){
        console.log(xx1,xx2,yy1,yy2,yy1+250*0.7-100);
        if(x>=xx1&&x<=xx2&&y>=yy1&&y<=yy1+250*0.7-100){
            
            ooisDown = true;
            prey = y;
        }   
    }
});
canvas.addEventListener("mousemove", function __handler__(evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft;
    y -= rect.top - borderTop - paddingTop;
    if(ooisDown){
        yy1 += y - prey;
        yy2 += y - prey;
        ctx.save();
        ctx.translate(-301.30204297656246,-499.3333311235352);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        // cheater_init();
        ctx.drawImage(img4,xx1-301.30204297656246,yy1-499.3333311235352,70,250*0.7); 
        prey = y;
        if(isLock){
            isLock = false;
            meltTime();
            Runin();
        }
    }
});
//这一段是网上复制的鼠标侦测，本来是拿来找画图片的坐标的，结果正好发现后面也要用，为了坐标统一上面就复制了。
canvas.addEventListener("mouseup",function(){
    ooisDown = isDown = false;
})
canvas.addEventListener("click", function __handler__(evt) {
    var x = evt.clientX;
    var y = evt.clientY;
    var rect = canvas.getBoundingClientRect();
    x -= rect.left - borderLeft - paddingLeft; // 去除 borderLeft paddingLeft 后的坐标
    y -= rect.top - borderTop - paddingTop; // 去除 borderLeft paddingLeft 后的坐标
    console.log(x, y); // (x, y) 就是鼠标在 canvas 单击时的坐标
});
