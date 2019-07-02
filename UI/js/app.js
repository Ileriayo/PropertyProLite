/* START HAMBURGER */
const changeDisplayState = (element) => {
    if (!element) return;
    if (element.style.display !== "block") {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
};

(() => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.navbar__menu-mobile');
    const mobileMenu2 = document.querySelector('.navbar__menu-mobile--margin');

    hamburger.addEventListener('click', () => {
        changeDisplayState(mobileMenu);
        changeDisplayState(mobileMenu2);
    })
})();
/* END HAMBURGER */

/* START DROPDOWN */
    (() => {
        const dropdownArrow = document.querySelector('.dropdown-arrow');
        const profileMenu = document.querySelector('.navbar__menu-profile');
        
        if (!dropdownArrow) return;
        dropdownArrow.addEventListener('click', () => {
            changeDisplayState(profileMenu);
        });
    })();
/* END DROPDOWN */