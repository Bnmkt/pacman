export class Enemy {
    constructor(type, x, y) {
        this.x = x * 24
        this.y = y * 24
        this.iX = x * 24;
        this.iY = y * 24;
        this.path = []
        this.currentFrame = 0
        this.type = type
        this.state = "alive";
        this.findPlayer = {
            "alive": 13,
            "dead": 200
        }
        this.step = {
            "alive": [
                {
                    sx: 0
                },
                {
                    sx: 30
                },
                {
                    sx: 60
                },
                {
                    sx: 90
                }
            ],
            "dead": [
                {
                    sx: 60
                },
                {
                    sx: 90
                },
                {
                    sx: 120
                },
                {
                    sx: 90
                }
            ]
        }
    }

    init(game) {
        this.game = game
    }
    resetPos(){
        this.y = this.iY;
        this.x = this.iX;
    }
    setFragile() {
        this.state = "dead";
        this.findPlayer = {
            "alive": 13,
            "dead": 200
        }
        this.game.playSound("powered", .1)
    }

    findPath() {
        const player = this.game.data.player
        this.game.path.setGrid(this.game.data.maps[this.game.data.currentMap].map);
        this.game.path.setAcceptableTiles([1, 2])
        this.game.path.findPath(Math.round(this.x / 24), Math.round(this.y / 24), player.x, player.y, path => {
            if (path === null) {

            } else {
                if (path[0]) {
                    this.path = path;
                }
            }
        })
        this.game.path.setIterationsPerCalculation(1000)
        this.game.path.calculate()
        this.currentFrame = Math.floor(Math.random() * this.step[this.state].length);
    }

    update() {
        const map = this.game.data.maps[this.game.data.currentMap].map
        if (this.game.data.frames % this.findPlayer[this.state] === 0) {
            this.findPath()
        }

        if (this.x === this.game.data.player.x * 24 && this.y === this.game.data.player.y * 24) {
            if (this.state === "dead") {
                this.x = this.iX;
                this.y = this.iY;
                this.game.data.score += 20
                this.game.playSound("eatGhost");
                this.state = "alive"
            }else{
                this.game.data.life--;
                if(this.game.data.life===0){
                    this.game.data.state = "losing";
                }else{
                    this.game.data.player.resetPos()
                    this.resetPos();
                }
                this.game.playSound("death");
            }
        }

        let nx = this.x / 24;
        let ny = this.y / 24;
        if (this.game.data.frames % 12 === 0) {
            const xory = Math.floor(Math.random())
            let dx = (Math.round(Math.random() * 2) - 1);
            let dy = (Math.round(Math.random() * 2) - 1);
            if (xory) {
                if (dx !== 0) {
                    dy = 0
                }
            } else {
                if (dy !== 0) {
                    dx = 0
                }
            }
            if (this.path[1] !== undefined) {
                nx = this.path[1].x
                ny = this.path[1].y
                this.path[1] = undefined;
            } else {
                nx = nx + dx;
                ny = ny + dy;
            }
            if (map[ny] && map[ny][nx] && (map[ny][nx] === 1 || map[ny][nx] === 2)) {
                this.x = nx * 24
                this.y = ny * 24
            } else {
            }

            if (this.state === "dead") {
                this.findPlayer[this.state]--;
                if (this.findPlayer[this.state] < 50) {
                    this.state = "alive";
                }
            }
        }
        if (this.game.data.frames % 6 === 0) {
            this.currentFrame++
        }
        if (this.currentFrame === this.step[this.state].length) {
            this.currentFrame = 0;
        }
        const frame = this.step[this.state][this.currentFrame]
        const spr = {
            sx: frame.sx,
            sy: this.state === "alive" ? this.type * 30 + (30 * 4) : 120,
            sw: 24,
            sh: 24,
            dx: this.x,
            dy: this.y,
            dw: 24,
            dh: 24
        };
        this.game.drawImageFromSprite(spr)
    }
}