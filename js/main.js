var body = document.querySelector("body");

var grandma = {
  left: `475`,
  facing: "",
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
        grandma.facing = "left"
    }

    if (direction === "right") {
        grandma.left += 20;
        grandma.facing = "right"
    }
    renderGrandma();
}

function renderGrandma() {
    document.getElementById("grandma").style.left  = `${grandma.left}px`
}

// function getMarginPosition(elementID){
//     return [document.getElementById(elementID).getBoundingClientRect().;
// }

// setInterval( () => {
//     console.log(document.getElementById("grandma").getBoundingClientRect());
// }, 100)

// requestAnimationFrame

// function detectCollision() {
//     if (`${document.getElementById("grandma").style.margin-bottom}` - ${document.getElementById("platform").style.margin-top}` ) {
//         collisionDetected = true;
//     }
// }

// function score() {

// }
