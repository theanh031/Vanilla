class InputHandler {
    constructor() {
        this.lastKey = "";
        window.addEventListener("keydown", function (event) {
            switch (event.key) {
                case "a":
                case "ArrowLeft":
                    this.lastKey = "PRESS left";
                    break;
            }
        });
    }
}

export default InputHandler;
