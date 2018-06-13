export class Enemy {
    constructor(type, x, y) {
        this.x = x * 24
        this.y = y * 24
        this.path = []
        this.currentFrame = 0
        this.type = type
        this.step = [
                {
                    sx:0
                },
                {
                    sx:30
                },
                {
                    sx:60
                },
                {
                    sx:90
                }
        ]
    }

    init(game) {
        this.game = game
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
    }

    update() {
        const map = this.game.data.maps[this.game.data.currentMap].map
        if (this.game.data.frames % 36 === 0) {
            this.findPath()
        }
        let nx = this.x / 24;
        let ny = this.y / 24;
        if (this.game.data.frames % 12 === 0) {
            const xory = Math.floor(Math.random())
            let dx = (Math.floor(Math.random() * 3) - 1);
            let dy = (Math.floor(Math.random() * 3) - 1);
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
        }
        this.currentFrame++
        const frame = this.step[this.currentFrame % this.step.length]
        const spr = {sx: frame.sx, sy:this.type*30+(30*4), sw: 24, sh: 24, dx: this.x, dy: this.y, dw: 24, dh: 24};
        this.game.drawImageFromSprite(spr)
    }
}