let q1 = [
    "This is a question (Multiple choice)", 
    ["answer 1 is false", false],
    ["answer 2 is also false", false], 
    ["answer 3 is true", true] 
]

let q2 = [
    "This is my second question (True/False)", 
    ["True (pick this one)", true],
    ["False (don't pick this one)", false], 
]

let q3 = [
    "This is a question (Multiple answer)", 
    ["answer 1 is true", true],
    ["answer 2 is false", false], 
    ["answer 3 is true", true] 
]

let meta = {topic:"A Demo Quiz", showPointMetrics:true};


var quizData = [meta, q1, q2, q3];
