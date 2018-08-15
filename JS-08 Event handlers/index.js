'use strict';

/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="img/fullview-2.jpeg" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

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

document.addEventListener(
  'DOMContentLoaded',
  createElements.bind(null, galleryItems),
);

function createElements(arr) {
  const parent = document.querySelector('.js-image-gallery');
  parent.innerHTML = `<div class="fullview">
  <img src="${arr[0].fullview}" alt="${arr[0].alt}">
</div>
<ul class="preview">
</ul>`;

const ul = document.querySelector(".preview");
ul.innerHTML = createPreview(arr);

ul.addEventListener("click", changeView);
}

const createPreview = array => array.reduce((accum, el) => {
  accum += `<li><img src="${el.preview}" data-fullview="${el.fullview}" alt="${el.alt}"></li>`;
  return accum;
}, []);


function changeView(evt) {
  const liS = Array.from(document.querySelectorAll(".preview > li > img"));
  if (liS.indexOf(evt.target) < 0) return;
  const dest = evt.target.dataset.fullview;
  if(!dest) return;
  document.querySelector(".fullview").firstElementChild["src"] = dest;
}