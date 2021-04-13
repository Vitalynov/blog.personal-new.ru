import {$} from '../plagin';
export const openModalBtn = () => {
    //Вешаем КЛИК на весь документ и дилигируем событие
    document.addEventListener('click', (e) => {
        //e.preventDefault();
        
        //присваиваем в переменную btnType КЛИК с кнопками data-btn
        const btnType = e.target.dataset.btn;
       
        //функция открытия модального окна 
        const openModal = (classAdd, content) => {
            //формируем модалку в DOM-дереве докумета
            let modal = $.modal();
            console.log(modal)
            //вставляем в модальное окно выбранный контент в зависимости от нажатой кнопки
            modal.setContent(classAdd, content);
            //устанавливаем задержку открыия модального окна на 0.15 сек., что бы востановить анимацию
            setTimeout(() => {
                modal.open();
            }, 150);
        };
        //Если КЛИК на кнопке с атрибутом data-btn, то вызывам данные из .JSON файла
        if (btnType) {
            //Вызывам данные из .JSON файла
            fetch('json/modalContent.json')
                .then(data => data.json()) //получаем данные data в .JSON формате.
                .then(res => { //получаем данные res в формате Objekt.
                    //Проверяем, какая кнопка нажата, такие и передаем данные для формирования контента модального окна
                    switch (btnType) {
                        case 'contactModal':
                            openModal(res.contactModal.classAdd, res.contactModal.content);
                            break;
                        case 'shareModal':
                            openModal(res.shareModal.classAdd, res.shareModal.content);
                            break;
                        case 'storyModal':
                            openModal(res.storyModal.classAdd, res.storyModal.content);
                            break;
                    }
                })
                //Если произошла ошибка, то она высветится на экране.
                .catch(() => {
                    if (btnType) {
                        //let modal = $.modal({});
                        //modal.setContent('Проверьте интернет...', '');
                        openModal('Проверьте интернет...', '');
                        setTimeout(() => {
                            modal.open();
                        }, 150);
                    }

                });
        }
    });
};