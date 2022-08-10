let gamePattern = [];
const buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let started = false;
let level = 0;

const playSound = function (name) {
  const audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
};

const nextSequence = function () {
  userClickedPattern = [];
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  $("#level-title").text(`Level ${level}`);
  level++;
  started = true;
};

const animatePress = function (currentColour) {
  $(`[id=${currentColour}]`).addClass("pressed");
  setTimeout(() => {
    $(`[id=${currentColour}]`).removeClass("pressed");
  }, 100);
};

const startOver = function () {
  gamePattern = [];
  started = false;
  level = 0;
};

const checkAnswer = function (currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (currentLevel === gamePattern.length - 1) {
      setTimeout(nextSequence(), 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
};

$("[type='button']").click(function () {
  const userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(() => {
  if (!started) nextSequence();
});
