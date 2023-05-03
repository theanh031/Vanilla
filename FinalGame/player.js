import { Falling, Jumping, Running, Sitting, Standing, Rolling, Diving, HIT } from "./state.js";
import { CollisionAnimation } from "./collisionAnimation.js";
import {FloatingMessages} from './floatingMessages.js'
class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.state = [
            new Standing(this.game),
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
            new HIT(this.game)
        ];
        
        this.x = 0;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById("player");
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 6;
        this.frameTimer = 0;
        this.fps = 30;
        this.frameInterval = 1000 / this.fps;
        this.speed = 0;
        this.maxSpeed = 10;
        this.vy = 0;
        this.weight = 2.5;
        this.currentState = null;
    }

    setState(state, speed) {
        this.currentState = this.state[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }

    update(deltaTime) {
        this.checkCollision();
        this.currentState.handleInput(this.game.input.keys);
        this.x += this.speed;
        if (
            (this.game.input.keys.includes("ArrowRight") ||
            this.game.input.keys.includes("d")) && this.currentState !== this.state[6]
        )
            this.speed = this.maxSpeed;
        else if (
            (this.game.input.keys.includes("ArrowLeft") ||
            this.game.input.keys.includes("a")) &&  this.currentState !== this.state[6]
        )
            this.speed = -this.maxSpeed;
        else this.speed = 0;



        if (this.x <= 0) this.x = 0;
        else if (this.x >= this.game.width - this.width)
            this.x = this.game.width - this.width;

        this.y += this.vy;
        if (!this.onGround()) {
            this.vy += this.weight;
        } else {
            this.vy = 0;
        }

        if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height - this.game.groundMargin;



        if (this.y > this.game.height - this.height)
            this.y = this.game.height - this.height;

        if (this.frameTimer > this.frameInterval) {
            if (this.frameX >= this.maxFrame) this.frameX = 0;
            else this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }

    draw(context) {
        if (this.game.debug)
            context.strokeRect(this.x, this.y, this.width, this.height);

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

    onGround() {
        return (
            this.y >= this.game.height - this.height - this.game.groundMargin
        );
    }

    checkCollision() {
        this.game.enemies.forEach((enemy) => {
            if (
                enemy.x < this.x + this.width &&
                enemy.x + enemy.width > this.x &&
                enemy.y <  this.y + this.height &&
                enemy.y + enemy.height > this.y
            ) {
                enemy.markedForDeletion = true;
                this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width*0.5, enemy.y + enemy.height*0.5))
                if(this.currentState === this.state[5] || this.currentState === this.state[6]) {
                    this.game.score++;
                    this.game.floatingMessages.push(new FloatingMessages('+1', enemy.x, enemy.y,150,100))
                }else {
                    this.setState(7,0);
                    this.score-=5;
                    this.game.lives--;
                    if(this.game.lives <= 0)  this.game.gameOver = true;
                }
                
            }
        });
    }
}

export default Player;
