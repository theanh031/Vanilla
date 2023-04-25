
let playerState = "run"
const dropdown = document.getElementById("animations");
dropdown.addEventListener('change', (e) => {
    playerState = e.target.value;
})

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const WIDTH = (canvas.width = 600);
const HEIGHT = (canvas.height = 600);

const playerImage = new Image();
playerImage.src = "./assets/shadow_dog.png";
let x = 0;
let y = 0;
let gameFrame = 0;
const staggerFrame = 5;
const spriteWidth = 573;
const spriteHeight = 523;

const spriteAnimation = [
   
]

const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 4,
    }
]

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],

    }
    for( let j = 0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x:positionX, y:positionY});
    }
    spriteAnimation[state.name] = frames;
})
console.log(spriteAnimation)

function animate() {
    ctx.clearRect(x, y, WIDTH, HEIGHT);
    let position = Math.floor(gameFrame/staggerFrame) % spriteAnimation[playerState].loc.length;
    let frameX = spriteWidth * position
    let frameY = spriteAnimation[playerState].loc[position].y;
    ctx.drawImage(
        playerImage,
        frameX,
        frameY,
        spriteWidth,
        spriteHeight,
        0,
        0,
        spriteWidth,
        spriteHeight
    );
    if(gameFrame % staggerFrame == 0) {
        if(frameX < 6) frameX++;
        else frameX = 0;
    }

    gameFrame++;
    requestAnimationFrame(animate);
}

animate();


