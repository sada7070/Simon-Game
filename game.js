buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];

var started = false;
var level = 0;

//On click  detection function
$(".btn").click(function(){

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

//Keyboard click detection function
$(document).keydown(function(){

    if(!started){

        $("h1").text("Level "+ level);
        nextSequence();
        started = true;
    }
});

//Answer checking function
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("h1").text("Game Over! Press any key to Restart.");
        startOver();
    }
}

//Main function
function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+ level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

//sound effect function
function playSound(name){

    var audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

//Animation functions
function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");          //pressed is a 'css' class

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

//Restart function
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}