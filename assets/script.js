

// Questions that will be asked
const Questions = [{
    q: "The 'function' and 'var' are known as:",
    a: [{ text: "Keywords", isCorrect: false },
    { text: "Data types", isCorrect: false },
    { text: "Declaration statements", isCorrect: true },
    { text: "Prototypes", isCorrect: false }
    ]
 
},
{
    q: "Javascript is an _______ language?",
    a: [{ text: "Object-Oriented", isCorrect: true,},
    { text: "Object-Based", isCorrect: false },
    { text: "Procedural", isCorrect: false },
    { text: "None of the above", isCorrect: false }
    ]
 
},
{
    q: "Which of the following methods is used to access HTML elements using Javascript?",
    a: [{ text: "getElementbyId()", isCorrect: false },
    { text: "getElementsByClassName()", isCorrect: false },
    { text: "Both A and B", isCorrect: true },
    { text: "None of the above", isCorrect: false }
    ]
 
},
{
    q: "How can a datatype be declared to be a constant type?",
    a: [{ text: "const", isCorrect: true },
    { text: "var", isCorrect: false },
    { text: "let", isCorrect: false },
    { text: "constant", isCorrect: false }
    ]
 
},
{
    q: "Which of the following attribute is used to specify the character encoding used in an external script file?",
    a: [{ text: "type", isCorrect: false },
    { text: "charset", isCorrect: true },
    { text: "character", isCorrect: false },
    { text: "All of the above", isCorrect: false }
    ]
 
},
{
    q: "Which of the following Which of the following option terminates Java Statement?",
    a: [{ text: "Semicolon", isCorrect: true },
    { text: "Full Stop", isCorrect: false },
    { text: "Comma", isCorrect: false },
    { text: "Slash", isCorrect: false }
    ]
 
}
]

var start = $(".start-btn");
var questionEl = $(".question");
var answersEl = $(".options");
var firstPage = $(".start");
var finalScore = $("#finalScorePage");
var highScore = $("#highScore");
var quiz = $(".quiz");
var answerIsCorrect = $(".answerIsCorrect");
var currQuestion = 0;
var timeEl = $('.time');
var savedScores = $("#savedScores");

var secondsLeft = 76;
var score = 0;


// timer running the whole time. 
var setTime = function() {
    // Sets interval in variable
    setInterval(function() {
        if(secondsLeft <= 0) {
            // Stops execution of action at set interval
            timeEl.text("Time: 0");
            quiz.css("display", "none");
            finalScore.css("display", "block");
            $("#finalScore").text(`Your final score is: 0.`);
            return 0;
          }
        if (secondsLeft === 77){
            var time = "Time: " + score;
            timeEl.text(time);
            return;
        }
      secondsLeft--;
      var time = "Time: " + secondsLeft;
      timeEl.text(time);
  
    }, 1000);
}
var timesRun = 0;

var startQuiz = function(){
    // if(secondsLeft == 0 ){
    //     score = secondsLeft; // sets the score
    //     secondsLeft = 77; // stops the timer
    //     quiz.css("display", "none");
    //     finalScore.css("display", "block");
    //     $("#finalScore").text(`Your final score is: ${score}.`);
    //     return;
    // }
    if(timesRun == 0 ){ // runs the timer only by the first question.
        setTime();
        console.log(secondsLeft);
    }

    firstPage.css("display", "none");
    var questionEl = $(".question");
    var answersEl = $(".options");

    questionEl.text(Questions[currQuestion].q);
    answersEl.empty();
    

    for (var i = 0; i < Questions[currQuestion].a.length; i++){
        var btn = `<li><button class="chosenAnswer" data-isCorrect= "${Questions[currQuestion].a[i].isCorrect}"> ${Questions[currQuestion].a[i].text } </button></li>`;
        answersEl.append(btn);
        
    }
    currQuestion ++;

    var chosen = answersEl.children('li').children('button');
    
    
    
    chosen.on('click', function(){
        
        //console.log($(this).attr("data-isCorrect"));
        var answer = $(this).attr("data-isCorrect");

        //if the $(this).attr("data-isCorrect") is true then set $(".answerIsCorrect") to correct
        
        if(answer === 'true'){
            answerIsCorrect.empty();
            answerIsCorrect.append("Correct");
            answerIsCorrect.css("border-top","solid grey");
        }else{
            secondsLeft = secondsLeft - 10; //subtract 10 seconds from the timer.
            answerIsCorrect.empty();
            answerIsCorrect.append("Wrong");
            answerIsCorrect.css("border-top","solid grey");

        }
        
       
        //after the last question, go to final score page. and return-leave the function.
        if(currQuestion >= Questions.length){
            if(secondsLeft < 0 ){
                score = 0;
            }else{
                score = secondsLeft; // sets the score
            }
            secondsLeft = 77; // stops the timer
            quiz.css("display", "none");
            finalScore.css("display", "block");
            $("#finalScore").text(`Your final score is: ${score}.`);
            return;
        }
        timesRun++;
        startQuiz();
    })
    
   
};


start.on('click', startQuiz);

//put onClick listener for the submitBtn 
//this function saves it to the local storage as an object. 
// to access it iterate through getScore[i].username
// at i get the username and score and put it into a string like MG-22.
// add to a list #savedScores in the highScore element

var displayScores = function(){
    var scoreCard = "";

    var getScore = JSON.parse(localStorage.getItem("highScores"))||[];
    var userName = $("#initials").val();
    console.log(userName);
    getScore.push(
        {
            username: userName,
            scores: score
        }
    )
    localStorage.setItem("highScores", JSON.stringify(getScore));

    for(var i = 0; i< getScore.length; i++){
        if(getScore[i].username  !== ""){
            scoreCard = `${getScore[i].username}-${getScore[i].scores}`;
            savedScores.append(`<li class="scoreList" >${scoreCard}</li>`);
        }
        
    }
 
    $("#back").on("click", function(){
        location.reload();
    });

    //clears the highScores list.
    $("#clear").on("click", function(){
        localStorage.clear();
        savedScores.empty();
    });
}
var saveToStorage = function(event){ 
    finalScore.css("display", "none");
    highScore.css("display", "block");
    event.preventDefault();
    displayScores();
    
}

$("#submitBtn").on("click", saveToStorage);

$(".link").on("click", function(){
    firstPage.css("display", "none");
    quiz.css("display", "none");
    finalScore.css("display", "none");
    highScore.css("display", "block");

    displayScores();
});


