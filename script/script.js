window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //timer
    const countTimer = (deadline) => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

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
    countTimer('14 dec 2021');

    //menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            service = document.querySelector('.service-button'),
            heightPortfolio = document.querySelector('.portfolio').getBoundingClientRect().top,
            heightService = document.querySelector('.service').getBoundingClientRect().top,
            heightCalc = document.querySelector('.calc').getBoundingClientRect().top,
            heightCommand = document.querySelector('.command').getBoundingClientRect().top,
            heightConnect = document.querySelector('.connect').getBoundingClientRect().top;

        let count = -100,
            transitionInterval, transitionIntervalReset;

        const elementReturn = (i) => {
            const arr = [heightService, heightPortfolio, heightCalc, heightCommand, heightConnect];
            return arr[i];
        }

        const animationTransition = () => {
            transitionInterval = requestAnimationFrame(animationTransition);
            count <= 100 ? (
                menu.style.transform = `translate(${count}%)`
            ) : (
                cancelAnimationFrame(transitionInterval)
            )
            count += 5;
        };
        const animationTransitionReset = () => {
            transitionIntervalReset = requestAnimationFrame(animationTransitionReset);
            count >= -100 ? (
                menu.style.transform = `translate(${count}%)`
            ) : (
                cancelAnimationFrame(transitionIntervalReset)
            )
            count -= 10;
        }
        const HandlerMenu = () => {
            if (screen.width > '768') {
                count === -100 || menu.style.transform === `translate(-100%)` ? (
                    requestAnimationFrame(animationTransition),
                    cancelAnimationFrame(transitionIntervalReset)
                ) : (
                    requestAnimationFrame(animationTransitionReset),
                    cancelAnimationFrame(transitionInterval),
                    count === -100
                )
            }
        };

        //анимационный переход из списка
        const animationListener = (height) => {
            let elem, listScroll = 0;
            const animationScroll = () => {
                let _height = height;
                elem = requestAnimationFrame(animationScroll);
                document.documentElement.scrollTop = listScroll;
                if (listScroll >= _height) {
                    listScroll = _height;
                    cancelAnimationFrame(elem);
                }
                listScroll += 70;
            }
            const animationList = (height) => {
                listScroll = document.documentElement.scrollTop;
                (listScroll <= height) ? (
                    requestAnimationFrame(animationScroll)
                ) : (
                    cancelAnimationFrame(elem)
                )
            }
            animationList(height);
        }

        btnMenu.addEventListener('click', HandlerMenu);
        closeBtn.addEventListener('click', HandlerMenu);
        menuItems.forEach((item, i) => item.addEventListener('click', () => {
            animationListener(elementReturn(i));
            HandlerMenu();
        }));
        service.addEventListener('click', () => { animationListener(elementReturn(0)) });
    };
    toggleMenu();

    //popup
    const toogglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupClose = document.querySelector('.popup-close');

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });
        popupClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };
    toogglePopUp();
});