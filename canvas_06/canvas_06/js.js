var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var x = 0;
var timer;

drawSin();

function drawSin(){
	y = Math.sin(x);
	if (x>=400){
		x=0;
	}
	else {
		x=x+0.3;
	}
	ctx.fillRect(5*x,100+20*y, 2,2);
	timer = setTimeout(drawSin, 50);
}
