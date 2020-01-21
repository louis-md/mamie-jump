var body = document.querySelector("body");
var grandma = {
  left: 475,
  isFacing: "",
  altitude: 0,
};

var collisionDetected = false;

body.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft") {
      moveGrandma("left");
      console.log("Grandma just moved left")
    }
    if (e.key === "ArrowRight") {
      moveGrandma("right");
      console.log("Grandma just moved right")
    }
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
    renderGrandma();
}

function renderGrandma() {
    document.getElementById("grandma").style.left  = `${grandma.left}px`;
    document.getElementById("grandma").style.bottom = `${grandma.altitude}px`;
}

document.getElementById("grandma").onanimationiteration = () => {
    document.getElementById("grandma").classList.toggle("isFalling");
};



setInterval(() => {
    if (document.getElementById("grandma").getBoundingClientRect().x
    < document.getElementById("platform").getBoundingClientRect().x + document.getElementById("platform").getBoundingClientRect().width &&
    document.getElementById("grandma").getBoundingClientRect().x + document.getElementById("grandma").getBoundingClientRect().width
    > document.getElementById("platform").getBoundingClientRect().x &&
    document.getElementById("grandma").getBoundingClientRect().y
    < document.getElementById("platform").getBoundingClientRect().y
    + document.getElementById("platform").getBoundingClientRect().height 
    && document.getElementById("grandma").getBoundingClientRect().y + document.getElementById("grandma").getBoundingClientRect().height 
    > document.getElementById("platform").getBoundingClientRect().y && document.getElementById("grandma").classList.value.includes("isFalling")) {

        console.log("Collision detected!");
        grandma.altitude = document.getElementById("platform").getBoundingClientRect().y;
        document.getElementById("grandma").onanimationend = renderGrandma();
    } else {
        grandma.altitude = 0;
        document.getElementById("grandma").onanimationend = renderGrandma();
    }
}, 10);



// //TODO:

// Demain:
// Ajout des platformes/level design
// Score
// Son

// Jeudi :
// Ecran d'accueil/crédits/retouche sur le design

//
// function getMarginPosition(elementID){
//     return [document.getElementById(elementID).getBoundingClientRect().;
// }

// requestAnimationFrame

// function detectCollision() {
//     if (`${document.getElementById("grandma").style.margin-bottom}` - ${document.getElementById("platform").style.margin-top}` ) {
//         collisionDetected = true;
//     }
// }

// function score() {

// }
