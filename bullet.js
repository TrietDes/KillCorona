const bulletSpeed = 10;
const bulletDamage = 1000;
const distanceFromGun = gunLength - 13;

function bullet(game, gun){
    let self = this;
    this.game = game;
    this.gun = gun;

    this.distanceFromGun = null;
    this.speed = null;
    this.damage = null;
    this.bulletR = null;
    this.bulletX = null;
    this.bulletY = null;

    this.setValue = function(){
        let self = this;

        this.lastX = mouseX;
        this.lastY = mouseY;
        this.speed = bulletSpeed;
        this.distanceFromGun = distanceFromGun;
        this.damage = 1000;
        this.bulletR = 5;
        let endPoint = createEndPoint(distanceFromGun, this.gun.gunX, this.gun.gunY, this.lastX, this.lastY);
        this.bulletX = endPoint.x;
        this.bulletY = endPoint.y;
    }

    this.init = function(){
        this.setValue();
        this.draw();
    }

    this.update = function(){
        this.distanceFromGun += this.speed;
        let endPoint = createEndPoint(this.distanceFromGun, this.bulletX, this.bulletY, this.lastX, this.lastY);
        if(endPoint.x + this.bulletR <= 0 || endPoint.y + this.bulletR <= 0
           || endPoint.x - this.bulletR >= this.game.width || endPoint.y + this.bulletR >= this.game.height){
            self.game.removeBullet(self);
        }
    }

    this.draw = function(){
        this.game.context.beginPath();
        this.game.context.fillStyle = "#0090c7";
        let endPoint = createEndPoint(this.distanceFromGun, this.bulletX, this.bulletY, this.lastX, this.lastY);
        this.game.context.arc(endPoint.x, endPoint.y, this.bulletR, 0, 2*Math.PI);
        this.game.context.fill();
        this.game.context.closePath();
    }
}