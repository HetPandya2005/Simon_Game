var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$(document).keypress(function () {
  if (!started) {
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});

$(".btn").click(function (event) {
  if (!started) return;

  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playsound(userChosenColor);
  animatePress(userChosenColor);

  // Check if the current click matches the expected color
  var currentIndex = userClickedPattern.length - 1;
  if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {
    gameOver();
    return; // Exit early if wrong
  }

  // Optional: Log partial success (for debugging)
  

  // Proceed to next level if full sequence is correct
  if (userClickedPattern.length === gamePattern.length) {
    
    setTimeout(nextSequence, 1000);
  }
});

function gameOver() {
  console.log("Game Over - Wrong sequence!");
  playsound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }, 2000);
  startOver();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  userClickedPattern = [];
  $("#level-title").text("Game Over, Press Any Key to Restart");
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = []; //  Reset users pattern each level
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomChosenColor);
  animatePress(randomChosenColor);
  console.log(gamePattern);
}
