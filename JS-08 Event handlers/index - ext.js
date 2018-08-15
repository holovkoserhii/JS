'use strict';

// ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
// Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
// чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
// аналогичный заданию выше.

// При создании экземпляра конструктор получает:
//   - items - список элементов для preview
//   - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
//   - defaultActiveItem - номер активного элемента preview по умолчанию
  
// Тогда создание экземпляра будет выглядеть следующим образом.
// */

// new Gallery({
// items: galleryItems,
// parentNode: document.querySelector('.image-gallery'),
// defaultActiveItem: 1
// });

const galleryItems = [
  {
    preview: 'img/preview-1.jpg',
    fullview: 'img/fullview-1.jpg',
    alt: 'alt text 1',
  },
  {
    preview: 'img/preview-2.jpg',
    fullview: 'img/fullview-2.jpg',
    alt: 'alt text 2',
  },
  {
    preview: 'img/preview-3.jpg',
    fullview: 'img/fullview-3.jpg',
    alt: 'alt text 3',
  },
  {
    preview: 'img/preview-4.jpg',
    fullview: 'img/fullview-4.jpg',
    alt: 'alt text 4',
  },
];


class Gallery {
  
  constructor({items, parentNode, defaultActiveItem}) {
    this.items = items,
    this.parentNode = parentNode,
    this.defaultActiveItem = defaultActiveItem,
    this.init();
  }
  
  init() {
    this.parentNode.innerHTML = `<div class="fullview">
    <img src="${this.items[this.defaultActiveItem - 1].fullview}" 
    alt="${this.items[this.defaultActiveItem - 1].alt}">
    </div>
    <ul class="preview">
    </ul>`;

    const ul = document.querySelector(".preview");
    ul.innerHTML = this.createPreview(this.items);
    ul.addEventListener("click", this.changeView);
  };

  createPreview(array) {
    const liS = array.reduce((accum, el) => {
      accum += `<li><img src="${el.preview}" data-fullview="${el.fullview}" alt="${el.alt}"></li>`;
      return accum;
    }, []);
    return liS;
  }
  
  changeView(evt) {
    const liS = Array.from(document.querySelectorAll(".preview > li > img"));
    if(liS.indexOf(evt.target) < 0) return;
    const dest = evt.target.dataset.fullview;
    if(!dest) return;
    document.querySelector(".fullview").firstElementChild["src"] = dest;
  }
}

new Gallery({
items: galleryItems,
parentNode: document.querySelector('.image-gallery'),
defaultActiveItem: 1
});