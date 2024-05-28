const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('scoreval');
const width = gameBoard.width;
const height = gameBoard.height;
const unit = 25;
let foodX;
let foodY;
let xVel = 25;
let yVel = 0;
let score = 0;
let active = false;
let started = false;

let snake = [
    { x: unit * 3, y: 0 },
    { x: unit * 2, y: 0 },
    { x: unit, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener('keydown', keyPress);

startGame();

function startGame() {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, width, height);
    createFood();
    displayFood();
    nextTick();
}

function clearBoard() {
    context.fillStyle = '#212121';
    context.fillRect(0, 0, width, height);
}

function createFood() {
    foodX = Math.floor(Math.random() * width / unit) * unit;
    foodY = Math.floor(Math.random() * height / unit) * unit;
}

function displayFood() {
    context.fillStyle = 'red';
    context.fillRect(foodX, foodY, unit, unit);
}

function drawSnake() {
    context.fillStyle = 'aqua';
    context.strokeStyle = '#212121';
    
    snake.forEach((snakePart) => {
        context.fillRect(snakePart.x, snakePart.y, unit, unit);
        context.strokeRect(snakePart.x, snakePart.y, unit, unit);
    });
}

function moveSnake() {
    const head = { x: snake[0].x + xVel, y: snake[0].y + yVel };
    snake.unshift(head);

    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 1;
        scoreText.textContent = score;
        createFood();
    } else {
        snake.pop();
    }
}

function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 100);
    } else {
        clearBoard();
        context.font = 'bold 50px serif';
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Game Over!!", width / 2, height / 2);
    }
}

function keyPress(event) {
    if (!started) {
        active = true;
        started = true;
    }
    
    const LEFT = 37;
    const UP = 38;
    const RIGHT = 39;
    const DOWN = 40;

    switch (event.keyCode) {
        case LEFT:
            if (xVel !== unit) {
                xVel = -unit;
                yVel = 0;
            }
            break;
        case RIGHT:
            if (xVel !== -unit) {
                xVel = unit;
                yVel = 0;
            }
            break;
        case UP:
            if (yVel !== unit) {
                xVel = 0;
                yVel = -unit;
            }
            break;
        case DOWN:
            if (yVel !== -unit) {
                xVel = 0;
                yVel = unit;
            }
            break;
    }
}

function checkGameOver() {
    if (snake[0].x < 0 || snake[0].x >= width || snake[0].y < 0 || snake[0].y >= height) {
        active = false;
    }
}
