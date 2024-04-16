const wordEl = document.getElementById("word");
const textInput = document.getElementById("text-input");
const timeEl = document.getElementById("timeLeft");
const scoreEl = document.getElementById("score");
const gameOverEl = document.getElementById("game-over-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelector = document.getElementById("difficulty");


const words = ["apple", "story", "airplane", "elephant", "ball", "bad", "bed", "dependent", "superficial", "grandmother", "fragment", "intensive", "wardrobe"];

let correctWord;
let score = 0;
let timeLeft = 10;
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem('difficulty') : 'medium';

difficultySelector.value = difficulty;


const timeInterval = setInterval(() => {
  timeLeft--;
  timeEl.textContent = timeLeft;

  if(timeLeft === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}, 1000);

const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
}

const displayNewWord = () => {
  correctWord = getRandomWord();
  wordEl.textContent = correctWord;
  textInput.focus();
}

textInput.addEventListener("input", e => {
  const typedText = e.target.value;

  if(typedText.toLowerCase() === correctWord.toLowerCase()) {
    displayNewWord();

    //clear input
    e.target.value = "";

    //add time
    if(difficulty === "hard") timeLeft += 2;
    else if (difficulty === "medium") timeLeft += 3;
    else timeLeft += 5;

    //update score
    score++;
    scoreEl.textContent = score;
  }
})


//settings
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle('show');
})

settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
})

function gameOver () {
  gameOverEl.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Start again</button>
  `
  gameOverEl.style.display = "flex";
}

displayNewWord();