/* 
Примеры webpack
Экспорты:
    export let one = 1;
           let two = 2
    export {two}
    export defoult function arr(){ - передаем по дефолту
        console.log('Helo!');
}
Импорты:
    import {one} from './moduls/function'; - именованный синтаксис
    import {one, tow} from './moduls/function'; - именованный синтаксис
    import {one as num} from './moduls/function'; - переименование переменной one в num
    import * as data from './moduls/function'; 
        console log (`${data.one} and ${data.tow}`)
    import arr from './moduls/function'; - принимаем по дефолту
        arr();
*/
// импорт блоков Swiper

import {$} from './plagin';

import {
    openModalBtn
} from './moduls/openBtns';
import {
    burgerToggleMenu
} from './moduls/burger';



document.addEventListener('DOMContentLoaded', () => {
    'use strict';
  
    $.modal = function () {
        //Функция создания модального окна
        function _createModal() {
            const modalWindow = document.createElement('div');
            modalWindow.classList.add('modal');
            modalWindow.setAttribute('data-clouse', 'true');
            modalWindow.insertAdjacentHTML('afterbegin',
                `<div class="modal__content">
                </div>`
            );
            document.body.append(modalWindow);
            return modalWindow;
        }

        const $modal = _createModal();

        //создание методов модального окна open, clouse, setContent, destroy
        const modal = {
            open() {
                $modal.classList.add('modal-whowe');
                document.body.classList.add('no-scroll');
            },
            clouse() {
                $modal.classList.remove('modal-whowe');
                setTimeout(() => {
                    modal.destroy();
                }, 300);
                document.body.classList.remove('no-scroll');
            },
            setContent(classAdd, contentHtml) {

                $modal.querySelector(".modal__content").classList.add(classAdd);
                $modal.querySelector(".modal__content").innerHTML = contentHtml;

            }
        };

        $modal.addEventListener('click', (e) => {
            const target = e.target;
            if (target.dataset.clouse) {
                modal.clouse();
            }
        });

        return Object.assign(modal, {
            destroy() {
                $modal.parentElement.removeChild($modal);

            }
        });
    };

    openModalBtn();
    burgerToggleMenu();

});