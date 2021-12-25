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

    let DYNAMIC_LIMIT_TRANSFORMATION = -100,
        transitionInterval;

    const UPPER_LIMIT_TRANSFORMATION = 100,
        LOWER_LIMIT_TRANSFORMATION = -100;

    const elementReturn = (i) => {
        const arr = [heightService, heightPortfolio, heightCalc, heightCommand, heightConnect];
        return arr[i];
    }

    const animationTransition = () => {
        transitionInterval = requestAnimationFrame(animationTransition);
        DYNAMIC_LIMIT_TRANSFORMATION < UPPER_LIMIT_TRANSFORMATION ? (
            DYNAMIC_LIMIT_TRANSFORMATION += 5,
            menu.style.transform = `translate(${DYNAMIC_LIMIT_TRANSFORMATION}%)`
        ) : (
            cancelAnimationFrame(transitionInterval)
        )

    };
    const HandlerMenu = () => {
        if (screen.width > '768') {
            DYNAMIC_LIMIT_TRANSFORMATION === LOWER_LIMIT_TRANSFORMATION ? (
                requestAnimationFrame(animationTransition)
            ) : (
                cancelAnimationFrame(transitionInterval),
                menu.style.transform = `translate(-100%)`,
                DYNAMIC_LIMIT_TRANSFORMATION = LOWER_LIMIT_TRANSFORMATION
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
                DYNAMIC_LIMIT_TRANSFORMATION = UPPER_LIMIT_TRANSFORMATION;
                HandlerMenu();
            } else if (menu.style.transform === `translate(100%)`) {
                HandlerMenu();
            }
        })
    });
};

export default toggleMenu;