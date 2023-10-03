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

  checkBorders() {
    if (this.position.x < 0) {
      this.position.x = innerWidth;
      this.lastPosition.x = innerWidth;
    } else if (this.position.x > innerWidth) {
      this.position.x = 0;
      this.lastPosition.x = 0;
    }
    if (this.position.y < 0) {
      this.position.y = innerHeight;
      this.lastPosition.y = innerHeight;
    } else if (this.position.y > innerHeight) {
      this.position.y = 0;
      this.lastPosition.y = 0;
    }
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

function setup() {
  createCanvas(innerWidth, innerHeight);
  background(255, 255, 255);
  field = generateField();
  generateAgents();
}

// function generateField() {
//   let field = [];
//   noiseSeed(Math.random() * 100);
//   for (let x = 0; x < maxCols; x++) {
//     field.push([]);
//     for (let y = 0; y < maxRows; y++) {
//       const centerX = innerWidth / 2;
//       const centerY = innerHeight / 2;
//       const vec = createVector(
//         centerX - x * fieldSize,
//         centerY - y * fieldSize
//       );

//       const distance = dist(centerX, centerY, x * fieldSize, y * fieldSize);

//       // Normalize the vector and scale it based on distance
//       if (distance > 0) {
//         const scaleFactor = map(distance, 0, maxDist, 1, 0);
//         vec.normalize().mult(scaleFactor);
//       }

//       //   vec.normalize();

//       const value = noise(x / divider, y / divider) * Math.PI * 2;
//       field[x].push(vec);
//     }
//   }
//   return field;
// }

function generateField() {
  let field = [];
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

      // Normalize the vector and scale it based on distance
      if (distance > 0) {
        // Define a force magnitude to simulate the black hole effect
        const forceMagnitude = map(distance, 0, maxDist, 0.1, 1);

        // Apply the force towards the center
        vec.normalize().mult(-forceMagnitude);
      }

      // Assign the vector as the desired direction
      field[x].push(vec);
    }
  }
  return field;
}

function generateAgents() {
  for (let i = 0; i < 200; i++) {
    let agent = new Agent(
      Math.random() * innerWidth,
      Math.random() * innerHeight,
      4,
      0.1
    );
    agents.push(agent);
  }
}

const fieldSize = 50;
const maxCols = Math.ceil(innerWidth / fieldSize);
const maxRows = Math.ceil(innerHeight / fieldSize);
const divider = 4;
let field;
let agents = [];

function draw() {
  for (let agent of agents) {
    const x = Math.floor(agent.position.x / fieldSize);
    const y = Math.floor(agent.position.y / fieldSize);
    const desiredDirection = field[x][y];
    agent.follow(desiredDirection);
    agent.update();
    agent.checkBorders();
    agent.draw();
  }
}
