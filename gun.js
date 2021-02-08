const gunLength = 35;

function gun(game, tank){
    this.game = game;
    this.tank = tank;

    this.x = this.tank.x + this.tank.width/2;
    this.y = this.tank.y + this.tank.height/2;
    this.r = 12;
    this.damage = 1;

    this.init = function(){
        this.draw();
    }

    this.update = function(){
        if(this.tank.hp <= 0) return;
        this.x = this.tank.x + this.tank.width/2;
        this.y = this.tank.y + this.tank.height/2;
    }

    this.draw = function(){
        if(this.tank.hp <= 0) return;
        //Draw circle
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = "#a23737";
        this.game.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.game.ctx.fill();
        this.game.ctx.closePath();
        //Draw gun
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.x, this.y);
        let endPoint = createEndPoint(gunLength, this.x, this.y, mouseX, mouseY);
        this.game.ctx.lineTo(endPoint.x, endPoint.y);
        this.game.ctx.strokeStyle = "#a23737";
        this.game.ctx.lineWidth = 9;
        this.game.ctx.stroke();
        this.game.ctx.closePath();
    }
}