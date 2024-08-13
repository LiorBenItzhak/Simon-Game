var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var userLevel = 0;

$("#start-over-btn").click(function() {
    if ($("#start-over-btn").text() === "Start New Game") {
        userLevel = 0;
        gamePattern = [];
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
})

$(".game-buttons").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    activateColorUserPress(userChosenColour);
    checkAnswer();
});

function nextSequence() {
    increaseGameLevel();
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    for (let i = 0 ; i < gamePattern.length ; i++) {
        setTimeout(activateColorSequence, i * 300, gamePattern[i]);
    }
}

function checkAnswer() {
    var clickIndex = userClickedPattern.length - 1;

    if (gamePattern[clickIndex] !== userClickedPattern[clickIndex]) {
        gameOver();
    }
    if (clickIndex === gamePattern.length - 1) {
        userClickedPattern = [];
        setTimeout(nextSequence, 1000);
    }
}

function activateColorSequence(color) {
    animateSequence(color);
    playSound(color);
}

function activateColorUserPress(color) {
    animateUserPress(color);
    playSound(color);
}

function playSound(color) {
    new Audio('./sounds/' + color +'.mp3').play();
}

function animateSequence(color) {
    $("#" + color).fadeOut(100).fadeIn(100);
}

function animateUserPress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function(){
            $("#" + color).removeClass("pressed");
    }, 100);
}
function increaseGameLevel() {
    ++userLevel;
    $("h1").html("Game On! <br> Level " + userLevel);
}



function gameOver() {
    $("h1").html("Game Over! <br> Lets Play Again");

    new Audio('./sounds/wrong.mp3').play();

    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    userLevel = 0;
    gamePattern = [];
    userClickedPattern = [];
}
