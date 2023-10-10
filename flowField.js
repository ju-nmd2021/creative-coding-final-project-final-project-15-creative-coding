
let particles = [];
const num = 1000;
let stepSize = 1; // Adjust this value to change the speed
let flowDirection = 10; // Adjust this value to change the flow direction


const noiseScale = 0.01 / 2;

export function setup() {
  createCanvas(innerWidth, innerHeight);
  for (let i = 0; i < num; i++) {
    particles.push(createVector(random(width), random(height)));
  }

  // For a cool effect try uncommenting this line
  // And comment out the background() line in draw
  // stroke(255, 50);
}

export function draw() {
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

export function mouseReleased() {
  noiseSeed(millis());
}

function onScreen(v) {
  return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}
