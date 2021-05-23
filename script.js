//welcome to the variable zone

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var ballRadius = 10;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
var score = 0;

var ballColor =
  "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//--------------------------------------------------------------------------------------

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
  if (y + dy > canvas.height || y + dy < 0) {
    dy = -dy;
  }

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
    ballColor =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  }
  if (y + dy < ballRadius) {
    dy = -dy;
    ballColor =
      "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
      ballColor =
        "#" + (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
    } else {
      var deathFunny = Math.floor(Math.random() * 10);
      console.log(deathFunny);
      switch (deathFunny) {
        case 0:
          alert("wow you suck");
          break;
        case 1:
          alert("L");
          break;
        case 2:
          alert("uninstall game");
          break;
        case 3:
          alert("you are garbage");
          break;
        case 4:
          alert("yikes");
          break;
        case 5:
          alert("sheeeeeeeeeeeeeesh");
          break;
        case 6:
          alert("😐");
          break;
        case 7:
          alert("you are noob man");
          break;
        case 8:
          alert("sucks to suck");
          break;
        case 9:
          alert("get a job");
          break;
      }
      document.location.reload();
      clearInterval(interval);
    }
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  collisionDetection();
  x += dx;
  y += dy;
  if (rightPressed) {
    paddleX += 7;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  } else if (leftPressed) {
    paddleX -= 7;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (
          x > b.x &&
          x < b.x + brickWidth &&
          y > b.y &&
          y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
          score++;
          ballColor =
            "#" +
            (0x1000000 + Math.random() * 0xffffff).toString(16).substr(1, 6);
          if (score == brickRowCount * brickColumnCount) {
            alert("gg ez");
            document.location.reload();
            clearInterval(interval);
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

var interval = setInterval(draw, 10);
