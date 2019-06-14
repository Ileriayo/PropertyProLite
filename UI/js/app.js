/* HAMBURGER */
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.navbar__menu-mobile');
hamburger.addEventListener('click', () => {
    if (mobileMenu.style.display === "block") {
        mobileMenu.style.display = "none";
    } else {
        mobileMenu.style.display = "block";
    }
})
/* END HAMBURGER */