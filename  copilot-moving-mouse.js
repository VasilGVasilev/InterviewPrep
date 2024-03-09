const robot = require("robotjs");

function moveMouse() {
  // Get the screen size
  const screenSize = robot.getScreenSize();
  const screenWidth = screenSize.width;
  const screenHeight = screenSize.height;

  // Generate random coordinates within the screen boundaries
  const randomX = Math.floor(Math.random() * screenWidth);
  const randomY = Math.floor(Math.random() * screenHeight);

  // Move the mouse to the random coordinates
  robot.moveMouse(randomX, randomY);
}

// Function to simulate activity every 3 minutes
function simulateActivity() {
  moveMouse();
  setTimeout(simulateActivity, 3 * 60 * 1000); // 3 minutes in milliseconds
}

// Start simulating activity
simulateActivity();
