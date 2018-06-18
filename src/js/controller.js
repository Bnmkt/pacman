export const controller = {
    "keyPressed":[],
    "mouse":{
        "left":0,
        "wheel":0,
        "right":0,
        "x":0,
        "y":0,
    },
    "keyAllowed":[
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Enter"
    ],
    init(){
        const md = (e)=>{
            switch(e.button){case 0:this.mouse.left=1;break;case 2:this.mouse.right=1;break;case 1:this.mouse.wheel=1;break}
        };
        const mu = (e)=>{
            switch(e.button){case 0:this.mouse.left=0;break;case 2:this.mouse.right=0;break;case 1:this.mouse.wheel=0;break}
        };
        document.addEventListener("mousedown", md, false);
        document.addEventListener("mouseup", mu, false);
        document.addEventListener("touchstart", md, false);
        document.addEventListener("touchend", mu, false);
        document.addEventListener("keydown", e=>{ this.keyPressed = []; if(this.keyAllowed.includes(e.key)){this.keyPressed.push(e.key);} }, false);
        // document.addEventListener("keyup", e=>{ if(this.keyPressed.includes(e.key)){this.keyPressed.splice(this.keyPressed.indexOf(e.key), 1);} }, false);
    },
    update(){
        if(this.mouse.left)this.mouse.left=0
        if(this.mouse.right)this.mouse.right=0
        if(this.mouse.wheel)this.mouse.wheel=0
    }
}