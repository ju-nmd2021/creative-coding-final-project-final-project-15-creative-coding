class Agent {
  constructor(x, y, maxSpeed, maxForce) {
    this.position = createVector(x, y);
    this.lastPosition = createVector(x, y);
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
  }

  follow(desiredDirection) {
    desiredDirection = desiredDirection.copy();
    desiredDirection.mult(this.maxSpeed);
    let steer = p5.Vector.sub(desiredDirection, this.velocity);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.lastPosition = this.position.copy();

    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  draw() {
    push();
    stroke(200, 0, 20, 40);
    strokeWeight(1);
    line(
      this.lastPosition.x,
      this.lastPosition.y,
      this.position.x,
      this.position.y
    );
    pop();
  }
}

let fieldSize = 50;
let maxCols, maxRows;
let divider = 4;
let field;
let agents = [];

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
  maxCols = Math.ceil(innerWidth / fieldSize);
  maxRows = Math.ceil(innerHeight / fieldSize);
  field = generateField();
  generateAgents();
}

function generateField() {
  let field = [];
  let t = millis() * 0.001; // Use time for animation

  for (let x = 0; x < maxCols; x++) {
    field.push([]);
    for (let y = 0; y < maxRows; y++) {
      // Calculate vectors pointing from the center to the current cell
      const centerX = innerWidth / 2;
      const centerY = innerHeight / 2;
      const vec = createVector(
        centerX - x * fieldSize,
        centerY - y * fieldSize
      );

      // Calculate the distance from the center
      const distance = dist(centerX, centerY, x * fieldSize, y * fieldSize);

      // Normalize the vector and scale it based on distance and time
      if (distance > 0) {
        // Define a force magnitude to simulate the effect
        const forceMagnitude = map(
          distance,
          0,
          dist(0, 0, centerX, centerY),
          1,
          0.1
        );

        // Apply the force towards the center
        vec.normalize().mult(forceMagnitude);
      }

      // Assign the vector as the desired direction
      field[x].push(vec);
    }
  }
  return field;
}

function generateAgents() {
  // Generate agents starting from the edges and converging towards the center
  for (let i = 0; i < 200; i++) {
    let x, y;
    if (i < 50) {
      // Start from the top edge
      x = random(innerWidth);
      y = 0;
    } else if (i < 100) {
      // Start from the right edge
      x = innerWidth;
      y = random(innerHeight);
    } else if (i < 150) {
      // Start from the bottom edge
      x = random(innerWidth);
      y = innerHeight;
    } else {
      // Start from the left edge
      x = 0;
      y = random(innerHeight);
    }
    let agent = new Agent(x, y, 4, 0.1);
    agents.push(agent);
  }
}

function draw() {
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    const desiredDirection = field[x][y];
    agent.follow(desiredDirection);
    agent.update();
    agent.draw();
  }
}
