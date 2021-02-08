function virus(game, gun, tank) {
    let self = this;

    this.game = game;
    this.tank = tank;
    this.gun = gun;

    this.x = null;
    this.y = null;
    this.velX = 0;
    this.velY = 0;
    this.ran = random(-0.7, 0.7);
    this.r = Math.ceil(random(15, 45));
    this.maxHp = this.r;
    this.speed = 2;
    this.damage = 1;
    this.color = 'hsl(' + hue + ', 100%, ' + random(50, 70) + '%)';

    this.init = function () {
        let pos = this.generatePosition();
        this.x = pos.x;
        this.y = pos.y;
        this.draw();
    }

    this.update = function () {
        if(this.tank.hp <= 0) return;
        if (checkImpact(this.x, this.y, this.r, this.gun.x, this.gun.y, this.gun.r) == true) {
            this.game.removeVirus(this);
            this.tank.decreaseHp(this.damage);
        }
        fireworks.forEach(function (fw, i, arr) {
            let dist = calculateDistance(self.x, self.y, fw.coordinates[0][0], fw.coordinates[0][1])
            if(dist <= self.r){
                let i = fireworks.indexOf(fw);
                fireworks.splice(i, 1);
                self.decreaseHp(fw.damage);
            }
        })

        let dx = this.gun.x - this.x;
        let dy = this.gun.y - this.y;
;
        if (dx < 0) {
            if (this.velX > -this.speed) {
                this.velX--;
            }
        }
        if (dy < 0) {
            if (this.velY > -this.speed) {
                this.velY--;
            }
        }
        if (dx > 0) {
            if (this.velX < this.speed) {
                this.velX++;
            }
        }
        if (dy > 0) {
            if (this.velY < this.speed) {
                this.velY++;
            }
        }

        this.velY *= friction;
        this.y += this.velY;
        this.y += this.ran;
        this.velX *= friction;
        this.x += this.ran;
        this.x += this.velX;

    }

    this.draw = function () {
        this.game.ctx.beginPath();
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        this.game.ctx.fill();
        this.game.ctx.closePath();
    }

    this.generatePosition = function () {
        let ran = random(0, 100);
        if(ran < 25){
            return {
                x: -self.r,
                y: random(-self.r, self.game.height + self.r)
            }
        }else if(ran < 50){
            return {
                x: random(-self.r, self.game.width + self.r),
                y: -self.r
            }
        }else if(ran < 75){
            return {
                x: self.game.width + self.r,
                y: random(-self.r, self.game.height + self.r)
            }
        }else{
            return {
                x: random(-self.r, self.game.width + self.r),
                y: self.game.height + self.r
            }
        }
    }

    this.decreaseHp = function(damage){
        if(this.r >= 15){
            this.r -= damage;
        }else{
            score += this.maxHp;
            this.game.removeVirus(self);
        }
    }

}
function checkImpact(x1, y1, r1, x2, y2, r2) {
    let dx = x1 - x2;
    let dy = y1 - y2;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance <= (r1 + r2)) return true;
    return false;
}