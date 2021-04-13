class Dropdown {
    constructor(selectorMame, options) {
        this.$el = document.querySelector(selectorMame);
        this.items = options.items;
        this.$el.insertAdjacentHTML('afterbegin', `<div class="dropdown__label">
        </div><ul class="dropdown__menu"></ul>`)
        console.log(this.div);
        //console.log(this.$el);
        this.$el.querySelector('.dropdown__label').textContent = this.items[0].label;

        this.$el.addEventListener('click', e => {
            const target = e.target;
            if (target.classList.contains('dropdown__label')) {
                if (this.$el.classList.contains('open')) {
                    this.close();
                } else {
                    this.open();
                }
            } else if (target.classList.contains('dropdown__item')) {
                this.select(target.dataset.id);


            }
        })
        const itemsHTML = this.items.map(item => {
            return `<li data-id="${item.id}" class="dropdown__item">${item.label}</li>`
        }).join(' ');

        this.$el.querySelector('.dropdown__menu').insertAdjacentHTML('afterbegin', itemsHTML);

    }
    select(id) {
        const item = this.items.find(item => item.id === id);
        this.$el.querySelector('.dropdown__label').textContent = item.label;
        this.close();
    }

    open() {
        this.$el.classList.add('open');
    }
    close() {
        this.$el.classList.remove('open');
    }

}




const dropdown = new Dropdown('#dropdown', {
    items: [{
            label: 'Москва',
            id: 'msk'
        },
        {
            label: 'Санкт-Петербург',
            id: 'spb'
        },
        {
            label: 'Новосибирск',
            id: 'nsk'
        },
        {
            label: 'Краснодар',
            id: 'krdr'
        }
    ]
})



/*
HTML:
  <div class="dropdown" id="dropdown"></div>
*/




/*
css:
.dropdown {
    position: relative;
    z-index: 50;
    width: 400px;
    overflow: hidden;
    border-radius: 5px;
}

.dropdown.open .dropdown__menu {
    top: 29px;
    opacity: 1;
}

.dropdown__label {
    position: absolute;
    top: 0;
    z-index: 10;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid black;
    width: 100%;
    cursor: pointer;
    background-color: #fff;
    color: red;

}

.dropdown__menu {
    
    position: absolute;
    width: 100%;
    max-height: 200px;
    overflow: auto;
    top: -200px;
    z-index: 5;
    opacity: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    border-radius: 5px;
    border: 1px solid black;
    padding-top: 10px;
    padding-bottom: 10px;
    transition: all .3s ease-in;
}

.dropdown__item {
    padding: 5px 10px;
}

.dropdown__item:hover {
    background: rgba(0, 0, 0, .2);
    cursor: pointer;
}
*/