const easystarjs = require("easystarjs");
const easystar = new easystarjs.js();
import {controller} from "./controller";
import {maps} from "./maps";
import {Pax} from "./Pax";
import {Enemy} from "./Enemy";
import {Pickup} from "./Pickup";

export const game = {
    canvas: document.querySelector("canvas#game"),
    ctx: null,
    path:easystar,
    data: {
        frames: 0,
        sprite: new Image(),
        res: "./assets/sprites/spriteSheet.png",
        currentMap: 1,
        tileSize: 24,
        score:0,
        maps,
        pickup: [],
        monsters:[],
        player: new Pax(10, 10)
    },
    controller,
    init() {
        console.log("game init")
        if (!this.canvas) return
        this.canvas.width = 500
        this.canvas.height = 500
        if (!this.canvas.getContext) return
        this.ctx = this.canvas.getContext("2d")
        console.log("Context 2d")
        this.data.sprite.src = this.data.res;
        this.controller.init()
        const curMap = this.data.maps[this.data.currentMap]
        for (let y = 0; y < curMap.pickup.length; y++) {
            if (curMap.pickup[y]) {
                for (let x = 0; x < curMap.pickup[y].length; x++) {
                    if (curMap.pickup[y][x]) {
                        const curPick = new Pickup(curMap.pickup[y][x], x, y);
                        curPick.init(this)
                        this.data.pickup.push(curPick)
                    }
                }
            }
        }
        curMap.monsters.forEach(pos=>{
            const monster = new Enemy(pos[0], pos[1], pos[2])
            monster.init(this)
            this.data.monsters.push(monster)
        })
        console.log(this.data)
        this.data.player.init(this)
        this.data.player.setPos(curMap.start)
        this.update()
    },
    drawImageFromSprite(spr) {
        this.ctx.drawImage(this.data.sprite, spr.sx, spr.sy, spr.sw, spr.sh, spr.dx, spr.dy, spr.dw, spr.dh);
    },
    update() {
        this.data.frames++
        if (this.data.frames % 2 === 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            const map = this.data.maps[this.data.currentMap].map.slice()
            const ts = this.data.tileSize;
            for (let y = 0; y < map.length; y++) {
                if (map[y]) {
                    for (let x = 0; x < map[y].length; x++) {
                        let color = "";
                        switch (map[y][x]){
                            case 0: color="#345fa6"; break;
                            case 1: case 3: color="black"; break;
                            case 2: color="grey"; break;
                        }
                        this.ctx.fillStyle = color;
                        this.ctx.fillRect(x * ts, y * ts, ts, ts);
                    }
                }
            }
            this.data.pickup.forEach(pick=>{
                pick.update();
            })
            this.data.monsters.forEach(monster=>{
                monster.update()
            })
            this.data.player.update()
            this.ctx.fillStyle = "white";
            this.ctx.font = "20px courrier"
            this.ctx.fillText(`score: ${this.data.score}`, 10, 20)

            this.controller.update()
        }
        window.requestAnimationFrame(() => {
            this.update()
        })
    }
}