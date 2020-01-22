var body = document.querySelector("body");
var grandma = {
  isFacing: "",
  altitude: 0,
};

body.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") {
    moveGrandma("left");
    console.log("Grandma just moved left")
  }
  if (e.key === "ArrowRight") {
    moveGrandma("right");
    console.log("Grandma just moved right")
  }

  if (e.key === "Space") {
    jump();
    console.log("Grandma just jumped")
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
}

function jump() {
  document.getElementById("grandma").classList.toggle("isJumping");
  document.getElementById("grandma").classList.toggle("isJumping");

}

