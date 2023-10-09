let xMax = 10; // Maximum x-value
let yMax = 10; // Maximum y-value

let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  video = createCapture(VIDEO);
  // video.size(640, 480);
  // colorMode(HSB); // Use HSB color mode with a maximum saturation of 100
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
let squareColor;
let colorDetectionStartTime = 0;
let detectionThreshold = 1000;

function draw() {
  squareColor = color(0);
  // Initialize square color as black
  background(0, 100, 100);

  push();

  translate(innerWidth / 2, innerHeight / 2);

  drawAxes();
  
  graphColor();

  pop();

  drawKeypoints();
}

function graphColor() {
  // Loop through each quadrant and draw the points
  for (let i = -xMax; i <= xMax; i++) {
    for (let j = -yMax; j <= yMax; j++) {
      let x = i;
      let y = j;

      // Map the coordinates to the canvas
      let px = map(x, -xMax, xMax, -width / 2, width / 2);
      let py = map(y, -yMax, yMax, -height / 2, height / 2);

      if (x >= 0 && y >= 0) {
        //(x, y)
      fill(0, 255, 100); // Use HSB color with calculated saturation

      } else if (x < 0 && y >= 0) {
        //(-x, y)
      fill(255, 0, 0); // Use HSB color with calculated saturation

      } else if (x < 0 && y < 0) {
        // (-x, -y)
      fill(0, 0, 100); // Use HSB color with calculated saturation

      } else {
        // (x, -y)
      fill(255, 255, 100); // Use HSB color with calculated saturation

      }
      
      // Draw a point at the mapped coordinates
      noStroke();
      square(px, py, 150);
    }
  }
}


function drawAxes() {
  stroke(0);
  line(-width / 2, 0, width / 2, 0); // X-axis
  line(0, -height / 2, 0, height / 2); // Y-axis
}

let x = 0;
let y = 0;
let currentIndexX = innerWidth / 2;
let currentIndexY = innerHeight / 2;

let currentQuadrantColor = null;

function drawKeypoints() {
  
  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];

    //  landmarks for the hand
    if (
      prediction.landmarks.length > 0 &&
      prediction.handInViewConfidence > 0.8
    ) {
      let landmarks = prediction.landmarks;

      let indexX = landmarks[8][0];
      let indexY = landmarks[8][1];


      currentIndexX += (indexX - currentIndexX) / 4;
      currentIndexY += (indexY - currentIndexY) / 4;

      // Map the index finger coordinates to the canvas dimensions
      x = map(currentIndexX, 0, 640, width, 0);
      y = map(currentIndexY, 0, 480, 0, height);

      // Calculate the distance between the current and previous position
      let distance = dist(indexX, indexY, currentIndexX, currentIndexY);


      //
      currentQuadrantColor = getColorOfQuadrant(currentIndexX, currentIndexY);

            // Check if the distance is within 20px
            if (distance <= 20) {
              // If the index finger is within 20px of its previous position
              if (millis() - colorDetectionStartTime >= detectionThreshold && currentQuadrantColor !== null) {
                // If it's been in the same position for 2 seconds or more
                console.log("Detected Square Color:",  currentQuadrantColor.toString());
                currentQuadrantColor = null; // Reset the detected color
                // noLoop(); // Stop further detection
              }
            } else {
              // Reset the timer and last position if the finger moved
              colorDetectionStartTime = millis();
              currentIndexX = indexX;
              currentIndexY = indexY;
            }

    }
  }
  fill(0, 255, 0);
  ellipse(x, y, 50, 50);
}


function getColorOfQuadrant(x, y) {
  if (x >= 0 && y >= 0) {
    return color(0, 100, 100); // Color for (x, y)
  } else if (x < 0 && y >= 0) {
    return color(255, 0, 0); // Color for (-x, y)
  } else if (x < 0 && y < 0) {
    return color(0, 0, 100); // Color for (-x, -y)
  } else {
    return color(255, 255, 100); // Color for (x, -y)
  }
}



//  CURRENT DETECTED COLOR "rgba(0,255,100,1)"


// if (millis() - colorDetectionStartTime >= detectionThreshold && x >= 0 && y >= 0 && x === currentIndexX && y === currentIndexY) {
//   console.log("Detected Square Color:", squareColor, " fill(0, 255, 100);");
//   noLoop();
// } 
