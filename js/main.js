const keyState = {};
const platforms = document.getElementsByClassName("platform");
const grandmaDOM = document.getElementById("grandma");
var platformSound = new Audio('../sound/platform.wav');
var level = new Audio('../sound/level.mp3');
var win = new Audio('../sound/you-win.mp3');
var gameOver = new Audio('../sound/game-over-sound-effect.mp3');
var love = new Audio('../sound/what-is-love.mp3');

level.win = 0.4;
level.gameOver = 0.3; 
level.volume = 0.05;
level.play();

const grandma = {
  bottom: 0,
  left: 475,
  isFacing: "",
  isFalling: false,};

const state = {
    collisionDetected: false,
    jumpHeight: 250,
    score: 1,
    lost: true,}

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
    if (!grandma.isFalling) {
    grandma.bottom += state.jumpHeight;
    }
}

function fall() {    
    if (state.collisionDetected) {
        grandma.isFalling = false;
        return;
    } else if (!state.collisionDetected && grandma.bottom > 0) {
        grandma.isFalling = true;
        grandma.bottom -= 8;
    } else if (grandma.bottom <= 0) {
        grandma.isFalling = false;
        return;
    }else {grandma.isFalling = false;
        return;
    }
}

function renderGrandma() {
    if (grandma.isFacing === "right") {
        grandmaDOM.style.background = "url('./img/sprites/mamie-right.png')"
    } else if (grandma.isFacing === "left") {
        grandmaDOM.style.background = "url('./img/sprites/mamie-left.png')"
    }
    grandmaDOM.style.left  = `${grandma.left}px`;
    grandmaDOM.style.bottom = `${grandma.bottom}px`;
}

function detectCollision() {
    let platformsToDetect = [...platforms];
    for (let i in platformsToDetect) {
        if (grandmaDOM.getBoundingClientRect().x < 
        platformsToDetect[i].getBoundingClientRect().x + 
        platformsToDetect[i].getBoundingClientRect().width &&
        grandmaDOM.getBoundingClientRect().x + 
        grandmaDOM.getBoundingClientRect().width > 
        platformsToDetect[i].getBoundingClientRect().x &&
        grandmaDOM.getBoundingClientRect().y < 
        platformsToDetect[i].getBoundingClientRect().y + 
        platformsToDetect[i].getBoundingClientRect().height &&
        grandmaDOM.getBoundingClientRect().y + 
        grandmaDOM.getBoundingClientRect().height > 
        platformsToDetect[i].getBoundingClientRect().y) {
            state.collisionDetected = true;
            platformSound.play();
            return;
        } else state.collisionDetected = false;
    };
}

function renderScore() {
    if (grandma.bottom > state.score) {
        state.score = grandma.bottom;}
    document.getElementById("score").innerHTML = `Score: ${state.score - 242}`;
}

function scrollScreen() {
    if (document.getElementById("grandma").getBoundingClientRect().y < 0) {
        window.scrollBy(0,-200);
    }
}

function endGame() {
    if (grandmaDOM.getBoundingClientRect().y > 900) {
        gameOver.play();
        window.scrollTo(0, 2500);
        grandma.bottom = 0;
        renderGrandma();
        window.location.reload();
        if(!alert(`You lost! Your score is ${state.score - 242}. Not bad for a grandma! \nClick "Ok" to try again.`)){
        }  
    }
    if (grandma.bottom > 2900) {
        win.play();
        grandma.bottom = 3200;
        grandmaDOM.getBoundingClientRect().x = 600;
        renderGrandma();
        window.location.href = "./index.html";
        alert(`You win! Your score is ${state.score - 242}. Congrats!!`) 
    }
}

function renderEverything() {
    if (keyState["ArrowRight"]) moveGrandma("right");
    if (keyState["ArrowLeft"]) moveGrandma("left");
    detectCollision();
    fall();
    renderGrandma();
    renderScore();
    scrollScreen();
    requestAnimationFrame(renderEverything);
}

setInterval(() => {
    endGame();
}, 100);

setInterval(() => {
    jump();
}, 100);

(function initScroll(){
    window.scrollTo(0, 2500);
})();

requestAnimationFrame(renderEverything);