let timer;
let minutes = 0; 
let seconds = 0; 
let isTimerSet = false;
let initialDuration = 25; 


const timerSound = document.getElementById('timerSound');
const timerContainer = document.querySelector('.timer-container');


document.addEventListener('DOMContentLoaded', () => {
  updateTimerDisplay(); 
});

function startTimer() {
  if (!timer) {
    if (isTimerSet) {
      updateTimerDisplay();
      timerContainer.classList.add('playing'); 
      timer = setInterval(updateTimer, 1000);
      document.getElementById('startButton').disabled = true;
    }
  }
}

function pauseTimer() {
  if (timer) {
    clearInterval(timer);
    timer = null;
    document.getElementById('startButton').disabled = false;
    timerContainer.classList.remove('playing');
  }
}

function resetTimer() {
  pauseTimer();
  minutes = isTimerSet ? initialDuration : 0;
  seconds = 0;
  isTimerSet = false;
  updateTimerDisplay();
  timerContainer.classList.remove('playing'); 
}

function changeTimer(newMinutes) {
  minutes = newMinutes;
  seconds = 0;
  isTimerSet = true;
  initialDuration = newMinutes; 
  updateTimerDisplay();
  document.querySelector('.timer-container').classList.remove('hidden'); 
}

function updateTimer() {
  if (minutes === 0 && seconds === 0) {
    clearInterval(timer);
    timer = null;
    document.getElementById('startButton').disabled = false;
    timerSound.play(); 
    resetTimer(); 
  } else {
    if (seconds === 0) {
      seconds = 59;
      minutes--;
    } else {
      seconds--;
    }
    updateTimerDisplay();
  }
}

function updateTimerDisplay() {
  document.getElementById('minutes').textContent = minutes < 10 ? '0' + minutes : minutes;
  document.getElementById('seconds').textContent = seconds < 10 ? '0' + seconds : seconds;
}
