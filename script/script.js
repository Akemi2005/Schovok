document.addEventListener("DOMContentLoaded", () => {
    //бургер і меню
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav");

    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("open");
    });

    // Переключання мови
    const languageLinks = document.querySelectorAll(".language-change a");
    languageLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            languageLinks.forEach(link => link.classList.remove("active"));
            link.classList.add("active");
        });
    });
});

