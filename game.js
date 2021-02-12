var keys = [];
var mouseDown = false;
var mouseX = 0;
var mouseY = 0;
var score = 0;

var particleWidth = 2;

var fireworks = [];
var viruses = [];
var particles = [];
// starting hue
var hue = 120,
    // when launching fireworks with a click, too many get launched at once without a limiter, one launch per 5 loop ticks
    limiterTotal = 7,
    limiterTick = 0,
    // this will time the auto launches of fireworks, one launch per 80 loop ticks
    timerTotal = 80,
    timerTick = 0;

var reqLoop;
var particleLoop;
var virusLoop;
var isEnded = false;

function game() {
    let self = this;

    this.canvas = null;
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.backgroundColor = '#000';

    //Object
    this.tankObj = null;
    this.gunObj = null;

    this.virus = null;

    this.init = function () {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        document.body.appendChild(this.canvas);

        this.canvas.tabIndex = 1000;

        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);

        //create new tank
        this.tankObj = new tank(this);
        this.tankObj.init();

        //create new gun
        this.gunObj = new gun(this, this.tankObj);
        this.gunObj.init();


        this.setLoop();
        this.eventListener();

        this.loop();
    }

    this.setLoop = function () {
        virusLoop = setInterval(function () {
            self.createVirus();
        }, 1000);
    }

    this.eventListener = function () {
        this.canvas.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });
        this.canvas.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
        this.canvas.addEventListener("mousemove", function (e) {
            let rect = self.canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        this.canvas.addEventListener("mousedown", function () {
            mouseDown = true;
        });
        this.canvas.addEventListener("mouseup", function () {
            mouseDown = false;
        })
    }

    this.repeatPart = function () {
        hue = random(0, 360);
        if (limiterTick >= limiterTotal) {
            if (mouseDown) {
                // start the firework at the bottom middle of the screen, then set the current mouse coordinates as the target
                let endPoint = createEndPoint(gunLength, self.gunObj.x, self.gunObj.y, mouseX, mouseY);
                fireworks.push(new Firework(self, endPoint.x, endPoint.y, mouseX, mouseY));
                limiterTick = 0;
            }
        } else {
            limiterTick++;
        }
    }

    this.loop = function () {
        self.repeatPart();
        self.update();
        self.draw();
        reqLoop = requestAnimationFrame(self.loop);
    };

    this.update = function () {
        this.tankObj.update();
        this.gunObj.update();
        fireworks.forEach(function (firework, i, arr) {
            firework.update(i);
        });
        particles.forEach(function (particle, i, arr) {
            particle.update(i);
        });
        viruses.forEach(function (virus, i, arr) {
            virus.update();
        })
    }

    this.draw = function () {
        this.ctx.fillStyle = this.backgroundColor;
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.tankObj.draw();
        this.gunObj.draw();
        fireworks.forEach(function (firework, i, arr) {
            firework.draw();
        });
        particles.forEach(function (particle, i, arr) {
            particle.draw();
        });
        viruses.forEach(function (virus, i, arr) {
            virus.draw();
        })
        if (isEnded == true) {
            this.ctx.fillStyle = "#fff"
            this.ctx.font = '60px Arial';
            this.ctx.fillText('Your score is ' + score, 50, 100);
        } else {
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = "center;"
            this.ctx.fillText(score, 50, 50);
        }
    }

    this.removeVirus = function (virus) {
        let i = viruses.indexOf(virus);
        viruses.splice(i, 1);
        this.createParticle(virus.x, virus.y);
    }

    this.createMissile = function () {
        this.firework = new firework(this, this.gunObj);
        this.firework.init();
        fireworks.push(this.firework);
    }

    this.createVirus = function () {
        this.virus = new virus(this, this.gunObj, this.tankObj);
        this.virus.init();
        viruses.push(this.virus);
    }

    this.createParticle = function (x, y) {
        var particleCount = 30;
        while (particleCount--) {
            particles.push(new Particle(self, x, y));
        }
    }

    this.endGame = function () {
        clearInterval(virusLoop);
        if (particleLoop == undefined) {
            particleLoop = setInterval(function () {
                self.createParticle(self.tankObj.x + self.tankObj.width / 2, self.tankObj.y + self.tankObj.height / 2);
            }, 150);
        }
        if (isEnded == false) {
            isEnded = true;
        }
    }
}


function createEndPoint(length, x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
    let ux = dx / dist;
    let uy = dy / dist;
    return {
        x: x1 + ux * length,
        y: y1 + uy * length
    }
}

function calculateDistance(x1, y1, x2, y2) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}