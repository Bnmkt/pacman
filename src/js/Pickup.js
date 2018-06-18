export class Pickup{
    constructor(type, x, y){
        this.x = x*24
        this.y = y*24
        this.type = type
        this.hitted = false;
        this.types = [0,{
            sx:0,
            sy:120
        },{
            sx:30,
            sy:120
        }
        ]
    }
    effect(){
        switch (this.type){
            case 1:
                this.game.data.score++
                this.game.data.pickupPicked++
                this.game.playSound("eat", .05, 2);
                break;
            case 2:
                this.game.data.score+=5
                this.game.data.pickupPicked++
                this.game.playSound("eat", .05, 1.5);
                this.game.data.monsters.forEach(enemy=>{
                    enemy.setFragile();
                })
                break;
        }
    }
    init(game){
        this.game = game
    }
    update(){
        if(!this.hitted) {
            const player = this.game.data.player;
            if (this.x === player.x*24) {
                if (player.y*24 === this.y) {
                    console.log("je suis touché !");
                    this.effect()
                    this.hitted = true;
                }
            }
            const type = this.types[this.type]
            const spr = {sx: type.sx, sy: type.sy, sw: 24, sh: 24, dx: this.x, dy: this.y, dw: 24, dh: 24}
            this.game.drawImageFromSprite(spr)
        }
    }
}