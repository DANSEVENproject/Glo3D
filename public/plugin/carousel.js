'use strict';

class SliderCarousel {
    constructor({
        main,
        wrap,
        next,
        prev,
        infinity = false,
        position = 0,
        slidesToShow = 3,
        responsive = []
    }) {
        if (!main || !wrap) {
            console.warn('slider-carusel: Необходимо 2 свойства, main и wrap !')
        }
        this.main = document.querySelector(main);
        this.wrap = document.querySelector(wrap);
        this.slides = document.querySelector(wrap).children;
        this.next = document.querySelector(next);
        this.prev = document.querySelector(prev);
        this.slidesToShow = slidesToShow;
        this.options = {
            position,
            infinity,
            widthSlide: Math.floor(100 / this.slidesToShow),
        }
        this.responsive = responsive;
    }

    init() {
        this.addGloClass();
        this.addStyle();

        (this.prev && this.next) ? (
            this.controlSlider()
        ) : (
            this.addArrow(),
            this.controlSlider()
        )
        if (this.responsive) {
            this.responseInit();
        }
    }

    addGloClass() {
        this.main.classList.add('glo-slider');
        this.wrap.classList.add('glo-slider__wrap');
        [...this.slides].forEach(item => {
            item.classList.add('glo-slider__item');
        });
    }

    addStyle() {
        let style = document.getElementById('sliderCarusel-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'sliderCarousel-style';
        }
        style.textContent = `
            .glo-slider {
                overflow: hidden !important;
            }
            .glo-slider__wrap {
                display: flex !important;
                transition: transform 0.5s !important;
                will-change: transform !important;
                margin-bottom: 10px !important;
            }
            .glo-slider__item {
                display: flex !important;
                align-items: center;
                justify-content: center;
                flex: 0 0 ${this.options.widthSlide}% !important;
                margin: auto 0 !important;
            }
        `;
        document.head.appendChild(style);
    }

    controlSlider() {
        this.prev.addEventListener('click', this.prevSlider.bind(this));
        this.next.addEventListener('click', this.nextSlider.bind(this));
    }

    prevSlider() {
        if (this.options.infinity || this.options.position > 0) {
            --this.options.position;
            if (this.options.position < 0) {
                this.options.position = this.slides.length - this.slidesToShow;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
    }

    nextSlider() {
        if (this.options.infinity || this.options.position < this.slides.length - this.slidesToShow) {
            ++this.options.position;
            if (this.options.position > this.slides.length - this.slidesToShow) {
                this.options.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`
        }
    }

    addArrow() {
        this.prev = document.createElement('button');
        this.next = document.createElement('button');

        this.prev.className = 'glo-slider__prev';
        this.next.className = 'glo-slider__next';

        const style = document.createElement('style');
        style.textContent = `
            .glo-slider__prev,
            .glo-slider__next{
                margin: 0 10px;
                border: 15px solid transparent;
                background: transparent;
                cursor: pointer;
            }
            .glo-slider__next {
                border-left-color: #212529;
            }
            .glo-slider__prev {
                border-right-color: #212529;
            }

            .glo-slider__next:hover,
            .glo-slider__prev:hover,
            .glo-slider__next:focus,
            .glo-slider__prev:focus{
                background: transparent;
                outline: transparent;
            }
            `;

        document.head.appendChild(style);

        this.main.appendChild(this.prev);
        this.main.appendChild(this.next);
    }

    responseInit() {
        const slidesToShowDefault = this.slidesToShow;
        const allResponse = this.responsive.map(item => item.breakpoint);
        const maxResponse = Math.max(...allResponse);

        const checkWidthWindow = (slideCount) => {
            this.slidesToShow = slideCount;
            this.options.widthSlide = Math.floor(100 / this.slidesToShow);
            this.addStyle();
        };
        const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
            (widthWindow < maxResponse) ? (
                allResponse.forEach((item, i) => {
                    if (widthWindow < item) {
                        checkWidthWindow(this.responsive[i].slideToShow);
                    }
                })
            ) : (
                checkWidthWindow(slidesToShowDefault)
            )
        };
        checkResponse();

        window.addEventListener('resize', checkResponse);
    }
}