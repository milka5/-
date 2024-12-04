const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width = window.innerWidth;
const canvasHeight = canvas.height = window.innerHeight;


let frog = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    width: 50,
    height: 50
};

let butterfly = {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    width: 30,
    height: 30
};

let score = 0;

function draw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.beginPath();
    ctx.arc(frog.x + frog.width / 2, frog.y + frog.height / 2, frog.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = 'blue';
    ctx.fill();

    ctx.fillStyle = 'pink';
    ctx.fillRect(butterfly.x, butterfly.y, butterfly.width, butterfly.height);

    ctx.fillStyle = 'blue';
    ctx.font = '20px Arial';
    ctx.fillText('Рахунок: ' + score, 20, 30);
}

function updateButterfly() {
    butterfly.x += Math.random() * 2 - 1;
    butterfly.y += Math.random() * 2 - 1;

    if (butterfly.x < 0) butterfly.x = 0;
    if (butterfly.x > canvasWidth - butterfly.width) butterfly.x = canvasWidth - butterfly.width;
    if (butterfly.y < 0) butterfly.y = 0;
    if (butterfly.y > canvasHeight - butterfly.height) butterfly.y = canvasHeight - butterfly.height;
}

function checkCollision() {
    return frog.x < butterfly.x + butterfly.width &&
           frog.x + frog.width > butterfly.x &&
           frog.y < butterfly.y + butterfly.height &&
           frog.y + frog.height > butterfly.y;
}

function update() {
    updateButterfly();

    if (checkCollision()) {
        score++;
        butterfly.x = Math.random() * canvasWidth;
        butterfly.y = Math.random() * canvasHeight;
    }
}

canvas.addEventListener('mousemove', (event) => {
    frog.x = event.clientX;
    frog.y = event.clientY;
});

function animate() {
    requestAnimationFrame(animate);
    update();
    draw();
}

animate();