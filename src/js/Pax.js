export class Pax {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.iX = x;
        this.iY = y;
        this.sprite = new Image();
        this.spriteSheet = this.sprite.src = "assets/sprites/spriteSheet.png"
        this.currentStep = "left"
        this.currentFrame = 0;
        this.speed = 1;
        this.dx = 0;
        this.dy = 0;
        this.step = {
            top: [
                {
                    sx: 0,
                    sy: 30
                },
                {
                    sx: 30,
                    sy: 30
                },
                {
                    sx: 60,
                    sy: 30
                },
                {
                    sx: 90,
                    sy: 30
                },
                {
                    sx: 60,
                    sy: 30
                },
                {
                    sx: 30,
                    sy: 30
                }
            ],
            bottom: [
                {
                    sx: 0,
                    sy: 90
                },
                {
                    sx: 30,
                    sy: 90
                },
                {
                    sx: 60,
                    sy: 90
                },
                {
                    sx: 90,
                    sy: 90
                },
                {
                    sx: 60,
                    sy: 90
                },
                {
                    sx: 30,
                    sy: 90
                }
            ],
            right: [
                {
                    sx: 0,
                    sy: 0
                },
                {
                    sx: 30,
                    sy: 0
                },
                {
                    sx: 60,
                    sy: 0
                },
                {
                    sx: 90,
                    sy: 0
                },
                {
                    sx: 60,
                    sy: 0
                },
                {
                    sx: 30,
                    sy: 0
                }
            ],
            left: [
                {
                    sx: 0,
                    sy: 60
                },
                {
                    sx: 30,
                    sy: 60
                },
                {
                    sx: 60,
                    sy: 60
                },
                {
                    sx: 90,
                    sy: 60
                },
                {
                    sx: 60,
                    sy: 60
                },
                {
                    sx: 30,
                    sy: 60
                }
            ],
        }
    }

    setPos(pos) {
        this.y = pos[0];
        this.x = pos[1];
        this.iY = pos[0];
        this.iX = pos[1];
    }
    resetPos(){
        this.y = this.iY;
        this.x = this.iX;
    }

    init(game) {
        this.game = game;
        this.update();
    }

    checkKey() {
        const key = this.game.controller.keyPressed[0];
        switch (key) {
            case "ArrowUp":
                this.dx = 0;
                this.dy = -this.speed;
                this.currentStep = "top"
                break;
            case "ArrowDown":
                this.dx = 0;
                this.dy = this.speed;
                this.currentStep = "bottom"
                break;
            case "ArrowLeft":
                this.dx = -this.speed;
                this.dy = 0;
                this.currentStep = "left"
                break;
            case "ArrowRight":
                this.dx = this.speed;
                this.dy = 0;
                this.currentStep = "right"
                break;
        }
    }

    update() {
        const map = this.game.data.maps[this.game.data.currentMap].map
        this.checkKey();
        if (this.game.data.frames % 4 === 0) {
            this.currentFrame++;
        }


        if (this.game.data.frames % 16 === 0) {

            this.x += this.dx;
            this.y += this.dy;
            let x = Math.round((this.x));
            let y = Math.round((this.y));
            if (map[y][x] === 3) {
                let nx = this.x;
                let ny = this.y;
                switch (this.currentStep) {
                    case "top":
                    case "bottom":
                        if (y === 0) {
                            ny = map.length-2
                        } else {
                            ny = 1
                        }
                        break;
                    case "left":
                    case "right":
                        if (x === 0) {
                            nx = map[y].length-2
                            console.log("tp "+nx)
                        } else {
                            nx = 1
                        }
                        break;
                }
                this.x = nx
                this.y = ny
            }

            if (map[y][x] !== 1) {
                this.x -= this.dx;
                this.y -= this.dy;
            }
        }
        const step = this.step[this.currentStep];
        const frame = step[this.currentFrame % (step.length - 1)]
        const spr = {sx: frame.sx, sy: frame.sy, sw: 24, sh: 24, dx: this.x * 24, dy: this.y * 24, dw: 24, dh: 24};
        this.game.drawImageFromSprite(spr)
    }
}