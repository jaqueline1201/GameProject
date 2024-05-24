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
backgroundImg.src = "images/backgroundSand2.png";
//**********Character Image**********//
let girlReady = false;
let girlImg = new Image();
girlImg.onload = function (){
    girlReady = true;
};
girlImg.src="images/girl.png";
//**********Crab Image*********//
let crabReady = false;
let crabImg = new Image();
crabImg.onload = function(){
    crabReady = true;
};
crabImg.src ="images/crab.gif"
//**********Palm Tree Image**********//
// let palmTreeReady = false;
// let palmTreeImg =  new Image();
// palmTreeImg.onload =  function (){
//     palmTreeReady = true;
// };
// palmTreeImg.src="images/palmTree.png";

//**********The Main Game Loop**********//
let main = function() {
    render ();
    requestAnimationFrame(main);
};

//**********To Render the Game**********/
let render = function(){
    if (backgroundReady) {
        console.log('here2');
        ctx.drawImage(backgroundImg,0,0);
    }
};
//**********To play the Game*********//
let then = Date.now();
// reset();
main(); // To call the main game loop//


