let xMax = 10; // Maximum x-value
let yMax = 10; // Maximum y-value

let handpose;
let video;
let predictions = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  video = createCapture(VIDEO);
  video.size(innerWidth, innerHeight);
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
  drawAxes();
}

function modelReady() {
  console.log("Model ready!");
}

function draw() {
  //   background(220);
  drawKeypoints();

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
      ellipse(px, py, 50, 50);
    }
  }
  pop();
  //   noLoop();
}

function drawAxes() {
  stroke(0);
  line(-width / 2, 0, width / 2, 0); // X-axis
  line(0, -height / 2, 0, height / 2); // Y-axis
}

// A function to draw ellipses over the detected keypoints
// function drawKeypoints() {
//   for (let i = 0; i < predictions.length; i += 1) {
//     const prediction = predictions[i];
//     for (let j = 0; j < prediction.landmarks.length; j += 1) {
//       const keypoint = prediction.landmarks[j];
//       fill(0, 255, 0);
//       noStroke();
//       ellipse(keypoint[0], keypoint[1], 10, 10);
//     }
//   }
// }

function drawKeypoints() {
  // for (let i = 0; i < predictions.length; i += 1) {
  //   const prediction = predictions[i];
  //   for (let j = 0; j < prediction.landmarks.length; j += 1) {
  //     const keypoint = prediction.landmarks[j];

  //     // Map the keypoint coordinates to the canvas dimensions
  //     const x = map(keypoint[0], 0, video.width, -width / 2, width / 2);
  //     const y = map(keypoint[1], 0, video.height, -height / 2, height / 2);

  //     fill(0, 255, 0);
  //     noStroke();
  //     ellipse(x, y, 10, 10);
  //   }
  // }

  for (let i = 0; i < predictions.length; i++) {
    const prediction = predictions[i];

    // Check if there are landmarks for the hand
    if (prediction.landmarks.length > 0) {
      // Get the position of the index finger (landmark 8)
      const indexFinger = prediction.landmarks[8];

      // Map the index finger coordinates to the canvas dimensions
      const x = map(indexFinger[0], 0, innerWidth, 0, width);
      const y = map(indexFinger[1], 0, innerHeight, 0, height);

      // Draw a point at the mapped coordinates
      fill(0, 255, 0);
      noStroke();
      ellipse(x, y, 10, 10);
    }
  }
}

// 640 480
