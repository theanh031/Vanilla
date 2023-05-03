import Player from "./player.js";
import Input from "./input.js";
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies.js";
import { Background } from "./background.js";
import { UI } from "./UI.js";

window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.debug = false;
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.player = new Player(this);
            this.input = new Input(this);
            this.collisions = [];
            this.particles = [];
            this.maxParticles = 50;
            this.enemies = [];
            this.floatingMessages = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.background = new Background(this);
            this.speed = 0;
            this.maxSpeed = 4;
            this.score = 0;
            this.winningScore = 40;
            this.fontColor = "black";
            this.UI = new UI(this);
            this.time = 0;
            this.maxTime = 30000;
            this.player.currentState = this.player.state[0];
            this.player.currentState.enter();
            this.gameOver = false;
            this.lives = 5
        }
        update(deltaTime) {
            this.time+= deltaTime;
            if(this.time > this.maxTime) this.gameOver = true;

            this.background.update();
            this.player.update(deltaTime);
            /// Handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach((enemy) => {
                enemy.update(deltaTime);
            });

            // handle messages 
            this.floatingMessages.forEach(message => {
                message.update();
                
            })

            // handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                
            });

            if (this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles;
            }

            // handle collision

            this.collisions.forEach((collision, index) => {
                collision.update(deltaTime);
                
            });

            this.floatingMessages= this.floatingMessages.filter(message => !message.markedForDeletion)
            this.enemies= this.enemies.filter(enemy => !enemy.markedForDeletion)
            this.particles= this.particles.filter( particle => !particle.markedForDeletion)
            this.collisions = this.collisions.filter(collision => !collision.markedForDeletion)
        }

        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach((enemy) => enemy.draw(context));
            this.particles.forEach((particle) => particle.draw(context));
            this.collisions.forEach((collision) => collision.draw(context));
            this.floatingMessages.forEach((message) => message.draw(context));
            this.UI.draw(context);
        }

        addEnemy() {
            if (this.speed > 0 && Math.random() < 0.5)
                this.enemies.push(new GroundEnemy(this));
            else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
            this.enemies.push(new FlyingEnemy(this));
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;
    function animate(timeStamp) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        if(!game.gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});
