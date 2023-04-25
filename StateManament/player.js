class Player {
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.state = [];
        this.currentState = this.state[0];
        this.image = document.getElementById("dogImage");
        this.width = 200;
        this.height = 181.83;
        this.x = this.gameWidth/2 - this.width/2;
        this.y = this.gameHeight - this.height/2;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 0;
        this.frameTimer = 0;
        this.fps = 60;
        this.frameInterval = 1000 / this.fps;
    }
    draw(context) {
        context.drawImage(
            this.image,
            this.frameX * this.width,
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    update(input, deltaTime) {
        // Animation
        this.animate(deltaTime)
        // Control
        this.control(input)
    }

    animate(deltaTime) {

    }

    control(input) {

    }
}

export default Player
