const keyState = {};

var grandma = {
  bottom: 0,
  left: 475,
  isFacing: "",
  isFalling: false,
};

var platforms = document.getElementsByClassName("platform") ;

var state = {
    collisionDetected: false,
    jumpHeight: 250,
    score: 1,
    lost: true,
}

window.scrollTo(0, 1447)

window.onkeydown = function(e) {
    keyState[e.code] = true;
};

window.onkeyup = function(e) {
    keyState[e.code] = false;
};

function moveGrandma(direction) {

    if (direction === "left") {
        grandma.left -= 10;
        grandma.isFacing = "left"
    }

    if (direction === "right") {
        grandma.left += 10;
        grandma.isFacing = "right"
    }
}

function jump() {
    
    // console.log("Function jump called");
    if (!grandma.isFalling) {
    grandma.bottom += state.jumpHeight;
    // console.log(`Grandma just jumped!`)
    }
}

function fall() {

    // console.log("Fall function called"); 
    
    if (state.collisionDetected) {
        // console.log(`Grandma's fall was stopped by an object at ${grandma.bottom}`);
        grandma.isFalling = false;
        return;
    } else if (!state.collisionDetected && grandma.bottom > 0) {
        // console.log(state.collisionDetected)
        grandma.isFalling = true;
        grandma.bottom -= 8;
        // console.log("Oh no! Grandma is falling...");
    } else if (grandma.bottom <= 0) {
        // console.log("Grandma reached the bottom!")
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

            // console.log("No collision was found")
            state.collisionDetected = false;
        }
    };

}

function renderScore() {
    if (grandma.bottom > state.score) {
        state.score = grandma.bottom;
    }
    document.getElementById("score").innerHTML = `Score: ${state.score - 242}`;
}

function scrollScreen() {
    if (document.getElementById("grandma").getBoundingClientRect().y < 0) {
        window.scrollBy(0,-200);
    }
}

function endGame() {
    if (document.getElementById("grandma").getBoundingClientRect().y > 900) {
        window.scrollTo(0, 2500);
        grandma.bottom = 0;
        renderGrandma();
        if(!alert(`You lost! Your score is ${state.score}. Not bad for a grandma! \nClick "Ok" to play again.`)){
        window.location.reload();}
    }

    if (grandma.bottom > 3000) {
        grandma.bottom = 3200;
        document.getElementById("grandma").getBoundingClientRect().x = 600;
        renderGrandma();
        if(!alert(`You win! Your score is ${state.score}. Congrats!!`)){
            window.location.reload();}
    }
}

function renderEverything() {
    // if (keyState["Space"]) jump();
    if (keyState["ArrowRight"]) moveGrandma("right");
    if (keyState["ArrowLeft"]) moveGrandma("left");
    detectCollision();
    fall();
    renderGrandma();
    renderScore();
    scrollScreen();
    endGame();
    requestAnimationFrame(renderEverything);
}

setInterval(() => {
    jump();
}, 100);

(function initScroll(){
    window.scrollTo(0, 2500);
})();

requestAnimationFrame(renderEverything);

// // //TODO:

// // Sprites
// // Son
// // Page scroll
// // Ecran d'accueil/crédits/retouche sur le design
