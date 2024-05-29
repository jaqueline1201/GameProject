//Create the canvas//
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.getElementById("game").appendChild(canvas);

//Images that the game need//

//**********Background Image**********/
let backgroundReady = false;
let backgroundImg = new Image();
backgroundImg.onload = function (){
    backgroundReady = true;
};
backgroundImg.src = "images/backgroundSand4.png";
//**********Border Image**********//
//Top border//
let borderTopReady = false;
let borderTopImg = new Image();
borderTopImg.onload = function(){
    borderTopReady = true;
};
borderTopImg.src = "images/waterTB.png"
//Side border//
let borderSideReady = false;
let borderSideImg = new Image();
borderSideImg.onload = function(){
    borderSideReady = true;
};
borderSideImg.src = "images/waterLR.png"
//**********Character Image**********//
let girlReady = false;
let girlImg = new Image();
girlImg.onload = function (){
    girlReady = true;
};
girlImg.src="images/spriteSheet.png";

//**********Pearl Image*********//
let pearlReady = false;
let pearlImg = new Image();
pearlImg.onload = function(){
    pearlReady = true;
};
pearlImg.src="images/pearl.png"
//**********Crab Image*********//
let crabReady = false;
let crabImg = new Image();
crabImg.onload = function(){
    crabReady = true;
};
crabImg.src ="images/crab.gif"
//**********Palm Tree Image**********//
let palmTreeReady = false;
let palmTreeImg =  new Image();
palmTreeImg.onload =  function (){
    palmTreeReady = true;
};
palmTreeImg.src="images/palmTree.gif";

//**********Game Objects**********//
let girl = {
    swidth:64,
    sheight:64,
    speed: 256,
    x:0,
    y:0,
    sx:0,
    sy:0, 
    width:64,
    height:64
};

let crab1 = {
    x:0,
    y:0
};

let crab2 = {
    x:0,
    y:0
};

let crab3 = {
    x:0,
    y:0
};

let crab4 = {
    x:0,
    y:0
};

let pearl = {
    x:0,
    y:0
};

let palmTree = {
    x:0,
    y:0
};

let pearlCollected = 0; 

let caughtbyaCrab = 0;

//**********Keyboard Controls********/
const keysDown = {};

addEventListener("keydown", function (e){
    keysDown[e.keyCode]= true;
}, false);

addEventListener("keyup", function (e){
    delete keysDown[e.keyCode];
}, false);

//*********Update Game Objects**********//
let update = function (modifier) {
    if (38 in keysDown && girl.y > 64 + 4) {
        girl.y -= girl.speed * modifier;
    }
    if (40 in keysDown && girl.y < canvas.height - (128 + 6)) {
        girl.y += girl.speed * modifier;
    }
    if (37 in keysDown && girl.x > (64 + 4)) {
        girl.x -= girl.speed * modifier;
    }
    if (39 in keysDown && girl.x < canvas. width - (128 + 6)) {
        girl.x += girl.speed * modifier;
    }

    if (
        girl.x <= (pearl.x + 32)
        && pearl.x <= (girl.x + 32)
        && girl.y <= (pearl.y + 32)
        && pearl.y <= (girl.y + 32)
    ) {
        ++ pearlCollected;
        reset(); 
    };

    if (
        girl.x <= (crab1.x + 45)
        && crab1.x <= (girl.x + 45)
        && girl.y <= (crab1.y + 45)
        && crab1.y <= (girl.y + 45)
    ) {
        ++ caughtbyaCrab;
        reset();
    };
    if (
        girl.x <= (crab2.x + 45)
        && crab2.x <= (girl.x + 45)
        && girl.y <= (crab2.y + 45)
        && crab2.y <= (girl.y + 45)
    ) {
        ++ caughtbyaCrab;
        reset();
    };
    if (
        girl.x <= (crab3.x + 45)
        && crab3.x <= (girl.x + 45)
        && girl.y <= (crab3.y + 45)
        && crab3.y <= (girl.y + 45)
    ) {
        ++ caughtbyaCrab;
        reset();
    };
    if (
        girl.x <= (crab4.x + 45)
        && crab4.x <= (girl.x + 45)
        && girl.y <= (crab4.y + 45)
        && crab4.y <= (girl.y + 45)
    ) {
        ++ caughtbyaCrab;
        reset();
    };

}

//**********The Main Game Loop**********//
let main = function() {
    let now = Date.now();
    let delta = now - then;
    update(delta / 1000);
    render ();
    then = now;
    requestAnimationFrame(main);
};

//**********To Render the Game**********/
let render = function(){
    if (backgroundReady) {
        ctx.drawImage(backgroundImg,0,0);
    }
    if (borderTopReady) {
        ctx.drawImage(borderTopImg, 0,0);
        ctx.drawImage(borderTopImg, 0,(1000-64));
    }
    if (borderSideReady) {
        ctx.drawImage(borderSideImg, 0,0);
        ctx.drawImage(borderSideImg, (1000-64),0);
    }
    if (girlReady) {
        ctx.drawImage(girlImg,girl.sx, girl.sy, girl.swidth, girl.sheight, girl.x, girl.y, girl.width, girl.height);
    }
    if (pearlReady) {
        ctx.drawImage(pearlImg,pearl.x,pearl.y);
    }
    if (crabReady){
        ctx.drawImage(crabImg,crab1.x,crab1.y);
        ctx.drawImage(crabImg,crab2.x,crab2.y);
        ctx.drawImage(crabImg,crab3.x,crab3.y);
        ctx.drawImage(crabImg,crab4.x,crab4.y);
    }
    if (palmTreeReady) {
        ctx.drawImage(palmTreeImg, palmTree.x,palmTree.y)
    }
//score//

document.getElementById("counting").innerHTML = pearlCollected;
};



//**********Reset the Game**********//
let reset = function (){
    girl.x = (canvas.width/2)-32;
    girl.y = (canvas.height/2)-32;

    crab1.x= 64 + (Math.random() * (canvas.width - 192));
    crab1.y =64 + (Math.random() * (canvas.height - 192));
    crab2.x= 64 + (Math.random() * (canvas.width - 192));
    crab2.y =64 + (Math.random() * (canvas.height - 192));
    crab3.x= 64 + (Math.random() * (canvas.width - 192));
    crab3.y =64 + (Math.random() * (canvas.height - 192));
    crab4.x= 64 + (Math.random() * (canvas.width - 192));
    crab4.y =64 + (Math.random() * (canvas.height - 192));

    pearl.x= 64 + (Math.random() * (canvas.width - 192));
    pearl.y =64 + (Math.random() * (canvas.height - 192));

    palmTree.x = 64 + (Math.random() * (canvas.width -192));
    palmTree.y = 64 + (Math.random() * (canvas.height -192));
}

//**********To play the Game*********//
let then = Date.now();
reset();
main(); // To call the main game loop//


