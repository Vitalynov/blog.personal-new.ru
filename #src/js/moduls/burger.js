//require("@babel/polyfill");
/* Burger */
export const burgerToggleMenu = function () {
    const burger = document.getElementById('burgerToggle'),
        page = document.getElementById('page'),
        body = document.body;

    burger.addEventListener('click', e => {
        if (body.classList.contains('showe-sidebar')) {
            closeSidebar();
        } else {
            showSidebar();
        }

    });

    function showSidebar() {
        let mask = document.createElement('div');
        mask.classList.add('page__mask');
        mask.addEventListener('click', closeSidebar);
        page.append(mask);

        body.classList.add('showe-sidebar', 'no-scroll');
    }


    function closeSidebar() {
        console.log('Klick');
        body.classList.remove('showe-sidebar', 'no-scroll');
        document.querySelector('.page__mask').remove();
    }
};