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

function draw() {
  textAlign(CENTER);
  textSize(70);
  fill(255, 255, 255);
  text("EMOTIONAL SPACE", innerWidth / 2, innerHeight / 4);
  text(
    "We live in a very fast-paced world, where people frequently experience stress and anxiety for many reasons like financial obligations, workload and overwhelming digital connectivity. This increases the need for a space where one can relax, disconnect and become moreaware of their emotions and feelings. Emotion space is a virtual space that uses generative art to reflect and respond to usersemotional states, providing a unique outlet for emotional expression and self-reflection.",
    innerWidth / 2,
    innerHeight / 4
  );
  text("Emotional identification Room", innerWidth / 2, innerHeight / 4);
  text(
    "you will select the a color that best express yourr current emotion. Based on this, a flow field will be generated  where you can aslo control the direction with your hand movment.",
    innerWidth / 2,
    innerHeight / 4
  );

  text("Breathing mandala Room", innerWidth / 2, innerHeight / 4);

  text(
    "This room will generate a mandala art that expands and shrinks depending on your hand movement. Close their hand when breathing in and open your hand when exhaling.",
    innerWidth / 2,
    innerHeight / 4
  );
}
