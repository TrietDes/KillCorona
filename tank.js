const tankWidth = 30;
const tankHeight = 30;
const speed = 5;
const friction = 0.93;

function tank(game) {
    self = this;

    this.game = game;
    this.tankX = null;
    this.tankY = null;
    this.tankWidth = null;
    this.tankHeight = null;
    this.velX = null;
    this.velY = null;

    this.setValue = function () {
        this.tankWidth = tankWidth;
        this.tankHeight = tankHeight;
        this.tankX = (game.width - this.tankWidth) / 2;
        this.tankY = (game.height - this.tankHeight) / 2;
        this.velX = 0;
        this.velY = 0;
    }

    this.init = function () {
        this.setValue();
        this.draw();
    }

    this.decreaseHp = function () {

    }

    this.destroy = function () {

    }

    this.update = function () {
        if (keys[37]) {
            if (this.velX > -speed) {
                this.velX--;
            }
        }
        if (keys[38]) {
            if (this.velY > -speed) {
                this.velY--;
            }
        }
        if (keys[39]) {
            if (this.velX < speed) {
                this.velX++;
            }
        }
        if (keys[40]) {
            if (this.velY < speed) {
                this.velY++;
            }
        }

        this.velY *= friction;
        this.tankY += this.velY;
        this.velX *= friction;
        this.tankX += this.velX;


        if (this.tankX >= (this.game.width - this.tankWidth)) {
            this.tankX = (this.game.width - this.tankWidth);
        } else if (this.tankX <= 0) {
            this.tankX = 0;
        }

        if (this.tankY >= (this.game.height - this.tankHeight)) {
            this.tankY = (this.game.height - this.tankHeight);
        } else if (this.tankY <= 0) {
            this.tankY = 0;
        }
    }

    this.draw = function () {
        game.context.fillStyle = "#20d661";
        game.context.fillRect(this.tankX, this.tankY, this.tankWidth, this.tankHeight);
    }
}