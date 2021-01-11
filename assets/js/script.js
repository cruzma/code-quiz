var titleChange = document.querySelector("#page-title");
var p = document.querySelector("#changeTag");
var startButton = document.querySelector("#btnStart");
var pageContentEl = document.querySelector("#page-content");
var topScore = [];
var playerCounter = 0;
var count = 0;
var sec = 20;
var timer = 0;
var player = {
    Name: "",
    Score: 0
}
var questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: '4', correct: true},
            { text: '22', correct: false},
            { text: '10', correct: false},
            { text: '2', correct: false}
        ]

        
    },

    {
        question: "what is 1 + 1?",
        answers: [
            { text: '4', correct: false},
            { text: '11', correct: false},
            { text: '3', correct: false},
            { text: '2', correct: true}
        ]
    },
    
    {
        question: "What 4 * 5?",
        answers: [
            { text: '11', correct: false},
            { text: '25', correct: false},
            { text: '20', correct: true},
            { text: '9', correct: false}
        ]
    }
];
// localStorage.setItem("topScore", "5");


var timerStart = function(){
    
    var timeDisplay = document.querySelector("#changeTag");
    timeDisplay.innerHTML = "Time Left: " + sec;

    timer = setInterval(function(){
        sec--;
        timeDisplay.innerText = "Time Left: " + sec;
        if(sec < 0){
            clearInterval(timer);
            timeDisplay.innerText = "Times Up!";
            
            showResults();
        }
    }, 1000)

}
var questionsAndAnswers = function(){
    startButton.remove();
    var answerGroup = document.createElement("div");
    answerGroup.className = "btn-group";
    pageContentEl.appendChild(answerGroup);
    
    
   if(count === questions.length){
        var timeDisplay = document.querySelector("#changeTag");
        p.remove();
        clearInterval(timer);
        showResults();
        
       
   }
    else{

        for(var i = 0; i < questions[count].answers.length; i++){

            titleChange.textContent = questions[count].question;
            

            var button = document.createElement("button");
            button.innerText = questions[count].answers[i].text;
            button.className =  "btn";
            button.id = "button" + (i+1);

            if(questions[count].answers[i].correct === true){
                button.addEventListener("click", function(){
                    document.querySelector("div").remove();
                    count++;
                    player.Score = player.Score + 10;
                    console.log(player.Score);
                    
                    questionsAndAnswers();
                });
            } else if(questions[count].answers[i].correct === false){
                button.addEventListener("click", function(){
                    document.querySelector("div").remove();
                    count++;
                    sec = sec - 10;
                    questionsAndAnswers();
                });
            }
            
            answerGroup.appendChild(button);

        }
    }
    
};

var showResults = function(){
    titleChange.textContent = "Player result below";

    document.querySelector("div").remove();

    var result = document.createElement("div");
    result.className = "resultBox";
    pageContentEl.appendChild(result);

    var displayScore = document.createElement("h1");
    displayScore.textContent = player.Score;
    result.appendChild(displayScore);
    
    var formField = document.createElement("form");
    formField.className = "formBox";
    formField.innerHTML = "<label for='textIntials'>Enter Intials:</label>"
    result.appendChild(formField);

    var textField = document.createElement("input");
    textField.id = "textInitials";
    formField.appendChild(textField);
    
    var submitButton = document.createElement("button");
    submitButton.id = "submit-btn";
    submitButton.className = "btn";
    submitButton.textContent = "Submit";
    formField.appendChild(submitButton);
    
    document.querySelector("#submit-btn").addEventListener("click", function(event){
        event.preventDefault();
        player.Name  = document.querySelector("#textInitials").value;
        if(player.Name === ""){
            alert("Must enter initials to save score");
        }else{
            
            topScore = JSON.parse(localStorage.getItem("topScore")) || [];
            
            topScore.push(player);
            
            localStorage.setItem("topScore", JSON.stringify(topScore));
            

            tryAgain();
        }
          


    });
    

}
var tryAgain = function(){
    titleChange.textContent = "Would you like to try again?";
    if(document.querySelector("#changeTag")){
      document.querySelector("#changeTag").remove();
    }
    document.querySelector("div").remove();

    var tryAgainBox = document.createElement("div");
    tryAgainBox.className = "tryAgain";
    pageContentEl.appendChild(tryAgainBox);
    
    var tryAgainResult = document.createElement("p");
    tryAgainResult.textContent = "Your Final Score: " + player.Name + " - " + player.Score;
    tryAgainBox.appendChild(tryAgainResult);
    
    var scoreResult = topScore.map(({Score}) => Score);
    var displayTopScore = document.createElement("p");
    displayTopScore.textContent = "Top Score: " + Math.max(...scoreResult);
    tryAgainBox.appendChild(displayTopScore);
    
    var tryAgainButton = document.createElement("button");
    tryAgainButton.id = "submit-btn";
    tryAgainButton.className = "btn"
    tryAgainButton.textContent = "Yes";
    tryAgainBox.appendChild(tryAgainButton);
    

    tryAgainButton.addEventListener("click", function(){
      window.location.reload();
    });

}

document.querySelector("#btnStart").addEventListener("click", timerStart);

document.querySelector("#btnStart").addEventListener("click", questionsAndAnswers);
