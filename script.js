//Create the canvas//
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 1000;
document.getElementById("game").appendChild(canvas);

//Sprite Sheet section//
let rows = 4;
let columns = 4;
// Right movement//
let trackingRight = 2;
//Left movement//
let trackingLeft = 1;
//Going up//
let trackingUp = 4;
//Going down//
let trackingDown = 0;

let spriteWidth = 256;
let spriteHeight = 256;

let girlWidth = spriteWidth / columns;
let girlHeight = spriteHeight / rows;

let countFrames = 0;
let frameCount = 4;

let srcX = 0;
let srcY = 0;

let left = false;
let right = false;
let down = false;
let up = false;

//*********Sound that the game need*********//
let soundCaught = "sounds/caught.wav";
let soundCollected = "sounds/pearlcollected.wav";
let soundWin = "sounds/youwin.wav";
let soundLose = "sounds/youlose.wav";
let soundEffectsC = document.getElementById("soundEffectsC");
let soundEffectsCa = document.getElementById("soundEffectsCa");
let soundEffectLose = document.getElementById("youLose");
let soundEffectWin = document.getElementById("youWin");
soundEffectsC.src = soundCollected;
soundEffectsCa.src = soundCaught;
soundEffectLose.src = soundLose;
soundEffectWin.src = soundWin;

soundEffectsCa.addEventListener("ended", function(){
    reset();
});

soundEffectsC.addEventListener("ended", function(){
    reset(); 
});

soundEffectLose.addEventListener("ended", function(){
    alert("YOU LOSE! You were caught by a pirate crab!")
    resetScores();
    reset();
});

soundEffectWin.addEventListener("ended", function(){
    alert("YOU WIN! You collected all the pearls!")
    resetScores();
    reset();
});

let shouldRunUpdate = true;

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
    // girlWidth:64,
    // girlHeight:64,
    // speed: 256,
    // x:0,
    // y:0,
    // srcX:0,
    // srcY:0, 
    // width:64,
    // height:64
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

let palmTree1 = {
    x:0,
    y:0
};

let palmTree2 = {
    x:0,
    y:0
};

let palmTree3 = {
    x:0,
    y:0
};

let palmTree4 = {
    x:0,
    y:0
};


let pearlCollected = 0; 

let caughtbyaCrab = 5;

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

    left = false;
    right = false;
    down = false;
    up = false;
    
    if (37 in keysDown && girl.x > (64 + 4)) {
        girl.x -= girl.speed * modifier;
        left =  true;
    }
    if (39 in keysDown && girl.x < canvas. width - (128 + 6)) {
        girl.x += girl.speed * modifier;
        right = true;
    }
    if (38 in keysDown && girl.x > (64 + 4)) {
        girl.y -= girl.speed * modifier;
        up = true;
    }
    if (40 in keysDown && girl.x < canvas.height - (128 + 6)) {
        girl.y += girl.speed * modifier;
        down = true;
    }

//*********Girl collected a pearl//Girl caught by a crab**********//  
    if (
        girl.x <= (pearl.x + 32)
        && pearl.x <= (girl.x + 32)
        && girl.y <= (pearl.y + 32)
        && pearl.y <= (girl.y + 32)
    ) { 

        ++ pearlCollected;
        shouldRunUpdate = false;
        if (pearlCollected > 4) {
            gameOver = true;
            
            soundEffectWin.play();
        } else {
            soundEffectsC.play();
        }
    };

    if (
        girl.x <= (crab1.x + 45)
        && crab1.x <= (girl.x + 45)
        && girl.y <= (crab1.y + 45)
        && crab1.y <= (girl.y + 45)
    ) {
        
        -- caughtbyaCrab;
        shouldRunUpdate = false;
        if(caughtbyaCrab < 1){
            gameOver = true;
            
            soundEffectLose.play();
        } else {
            soundEffectsCa.play(); 
        }
        
    };
    if (
        girl.x <= (crab2.x + 45)
        && crab2.x <= (girl.x + 45)
        && girl.y <= (crab2.y + 45)
        && crab2.y <= (girl.y + 45)
    ) {
        
        -- caughtbyaCrab;
        shouldRunUpdate = false;
        if(caughtbyaCrab < 1){
            gameOver = true;
            
            soundEffectLose.play();
        } else {
            soundEffectsCa.play(); 
        } 
    };
    if (
        girl.x <= (crab3.x + 45)
        && crab3.x <= (girl.x + 45)
        && girl.y <= (crab3.y + 45)
        && crab3.y <= (girl.y + 45)
    ) {
        -- caughtbyaCrab;
        shouldRunUpdate = false;
        if(caughtbyaCrab < 1){
            gameOver = true;
            
            soundEffectLose.play();
        } else {
            soundEffectsCa.play(); 
        } 
    };
    if (
        girl.x <= (crab4.x + 45)
        && crab4.x <= (girl.x + 45)
        && girl.y <= (crab4.y + 45)
        && crab4.y <= (girl.y + 45)
    ) {
        
        -- caughtbyaCrab;
        shouldRunUpdate = false;
        if(caughtbyaCrab < 1){
            gameOver = true;
            
            soundEffectLose.play();
        } else {
            soundEffectsCa.play(); 
        } 
    };

    countFrames = ++countFrames % frameCount;
    srcX = countFrames * girlWidth;
    
    if(left){
        srcY = trackingLeft * girlHeight;
    }
    
    if(right){
        srcY = trackingRight * girlHeight;
    }

    if(down){
        srcY = trackingDown * girlHeight;
    }

    if(up){
        srcY = trackingUp * girlHeight;
    }

    if(left == false && right == false && up == false && down == false){
        srcX = 0 * girlWidth;
        srcY = 0 * girlHeight;
    }


}

//**********The Main Game Loop**********//
let main = function() {
    let now = Date.now();
    let delta = now - then;
    if (shouldRunUpdate){
        update(delta / 1000);
        render ();
    }
    
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
        ctx.drawImage(girlImg, srcX, srcY, girlWidth, girlHeight, girl.x, girl.y, girlWidth, girlHeight);
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
        ctx.drawImage(palmTreeImg, palmTree1.x,palmTree1.y);
        ctx.drawImage(palmTreeImg, palmTree2.x,palmTree2.y);
        ctx.drawImage(palmTreeImg, palmTree3.x,palmTree3.y);
        ctx.drawImage(palmTreeImg, palmTree4.x,palmTree4.y);
    }
//score//

    document.getElementById("counting").innerHTML = pearlCollected;

    document.getElementById("livesleft").innerHTML = caughtbyaCrab;
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

    palmTree1.x = 64 + (Math.random() * (canvas.width -192));
    palmTree1.y = 64 + (Math.random() * (canvas.height -192));
    palmTree2.x = 64 + (Math.random() * (canvas.width -192));
    palmTree2.y = 64 + (Math.random() * (canvas.height -192));
    palmTree3.x = 64 + (Math.random() * (canvas.width -192));
    palmTree3.y = 64 + (Math.random() * (canvas.height -192));
    palmTree4.x = 64 + (Math.random() * (canvas.width -192));
    palmTree4.y = 64 + (Math.random() * (canvas.height -192));

    shouldRunUpdate = true;
};


//**********To play the Game*********//
let then = Date.now();
reset();
main(); // To call the main game loop//


// Reset scores//
let resetScores = function() {
    caughtbyaCrab = 5;
    pearlCollected = 0;

    document.getElementById("counting").innerHTML = 0;
    document.getElementById("livesleft").innerHTML = 5;
}