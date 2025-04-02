// Set the target date (20 days from now)
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 20);

// Function to get the remaining time
function getRemainingTime() {
    const now = new Date().getTime();
    return targetDate - now;
}

// Function to format the time
function formatTime(value) {
    return String(value).padStart(2, '0');
}

// Function to calculate days, hours, minutes, and seconds
function calculateTimeUnits(timeRemaining) {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
}

// Function to update the display
function updateDisplay({ days, hours, minutes, seconds }) {
    const dayElement = document.getElementById("day");
    const hourElement = document.getElementById("hour");
    const minuteElement = document.getElementById("minute");
    const secondElement = document.getElementById("second");

    if (dayElement) dayElement.innerText = formatTime(days);
    if (hourElement) hourElement.innerText = formatTime(hours);
    if (minuteElement) minuteElement.innerText = formatTime(minutes);
    if (secondElement) secondElement.innerText = formatTime(seconds);
}

// Function to handle when the countdown finishes
function handleCountdownEnd() {
    const dealsTitle = document.querySelector(".deals-title h1");
    const countdownWrap = document.querySelector(".countdown-wrap");

    if (dealsTitle) {
        dealsTitle.innerText = "The Offer Has Ended!";
    }
    if (countdownWrap) {
        countdownWrap.style.display = "none";
    }
}

// Function to update the timer every second
function updateTimer() {
    const timeRemaining = getRemainingTime();

    if (timeRemaining < 0) {
        clearInterval(timerInterval);
        handleCountdownEnd();
        return;
    }

    const { days, hours, minutes, seconds } = calculateTimeUnits(timeRemaining);
    updateDisplay({ days, hours, minutes, seconds });
}

// Initial call to set the timer immediately
updateTimer();

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);
