var body = document.querySelector("body");

var grandma = {
  bottom: 0,
  left: 475,
  isFacing: "",
  isFalling: false,
};

var platforms = document.getElementsByClassName("platform") ;

var state = {
    collisionDetected: false,
    jumpHeight: 240,
    score: 0,
}

body.addEventListener("keydown", e => {

    if (e.key === "ArrowLeft") {
      moveGrandma("left");
      console.log("Left arrow pressed");
    };

    if (e.key === "ArrowRight") {
      moveGrandma("right");
      console.log("Right arrow pressed");
    };

    if (e.key === " ") {
        jump();
        console.log("Spacebar pressed");
    };
});

function moveGrandma(direction) {

    if (direction === "left") {
        grandma.left -= 20;
        grandma.isFacing = "left"
    }

    if (direction === "right") {
        grandma.left += 20;
        grandma.isFacing = "right"
    }
}

function jump() {
    
    console.log("Function jump called");
    if (!grandma.isFalling) {
    grandma.bottom += state.jumpHeight;
    console.log(`Grandma just jumped!`)
    }
}

function fall() {

    // console.log("Fall function called"); 

    
    if (state.collisionDetected) {
        console.log(state.collisionDetected)
        console.log(`Grandma's fall was stopped by an object at ${grandma.bottom}`);
        grandma.isFalling = false;
        return;
    } else if (!state.collisionDetected && grandma.bottom > 0) {
        console.log(state.collisionDetected)
        grandma.isFalling = true;
        grandma.bottom--
        console.log("Oh no! Grandma is falling...");
    } else if (grandma.bottom <= 0) {
        console.log("Grandma reached the bottom!")
        grandma.isFalling = false;
        return;

    }else {grandma.isFalling = false;
        return;
    }
}

function renderGrandma() {
    // console.log("Rendering Grandma")
    document.getElementById("grandma").style.left  = `${grandma.left}px`;
    document.getElementById("grandma").style.bottom = `${grandma.bottom}px`;
}

function detectCollision() {
    // console.log("Running collision detection...")
    let platformsToDetect = [...platforms];
    for (let i in platformsToDetect) {
        if (document.getElementById("grandma").getBoundingClientRect().x < 
        platformsToDetect[i].getBoundingClientRect().x + 
        platformsToDetect[i].getBoundingClientRect().width &&

        document.getElementById("grandma").getBoundingClientRect().x + 
        document.getElementById("grandma").getBoundingClientRect().width > 
        platformsToDetect[i].getBoundingClientRect().x &&

        document.getElementById("grandma").getBoundingClientRect().y < 
        platformsToDetect[i].getBoundingClientRect().y + 
        platformsToDetect[i].getBoundingClientRect().height &&

        document.getElementById("grandma").getBoundingClientRect().y + 
        document.getElementById("grandma").getBoundingClientRect().height > 
        platformsToDetect[i].getBoundingClientRect().y) {

            state.collisionDetected = true;
            console.log(`Collision detected with ${platformsToDetect[i].id}`);
            return;

        } else {

            console.log("No collision was found")
            state.collisionDetected = false;
        }
    };

}

function renderEverything() {
    detectCollision();
    fall();
    renderGrandma();
    requestAnimationFrame(renderEverything);
}

// setInterval(() => {
//     jump();
// }, 500);

requestAnimationFrame(renderEverything);


// function setAltitude(){
//     if (collisionDetected) {
//         grandma.altitude = 600 - document.getElementById("platform1").getBoundingClientRect().y;
//     } else grandma.altitude = 0;
// }

// document.getElementById("grandma").onanimationiteration = () => {
//     document.getElementById("grandma").classList.toggle("isFalling");
// };

// function main(){
//     document.getElementById("grandma").classList.toggle("isJumping");
//     setAltitude();
//     renderGrandma();
//     collisionDetected = false;
// }

// setInterval(() => {
//     detectCollision();
// }, 10);

// main();



// // //TODO:

// // Demain:
// // Ajout des platformes/level design
// // Score
// // Sprites
// // Son

// // Jeudi :
// // Ecran d'accueil/crédits/retouche sur le design
