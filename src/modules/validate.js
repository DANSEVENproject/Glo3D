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

export default validate;