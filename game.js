// Set up the game canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const tileSize = 40; // Size of each tile in the dungeon
const gridWidth = 20; // Width of the grid in tiles
const gridHeight = 15; // Height of the grid in tiles
const playerSpeed = 5; // Speed of the player movement

// Player object
const player = {
    x: 1,
    y: 1,
    width: tileSize,
    height: tileSize,
    color: 'green'
};

// Dungeon map (1 for walls, 0 for empty space)
const dungeonMap = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// Handle keyboard input for movement
let keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw dungeon
    drawDungeon();

    // Move the player
    movePlayer();

    // Request next frame
    requestAnimationFrame(gameLoop);
}

// Draw dungeon map
function drawDungeon() {
    for (let row = 0; row < gridHeight; row++) {
        for (let col = 0; col < gridWidth; col++) {
            if (dungeonMap[row][col] === 1) {
                ctx.fillStyle = 'gray'; // Wall color
            } else {
                ctx.fillStyle = 'black'; // Empty space color
            }
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
}

// Draw the player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x * tileSize, player.y * tileSize, player.width, player.height);
}

// Handle player movement and collision detection
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

    // Draw the player
    drawPlayer();
}

// Start the game loop
gameLoop();
