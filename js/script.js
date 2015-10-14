var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 4;

var player1Score = 0;
var player2Score = 0;

var paddle1Y = 250;
var paddle2Y = 250;

const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;
  var mouseX = evt.clientX - rect.left - root.scrollLeft;
  var mouseY = evt.clientY - rect.top - root.scrollTop;

  return {
    x: mouseX,
    y: mouseY
  };
}

window.onload = function(){
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  //set frames per second
  var fps = 30;
  setInterval(function() {
    moveEverything();
    drawEverything();
  }, 1000 / fps);

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = calculateMousePos(evt);

    paddle1Y = mousePos.y - (PADDLE_HEIGHT / 2);
  })

  function ballReset() {
    ballSpeedX = -ballSpeedX;

    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
  } 

function computerMovement() {
  var paddle2YCentre = paddle2Y + (PADDLE_HEIGHT / 2);
  
  if(paddle2YCentre < (ballY - 35) ) {
    paddle2Y += 6;
  } else if(paddle2YCentre > (ballY + 35) ) {
    paddle2Y -= 6;
  }
}

function moveEverything() {
  computerMovement();

  ballX += ballSpeedX;
  ballY += ballSpeedY;

  //code for if ball passes left edge/paddle 1
  if(ballX < 0) {
    if(ballY > paddle1Y && 
      ballY < (paddle1Y + PADDLE_HEIGHT) ) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
      player2Score++;
    }
  }
  //code for if ball passes right edge/paddle 2
  if(ballX > canvas.width) {
    if(ballY > paddle2Y && 
      ballY < (paddle2Y + PADDLE_HEIGHT) ) {
      ballSpeedX = -ballSpeedX;
    } else {
      ballReset();
      player1Score++;
    }
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
  colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  //draw right paddle
  colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');

  //draw ball
  colorCircle(ballX, ballY, 10, 'red'); 

  canvasContext.font = "40px";
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

}

function colorCircle(centreX, centreY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centreX, centreY, radius, 0, (Math.PI * 2), true);
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}





