const countTimer = () => {
    const timerHours = document.querySelector('#timer-hours'),
        timerMinutes = document.querySelector('#timer-minutes'),
        timerSeconds = document.querySelector('#timer-seconds');

    const arrMonth = (i) => {
        const arr = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sen', 'oct', 'nov', 'dec'];
        return arr[i];
    };
    const date = new Date(),
        deadline = `${date.getDate() + 1} ${arrMonth(date.getMonth())} ${date.getFullYear()}`;

    const getTimeRemaining = () => {
        let DateStop = new Date(deadline).getTime(),
            DateNow = new Date().getTime(),
            timeRemaining = (DateStop - DateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);

        while (hours >= 24) {
            hours = Math.floor(hours % 24);
        }
        return { timeRemaining, hours, minutes, seconds };
    }

    const conversionDate = (elem) => {
        if (elem < 10) {
            return '0' + elem;
        } else {
            return elem;
        }
    }

    const updateClock = () => {
        let timer = getTimeRemaining();
        if (timer.seconds >= 0) {
            timerSeconds.textContent = conversionDate(timer.seconds);
            timerMinutes.textContent = conversionDate(timer.minutes);
            timerHours.textContent = conversionDate(timer.hours);
        }
    }

    setInterval(function() { if (timerSeconds.textContent = '00') { updateClock() } }, 1000);
};

export default countTimer;