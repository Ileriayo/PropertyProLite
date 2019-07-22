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
    const deleteBtn = document.querySelectorAll('.btn-delete');
    const soldOption = document.querySelectorAll('.sold');
    
    for (let i = 0; i < editBtn.length; i++) {
        const editBtnParent = editBtn[i].parentNode;
        const editBtnGrandParent = editBtnParent.parentNode;
        const childrenNodes = editBtnGrandParent.children;

        childNode3 = childrenNodes[3].textContent;

        editBtn[i].addEventListener('click', () => {
            editBtn[i].style.display = "none";
            changeDisplayState(cancelBtn[i]);
            changeDisplayState(updateBtn[i]);
            deleteBtn[i].style.display = "none";
            
            childrenNodes[3].innerHTML = `<input type="text" value="${childrenNodes[3].textContent}" class="prop_price">`;
            return;
        });

        cancelBtn[i].addEventListener('click', () => {
            childrenNodes[3].textContent = childNode3;

            changeDisplayState(editBtn[i]);
            changeDisplayState(cancelBtn[i]);
            changeDisplayState(updateBtn[i]);
            changeDisplayState(deleteBtn[i]);
        });

        updateBtn[i].addEventListener('click', () => {
        });

        deleteBtn[i].addEventListener('click', () => {
        });

        soldOption[i].addEventListener('change', () => {
            const value = confirm('You will not be able to change the status again after this, continue?');
            if (!value) {
                soldOption[i].selectedIndex = this.oldIndex;
            } else if(value) {
            }
        });
    }
})();
/* END UPDATE PROPERTY */