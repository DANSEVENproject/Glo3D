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

        const MULTIPLACATION_PERCENTAGE_1 = 2,
            MULTIPLACATION_PERCENTAGE_2 = 1.5,
            LIMIT_DAY_PROCENT_1 = 5,
            LIMIT_DAY_PROCENT_2 = 10,
            MAX_LIMIT_TOTAL_ANIMATION = 10000,
            MIN_LIMIT_TOTAL_ANIMATION = 3000;

        const typeValue = calcType.options[calcType.selectedIndex].value,
            squareValue = +calcSquare.value;

        const animation = () => {
            animationFrame = requestAnimationFrame(animation);
            if (countAnimation < total) {
                if (total >= MIN_LIMIT_TOTAL_ANIMATION && total < MAX_LIMIT_TOTAL_ANIMATION) {
                    countAnimation += 50;
                } else if (total >= MAX_LIMIT_TOTAL_ANIMATION) {
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
                if (countAnimation >= MIN_LIMIT_TOTAL_ANIMATION && countAnimation < MAX_LIMIT_TOTAL_ANIMATION) {
                    countAnimation -= 50;
                } else if (countAnimation >= MAX_LIMIT_TOTAL_ANIMATION) {
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

        if (calcDay.value && calcDay.value < LIMIT_DAY_PROCENT_1) {
            dayValue *= MULTIPLACATION_PERCENTAGE_1;
        } else if (calcDay.value && calcDay.value < LIMIT_DAY_PROCENT_2) {
            dayValue *= MULTIPLACATION_PERCENTAGE_2;
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

export default calc;