const card = document.getElementById("card");
const questionText = document.getElementById("question-text");
const answerText = document.getElementById("answer-text");
const newQuestionBtn = document.getElementById("new-question");

let questions = [];

async function loadQuestions() {
  try {
    const response = await fetch("animal.json");
    if (!response.ok) throw new Error("Failed to load questions JSON");
    questions = await response.json();
    getRandomQuestion();
  } catch (error) {
    questionText.textContent = "Failed to load questions.";
    answerText.textContent = "";
    console.error(error);
  }
}

function updateQuestionAndAnswer() {
  if (questions.length === 0) {
    questionText.textContent = "No questions available.";
    answerText.textContent = "";
    return;
  }
  const random = questions[Math.floor(Math.random() * questions.length)];
  questionText.textContent = random.question;
  answerText.textContent = random.answer;
}

function getRandomQuestion() {
  if (card.classList.contains("flipped")) {
    card.classList.remove("flipped");
    setTimeout(() => {
      updateQuestionAndAnswer();
    }, 800);
  } else {
    updateQuestionAndAnswer();
  }
}

card.addEventListener("click", () => {
  card.classList.toggle("flipped");
});

newQuestionBtn.addEventListener("click", getRandomQuestion);

window.addEventListener("DOMContentLoaded", loadQuestions);