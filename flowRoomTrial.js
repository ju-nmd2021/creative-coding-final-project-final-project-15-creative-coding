let resolution = 10; // Grid resolution
let cols, rows;
let flowfield = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  // Initialize flowfield
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      // Calculate the angle towards the center of the canvas
      let angle = atan2(
        height / 2 - y * resolution,
        width / 2 - x * resolution
      );
      row.push(p5.Vector.fromAngle(angle));
    }
    flowfield.push(row);
  }

  background(255);
  stroke(0, 50);
  strokeWeight(1);
  noFill();

  // Draw flowfield lines
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let startX = x * resolution;
      let startY = y * resolution;
      let endX = startX + flowfield[y][x].x * resolution * 0.5;
      let endY = startY + flowfield[y][x].y * resolution * 0.5;
      line(startX, startY, endX, endY);
    }
  }
}
