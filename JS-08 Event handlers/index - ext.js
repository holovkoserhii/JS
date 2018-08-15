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


// ul.addEventListener("click", changeView);
// }

// function changeView(evt) {
//   const dest = evt.target.dataset.fullview;
//   document.querySelector(".fullview").firstElementChild["src"] = dest;
// }





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
    ul.addEventListener("click", this.changeView);// BIND?
  };

  createPreview(array) {
    const liS = array.reduce((accum, el) => {
      accum += `<li><img src="${el.preview}" data-fullview="${el.fullview}" alt="${el.alt}"></li>`;
      return accum;
    }, []);
    return liS;
  }
  
  changeView(evt) {
    const dest = evt.target.dataset.fullview;
    document.querySelector(".fullview").firstElementChild["src"] = dest;
  }

  //   this.buttonOpen.addEventListener("click", this.show.bind(this));
  //   this.submitBtn.addEventListener("submit", this.preventDefault.bind(this));
  // }
  
  // hide(evt) {
  //   if (evt.target !== this.modalWithOutline && evt.target !== this.closeModal) return;
  //   this.modalWithOutline.classList.add("modal-hidden");
  //   this.buttonOpen.addEventListener("click", this.show.bind(this));
  //   this.modalWithOutline.removeEventListener("click", this.hide.bind(this));
  //   this.closeModal.removeEventListener("click", this.hide.bind(this));
  // }
  // show(evt) {
  //   this.modalWithOutline.classList.remove("modal-hidden");
  //   this.modalWithOutline.addEventListener("click", this.hide.bind(this));
  //   this.closeModal.addEventListener("click", this.hide.bind(this));
  //   this.buttonOpen.removeEventListener("click", this.show.bind(this));
  // }

  
}


new Gallery({
items: galleryItems,
parentNode: document.querySelector('.image-gallery'),
defaultActiveItem: 1
});























// class Modal {
  
//   constructor({modalWithOutline, closeModal, submitBtn, buttonOpen}) {
//     this.modalWithOutline = modalWithOutline;
//     this.closeModal = closeModal;
//     this.submitBtn = submitBtn;
//     this.buttonOpen = buttonOpen;
//     this.init();
    
//   }
  
//   init() {
//     this.buttonOpen.addEventListener("click", this.show.bind(this));
//   }
  
//   hide(evt) {
//     if (evt.target !== this.modalWithOutline && evt.target !== this.closeModal) return;
//     this.modalWithOutline.classList.add("modal-hidden");
//     this.buttonOpen.addEventListener("click", this.show.bind(this));
//     this.modalWithOutline.removeEventListener("click", this.hide.bind(this));
//     this.closeModal.removeEventListener("click", this.hide.bind(this));
//   }
//   show(evt) {
//     this.modalWithOutline.classList.remove("modal-hidden");
//     this.modalWithOutline.addEventListener("click", this.hide.bind(this));
//     this.closeModal.addEventListener("click", this.hide.bind(this));
//     this.buttonOpen.removeEventListener("click", this.show.bind(this));
//   }
  
// }

// new Modal({
//   "modalWithOutline": document.querySelector(".js-modal-backdrop"),
//   "closeModal": document.querySelector(".js-close-modal"),
//   "submitBtn": document.querySelector(".sub-form"),
//   "buttonOpen": document.querySelector(".js-open-modal"),
// });