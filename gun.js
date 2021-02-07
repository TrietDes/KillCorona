const damage = 1000;
const gunR = 10;
const gunLength = 25;
const time = 1000; //time to create a new bullet when hold mouse

function gun(game, tank){
    this.game = game;
    this.tank = tank;

    this.gunX = null;
    this.gunY = null;
    this.gunR = null;
    this.damage = null;

    this.init = function(){
        this.setValue();
        this.draw();
    }

    this.setValue = function(){
        this.damage = damage;
        this.gunX = this.tank.tankX + this.tank.tankWidth/2;
        this.gunY = this.tank.tankY + this.tank.tankHeight/2;
        this.gunR = gunR;
    }

    this.update = function(){
        this.gunX = this.tank.tankX + this.tank.tankWidth/2;
        this.gunY = this.tank.tankY + this.tank.tankHeight/2;
    }

    this.draw = function(){
        //Draw circle
        this.game.context.fillStyle = "#a23737";
        this.game.context.beginPath();
        this.game.context.arc(this.gunX, this.gunY, this.gunR, 0, 2*Math.PI);
        this.game.context.fill();
        this.game.context.closePath();
        //Draw gun
        this.game.context.beginPath();
        this.game.context.moveTo(this.gunX, this.gunY);
        let endPoint = createEndPoint(gunLength, this.gunX, this.gunY, mouseX, mouseY);
        this.game.context.lineTo(endPoint.x, endPoint.y);
        this.game.context.strokeStyle = "#a23737";
        this.game.context.lineWidth = 7;
        this.game.context.stroke();
        this.game.context.closePath();
    }
}