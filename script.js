//Create the canvas//
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.body.appendChild(canvas);

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
    speed: 256,
    x:0,
    y:0
};

let crab = {
    speed:100,
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



//**********The Main Game Loop**********//
let main = function() {
    render ();
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
        ctx.drawImage(girlImg,girl.x,girl.y);
    }
    if (pearlReady) {
        ctx.drawImage(pearlImg,pearl.x,pearl.y);
    }
    if (crabReady){
        ctx.drawImage(crabImg,crab.x,crab.y);
    }
    if (palmTreeReady) {
        ctx.drawImage(palmTreeImg, palmTree.x,palmTree.y)
    }
};

//**********Reset the Game**********//
let reset = function (){
    girl.x = (canvas.width/2)-32;
    girl.y = (canvas.height/2)-32;

    crab.x= 64 + (Math.random() * (canvas.width - 192));
    crab.y =64 + (Math.random() * (canvas.height - 192));

    pearl.x= 64 + (Math.random() * (canvas.width - 192));
    pearl.y =64 + (Math.random() * (canvas.height - 192));

    palmTree.x = 64 + (Math.random() * (canvas.width -192));
    palmTree.y = 64 + (Math.random() * (canvas.height -192));
}

//**********To play the Game*********//
let then = Date.now();
reset();
main(); // To call the main game loop//


