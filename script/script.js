document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-in");

    // Функція для перевірки видимості елементів
    const checkVisibility = () => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isInView = rect.top < window.innerHeight && rect.bottom >= 0;

            if (isInView) {
                // Якщо елемент потрапляє в зону видимості
                el.classList.add("show");
            } else {
                // Якщо елемент більше не видимий, прибираємо анімацію
                el.classList.remove("show");
            }
        });
    };

    // Перевіряємо видимість відразу після завантаження сторінки
    checkVisibility();

    // Додаємо слухач події скролу
    window.addEventListener("scroll", checkVisibility);

    // Бургер меню
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");
    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("open");
    });

    // Клікер мови
    const languageLinks = document.querySelectorAll(".language-change a");
    languageLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            languageLinks.forEach(link => link.classList.remove("active"));
            link.classList.add("active");
        });
    });

    // Свайпер відгуків
    const swiper = new Swiper('.swiper', {
        slidesPerView: 3,
        spaceBetween: 0,
        centeredSlides: true,
        loop: true,
        speed: 800,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            type: 'bullets',
        },
        breakpoints: {
            1024: { slidesPerView: 3, spaceBetween: 0 },
            768: { slidesPerView: 2, spaceBetween: 0,
                centeredSlides: false},
            540: { slidesPerView: 2, spaceBetween: 0,
                centeredSlides: false},
            0: { slidesPerView: 1, spaceBetween: 0 }
        },
        touchStartPreventDefault: true,
        touchMoveStopPropagation: true,
        on: {
            init() {
                updateSlideScale();
            },
            slideChangeTransitionStart() {
                updateSlideScale();
            },
        },
    });

    function updateSlideScale() {
        document.querySelectorAll('.swiper-slide').forEach(slide => {
            slide.style.transform = 'scale(0.78)';
        });
        const activeSlide = document.querySelector('.swiper-slide.swiper-slide-active');
        if (activeSlide) activeSlide.style.transform = 'scale(1)';
    }

    // Свайпер для квадратиків будиночків
    document.querySelector(".cards-wrap")?.addEventListener("scroll", () => {
        const cardsWrap = document.querySelector(".cards-wrap");
        const totalScrollWidth = cardsWrap.scrollWidth - cardsWrap.clientWidth;
        if (cardsWrap.scrollLeft >= totalScrollWidth - 1) {
            cardsWrap.scrollTo({ left: 0, behavior: "smooth" });
        }
    });

    // Свайпер з їдою
    let cardWidth, foodsBlockWidth, maxIndex, currentIndex = 0;
    const foodsBlock = document.querySelector('.foods-block');
    const foodCards = Array.from(document.querySelectorAll('.food-card'));
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    function updateFoodSliderDimensions() {
        cardWidth = foodCards[0]?.offsetWidth + 25;
        foodsBlockWidth = foodsBlock?.offsetWidth;
        maxIndex = Math.max(0, foodCards.length - Math.floor(foodsBlockWidth / cardWidth));
        currentIndex = Math.min(currentIndex, maxIndex);
        moveFoodSlider();
    }

    function moveFoodSlider(reset = false) {
        foodsBlock.style.transition = reset ? 'none' : 'transform 0.3s ease';
        foodsBlock.style.transform = `translateX(-${reset ? 0 : currentIndex * cardWidth}px)`;
    }

    nextBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
            moveFoodSlider(true);
            return;
        }
        moveFoodSlider();
    });

    prevBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        moveFoodSlider();
    });

    foodsBlock?.addEventListener('touchstart', (event) => {
        const startX = event.touches[0].clientX;
        let currentTranslate = -currentIndex * cardWidth;
        foodsBlock.style.transition = 'none';
        foodsBlock.addEventListener('touchend', (event) => {
            const endX = event.changedTouches[0].clientX;
            const deltaX = endX - startX;
            if (deltaX > 50 && currentIndex > 0) {
                currentIndex--;
            } else if (deltaX < -50 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (deltaX < -50 && currentIndex === maxIndex) {
                currentIndex = 0;
                moveFoodSlider(true);
            }
            moveFoodSlider();
        }, { once: true });
    }, { passive: true });

    window.addEventListener('resize', updateFoodSliderDimensions);
    updateFoodSliderDimensions();


    // відкриття питання
    document.querySelectorAll('.question-block').forEach(block => {
        block.addEventListener('click', () => {
            const answer = block.nextElementSibling;
            const arrow = block.querySelector('.arrow-icon');

            if (answer.classList.contains('flex')) {
                answer.classList.remove('flex');
                arrow.classList.remove('rotated');
            } else {
                document.querySelectorAll('.answer.flex').forEach(openAnswer => {
                    openAnswer.classList.remove('flex');
                });
                document.querySelectorAll('.arrow-icon.rotated').forEach(rotatedArrow => {
                    rotatedArrow.classList.remove('rotated');
                });
                answer.classList.add('flex');
                arrow.classList.add('rotated');
            }
        });
    });
});
