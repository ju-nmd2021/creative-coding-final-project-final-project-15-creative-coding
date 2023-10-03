let resolution = 10; // Grid resolution
let cols, rows;
let flowfield = [];
let particles = [];

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.prevPos = this.pos.copy();
  }

  update() {
    // Look up the vector at the particle's current position in the flowfield
    let x = floor(this.pos.x / resolution);
    let y = floor(this.pos.y / resolution);
    let force = flowfield[y][x];
    this.applyForce(force);

    // Update velocity, position, and store previous position
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.edges();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    stroke(0, 50);
    strokeWeight(1);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }
}

function setup() {
  createCanvas(400, 400);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  // Initialize flowfield
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      let angle = atan2(
        height / 2 - y * resolution,
        width / 2 - x * resolution
      );
      row.push(p5.Vector.fromAngle(angle));
    }
    flowfield.push(row);
  }

  // Create particles
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }

  background(255);
  noFill();
}

function draw() {
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

  // Update and show particles
  for (let particle of particles) {
    particle.update();
    particle.show();
  }
}
