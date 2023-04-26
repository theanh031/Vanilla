class InputHandler {
    constructor() {
        this.lastKey = "";
        window.addEventListener("keydown", event => {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    this.lastKey = "PRESS left";
                    break;
                case 'd':
                case "ArrowRight":
                    this.lastKey = "PRESS right";
                    break;
                case 's':
                case 'ArrowDown':
                    this.lastKey = "PRESS down";
                    break;
                case 'w':
                case 'ArrowUp':
                    this.lastKey = "PRESS up";
                    break;
            }
        });

        window.addEventListener("keyup", event => {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    this.lastKey = "RELEASE left";
                    break;
                case 'd':
                case "ArrowRight":
                    this.lastKey = "RELEASE right";
                    break;
                case 's':
                case 'ArrowDown':
                    this.lastKey = "RELEASE down";
                    break;
                case 'w':
                case 'ArrowUp':
                    this.lastKey = "RELEASE up";
                    break;
            }
        })
    }
}

export default InputHandler;
