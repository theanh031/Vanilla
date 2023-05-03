class Input {
    constructor(game) {
        this.keys = [];
        this.game = game;
        window.addEventListener("keydown", (e) => {
            if (
                (e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "a" ||
                    e.key === "d" ||
                    e.key === "w" ||
                    e.key === "s" ||
                    e.key === "Enter") &&
                !this.keys.includes(e.key)
            ) {
                this.keys.push(e.key);
                console.log(e.key, this.keys);
            } else if ( e.key === 'p') this.game.debug = !this.game.debug;
        });

        window.addEventListener("keyup", (e) => {
            if (
                (e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight" ||
                    e.key === "a" ||
                    e.key === "d" ||
                    e.key === "w" ||
                    e.key === "s" ||
                    e.key === "Enter") &&
                this.keys.includes(e.key)
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }

            console.log(e.key, this.keys);
        });
    }
}

export default Input;
