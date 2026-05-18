const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const resultText = document.getElementById("result");
const stopButton = document.getElementById("stopButton");
const startButton = document.getElementById("startButton");

stopButton.style.display = "none";

// Moving line
let interval = 300;
let speed = 4;
let direction = 1;
let intervalLength = 100;
intervalY = canvas.height - 150;

// Target area
let targetX = 250;
    
// Game state
let gameRunning = false;

function drawNumberLine({
  x = 50,
  y = canvas.height - 100,
  length = 700,
  min = 20,
  max = 40,
  tickHeight = 10
} = {}) {

  // Main line
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + length, y);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.stroke();

  const range = max - min;
  const spacing = length / range;

  // Draw ticks and labels
  for (let i = min; i <= max; i++) {
    const px = x + (i - min) * spacing;

    // Tick mark
    ctx.beginPath();
    ctx.moveTo(px, y - tickHeight);
    ctx.lineTo(px, y + tickHeight);
    ctx.stroke();

    // Label
    
  }

}

// Draw it
drawNumberLine();

function drawInterval() {
    // Draw moving line
    ctx.strokeStyle = "red";
    ctx.lineWidth = 6;

    ctx.beginPath();
    ctx.moveTo(interval, intervalY);
    ctx.lineTo(interval + intervalLength, intervalY);
    ctx.stroke();

    // Left vertical cap
    ctx.beginPath();
    ctx.moveTo(interval, intervalY - 10);
    ctx.lineTo(interval, intervalY + 10);
    ctx.stroke();

    // Right vertical cap
    ctx.beginPath();
    ctx.moveTo(intervalLength + interval, intervalY - 10);
    ctx.lineTo(intervalLength + interval, intervalY + 10);
    ctx.stroke();

    // Center square
    ctx.fillStyle = "red";
    ctx.fillRect(44+interval, intervalY - 7, 14, 14);
}

function draw() {

    // Clear screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawNumberLine();

    // Draw target
    ctx.strokeStyle = "lime";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(targetX, 0);
    ctx.lineTo(targetX, canvas.height);
    ctx.stroke();

    drawInterval();
}

function update() {

    if (!gameRunning) return;

    // Move line
    interval += speed * direction;

    // Bounce off walls
    if (interval + intervalLength >= canvas.width) {
        direction = -1;
    }

    if (interval <= 0) {
        direction = 1;
    }

    draw();

    requestAnimationFrame(update);
}

// Button press

startButton.addEventListener("click", () => {
    if (gameRunning) return;
    stopButton.style.display = "inline-block";
    startButton.style.display = "none";
    interval = 0;
    direction = 1;
    resultText.textContent = "";
    gameRunning = true;
    targetX = Math.floor(Math.random() * (canvas.width - 2 * intervalLength + 1)) + intervalLength
    update();
});

stopButton.addEventListener("click", () => {

    if (!gameRunning) return;

    gameRunning = false;

    stopButton.style.display = "none";
    startButton.style.display = "inline-block";

    const lineEnd = interval + intervalLength;

    // Check if line is inside target
    if (lineEnd >= targetX && interval <= targetX + 6) {
        resultText.textContent = "Your interval captured the true parameter!";
        resultText.style.color = "lime";
    }
    else {
        resultText.textContent = "Your interval did not capture the true parameter!";
        resultText.style.color = "red";
    }
});

drawInterval();
