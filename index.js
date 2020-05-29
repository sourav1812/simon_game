var buttoncolors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamepattern = [];

var level = 0;
var started = false;
$(document).on("click", function() {

  if (!started) {
    $("h1").text("Level "+level);
    nextSequence();
    started = true;
  }
});

$(".btn").on("click", function(event) {
  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
function startOver(){
  level=0;
  gamepattern = [];
  started = false;
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamepattern[currentLevel]){
    console.log("success");

    if(userClickedPattern.length === gamepattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    var audio =new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game over press any key to Restart");
    startOver();
  }

}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level "+level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomchosenColor = buttoncolors[randomNumber];
  gamepattern.push(randomchosenColor);
  $("#" + randomchosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomchosenColor);
  animatePress(randomchosenColor);

}

function playSound(name) {

  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}
