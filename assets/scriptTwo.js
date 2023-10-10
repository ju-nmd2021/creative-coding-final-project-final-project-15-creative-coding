import {GraphRoom} from "../graphScreen"


let currentSketch;

function setup() {
    // Create a canvas for your initial sketch
    createCanvas(innerWidth, innerHeight);
    canvas.parent('sketch-container'); // Make sure the canvas is placed in the designated container
    currentSketch = new GraphRoom(); // Initialize the current sketch
}

function draw() {
    // Call the current sketch's draw function
    currentSketch.draw();
}

document.getElementById('graphRoomButton').addEventListener('click', () => {
    currentSketch = new GraphRoom(); // Load the Graph Room sketch
});

// document.getElementById('flowRoomButton').addEventListener('click', () => {
//     currentSketch = new FlowRoom(); // Load the Flow Room sketch
// });

// document.getElementById('mandalaRoomButton').addEventListener('click', () => {
//     currentSketch = new MandalaRoom(); // Load the Mandala Room sketch
// });