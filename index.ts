// Import stylesheets
import './style.css';

const minutesEl: HTMLElement = document.querySelector('#minutes');
const secondsEl: HTMLElement = document.querySelector('#seconds');
const millisecondsEl: HTMLElement = document.querySelector('#milliseconds');
const startBtn: HTMLElement = document.querySelector('#startBtn');
const pauseBtn: HTMLElement = document.querySelector('#pauseBtn');
const resumeBtn: HTMLElement = document.querySelector('#resumeBtn');
const resetBtn: HTMLElement = document.querySelector('#resetBtn');
const addMinBtn: HTMLElement = document.querySelector('#addMinBtn');
const remMinBtn: HTMLElement = document.querySelector('#remMinBtn');

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let isPaused = false;
let interval: number;

startBtn.addEventListener('click', toggleButton);
pauseBtn.addEventListener('click', toggleButton);
resumeBtn.addEventListener('click', toggleButton);
resetBtn.addEventListener('click', toggleButton);
addMinBtn.addEventListener('click', toggleButton);
remMinBtn.addEventListener('click', toggleButton);

function toggleButton(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  switch (target.id) {
    case 'startBtn':
      start();
      break;
    case 'pauseBtn':
      pause();
      break;
    case 'resumeBtn':
      resume();
      break;
    case 'resetBtn':
      reset();
      break;
    case 'addMinBtn':
      minutes++;
      break;
    case 'remMinBtn':
      minutes--;
      break;
  }
}

function start() {
  interval = setInterval(() => {
    if (!isPaused) {
      milliseconds += 10;

      if (milliseconds == 1000) {
        seconds++;
        milliseconds = 0;
      }

      if (seconds == 60) {
        minutes++;
        seconds = 0;
      }
      if (minutes == 60) {
        minutes = 0;
        seconds = 0;
      } else if (minutes == -1) {
        minutes = 0;
      }

      minutesEl.textContent = formatTime(minutes);
      secondsEl.textContent = formatTime(seconds);
      millisecondsEl.textContent = formatMilliseconds(milliseconds);
    }
  }, 10);

  startBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
  addMinBtn.style.display = 'block';
  remMinBtn.style.display = 'block';
}

function formatTime(time: number): string {
  return time < 10 ? `0${time}` : `${time}`;
}

function formatMilliseconds(time: number): string {
  return time < 100 ? `${time}`.padStart(3, '0') : `${time}`;
}

function pause() {
  isPaused = true;
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'block';
}

function resume() {
  isPaused = false;
  pauseBtn.style.display = 'block';
  resumeBtn.style.display = 'none';
}

function reset() {
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  minutesEl.textContent = '00';
  secondsEl.textContent = '00';
  millisecondsEl.textContent = '000';

  startBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
  resumeBtn.style.display = 'none';
  addMinBtn.style.display = 'none';
  remMinBtn.style.display = 'block';
}
