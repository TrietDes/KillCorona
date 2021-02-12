const speed = 5;
const friction = 0.93;
const hpMax = 10;

function tank(game) {
    self = this;

    this.game = game;
    this.width = 40;
    this.height = 40;
    this.hp = hpMax;
    this.x = (this.game.width - this.width) / 2;
    this.y = (this.game.height - this.height) / 2;
    this.velX = 0;
    this.velY = 0;

    this.init = function () {
        this.draw();
    }

    this.decreaseHp = function (damage) {
        if(this.hp > 0){
            this.hp -= damage;
        }
    }

    this.update = function () {
        if(this.hp <= 0) {
            this.game.endGame();
            return;
        }
        if (keys[37] || keys[65]) {
            if (this.velX > -speed) {
                this.velX--;
            }
        }
        if (keys[38] || keys[87]) {
            if (this.velY > -speed) {
                this.velY--;
            }
        }
        if (keys[39] || keys[68]) {
            if (this.velX < speed) {
                this.velX++;
            }
        }
        if (keys[40] || keys[83]) {
            if (this.velY < speed) {
                this.velY++;
            }
        }

        this.velY *= friction;
        this.y += this.velY;
        this.velX *= friction;
        this.x += this.velX;


        if (this.x >= (this.game.width - this.width)) {
            this.x = (this.game.width - this.width);
        } else if (this.x <= 0) {
            this.x = 0;
        }

        if (this.y >= (this.game.height - this.height)) {
            this.y = (this.game.height - this.height);
        } else if (this.y <= 0) {
            this.y = 0;
        }
    }

    this.draw = function () {
        if(this.hp <= 0) return;
        //draw tank body
        this.game.ctx.fillStyle = "#20d661";
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        //draw hp max
        this.game.ctx.fillStyle = "#9d9dfb6b";
        this.game.ctx.fillRect(this.x, this.y - 15, this.width, 5);
        //draw real hp 
        this.game.ctx.fillStyle = "red";
        this.game.ctx.fillRect(this.x, this.y - 15, this.width * (this.hp/hpMax), 5);
    }
}