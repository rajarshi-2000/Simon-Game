var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;


// start the game with key press
$(document).keydown(function(event) {

  if(started === 0 && event.key !== 'Alt')
  {
    nextSequence();
    started = 1;
  }
});

// Generate Next Pattern in the Sequence
function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level ++;
}


// user choice
$(".btn").click(function(){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// check answer
function checkAnswer(currentLevel) {

    // if recent press is correct
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

      // finished Sequence and trigger next Sequence
      if((userClickedPattern.length === gamePattern.length) && gamePattern.length !== 0)
      {
        setTimeout(function(){
          nextSequence();
        }, 1000);
      }
    }

    // if recent press is wrong. GameOver and reset.
    else{
      
      // Flashing effect
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);

      // game over and reset
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}


// play sound
function playSound(color) {
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}


// animate press
function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");

  setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

// Reset the game
function startOver() {
  started = 0;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
