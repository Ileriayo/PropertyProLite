/* POST PROPERTY CONTAINER */
(() => {
    const propertyAd = document.querySelector('.property_ad');
    const noDisplay = document.querySelector('.no-display');
    propertyAd.addEventListener('click', () => {
        changeDisplayState(noDisplay);
    });
})();
/* END POST PROPERTY CONTAINER */

/* UPDATE PROPERTY */
(() => { // EDIT BUTTON
    const editBtn = document.querySelectorAll('.btn-edit');
    const cancelBtn = document.querySelectorAll('.btn-cancel');
    const updateBtn = document.querySelectorAll('.btn-update');
    // console.log(cancelBtn);
    for (let i = 0; i < editBtn.length; i++) {
        // let editModeDeactivated = true;
        const editBtnParent = editBtn[i].parentNode;
        const editBtnGrandParent = editBtnParent.parentNode;
        const childrenNodes = editBtnGrandParent.children;

        childNode2 = childrenNodes[2].textContent;
        childNode3 = childrenNodes[3].textContent;
        childNode4 = childrenNodes[4].textContent;
        childNode5 = childrenNodes[5].textContent;
        childNode6 = childrenNodes[6].textContent;

        editBtn[i].addEventListener('click', () => {
            editBtn[i].style.display = "none";
            changeDisplayState(cancelBtn[i]);
            changeDisplayState(updateBtn[i]);
            
            childrenNodes[2].innerHTML = `<input type="text" value="${childrenNodes[2].textContent}">`;
            childrenNodes[3].innerHTML = `<input type="text" value="${childrenNodes[3].textContent}">`;
            childrenNodes[4].innerHTML = `<input type="text" value="${childrenNodes[4].textContent}">`;
            childrenNodes[5].innerHTML = `<input type="text" value="${childrenNodes[5].textContent}">`;
            childrenNodes[6].innerHTML = `<input type="text" value="${childrenNodes[6].textContent}">`;
            return;
        });

        cancelBtn[i].addEventListener('click', () => {
            childrenNodes[2].textContent = childNode2;
            childrenNodes[3].textContent = childNode3;
            childrenNodes[4].textContent = childNode4;
            childrenNodes[5].textContent = childNode5;
            childrenNodes[6].textContent = childNode6;

            changeDisplayState(editBtn[i]);
            changeDisplayState(cancelBtn[i]);
            changeDisplayState(updateBtn[i]);
        });

        updateBtn[i].addEventListener('click', () => {
            return;
        });
    }
})();
/* END UPDATE PROPERTY */