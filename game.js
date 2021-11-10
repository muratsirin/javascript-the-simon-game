var buttonColors = ["red", "blue", "green", "yellow"];
var isGameStarted = false;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keypress(function () {
  if (!isGameStarted) {
    $("#level-title").text("Level" + level);
    nextSequence();
    isGameStarted = true;
  }
});

function nextSequence() {
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  level++;
  $("#level-title").text("Level" + level);
  playSound(randomChosenColor);
  userClickedPattern = [];
}

function startOver(){
    level = 0;
    gamePattern = [];
    isGameStarted = false;
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        });

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        console.log("wrong");
    }
}

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
