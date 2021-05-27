var quizMeta = quizData[0];
var quizProper = quizData.slice(1);
totalQuestion = quizProper.length;
var currentQuestion = 0;
var possible = count();
var underSelected = 0;
var overSelected = 0;
var runningPossible = runningCount();
var truePositives = 0;
var falsePositives = 0;
var falseNegatives = 0;
var trueNegatives = 0;
var quizStatusMessage = "Default";
var questionStatusMessage = "Default";
var performanceStatusMessage = "Default";

// Set the quiz topic
document.onload = function () {
    let topicElement = document.getElementById("quizTopic");
    topicElement.innerHTML = "Topic: " + quizMeta.topic;
}

function startQuiz(){

    
    if(totalQuestion==0){
        alert("No questions in the quiz")
        return
    }
    

    let status = document.getElementById("quizMessages")

    quizStatusMessage = "On question " 
    + String(currentQuestion+1) + " of " 
    + String(totalQuestion);

    status.innerHTML = quizStatusMessage

    showCurrentQuestion();
    let startButton = document.getElementById("startQuiz");
    startButton.style.display = "none"

    let checkButton = document.getElementById("checkQuestion");
    checkButton.style.display = "block"
   
}

function runningCount(){
    runningTotals = [];
    let total = 0;
    for( question of quizProper){  
        let answers = question.slice(1);    // skip question text
        for(answer of answers){
            let answerIsCorrect = answer[1];
            if(answerIsCorrect) total++;
        }
        runningTotals.push(total)
    }
    return runningTotals;
}

function count(){
    counts = [];
    for( question of quizProper){  
        let total = 0;
        let answers = question.slice(1);    // skip question text
        for(answer of answers){
            let answerIsCorrect = answer[1];
            if(answerIsCorrect) total++;
        }
        counts.push(total)
    }
    return counts;
}

function showCurrentQuestion(){
    
    quizStatusMessage = "On question " 
    + String(currentQuestion+1) + " of " 
    + String(totalQuestion);

    let question = quizProper[currentQuestion]
    let questionBody = question[0];
    let questionBodyElement = document.getElementById("questionBody");
    questionBodyElement.innerHTML = questionBody

    let answersHolder = document.getElementById("answersHolder");
    while(answersHolder.firstChild){
        // Remove existing children first
        answersHolder.removeChild(answersHolder.firstChild)
    }

    // Add in all the answers as children
    // Answers are everything after the question text in the array
    let answers = question.slice(1)
    let addCount = 0;
    let correctSelections = 0;
    for (answer of answers){
        let answerText = answer[0];
        let answerIsCorrect = answer[1];
        if(answerIsCorrect){
            correctSelections++;
        }
        let newChild = document.createElement("div");
        //newChild.innerHTML = "Child " + String(addCount);
        newChild.innerHTML = answerText;
        newChild.style.class = "response";
        newChild.style.cursor="pointer";
        newChild.onclick = e => {answerStatusToggle(e.target)};

        // Set up hover to change the background color of the element
        newChild.onmouseenter = e => {
            e.target.originalcolor = e.target.style.background;
            e.target.style.background = gainsboro;  // Its a light gray
        }
        newChild.onmouseleave = e => {
            e.target.style.background = e.target.originalcolor;
        }

        // We are going to remember the status of the selection in the elements
        newChild.isSelected = false;
        newChild.answerIsCorrect = answerIsCorrect;
       
        answersHolder.appendChild(newChild);
        addCount++;
    }
    // Update the number of answers to choose.
    let status = document.getElementById("quizMessages")
    questionStatusMessage = "Click on " + String(correctSelections) +
            ((correctSelections == 1) ? " answer" : " answers");
    status.innerHTML = quizStatusMessage + "; " + questionStatusMessage;
} 

function answerStatusToggle(elementClicked){
    if(elementClicked.isSelected){
        elementClicked.isSelected = false;
        elementClicked.style.textShadow = "0px 0px 0px #ff0000";
    } else {
        elementClicked.isSelected = true;
        elementClicked.style.textShadow = "3px 3px 4px gold";
        
    }
}

function checkQuestion(){
    let answersHolder = document.getElementById("answersHolder");
    let expectedResponses = possible[currentQuestion];
    let actualResponses = 0;
    for(child of answersHolder.children){
        if(child.answerIsCorrect && child.isSelected){
            truePositives += 1;
            actualResponses += 1;
            child.innerHTML += " (You are correct)"
            child.style.textShadow = "3px 3px 4px green"
        } else if (child.answerIsCorrect && !child.isSelected) {
            falseNegatives += 1;
            child.innerHTML += " (This is a correct answer)"
            child.style.textShadow = "0px 0px 0px black"
        } else if (!child.answerIsCorrect && child.isSelected) {
            actualResponses += 1;
            falsePositives += 1;
            child.innerHTML += " (Oops)"
            child.style.textShadow = "3px 3px 4px red"
        } else {
            trueNegatives += 1
        }

        // Make the answer elements unresponsive while displaying
        // the results for a question
        for(child of answersHolder.children){
            child.onclick = null;
            child.onmouseenter = null;
            child.onmouseleave = null;
        }
    }

    // Determine over/under selections
    if(actualResponses>expectedResponses){
        overSelected += (actualResponses - expectedResponses)
    } else if (actualResponses<expectedResponses){
        underSelected += (expectedResponses - actualResponses)
     }
    
    performanceStatusMessage = "Identified " + String(truePositives) +
            " correct so far of " + String(runningPossible[currentQuestion]);
    let status = document.getElementById("quizMessages")

    status.innerHTML = quizStatusMessage + "; " + performanceStatusMessage;
    


    let checkButton = document.getElementById("checkQuestion");
    checkButton.style.display = "none"

    let nextButton = document.getElementById("nextQuestion");
    nextButton.style.display = "block"

    if(currentQuestion+1 == totalQuestion){
        nextButton.innerHTML = "Get Quiz Stats";
    }
}

function nextQuestion(){
    currentQuestion++;
    if(currentQuestion<totalQuestion ){
        showCurrentQuestion();
        let nextButton = document.getElementById("nextQuestion");
        nextButton.style.display = "none"

        let checkButton = document.getElementById("checkQuestion");
        checkButton.style.display = "block"

    } else {
        quizStatusMessage = "Quiz is Done"
        let status = document.getElementById("quizMessages")
        performanceStatusMessage = metrics()
        status.innerHTML = quizStatusMessage + "; " + performanceStatusMessage
    
        // We are at the end
        let nextButton = document.getElementById("nextQuestion");
        nextButton.style.display = "none"

        // Hide the last question and dispose of the options

        let answersHolder = document.getElementById("answersHolder");
        while(answersHolder.firstChild){
        // Remove existing children first
        answersHolder.removeChild(answersHolder.firstChild)
        }

        let questionBodyElement = document.getElementById("questionBody");
        questionBodyElement.style.display = "none"
    
    }   
}

function toPercent(value){
    value = Math.round(value*10000)/100
    return value;
}

function metrics(){
    let accuracy = (truePositives+trueNegatives) /(truePositives + trueNegatives+falseNegatives+falsePositives);
    accuracy = toPercent(accuracy);

    let precision = (truePositives) /(truePositives +falsePositives);
    // if never select any then the denominator is zero
    if((truePositives +falsePositives)==0) precision = 0;
    precision = toPercent(precision)

    let sensitivity = (truePositives) /(truePositives +falseNegatives);
    // This would only happen if there are no correct answers in the quiz
    if((truePositives +falsePositives)==0) sensitivity = 0;
    sensitivity = toPercent(sensitivity);

    let overUnder = 
         "<br> Identified " + String(truePositives) +
            " correct of a possible " + String(runningPossible[runningPossible.length-1]) +
            "<br> skipped " + underSelected + " response selections " +
            "<br> made " + overSelected + " extra response selections";

    let pointMetrics = 
            "<br> Final quiz metrics based on confusion matrix:" +
            "<br>" + truePositives + " " + falsePositives + "<br> "+ falseNegatives + " "+ trueNegatives +
            "<br>" + "Accuracy is " + accuracy + "%"+
            "<br>" + "Precision is " + precision + "%"+
            "<br>" + "Sensitivity is " + sensitivity + "%";
    let result = overUnder;
    if(quizMeta.showPointMetrics){
        result += pointMetrics
    }

    return result;
}