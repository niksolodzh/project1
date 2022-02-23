const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const done = document.getElementById('done');
const next = document.getElementById('next');
const targetVelX1 = document.getElementById('targetX');
const targetVelY1 = document.getElementById('targetY');
const distanceX1 = document.getElementById('distanceX');
const distanceY1 = document.getElementById('distanceY');
const rocketVel1 = document.getElementById('rocket');

const rocketAcc1 = document.getElementById('rocketAcc');;
const targetAccX1 = document.getElementById('targetAccX');;
const targetAccY1 = document.getElementById('targetAccY');;

let targetVelRejX = 0; 
let targetAccRejX = 0;
let targetVelRejY = 0; 
let targetAccRejY = 0;

let rocketAcc = 0;
let targetAccX = 0;
let targetAccY = 0;
// gkgkghjghjghjgj
let timer;
let rocketAccX = 0;
let rocketAccY = 0;
let targetVelX = 0; // 
let targetVelY = 0;
let distanceX = 0;
let distanceY = 0;
let rocketVel = 0;
let rocketVelX = 0;
let rocketVelY = 0;
let x1=0, y1=0, x2=0, y2=0;
let a = 100, b = 100;



ctx.moveTo(0, 0);

done.onclick = function (){
    targetVelX = parseFloat(targetVelX1.value);
    targetVelY = parseFloat(targetVelY1.value);
    distanceX = parseFloat(distanceX1.value);
    distanceY = parseFloat(distanceY1.value);
    rocketVel = parseFloat(rocketVel1.value);
    rocketAcc = parseFloat(rocketAcc1.value);
    targetAccX = parseFloat(targetAccX1.value);
    targetAccY = parseFloat(targetAccY1.value);
    x1=distanceX + a;
    y1=distanceY + b;
    x2=a;
    y2=b;
    
    targetVelRejX = targetVelX - projectX(targetVelX, targetVelY, distanceX, distanceY);
    console.log('targetVelRejX: ', targetVelRejX);
    targetVelRejY = targetVelY - projectY(targetVelX, targetVelY, distanceX, distanceY);
    console.log('targetVelRejY: ', targetVelRejY);
    targetAccRejX = targetAccX - projectX(targetAccX, targetAccY, distanceX, distanceY);
    console.log('targetAccRejX: ', targetAccRejX);
    targetAccRejY = targetAccY - projectY(targetAccX, targetAccY, distanceX, distanceY);
    console.log('targetAccRejY: ', targetAccRejY);
    
    if (rocketVel**2 >= targetVelRejX**2 + targetVelRejY**2){    
        rocketVelY= distanceY/Math.sqrt(distanceX**2+distanceY**2)*Math.sqrt(rocketVel**2 - (targetVelRejX**2 + targetVelRejY**2)) + targetVelRejY;
        rocketVelX= distanceX/Math.sqrt(distanceX**2+distanceY**2)*Math.sqrt(rocketVel**2 - (targetVelRejX**2 + targetVelRejY**2)) + targetVelRejX;
        rocketAccY= distanceY/Math.sqrt(distanceX**2+distanceY**2)*Math.sqrt(rocketAcc**2 - (targetAccRejX**2 + targetAccRejY**2)) + targetAccRejY;
        rocketAccX= distanceX/Math.sqrt(distanceX**2+distanceY**2)*Math.sqrt(rocketAcc**2 - (targetAccRejX**2 + targetAccRejY**2)) + targetAccRejX;
    } /*
    else{
        rocketVelY = rocketVel * targetVelRejY/Math.sqrt(targetVelRejX**2 + targetVelRejY**2);
        rocketVelX = rocketVel * targetVelRejX/Math.sqrt(targetVelRejX**2 + targetVelRejY**2);
        rocketAccY = rocketAcc * targetVelRejY/Math.sqrt(targetVelRejX**2 + targetVelRejY**2);
        rocketAccX = rocketVel * targetVelRejX/Math.sqrt(targetVelRejX**2 + targetVelRejY**2);
    }*/

    console.log('скорость цели Y: ', targetVelY);
    console.log('ускорение цели Y:', targetAccY);
    console.log('скорость ракеты Y: ', rocketVelY);
    console.log('ускорение ракеты Y: ', rocketAccY);

    // console.log(targetx, targety, distancex, distancey, rocket);
    timer1();
}

function timer1(){
    target();
    final();
    distancex = x1 - x2;
    distancey = y1 - y2;
    timer = setTimeout(timer1, 500);
}
function target (){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.strokeStyle = "blue";
    targetVelX+=targetAccX;
    targetVelY+=targetAccY;
    x1=x1+targetVelX;
    y1=y1+targetVelY;
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
    console.log('скорость цели Y: ', targetVelY);
    // console.log(x1, y1);
}
function final(){
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.strokeStyle = "red";
    rocketVelX+=rocketAccX;
    rocketVelY+=rocketAccY;
    predict();
    x2=x2+rocketVelX;
    y2=y2+rocketVelY;
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
    console.log('скорость ракеты Y: ', rocketVelY);
    console.log('ускорение ракеты Y: ', rocketAccY);

}

function predict(){
    
    targetVelRejX = targetVelX - projectX(targetVelX, targetVelY, distanceX, distanceY);
    targetVelRejY = targetVelY - projectY(targetVelX, targetVelY, distanceX, distanceY);
    targetAccRejX = targetAccX - projectX(targetAccX, targetAccY, distanceX, distanceY)
    targetAccRejY = targetAccY - projectY(targetAccX, targetAccY, distanceX, distanceY)
    if (rocketVel**2 >= targetVelRejX**2 + targetVelRejY**2){
        rocketAccY= distanceY/Math.sqrt(distanceX**2+distanceY**2)*Math.sqrt(rocketAcc**2 - (targetAccRejX**2 + targetAccRejY**2)) + targetAccRejY;
        rocketAccX= distanceX/Math.sqrt(distanceX**2+distanceY**2)*Math.sqrt(rocketAcc**2 - (targetAccRejX**2 + targetAccRejY**2)) + targetAccRejX;
    } /*else{
        rocketAccY = rocketAcc * targetVelRejY/Math.sqrt(targetVelRejX**2 + targetVelRejY**2);
        rocketAccX = rocketVel * targetVelRejX/Math.sqrt(targetVelRejX**2 + targetVelRejY**2);
    }*/

}



function projectX(x, y, xP, yP){
    const vectorLength = Math.sqrt(xP**2+yP**2)
    const xP0 = xP/vectorLength;
    const yP0 = yP/vectorLength;
    const PrX = xP0*(x*xP0+y*yP0);
    return PrX;
}
function projectY(x, y, xP, yP){
    const vectorLength = Math.sqrt(xP**2+yP**2)
    const xP0 = xP/vectorLength;
    const yP0 = yP/vectorLength;
    const PrY = yP0*(x*xP0+y*yP0);
    return PrY;
}
function reflectX(x,  y,  xP,  yP){
    const PrX = projectX(x,  y,  xP,  yP);
    const reflX = 2*PrX - x;
    return reflX;
}
function reflectY(x,  y,  xP,  yP){
    const PrY = projectY(x,  y,  xP,  yP);
    const reflY = 2*PrY - y;
    return reflY;
}