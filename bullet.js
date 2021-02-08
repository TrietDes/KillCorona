function bullet(game, gun){
    let self = this;
    this.game = game;
    this.gun = gun;

    this.distanceFromGun = 12;
    this.speed = 7;
    this.damage = 1000;
    this.r = 5;
    //target coordinations
    this.tx = mouseX;
    this.ty = mouseY;
    //actual coordinations
    this.x = null;
    this.y = null;
    //starting coordinations
    this.sx = null;
    this.sy = null;

    this.setValue = function(){
        let endPoint = createEndPoint(this.distanceFromGun, this.gun.x, this.gun.y, this.tx, this.ty);
        this.sx = endPoint.x;
        this.sy = endPoint.y;
        this.x = endPoint.x;
        this.y = endPoint.y;
    }

    this.init = function(){
        this.setValue();
        this.draw();
    }

    this.update = function(){
        this.distanceFromGun += this.speed;
        let endPoint = createEndPoint(this.distanceFromGun, this.sx, this.sy, this.tx, this.ty);
        this.x = endPoint.x;
        this.y = endPoint.y;
        if(this.x + this.r <= 0 || this.y + this.r <= 0
           || this.x - this.r >= this.game.width || this.y + this.r >= this.game.height){
            self.game.removeBullet(self);
        }
    }

    this.draw = function(){
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "#0090c7";
        this.game.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.game.ctx.fill();
        this.game.ctx.closePath();
    }
}