const results = {
  Joker: 1,
  Kinesthetic: 2,
  Explorer: 3,
  Competitor: 4,
  Director: 5,
  Creator: 6,
  Storyteller: 7,
  Collector: 8,
};

const questions = [
  {
    question: "1. You have $50 that you HAVE to spend on one of the following items, what do you get?",
    image: "images/Question1.gif",
    answers: {
      F: {
        text: "A ridiculous hat.",
        scores: [results.Joker, results.Collector],
      },
      T: {
        text: "A pair of binoculars.",
        scores: [results.Kinesthetic, results.Explorer, results.Competitor],
      },
      S: {
        text: "A ticket to a writing workshop.",
        scores: [results.Director, results.Storyteller, results.Creator],
      },
    },
  },
  {
    question: "2. Your new podcast is most likely to be called...",
    image: "images/Question2.gif",
    answers: {
      J: {
        text: "It Started with One: My Quest to Complete my Collection",
        scores: [results.Explorer, results.Collector],
      },
      P: {
        text: "The Neighborhood: Fascinating Backstories I have Made up for People I don't Know",
        scores: [results.Joker, results.Director, results.Storyteller, results.Creator],
      },
      S: {
        text: "How to Do Stuff: Weekly Instructions for Doing... Stuff",
        scores: [results.Kinesthetic, results.Competitor],
      },
    },
  },
  {
    question: "3. Surprise! Your home suddenly has a new, spacious bedroom. You immediately set to work converting it into...",
    image: "images/Question3.gif",
    answers: {
      S: {
        text: "A dance studio",
        scores: [results.Kinesthetic, results.Explorer, results.Storyteller, results.Creator],
      },
      N: {
        text: "A decked out space for your gaming PC",
        scores: [results.Joker, results.Competitor],
      },
      T: {
        text: "An art studio",
        scores: [results.Explorer, results.Director, results.Collector, results.Storyteller, results.Creator],
      },
    },
  },
  {
    question: "4. You haven't seen your long-distance best friend in months. You pick them up at the airport and take them straight to...",
    image: "images/Question4.gif",
    answers: {
      F: {
        text: "A place you've never been before, so you can check it out together",
        scores: [results.Joker, results.Kinesthetic, results.Explorer],
      },
      T: {
        text: "Your latest eBay purchase for your collection",
        scores: [results.Competitor, results.Explorer, results.Collector],
      },
      S: {
        text: "Show them a painting you've been working on",
        scores: [results.Peach, results.Director, results.Storyteller, results.Creator],
      },
    },
  },
  {
    question: "5. Your new youtube series features you...",
    image: "images/Question5.gif",
    answers: {
      P: {
        text: "Performing tricks you learned in your circus arts class.",
        scores: [results.Joker, results.Kinesthetic, results.Creator],
      },
      J: {
        text: "Discussing the nuances of a highly specific niche interest.",
        scores: [results.Competitor, results.Director, results.Collector],
      },
      S: {
        text: "Day in the life videos",
        scores: [results.Storyteller, results.Explorer],
      },
    },
  },
  {
    question: "6. You work at an elementary school now, but at least you get to pick your position. You're the...",
    image: "Images/Question6.gif",
    answers: {
      I: {
        text: "Art Teacher",
        scores: [results.Collector, results.Storyteller, results.Creator],
      },
      E: {
        text: "PE Instructor",
        scores: [results.Joker, results.Kinesthetic, results.Competitor],
      },
      T: {
        text: "Principal",
        scores: [results.Explorer, results.Competitor, results.Director],
      },
    },
  },
  {
    question: "7. Everyone at your school/work HAS to join a club, what club do you join?",
    image: "Images/Question7.gif",
    answers: {
      S: {
        text: "Writing club",
        scores: [results.Explorer, results.Director, results.Storyteller, results.Creator],
      },
      N: {
        text: "Improv Group",
        scores: [results.Joker, results.Collector],
      },
      T: {
        text: "Marathon Training Club",
        scores: [results.Kinesthetic, results.Competitor],
      },
    },
  },
  {
    question: "8. You just parked at your favorite city park. What next?",
    image: "Images/Question8.gif",
    answers: {
      J: {
        text: "Find a new hiking trail and give it a try.",
        scores: [results.Kinesthetic, results.Explorer, results.Director],
      },
      P: {
        text: "Find some folks for a pickup game of... something!",
        scores: [results.Kinesthetic, results.Competitor],
      },
      S: {
        text: "Go make up backstories for the squabbling ducks.",
        scores: [results.Joker, results.Collector, results.Storyteller, results.Creator],
      },
    },
  },
];

let currentQuestion = 0;

function displayQuestion() {
  const quizElement = document.getElementById("quiz");
  const question = questions[currentQuestion];
  if (question) {
    let html = `<p>${question.question}</p>`;
    if (question.image) {
      html += `<img src="${question.image}" alt="Question ${currentQuestion + 1}">`;
    }
    for (const option in question.answers) {
      html += `<button class="large-rectangular" value="${option}" id="${option}">${question.answers[option].text}</button>`;
    }
    quizElement.innerHTML = html;
    attachButtonClickHandlers();
  } else {
  }
}

document.getElementById("start-button").addEventListener("click", function () {
  document.getElementById("start-page").style.display = "none";
  document.getElementById("quiz-page").style.display = "block";
  currentQuestion = 0;
  userAnswers = {};
  displayQuestion();
});

function attachButtonClickHandlers() {
  const choiceButtons = document.querySelectorAll(".large-rectangular");
  choiceButtons.forEach((button) => {
    button.addEventListener("click", handleAnswer);
  });
}
function handleAnswer(event) {
  const selectedOption = event.target;
  const answerKey = selectedOption.value;
  const question = questions[currentQuestion];
  const answer = question.answers[answerKey];

  const categories = answer.scores.map((score) => {
    return Object.keys(results).find((key) => results[key] === score);
  });

  const category = Object.keys(results).find((key) => results[key] === answer.scores);

  for (const category of categories) {
    if (!userAnswers[category]) {
      userAnswers[category] = 1;
    } else {
      userAnswers[category] += 1;
    }
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const resultElement = document.getElementById("result");
  const resultTextContainer = document.querySelector(".result-text");
  const resultImage = document.getElementById("result-image");
  const topLetters = {};

  const result = Object.keys(userAnswers).reduce((a, b) => (userAnswers[a] > userAnswers[b] ? a : b));

  resultTextContainer.innerHTML = `
          `;

  resultImage.src = `Images/Play_${result}_Results.png`;
  resultImage.alt = `${result} Image`;

  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("restart-button").style.display = "block";
}

function restartQuiz() {
  currentQuestion = 0;
  userAnswers = {};
  document.getElementById("result").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  displayQuestion();
}

document.getElementById("restart-button").addEventListener("click", restartQuiz);

displayQuestion();
