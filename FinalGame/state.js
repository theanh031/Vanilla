import { Dust, Fire, Splash } from "./particles.js";

export const states = {
    STANDING: 0,
    SITTING: 1,
    RUNNING: 2,
    JUMPING: 3,
    FALLING: 4,
    ROLLING: 5,
    DIVING: 6,
    HIT: 7,
};

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Standing extends State {
    constructor(game) {
        super("STANDING", game);
    }
    enter() {
        this.game.player.frameY = 0;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        if (
            input.includes("ArrowLeft") ||
            input.includes("d") ||
            input.includes("ArrowRight") ||
            input.includes("a")
        ) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes("ArrowUp") || input.includes("w")) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes("ArrowDown") || input.includes("s")) {
            this.game.player.setState(states.SITTING, 0);
        }
    }
}

export class Sitting extends State {
    constructor(game) {
        super("SITTING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }

    handleInput(input) {
        if (
            input.includes("ArrowLeft") ||
            input.includes("d") ||
            input.includes("ArrowRight") ||
            input.includes("a")
        ) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes("ArrowUp") || input.includes("w")) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Running extends State {
    constructor(game) {
        super("RUNNING", game);
    }
    enter() {
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 8;
    }
    handleInput(input) {
        this.game.particles.unshift(
            new Dust(
                this.game,
                this.game.player.x + this.game.player.width * 0.4,
                this.game.player.y + this.game.player.height
            )
        );
        if (input.includes("ArrowDown") || input.includes("s")) {
            this.game.player.setState(states.SITTING, 0);
        } else if (input.includes("ArrowUp") || input.includes("w")) {
            this.game.player.setState(states.JUMPING, 1);
        } else if (input.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}

export class Jumping extends State {
    constructor(game) {
        super("JUMPING", game);
    }
    enter() {
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
        if (this.game.player.onGround()) this.game.player.vy -= 40;
    }
    handleInput(input) {
        if (this.game.player.vy > this.game.player.weight) {
            this.game.player.setState(states.FALLING, 1);
        } else if (input.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
        } else if (input.includes("s") || input.includes("ArrowDown")) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Falling extends State {
    constructor(game) {
        super("FALLING", game);
    }
    enter() {
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (input.includes("s") || input.includes("ArrowDown")) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Rolling extends State {
    constructor(game) {
        super("ROLLING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }

    handleInput(input) {
        this.game.particles.unshift(
            new Fire(
                this.game,
                this.game.player.x + this.game.player.width * 0.5,
                this.game.player.y + this.game.player.height * 0.5
            )
        );
        if (!input.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (!input.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        } else if (
            input.includes("Enter") &&
            input.includes("w") &&
            this.game.player.onGround()
        ) {
            this.game.player.vy -= 40;
        } else if ((input.includes("s") || input.includes("ArrowDown")) && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
        }
    }
}

export class Diving extends State {
    constructor(game) {
        super("DIVING", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
        this.game.player.vy = 15;
    }

    handleInput(input) {
        this.game.particles.unshift(
            new Fire(
                this.game,
                this.game.player.x + this.game.player.width * 0.5,
                this.game.player.y + this.game.player.height * 0.5
            )
        );
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i++) {
                this.game.particles.unshift(
                    new Splash(
                        this.game,
                        this.game.player.x + this.game.player.width * 0.5,
                        this.game.player.y + this.game.player.height
                    )
                );
            }
        } else if (input.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2);
        }
    }
}


export class HIT extends State {
    constructor(game) {
        super("HIT", game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 4;
        this.game.player.maxFrame = 10;
    }

    handleInput(input) {
        
        if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
        } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
        }
    }
}
