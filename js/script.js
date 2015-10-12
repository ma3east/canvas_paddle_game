var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var paddle1X = 10;
var paddle1Y = 250;

var paddle2X = 10;
var paddle2Y = 250;

const PADDLE_HEIGHT = 100;

function calculateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = event.clientX - rect.left - root.scrollLeft;
  var mouseY = event.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  };

}

function moveEverything() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if(ballX < 0) {
    if(ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT) ) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
    }
  }
  if(ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if(ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
  if(ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

function drawEverything() {
  //draw canvas
  colorRect(0, 0, canvas.width, canvas.height, 'black');

  //draw left paddle
  colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');

  //draw right paddle
  colorRect(790, paddle2Y, 10, PADDLE_HEIGHT, 'white');

  //draw ball
  colorCircle(ballX, ballY, 10, 'red'); 
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  //set frames per second
  var fps = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }
  , 1000 / fps);

  canvas.addEventListener('mousemove', function(event) {
    var mousePos = calculateMousePos(event);

    paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
    paddle2Y = mousePos.y - (PADDLE_HEIGHT / 2);
  }) 
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centreX, centreY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, (Math.PI * 2), true);
  canvasContext.fill();
}

function ballReset() {
  ballSpeedX = -ballSpeedX;

  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
}



