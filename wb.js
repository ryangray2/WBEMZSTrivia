let currQuestion = 0;
var pressed = 0;
var currScore = 0;
var pastScore = -1;
var already = "no";

function load() {
  if (localStorage.getItem("scoreKey") != null) {
    pastScore = Number(localStorage.getItem("scoreKey"));
  }
  if (localStorage.getItem("alreadyKey") != null) {
    already = localStorage.getItem("alreadyKey");
  }
  if (pastScore > -1 && pastScore < 10) {
    document.getElementById("conDiv").style.display = "block";
    document.getElementById("conscious").innerHTML = "Hello, this is your conscience. We both know you already got a score of " + pastScore + ". Of course you could restart, get a perfect score, take a screenshot and show everybody how smart you are. But should you?";
  } else if (pastScore == 10) {
    document.getElementById("conDiv").style.display = "block";
    document.getElementById("conscious").innerHTML = "You already got a perfect score, why are you still here?";
  }
}
function clickStart() {
  document.getElementById("startPage").style.display = "none";
  document.getElementById("questions").style.display = "block";

  getQuestion();
}



function getQuestion() {
  pressed = 0;
  document.getElementById("nextRow").style.display = "none"
  document.getElementById("questionText").innerHTML = questions[currQuestion].text;
  if (questions[currQuestion].image != "null") {
    document.getElementById("image").style.display = "block";
    document.getElementById("actualImage").src = questions[currQuestion].image;
  } else {
    document.getElementById("image").style.display = "none";
  }
  document.getElementById("one").addEventListener('click', function() {
         choicePressed("one");
     });
  document.getElementById("two").addEventListener('click', function() {
          choicePressed("two");
      });
  document.getElementById("three").addEventListener('click', function() {
          choicePressed("three");
      });
  document.getElementById("four").addEventListener('click', function() {
          choicePressed("four");
      });
  document.getElementById("one").innerHTML = questions[currQuestion].choices[0];
  document.getElementById("two").innerHTML = questions[currQuestion].choices[1];
  document.getElementById("three").innerHTML = questions[currQuestion].choices[2];
  document.getElementById("four").innerHTML = questions[currQuestion].choices[3];
}

function choicePressed(num) {
  pressed += 1;
  if (pressed > 1) {
    return;
  } else {


    document.getElementById("one").removeEventListener('click', function() {
           choicePressed("one");
       });
    document.getElementById("two").removeEventListener('click', function() {
            choicePressed("two");
        });
    document.getElementById("three").removeEventListener('click', function() {
            choicePressed("three");
        });
    document.getElementById("four").removeEventListener('click', function() {
            choicePressed("four");
        });
    document.getElementById("nextRow").style.display = "block";
    if (num === questions[currQuestion].answer) {
      document.getElementById(num).classList.add("is-success");
      document.getElementById("star" + (currQuestion + 1)).classList.remove("is-empty");
      currScore += 1;
    } else {
      document.getElementById(num).classList.add("is-error");
      document.getElementById(questions[currQuestion].answer).classList.add("is-success");
      document.getElementById("star" + (currQuestion + 1)).classList.add("is-transparent");
    }
  }
}

function nextPressed() {
  document.getElementById("one").classList.remove("is-error");
  document.getElementById("two").classList.remove("is-error");
  document.getElementById("three").classList.remove("is-error");
  document.getElementById("four").classList.remove("is-error");
  document.getElementById(questions[currQuestion].answer).classList.remove("is-success");
  currQuestion += 1;
  if (currQuestion >= 10) {
    done();


  } else {
    getQuestion()
  }
}


function done() {
  document.getElementById("nonStars").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("score").innerHTML = currScore;
  if (already === "yes" && currScore == 10 && pastScore < 10) {
    document.getElementById("score").innerHTML = currScore + "*";
    document.getElementById("ryan").innerHTML = "(Hello, this is Ryan. You're goddamn right I put an asterisk on your score. It seems your conscience couldn't sway you. Do you want to know why I took the extra 10 minutes to code this? Because I never trusted you. I never will. Be better.)";
  } else if (already === "yes" && currScore < 10) {
    document.getElementById("ryan").innerHTML = "Ummm this is not your first try. How did you still not get a 10?";
  } else if (currScore == 10) {
    document.getElementById("ryan").innerHTML = "You're perfect! Here, take this trophy <i class='nes-icon trophy is-large'></i>"
  } else if (currScore >= 8) {
    document.getElementById("ryan").innerHTML = "Wow, you're pretty good."
  } else if (currScore >= 6) {
    document.getElementById("ryan").innerHTML = "Solid. Not spectacular, but solid."
  } else if (currScore >= 5) {
    document.getElementById("ryan").innerHTML = "I had higher expectations for you."
  } else if (currScore <= 4) {
    document.getElementById("ryan").innerHTML = "Yikes."
  }
  localStorage.setItem("scoreKey", currScore);
  already = "yes";
  localStorage.setItem("alreadyKey", already);
}
