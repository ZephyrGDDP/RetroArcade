<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dungeon Quest</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #222;
            color: #fff;
        }
        canvas {
            border: 2px solid #fff;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    <script>
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');


const tileSize = 40; 
const gridWidth = 20; 
const gridHeight = 15; 
const playerSpeed = 5; 


const player = {
    x: 1,
    y: 1,
    width: tileSize,
    height: tileSize,
    color: 'green'
};


let dungeonMap = [];


let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});


async function loadDungeonMap() {
    const response = await fetch('https://drive.google.com/uc?id=1rfN9ePd7Bf48gSCw1ImnAwoaDbFvhYNq');
    const text = await response.text();
    const levels = text.split("\n\n"); 
    
    
    dungeonMap = levels[0].split("\n").map(line => line.split('').map(Number));
    
    
    gameLoop();
}


function gameLoop() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    
    drawDungeon();

    
    movePlayer();

    
    requestAnimationFrame(gameLoop);
}


function drawDungeon() {
    for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
            if (dungeonMap[row][col] === 1) {
                ctx.fillStyle = 'gray'; 
            } else {
                ctx.fillStyle = 'black'; 
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}


function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, player.width, player.height);
}


function movePlayer() {
    const newX = player.x;
    const newY = player.y;

    if (keys['ArrowUp'] || keys['w']) {
        if (player.y > 0 && dungeonMap[player.y - 1][player.x] !== 1) {
            player.y--;
        }
    }
    if (keys['ArrowDown'] || keys['s']) {
        if (player.y < gridHeight - 1 && dungeonMap[player.y + 1][player.x] !== 1) {
            player.y++;
        }
    }
    if (keys['ArrowLeft'] || keys['a']) {
        if (player.x > 0 && dungeonMap[player.y][player.x - 1] !== 1) {
            player.x--;
        }
    }
    if (keys['ArrowRight'] || keys['d']) {
        if (player.x < gridWidth - 1 && dungeonMap[player.y][player.x + 1] !== 1) {
            player.x++;
        }
    }

    
    drawPlayer();
}


loadDungeonMap();
</script>
</body>
</html>
