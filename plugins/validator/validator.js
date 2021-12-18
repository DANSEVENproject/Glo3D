class Validator {
    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => {
            return item.tagName.toLowerCase() !== 'button' &&
                item.type !== 'button';
        });
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
        this.form.addEventListener('submit', (event) => {
            this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
            if (this.error.size) {
                event.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value)
            }
        };
        if (this.method) {
            const method = this.method[elem.id];
            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
        }

        return true;
    }

    checkIt(event) {
        const target = event.target;
        (this.isValid(target)) ? (
            this.showSuccess(target),
            this.error.delete(target)
        ) : (
            this.showError(target),
            this.error.add(target)
        )
    }

    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
        input.success {
            border: 1.5px solid green;
        }

        input.error {
            border: 1.5px solid red;
        }

        .validator-error {
            font-size: 12px;
            font-family: sans-serif;
            color: red;
        }
        #form1 .validator-error{
            margin-top: -30px;
        }
        `
        document.head.appendChild(style);
    }

    defaultPattern(sel, regexp) {
        if (!this.pattern[sel]) {
            this.pattern[sel] = regexp;
        }
    }

    selectorArr = (i) => {
        const arr = ['form1-phone', 'form2-phone', 'form3-phone', 'form1-email', 'form2-email', 'form3-email'];
        return arr[i];
    }

    setPattern() {
        for (let i = 0; i < 6; i++) {
            (i < 3) ? (
                this.defaultPattern(this.selectorArr(i), /^\+?[78]([-()]*\d){10}$/)
            ) : (
                this.defaultPattern(this.selectorArr(i), /^\w+@\w+\.\w{2,}$/)
            )
        }
    }
}