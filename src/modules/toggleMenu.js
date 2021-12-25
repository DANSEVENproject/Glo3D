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

export default toggleMenu;