const canvasWidth = 1000;
const canvasHeight = 600;
const backgroundColorDefault = '#312d2d';

var keys = [];

var mouseX = canvasWidth / 2;
var mouseY = 0;

function game(){
    let self = this;

    this.canvas = null;
    this.context = null;
    this.width = null;
    this.height = null;
    this.backgroundColor = null;
    this.bullets = [];
    
    //Object
    this.tankObj = null;
    this.gunObj = null;
    this.bulletTemporaty = null;

    this.setValue = function(){
        this.height = canvasHeight;
        this.width = canvasWidth;
        this.backgroundColor = backgroundColorDefault;
    }

    this.init = function(){
        this.setValue();
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        document.body.appendChild(this.canvas);

        this.canvas.tabIndex = 1000;

        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
        
        //create new tank
        this.tankObj = new tank(this);
        this.tankObj.init();

        //create new gun
        this.gunObj = new gun(this, this.tankObj);
        this.gunObj.init();



        this.eventListener();

        this.loop();
    }

    this.eventListener = function(){
        this.canvas.addEventListener("keydown", function(e){
            keys[e.keyCode] = true;
        });
        this.canvas.addEventListener("keyup", function(e){
            keys[e.keyCode] = false;
        });
        this.canvas.addEventListener("mousemove", function(e){
            let rect = self.canvas.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        });
        this.canvas.addEventListener("mousedown", function(){
            keys['mouseDown'] = true;
            setInterval(function(){
                if(keys['mouseDown']){
                    self.bulletTemporaty = new bullet(self, self.gunObj);
                    self.bulletTemporaty.init();
                    self.bullets.push(self.bulletTemporaty);
                }
            }, time);
        });
        this.canvas.addEventListener("mouseup", function(){
            keys['mouseDown'] = false;
        })
    }

    this.loop = function(){
        self.update();
        self.draw();
        requestAnimationFrame(self.loop);
    };

    this.update = function(){
        this.tankObj.update();
        this.gunObj.update();
        this.bullets.forEach(function(bullet, i, bullets){
            bullet.update();
        });
    }

    this.draw = function(){
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.width, this.height);
        this.tankObj.draw();
        this.gunObj.draw();
        this.bullets.forEach(function(bullet, i, bullets){
            bullet.draw();
        });
    }

    this.removeBullet = function(bullet){
        let i = this.bullets.indexOf(bullet);
        this.bullets.splice(i, 1);
    }
}


function createEndPoint(length, x1, y1, x2, y2){
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dist = Math.sqrt(dx*dx + dy*dy);

    let ux = dx/dist;
    let uy = dy/dist;
    return {
        x: x1 + ux*length,
        y: y1 + uy*length
    }
}