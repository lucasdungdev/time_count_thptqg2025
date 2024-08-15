const countdownSection = document.getElementById('countdown-section');
const pomodoroSection = document.getElementById('pomodoro-section');
const modeSwitch = document.getElementById('mode-switch');

const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');

const pomodoroTime = document.getElementById('pomodoro-time');
const startPomodoro = document.getElementById('start-pomodoro');
const pausePomodoro = document.getElementById('pause-pomodoro');
const resetPomodoro = document.getElementById('reset-pomodoro');

let countdownInterval;
let pomodoroInterval;
let pomodoroSeconds = 25 * 60;

function updateCountdown() {
    const targetDate = new Date('June 25, 2025 07:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    const d = Math.floor(difference / (1000 * 60 * 60 * 24));
    const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((difference % (1000 * 60)) / 1000);

    days.innerHTML = d < 10 ? '0' + d : d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;
}

function updatePomodoro() {
    const mins = Math.floor(pomodoroSeconds / 60);
    const secs = pomodoroSeconds % 60;
    pomodoroTime.innerHTML = `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
    
    if (pomodoroSeconds === 0) {
        clearInterval(pomodoroInterval);
        alert('Pomodoro session finished!');
    } else {
        pomodoroSeconds--;
    }
}

modeSwitch.addEventListener('click', () => {
    countdownSection.classList.toggle('hidden');
    pomodoroSection.classList.toggle('hidden');
    
    if (countdownSection.classList.contains('hidden')) {
        clearInterval(countdownInterval);
    } else {
        countdownInterval = setInterval(updateCountdown, 1000);
    }
});

startPomodoro.addEventListener('click', () => {
    clearInterval(pomodoroInterval);
    pomodoroInterval = setInterval(updatePomodoro, 1000);
});

pausePomodoro.addEventListener('click', () => {
    clearInterval(pomodoroInterval);
});

resetPomodoro.addEventListener('click', () => {
    clearInterval(pomodoroInterval);
    pomodoroSeconds = 25 * 60;
    updatePomodoro();
});

// Start the countdown immediately
countdownInterval = setInterval(updateCountdown, 1000);