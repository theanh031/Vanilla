class Layer {
    constructor(game, width, height, speedModifier, image) {
        this.game = game;
        this.width = width;
        this.height = height;
        this.speedModifier = speedModifier;
        this.image = image;
        this.x = 0;
        this.y = 0;
    }

    update() {
        if(this.x < -this.width) {
            this.x = 0
        }
        this.x -= this.game.speed * this.speedModifier

    }

    draw(context) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}


export class Background {
    constructor(game) {
        this.game = game;
        this.width = 1667;
        this.height = 500;
        this.layer1Image = document.getElementById('layer-1');
        this.layer1 = new Layer(this.game, this.width, this.height, 0.2, this.layer1Image)
        this.layer2Image = document.getElementById('layer-2');
        this.layer2 = new Layer(this.game, this.width, this.height, 0.4, this.layer2Image)
        this.layer3Image = document.getElementById('layer-3');
        this.layer3 = new Layer(this.game, this.width, this.height, 0.6, this.layer3Image)
        this.layer4Image = document.getElementById('layer-4');
        this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image)
        this.layer5Image = document.getElementById('layer-5');
        this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image)
        this.backgroundLayer = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5]
    }
    update() {
        this.backgroundLayer.forEach(layer => {
            layer.update();
        })
    }
    draw(context) {
        this.backgroundLayer.forEach(layer => {
            layer.draw(context);
        })
    }
}