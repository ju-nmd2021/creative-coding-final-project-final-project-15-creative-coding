// initial reference https://chat.openai.com/share/4f5015cb-9ff6-4e3b-8702-ad3ea0f57dbb

// Predefined array of emotion-related keywords with their set colors
const predefinedEmotions = [
  { emotion: "Happy", color: "#FFD700" },
  { emotion: "Sad", color: "#0000FF" },
  { emotion: "Angry", color: "#FF0000" },
  { emotion: "Excited", color: "#FF5733" },
  { emotion: "Calm", color: "#00FF00" },
  { emotion: "sad2", color: "#FD5733" },
  { emotion: "Calm2", color: "#F0FF00" },
  // Add more emotions here...
];

// Array to store user-selected emotions
let selectedEmotions = [];

function setup() {
  createCanvas(800, 600);
  background(255);

  //   // Create a checkbox for each predefined emotion
  //   for (let emotion of predefinedEmotions) {
  //     createCheckbox(emotion.emotion).changed(updateSelectedEmotions);
  //   }

  // Calculate the center of the canvas
  const centerX = width / 2;
  const centerY = height / 2;

  // Create a checkbox for each predefined emotion and position them in the middle
  for (let i = 0; i < predefinedEmotions.length; i++) {
    let emotion = predefinedEmotions[i];
    let checkbox = createCheckbox(emotion.emotion).changed(
      updateSelectedEmotions
    );

    // Position checkboxes vertically in the middle of the screen
    let yOffset = (i - predefinedEmotions.length / 2) * 30;
    checkbox.position(centerX - 50, centerY + yOffset);
  }
}

function draw() {
  // Generate and display the flow field based on selected emotions
  generateFlowField();
}

function updateSelectedEmotions() {
  // Clear the selected emotions array
  selectedEmotions = [];

  // Update the selected emotions based on user's choices
  for (let emotion of predefinedEmotions) {
    let checkbox = select(emotion.emotion);
    if (checkbox.checked()) {
      selectedEmotions.push(emotion);
    }
  }

  // Limit the selection to 5 emotions
  if (selectedEmotions.length > 5) {
    let excess = selectedEmotions.length - 5;
    for (let i = 0; i < excess; i++) {
      selectedEmotions.pop();
    }
  }
}

function generateFlowField() {
  // Clear the canvas
  background(255);

  // Generate and display the flow field based on selected emotions
  for (let y = 0; y < height; y += 20) {
    for (let x = 0; x < width; x += 20) {
      let closestEmotion = findClosestEmotion(x, y);
      stroke(closestEmotion.color);
      line(
        x,
        y,
        x + cos(frameCount * 0.1) * 10,
        y + sin(frameCount * 0.1) * 10
      );
    }
  }
}

function findClosestEmotion(x, y) {
  let closestEmotion;
  let closestDist = Infinity;

  for (let emotion of selectedEmotions) {
    let d = dist(x, y, width / 2, height / 2); // You can change the center of influence
    if (d < closestDist) {
      closestDist = d;
      closestEmotion = emotion;
    }
  }

  return closestEmotion;
}
