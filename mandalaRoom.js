////////CITATIONS////////
// Mandala art video link : https://www.youtube.com/watch?v=k28xNx-Q3ys
// MP3 track website : https://pixabay.com/sound-effects/search/mp3/

let player;
let oscillator;
let analyser;

let mandalaSize = 0.5;
let type = 1; //1 for complex see-through, 2 for solid
let rate = 3; //rate of pedal change 0.5
let hueyD = 1.4; //rate of color change 1.4
let fr = 24; //framerate 24
let chance = 0.1; //chance in 10 of reversal 0.1
let array1 = [];
let newArray = [];
let paused = false;

let handpose;
let video;
let predictions = [];

let volume = 20;

let mappedDistance;

let x1D, x2D, y2D, x3D, y3D, x4D;
let x1,
  x2,
  y2,
  x3,
  y3,
  x4,
  huey,
  sat,
  brt,
  alph,
  ang,
  currR,
  maxY2,
  maxY3,
  ped,
  lay;

window.addEventListener("load", () => {
  player = new Tone.Player("assets/track2.mp3");
  oscillator = new Tone.Oscillator(440, "sine").toDestination();

  player.volume.value = volume;

  analyser = new Tone.Analyser("fft", 4096);

  oscillator.connect(analyser);
  oscillator.toDestination();
  player.connect(analyser);
  player.toDestination();
});

const startButton = window.parent.document.getElementById("soundButton");

startButton.style.display = "block";

startButton.addEventListener("click", () => {
  player.start();
  startButton.style.display = "none";
});

const endButton = window.parent.document.getElementById("endButton");

endButton.style.display = "block";

endButton.addEventListener("click", () => {
  window.parent.goToExperiment(0);
  endButton.style.display = "none";
});

function setup() {
  frameRate(fr);

  createCanvas(innerWidth, innerHeight);
  video = createCapture(VIDEO);
  video.size(innerWidth, innerHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);

  sat = 100;
  if (type == 1) {
    brt = 100;
    alph = 35;
    noStroke(0);
  } else {
    brt = 70;
    alph = 100;
    stroke(0);
  }

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  newArt();
}

function modelReady() {
  console.log("Model ready!");
}

function newArt() {
  array1 = [];
  ped = round(random(8, 25)); // 8 to 25
  lay = random(4, 30); //4, 40+ takes more processing
  ang = 360 / ped;

  // calculate STARTING hues and points for each layer, starting with outside pedals and going inward, and save them plus directions to array
  for (let j = lay; j > 0; j--) {
    currR = (j / lay) * (width / 2);
    x1 = random(0.35 * currR, 0.45 * currR);
    x2 = random(0.5 * currR, 0.7 * currR);
    maxY2 = x2 * tan(ang) * 0.9;
    y2 = random(0.06 * currR, maxY2);
    x3 = random(x2 * 1.1, 0.85 * currR);
    maxY3 = x3 * tan(ang) * 0.9;
    y3 = random(0.06 * currR, maxY3);
    x4 = random(0.88 * currR, 0.99 * currR);
    x1D = x2D = y2D = x3D = y3D = x4D = (rate / lay) * j;
    huey = random(360);
    array1.push(
      x1,
      x2,
      y2,
      x3,
      y3,
      x4,
      x1D,
      x2D,
      y2D,
      x3D,
      y3D,
      x4D,
      huey,
      hueyD
    );
  }
  if (paused) {
    draw();
  }
}

function drawMandala(handSize) {
  newArray = [];
  push();
  translate(width / 2, height / 2);

  // calculate points for each layer, starting with outside pedals and going inward
  for (let k = lay; k > 0; k--) {
    let place = (lay - k) * 14;
    let x1N = array1[place + 0];
    let x2N = array1[place + 1];
    let y2N = array1[place + 2];
    let x3N = array1[place + 3];
    let y3N = array1[place + 4];
    let x4N = array1[place + 5];
    let x1Nd = array1[place + 6];
    let x2Nd = array1[place + 7];
    let y2Nd = array1[place + 8];
    let x3Nd = array1[place + 9];
    let y3Nd = array1[place + 10];
    let x4Nd = array1[place + 11];
    let hueyN = array1[place + 12];
    let hueyNd = array1[place + 13];
    currR = (k / lay) * (width / 2);

    x1N += x1Nd;
    if (x1N < 0.35 * currR || x1N > 0.45 * currR || random(10) < chance) {
      x1Nd *= -1;
    }
    x2N += x2Nd;
    if (x2N < 0.5 * currR || x2N > 0.7 * currR || random(10) < chance) {
      x2Nd *= -1;
    }
    maxY2 = x2N * tan(ang) * 0.9;
    y2N += y2Nd;
    if (y2N < 0.06 * currR || y2N > maxY2 || random(10) < chance) {
      y2Nd *= -1;
    }
    x3N += x3Nd;
    if (x3N < x2N * 1.1 || x3N > 0.85 * currR || random(10) < chance) {
      x3Nd *= -1;
    }
    maxY3 = x3N * tan(ang) * 0.9;
    y3N += y3Nd;
    if (y3N < 0.06 * currR || y3N > maxY3 || random(10) < chance) {
      y3Nd *= -1;
    }
    x4N += x4Nd;
    if (x4N < 0.88 * currR || x4N > 0.99 * currR || random(10) < chance) {
      x4Nd *= -1;
    }
    hueyN += hueyNd;
    if (hueyN > 359) {
      hueyN = 0;
    }
    if (hueyN < 0) {
      hueyN = 359;
    }
    if (random(10) < chance) {
      hueyNd *= -1;
    }
    fill(hueyN, sat, brt, alph);
    newArray.push(
      x1N,
      x2N,
      y2N,
      x3N,
      y3N,
      x4N,
      x1Nd,
      x2Nd,
      y2Nd,
      x3Nd,
      y3Nd,
      x4Nd,
      hueyN,
      hueyNd
    );
    // draw the pedals for one layer
    for (let i = 0; i < ped; i++) {
      beginShape();
      curveVertex(x4N * handSize, 0);
      curveVertex(x4N * handSize, 0);
      curveVertex(x3N * handSize, y3N * handSize);
      curveVertex(x2N * handSize, y2N * handSize);
      curveVertex(x1N * handSize, 0);
      curveVertex(x2N * handSize, -y2N * handSize);
      curveVertex(x3N * handSize, -y3N * handSize);
      curveVertex(x4N * handSize, 0);
      curveVertex(x4N * handSize, 0);
      endShape();
      rotate(ang);
    }
    rotate(ang / 2);
  }
  pop();
  array1 = newArray;
}

function draw() {
  background(0);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();

  if (predictions.length > 0 && predictions[0].handInViewConfidence > 0.8) {
    let landmarks = predictions[0].landmarks;
    let x1 = predictions[0].boundingBox.topLeft[0];
    let x2 = predictions[0].boundingBox.bottomRight[0];
    let w = x2 - x1;

    // Calculate the distance between two key points (e.g., thumb tip and index tip)
    let thumbX = landmarks[4][0];
    let thumbY = landmarks[4][1];
    let indexX = landmarks[8][0];
    let indexY = landmarks[8][1];

    let currentThumbX = thumbX;
    let currentIndexX = indexX;

    let currentThumbY = thumbY;
    let currentIndexY = indexY;

    currentIndexX += (indexX - currentIndexX) / 4;
    currentThumbX += (thumbX - currentThumbX) / 4;

    currentIndexY += (indexY - currentIndexY) / 4;
    currentThumbY += (thumbY - currentThumbY) / 4;

    let distance = dist(
      currentThumbX,
      currentThumbY,
      currentIndexX,
      currentIndexY
    );

    let minDist = 0.2;
    let maxDist = 1.5;
    let minVol = 1;
    let maxVol = 30;

    // Map the distance to control the size of the mandala
    mappedDistance = map(distance / w, 0, 1, 0.2, 2.0); // Adjust the range as needed

    if (mappedDistance < 0.8) {
      mandalaSize = Math.max(mandalaSize - 0.006, minDist);
      volume = Math.max(volume - 0.5, minVol);
      player.volume.rampTo(volume, 0.1);
    } else {
      mandalaSize = Math.min(mandalaSize + 0.006, maxDist);
      volume = Math.min(volume + 0.5, maxVol);
      player.volume.rampTo(volume, 0.1);
    }
  }
  // Call the mandalaArt function with the hand size
  drawMandala(mandalaSize);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}
