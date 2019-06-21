/* HAMBURGER & DROPDOWN */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.navbar__menu-mobile');
const mobileMenu2 = document.querySelector('.navbar__menu-mobile--margin');

const changeDisplayState = (element) => {
    if (!element) return;
    if (element.style.display === "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
};

hamburger.addEventListener('click', () => {
    changeDisplayState(mobileMenu);
    changeDisplayState(mobileMenu2);
});

const dropdownArrow = document.querySelector('.dropdown-arrow');
const profileMenu = document.querySelector('.navbar__menu-profile');

dropdownArrow.addEventListener('click', () => {
    changeDisplayState(profileMenu);
});

/* END HAMBURGER & DROPDOWN */