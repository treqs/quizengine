let questionNumber = quizData.length
let currentQuestion = 0;

function startQuiz(){
    alert("Start Quiz")
    let question = quizData[currentQuestion]
    let questionBody = question[0];
    let questionBodyElement = document.getElementById("quesitonBody");
    questionBodyElement.innerHTML = questionBody
}

function showQuestion(i){
    alert("Button pressed");
    let target = document.getElementById("target");
    target.innerhtml = "new things";
}