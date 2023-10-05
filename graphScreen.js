let xMax = 10; // Maximum x-value
let yMax = 10; // Maximum y-value

let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  video = createCapture(VIDEO);
  // video.size(640, 480);
  colorMode(HSB); // Use HSB color mode with a maximum saturation of 100
  // Set the origin to the center of the canvas
  //   translate(innerWidth / 2, innerHeight / 2);
  //
  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", (results) => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  // Draw the x and y axes
  // drawAxes();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  background(0, 100, 100);


  push();
  translate(innerWidth / 2, innerHeight / 2);
  drawAxes();

  // Loop through each quadrant and draw the points
  for (let i = -xMax; i <= xMax; i++) {
    for (let j = -yMax; j <= yMax; j++) {
      let x = i;
      let y = j;

      // Map the coordinates to the canvas
      let px = map(x, -xMax, xMax, -width / 2, width / 2);
      let py = map(y, -yMax, yMax, -height / 2, height / 2);

      // Determine the color based on the quadrant and saturation
      let saturation = map(max(abs(x), abs(y)), 0, max(xMax, yMax), 0, 100);
      let hue;

      if (x >= 0 && y >= 0) {
        hue = 30; // Orange for (x, y)
      } else if (x < 0 && y >= 0) {
        hue = 100; // Red for (-x, y)
      } else if (x < 0 && y < 0) {
        hue = 0; // Black for (-x, -y)
      } else {
        hue = 200; // Blue for (x, -y)
      }

      fill(hue, saturation, 100); // Use HSB color with calculated saturation
      // Draw a point at the mapped coordinates
      noStroke();
      square(px, py, 150);
    }
  }
  pop();
  drawKeypoints();

}

function drawAxes() {
  stroke(0);
  line(-width / 2, 0, width / 2, 0); // X-axis
  line(0, -height / 2, 0, height / 2); // Y-axis
}


let x= 0;
let y= 0;
let currentIndexX = innerWidth / 2;
let currentIndexY = innerHeight / 2;

function drawKeypoints() {

  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];

    //  landmarks for the hand
    if (prediction.landmarks.length > 0 && prediction.handInViewConfidence > 0.8) {
      let landmarks = prediction.landmarks;
      // const indexFinger = prediction.landmarks[8];

    let indexX = landmarks[8][0];
    let indexY = landmarks[8][1];

    // let currentIndexX = indexX;
    // let currentIndexY = indexY;

    currentIndexX += (indexX - currentIndexX) / 4;
    currentIndexY += (indexY - currentIndexY) / 4;



      // Map the index finger coordinates to the canvas dimensions
       x = map(currentIndexX, 0 , 640, width, 0);
       y = map(currentIndexY, 0, 480, 0, height);

      // Draw a point at the mapped coordinates
      
    }

  }
  fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 50, 50);
}

