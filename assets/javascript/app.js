// create variables
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var timer = 30;
var clockRunning = false;
var usedQuestions = [""];

// create questions & answers
var triviaQuestions = [{
    question: "What is the capital of Canada?",
    choices: ["Montreal", "Vancouver", "Ottawa"],
    answer: 2
},
{
    question: "How many people live in Canada?",
    choices: ["6 million", "36 million", "300 million"],
    answer: 1
},
{
    question: "What is the national animal of Canada?",
    choices: ["Beaver", "Moose", "Bear"],
    answer: 0
},
{
    question: "What is Canada's national sport?",
    choices: ["Lacrosse", "Hockey", "Curling"],
    answer: 0
}];

$(document).ready(function(){

// set timed hide and show functions
function showQuestion() {
    $("#question").show();
};

function showChoices() {
    $("#choices").show();
};

function hideQuestion() {
    $("#question").hide();
};

function hideChoices() {
    $("#choices").hide();
};

// set hidden divs upon launch of game
    $("#correct").hide();
    $("#wrong").hide();
    $("#timesUp").hide();
    $("#incorrect").hide();
    $("#next").hide();
    $("#restart").hide();
    $("#correct-answer").hide();
    $("#incorrect-answer").hide();
    $("#unanswered").hide();
    $("#image1").hide();
    $("#image2").hide();
    $("#image3").hide();

// run the quiz by choosing a random question and displaying choices
function runQuiz() {
    $("#correct").hide();
    $("#wrong").hide();
    $("#timesUp").hide();
    $("#incorrect").hide();
    $("#next").hide();
    $("#restart").hide();
    $("#correct-answer").hide();
    $("#incorrect-answer").hide();
    $("#unanswered").hide();
    $("#image1").hide();
    $("#image2").hide();
    $("#image3").hide();

    startTime();
    showQuestion();
    showChoices();
    var random = Math.floor(Math.random()*3);
    randomQuestion = triviaQuestions[random];
    $("#question").text(randomQuestion.question);
    for(var i=0 ; i < randomQuestion.choices.length; i++) {
        dog = $("<li>");
        dog.text(randomQuestion.choices[i]);
        dog.addClass("list-group-item list-group-item-action flower");
        dog.attr("data-number", i);
        $("#choices").append(dog);
    };
    
// set the timer for 30 seconds
var questionTimeout = setInterval(startTime, 1000);
    
// set if/else for checking the answer
    $(".flower").on("click", function (){
        var ans = randomQuestion.answer;

        if(randomQuestion.answer === parseInt($(this).attr("data-number"))) {
            $("#startButton").hide();
            hideChoices();
            hideQuestion();
            clearInterval(questionTimeout);
            usedQuestions.push(this);
            $("#correct").show();
            $("#image1").show();
            $("#image1").append("<img src='assets/images/correct.gif' />");
            $("#next").show();
            correct++;   
            i++;
        }

        else {
            $("#startButton").hide();
            hideChoices();
            hideQuestion();
            clearInterval(questionTimeout);
            usedQuestions.push(this);
            $("#wrong").show();
            $("#correct-answer").text("The right answer is: " + randomQuestion.choices[ans]);
            $("#correct-answer").show();
            $("#image2").show();
            $("#image2").append("<img src='assets/images/incorrect.gif' />");
            $("#next").show();
            incorrect++;
            i++;
        }
    });
};


// start timer
function startTime() {
    // timer = 30;
    clockRunning = true;
    timer--;
    $("#timer").html("Your remaining time is: " + timer);
    // when time's up switch to next page
    if(timer === 0) {
        clearInterval(questionTimeout);
        clockRunning = false;
        $("#startButton").hide();
        hideChoices();
        hideQuestion();
        usedQuestions.push(this);
        $("#timesUp").show();
        $("#correct-answer").append(randomQuestion.answer);
        $("#image3").show();
        $("#image3").append("<img src='assets/images/timesup.gif' />");
        $("#next").show();
        unanswered++;
        i++;
    }
};

$("#next").on("click", function(){
    clearInterval(questionTimeout);
    clockRunning = false;
    $("#result").hide();
    $("#correct-answer").hide();
    $("#incorrect-answer").hide();
    $("#question").empty();
    $("#choices").empty();
    $("#image1").empty();
    $("#image2").empty();
    $("#image3").empty();
    timer = 30;
    runQuiz();
});

// end the game and display total results
function endGame(){
    if(usedQuestions === 4) {
        $("#timer").hide();
        hideChoices();
        hideQuestion();
        $("#correct").text("Correct: " + correct);
        $("#incorrect").text("Incorrect: " + incorrect);
        $("#unaswered").text("Unanswered: " + unanswered);
        $("#restart").on("click", function(){
            reset();
            runQuiz();
        });
    }
};

// reset function
function reset() {
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    timer= 30;
    clearInterval(questionTimeout);
    clockRunning = false;
    $("#restart").show();
    location.reload();
};

// Start quiz
function startQuiz() {
    $("#startButton").on("click", function(){
        runQuiz();
    });
};

startQuiz();
endGame();

});
