window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //timer
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
    countTimer();

    //menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('li'),
            service = document.querySelector('.service-button'),
            heightPortfolio = document.querySelector('.portfolio').getBoundingClientRect().top,
            heightService = document.querySelector('.service').getBoundingClientRect().top,
            heightCalc = document.querySelector('.calc').getBoundingClientRect().top,
            heightCommand = document.querySelector('.command').getBoundingClientRect().top,
            heightConnect = document.querySelector('.connect').getBoundingClientRect().top;

        let count = -100,
            transitionInterval;

        const elementReturn = (i) => {
            const arr = [heightService, heightPortfolio, heightCalc, heightCommand, heightConnect];
            return arr[i];
        }

        const animationTransition = () => {
            transitionInterval = requestAnimationFrame(animationTransition);
            count < 100 ? (
                count += 5,
                menu.style.transform = `translate(${count}%)`
            ) : (
                cancelAnimationFrame(transitionInterval)
            )

        };
        const HandlerMenu = () => {
            if (screen.width > '768') {
                count === -100 ? (
                    requestAnimationFrame(animationTransition)
                ) : (
                    cancelAnimationFrame(transitionInterval),
                    menu.style.transform = `translate(-100%)`,
                    count = -100
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

        document.body.addEventListener('click', (event) => {
            const target = event.target;

            if (target === closeBtn) {
                HandlerMenu();
                return;
            }
            if (target === service) {
                animationListener(elementReturn(0));
                return;
            }
            if (target === btnMenu || target.closest('.menu')) {
                HandlerMenu();
                return;
            }
            menuItems.forEach((item, i) => {
                if (target === item.querySelector('a')) {
                    animationListener(elementReturn(i));
                    count = 100;
                    HandlerMenu();
                } else if (menu.style.transform === `translate(100%)`) {
                    HandlerMenu();
                }
            })
        });
    };
    toggleMenu();

    //popup
    const toogglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach((item) => {
            item.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });
        popup.addEventListener('click', (event) => {
            let target = event.target;
            if (target.classList.contains('popup-close')) {
                popup.style.display = 'none'
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popup.style.display = 'none';
                }
            }

        });
    };
    toogglePopUp();

    //tabs
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
            tabContent.forEach((item, i) => {
                (index === i) ? (
                    tab[i].classList.add('active'),
                    tabContent[i].classList.remove('d-none')
                ) : (
                    tab[i].classList.remove('active'),
                    tabContent[i].classList.add('d-none')
                )
            });
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
            target = target.closest('.service-header-tab');

            if (target.classList.contains('service-header-tab')) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //slider
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content'),
            ulDots = document.querySelector('.portfolio-dots');

        let dot, interval,
            currentSlide = 0;

        const addSliderDots = () => {
            slide.forEach(() => {
                const liDot = document.createElement('li');
                liDot.classList.add('dot');
                ulDots.insertAdjacentElement('beforeend', liDot);
            });
            dot = document.querySelectorAll('.dot');
        };
        addSliderDots();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };
        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlider = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlider, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target;

            if (!target.matches('#arrow-right, #arrow-left, .dot')) {
                return;
            }
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((item, i) => {
                    if (item === target) {
                        currentSlide = i;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };
    slider();

    //calculator
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        let animationFrame, countAnimation = 0;

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            const animation = () => {
                animationFrame = requestAnimationFrame(animation);
                if (countAnimation < total) {
                    if (total >= 3000 && total < 10000) {
                        countAnimation += 50;
                    } else if (total >= 10000) {
                        countAnimation += 200;
                    } else {
                        countAnimation += 20;

                    }
                    totalValue.textContent = countAnimation;
                } else {
                    cancelAnimationFrame(animationFrame);
                }
            };
            const animationReset = () => {
                animationFrame = requestAnimationFrame(animationReset);
                if (countAnimation > total) {
                    if (countAnimation >= 3000 && countAnimation < 10000) {
                        countAnimation -= 50;
                    } else if (countAnimation >= 10000) {
                        countAnimation -= 200;

                    } else {
                        countAnimation -= 20;
                    }
                    totalValue.textContent = countAnimation;
                } else {
                    cancelAnimationFrame(animationFrame);
                }
            }

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            if (total > countAnimation) {
                totalValue.textContent = animation();
                totalValue.textContent = total;
            } else if (total < countAnimation) {
                totalValue.textContent = animationReset();
                totalValue.textContent = total;
            } else {
                totalValue.textContent = total;
            }
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;

            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });
        calcBlock.addEventListener('input', (event) => {
            const target = event.target;
            if (!target.matches('.calc-count, .calc-square, .calc-count, .calc-day')) return;
            else {
                target.value = target.value.replace(/\D/g, '');
            }
        })

    };
    calc();

    //change team photos
    const changePhoto = () => {
        const command = document.getElementById('command');
        let attributeValue;

        command.addEventListener('mouseover', (event) => {
            const target = event.target;
            if (!target.matches('.command__photo')) return;
            else {
                attributeValue = target.getAttribute('src');
                target.setAttribute('src', target.getAttribute('data-img'));
            }
        });
        command.addEventListener('mouseout', (event) => {
            const target = event.target;
            if (!target.matches('.command__photo')) return;
            else {
                target.setAttribute('src', attributeValue);
            }
        });
    };
    changePhoto();

    //validation
    const validate = () => {
        const formPhone = document.querySelectorAll('.form-phone'),
            formName = document.querySelectorAll('.form-name'),
            formMessage = document.getElementById('form2-message');

        formPhone.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^+]\D/g, '');
            });
        });
        formMessage.addEventListener('input', () => {
            formMessage.value = formMessage.value.replace(/[А-я0-9]/g, '');
        });
        formName.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[А-я0-9]/g, '');
            });
        });
    };
    validate();

    //send-ajax-form
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так..',
            loadMessage = 'Загрузка..',
            successMessage = 'Спасибо, мы скоро с вами свяжемся!';

        const forms = [...document.forms];

        const statusMessage = document.createElement('div');
        statusMessage.classList.add('message-form');
        statusMessage.style.cssText = `font-size: 2rem;`;
        let transitionInterval, count = 0;

        const animationOpacity = () => {
            transitionInterval = requestAnimationFrame(animationOpacity);
            count < 1 ? (
                count += 0.01,
                statusMessage.style.opacity = `${count}`
            ) : (
                cancelAnimationFrame(transitionInterval)
            )

        };
        const opacityListener = (content) => {
            statusMessage.textContent = content;
            count === 0 ? (
                requestAnimationFrame(animationOpacity)
            ) : (
                count === 0,
                cancelAnimationFrame(transitionInterval)
            )
        };

        const postData = (body) => {
            return new Promise((resolve, rejected) => {
                const request = new XMLHttpRequest();
                request.addEventListener('readystatechange', () => {
                    if (request.readyState !== 4) return;
                    (request.status === 200) ? (
                        resolve()
                    ) : (
                        rejected(request.status)
                    )
                });

                request.open('POST', './server.php');
                request.setRequestHeader('Content-Type', 'application/JSON');
                request.send(JSON.stringify(body));
            });
        };

        forms.forEach(item => {
            item.addEventListener('submit', (event) => {
                event.preventDefault();
                item.appendChild(statusMessage);
                opacityListener(loadMessage);

                const formData = new FormData(item);
                let body = {};
                formData.forEach((value, key) => {
                    body[key] = value;
                });

                postData(body)
                    .then(() => {
                        count = 0;
                        opacityListener(successMessage);
                        for (let i = 0; i < item.length; i++) {
                            if (item[i].tagName.toLowerCase() !== 'button') {
                                item[i].value = '';
                            }
                        }
                    })
                    .catch((error) => {
                        count = 0;
                        opacityListener(errorMessage);
                        console.error(error);
                    });
            });
        });
    };
    sendForm();
});