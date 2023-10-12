// GRAPH VARIABLES
let xMax = 10; // Maximum x-value
let yMax = 10; // Maximum y-value

let handpose;
let video;
let predictions = [];

let value;

let squareColor;
let colorDetectionStartTime = 0;
let detectionThreshold = 3000;

let x = 0;
let y = 0;
let currentIndexX = innerWidth / 2;
let currentIndexY = innerHeight / 2;

let currentQuadrantColor = null;

// FLOW FIELD VARIABLES
let particles = [];
const num = 1000;
let stepSize = 1; // Adjust this value to change the speed
let flowDirection = 10; // Adjust this value to change the flow direction


const noiseScale = 0.01 / 2;


class GraphRoom {
  setup() {
    createCanvas(innerWidth, innerHeight);
    video = createCapture(VIDEO);
    handpose = ml5.handpose(video, modelReady);
    // with an array every time new hand poses are detected
    handpose.on("predict", (results) => {
      predictions = results;
    });
    // Hide the video element, and just show the canvas
    video.hide();
  
  }

  draw() {
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

  graphColor(){  // Loop through each quadrant and draw the points
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
  drawKeypoints(){  
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
  
              // Check if the distance is within 20px
              if (distance <= 20) {
                currentQuadrantColor = getColorOfQuadrant(x, y);
  
                // If the index finger is within 20px of its previous position
                if (millis() - colorDetectionStartTime >= detectionThreshold && currentQuadrantColor !== null) {
                  // If it's been in the same position for 2 seconds or more
                  console.log("Detected Square Color:",  currentQuadrantColor);
                  currentQuadrantColor = null; // Reset the detected color
                  // noLoop(); // Stop further detection
                }
              } else {
                // Reset the timer and last position if the finger moved
                colorDetectionStartTime = millis();
                currentQuadrantColor = null;
                console.log(currentQuadrantColor);
                currentIndexX = indexX;
                currentIndexY = indexY;
              }
      }
    }
    fill(0, 255, 0);
    ellipse(x, y, 50, 50);

    
  }
  getColorOfQuadrant(x,y){  
    if (x > innerWidth / 2) {
      if (y > innerHeight / 2) {
        value = "green";
      } else {
        value = "yellow";
      }
    } else if (x < innerWidth / 2) {
      if (y > innerHeight / 2) {
        value = "red";
      } else {
        value = "blue";
      }
    }
    return value;
    
  }
}

class flowField {
    setup() {
      createCanvas(innerWidth, innerHeight);
      for (let i = 0; i < num; i++) {
        particles.push(createVector(random(width), random(height)));
      }
    
      // For a cool effect try uncommenting this line
      // And comment out the background() line in draw
      // stroke(255, 50);
    }
    
    draw() {
      stroke(random(100, 255), random(0, 100), random(20, 200));
    
      background(0, 10);
      for (let i = 0; i < num; i++) {
        let p = particles[i];
        point(p.x, p.y);
        let n = noise(
          p.x * noiseScale,
          p.y * noiseScale,
          frameCount * noiseScale * noiseScale 
        );
        let a = TAU * n + flowDirection;;
        p.x += cos(a)* stepSize;
        p.y += sin(a)* stepSize;
        if (!onScreen(p)) {
          p.x = random(width);
          p.y = random(height);
        }
      }
    }
    
     ouseReleased() {
      noiseSeed(millis());
    }
    
    onScreen(v) {
      return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
    }
  }