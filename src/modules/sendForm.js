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

    forms.forEach(item => {
        item.addEventListener('submit', (event) => {
            event.preventDefault();
            item.appendChild(statusMessage);
            const formData = new FormData(item);
            opacityListener(loadMessage);

            postData(formData)
                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('status network not 200');
                    }
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
    const postData = (formData) => {
        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: formData
        });
    };
};

export default sendForm;