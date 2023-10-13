const startButton = window.parent.document.getElementById("startButton");

startButton.style.display = "block";

startButton.addEventListener("click", () => {
  window.parent.goToExperiment(1);
  startButton.style.display = "none";
});

function setup() {
  createCanvas(Math.min(innerWidth, 900), innerHeight);
  background(0);
}


  function draw() {
    let centerY = innerHeight / 2;
    textAlign(CENTER);
    textWrap(WORD);
 
    textSize(70);
    fill(214, 213, 203);
  
    // Text for "EMOTIONAL SPACE"
    push();
    textStyle(BOLD);
    text("EMOTIONAL SPACE", width / 2, centerY - 200);
  pop();
  
    textSize(20);

    text(
      "We live in a very fast-paced world, where people frequently experience stress and anxiety for many reasons like financial obligations, workload and overwhelming digital connectivity. This increases the need for a space where one can relax, disconnect and become more aware of their emotions and feelings. Emotion space is a virtual space that uses generative art to reflect and respond to users' emotional states, providing a unique outlet for emotional expression and self-reflection.",
      0,
      centerY- 150 ,
      width 
    );
  
    // Text for "Emotional identification Room"
    fill(214, 213, 203);
    push();
    textStyle(BOLD);
    text("Emotional identification Room", width / 2, centerY + 65);
    pop();

    text(
      "You will select a color that best expresses your current emotion. Based on this, a flow field will be generated where you can also control the direction with your hand movement.",
      0,
      centerY + 100,
      width
    );
  
    // Text for "Breathing mandala Room"
    push();
    textStyle(BOLD);
    text("Breathing mandala Room", width / 2, centerY + 220);
     pop();
  
    text(
      "This room will generate a mandala art that expands and shrinks depending on your hand movement. Close your hand when breathing in and open your hand when exhaling.",
      0,
      centerY + 250,
      width
    );
  }
  