'use strict';
const canvas = document.getElementById('c1');
const ctx = canvas.getContext('2d');
const done = document.getElementById('done');
const next = document.getElementById('next');
const targetx1 = document.getElementById('targetX');
const targety1 = document.getElementById('targetY');
const distancex1 = document.getElementById('distanceX');
const distancey1 = document.getElementById('distanceY');
const rocket1 = document.getElementById('rocket');
let timer;
let targetx = 0; // 
let targety = 0;
let distancex = 0;
let distancey = 0;
let rocket = 0;
let x1=0, y1=0, x2=0, y2=0;
const accelerationRocket = 3;
const accelerationTarget = 2;
let a = 100, b = 100;

ctx.moveTo(0, 0);

done.onclick = function (){
    targetx = parseFloat(targetx1.value);
    targety = parseFloat(targety1.value);
    distancex = parseFloat(distancex1.value);
    distancey = parseFloat(distancey1.value);
    rocket = parseFloat(rocket1.value);
    x1=distancex + a;
    y1=distancey + b;
    x2=a;
    y2=b;
    // console.log(targetx, targety, distancex, distancey, rocket);
    timer1();
}
function timer1(){
    target();
    final();
    timer = setTimeout(timer1, 25);
}
function target (){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.strokeStyle = "blue";
    x1=x1+targetx;
    y1=y1+targety;
    ctx.lineTo(x1, y1);
    ctx.stroke();
    ctx.closePath();
    // console.log(x1, y1);
}
function final(){
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.strokeStyle = "red";
    const rocketx = rocket / Math.sqrt(targetx**2+targety**2) * reflectX(targetx, targety, predictX(rocket, targetx, targety, distancex, distancey), predictY(rocket, targetx, targety, distancex, distancey));
    const rockety = rocket / Math.sqrt(targetx**2+targety**2) * reflectY(targetx, targety, predictX(rocket, targetx, targety, distancex, distancey), predictY(rocket, targetx, targety, distancex, distancey));
    x2=x2+rocketx;
    y2=y2+rockety;
    ctx.lineTo(x2, y2);
    distancex = x1 - x2;
    distancey = y1 - y2;
    ctx.stroke();
    ctx.closePath();
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

function predictX(vR, aR, vXT, vYT, aXT, aYT, xD, yD){
    const 
    const time = 2*()
}
function predictX(vR, xA, yA, xD, yD){
    const prxA = projectX(xA, yA, xD, yD); 
    const pryA = projectY(xA, yA, xD, yD); 
    const rejxR = xA - prxA; 
    const rejyR = yA - pryA; 
    const prR = Math.sqrt(vR**2-rejxR**2-rejyR**2);
    const prxR = xD/Math.sqrt(xD**2+yD**2)*prR;
    const pryR = yD/Math.sqrt(xD**2+yD**2)*prR;
    const xH = (rejxR + prxR)*Math.sqrt((xD**2+yD**2)/((Math.abs(prxR)+Math.abs(prxA))**2)+(Math.abs(pryR)+Math.abs(pryA))**2);
    return xH;
}
function predictY(vR, xA, yA, xD, yD){
    const prxA = projectX(xA, yA, xD, yD);
    const pryA = projectY(xA, yA, xD, yD);
    const rejxR = xA - prxA;
    const rejyR = yA - pryA;
    const d = Math.sqrt(vR**2-rejxR**2-rejyR**2);
    const prxR = d*xD/Math.sqrt(xD**2+yD**2);
    const pryR = d*yD/Math.sqrt(xD**2+yD**2);
    const yH = (pryR + rejyR)*Math.sqrt((xD**2+yD**2)/((Math.abs(prxR)+Math.abs(prxA))**2)+(Math.abs(pryR)+Math.abs(pryA))**2);
    return yH;
}