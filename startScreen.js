const startButton = window.parent.document.getElementById("startButton");

startButton.style.display = "block";

startButton.addEventListener("click", () => {
    window.parent.goToExperiment(1);
    startButton.style.display = "none";
});

function setup() {
    createCanvas(innerWidth, innerHeight);
    background(0);
}

function draw(){
    textAlign(CENTER);
    textSize(70);
    fill(255,255,255);
    text('EMOTIONAL SPACE', innerWidth /2, innerHeight/4);
    text('EMOTIONAL SPACE', innerWidth /2, innerHeight/4);

}
  