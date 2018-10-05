/* 
  Напишите приложение для хранения url веб-страниц в виде карточек-закладок. 
  
  Реализуйте следующий функционал:
    - Используйте Gulp для сборки проекта, JS обработан транспайлером Babel, ресурсы оптимизированы
    
    - Для добавления новой закладки, в приложении есть форма с элементом input и кнопкой "Добавить"
    
    - В приложении есть список всех добавленных карточек-закладок, располагающийся под формой
    
    - Некоторые элементы интерфейса создаются динамически. Используйте шаблонизатор Handlebars для
      создания списка карточек. Форма уже есть в HTML при загрузке страницы.
      
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходят проверки:
        * на существование закладки с такой ссылкой в текущей коллекции закладок. Если такая закладка есть,
          всплывает диалоговое окно оповещающее пользователя о том, что такая закладка уже есть.
        * при условии валидной, еще не существующей в коллекции ссылки, карточка с такой ссылкой
          добавляется в коллекцию.
          
    - В интерфейсе, новые карточки добавляются наверх списка, а не вниз.
    
    - Каждая карточка-закладка содержит кнопку для удаления карточки из коллекции, при клике 
      на кнопку происходит удаление.
      
    - При повторном посещении страницы с одного и того же устройства и браузера, пользователь видит
      все карточки-закладки которые были во время последнего его посещения. Используйте localStorage
      
  🔔 Оформление интерфейса произвольное
*/

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
    - При добавлении ссылки в поле формы и нажатии на кнопку "Добавить", происходи проверка 
      на валидность введенной ссылки: если был введен невалидный url то должно всплывать 
      диалоговое окно, оповещающее пользователя о том, что это невалидный url. Используйте
      регулярные выражения для валидации url.
          
    - Каждая карточка содержит превью изображение и базовую информацию о странице по адресу закладки,
      для получения этой информации воспользуйтесь этим Rest API - https://www.linkpreview.net/
*/

'use strict';

const refs = {
  form: document.querySelector('form'),
  userUrlField: document.querySelector('#url'),
  addButton: document.querySelector('button'),
  result: document.querySelector('.result'),
  template: Handlebars.compile(
    document.querySelector('#cards').innerHTML.trim(),
  ),
};

refs.addButton.addEventListener('click', getInfo);
document.addEventListener('DOMContentLoaded', showItems);
refs.result.addEventListener('click', handleRemoveCard);

const API_KEY = '5baa8080bf727afb735190e7841c374bda633412561ba';
const API_URL = 'http://api.linkpreview.net/';

function getInfo(evt) {
  evt.preventDefault();
  const userUrlValue = refs.userUrlField.value;

  if (!checkValid(userUrlValue)) {
    alert('You have entered a wrong url!');
    return;
  }

  // console.log(checkPresent(url));

  fetch(`${API_URL}?key=${API_KEY}&q=${userUrlValue}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .then(data => handleAddCard(data))
    .catch(error => console.log('Site not found! ' + error));
}

function checkValid(url) {
  const urlExp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
  return urlExp.test(url);
}

function checkPresent(url) {
  const sitesArr = JSON.parse(localStorage.getItem('sitesArray'));
  const matchArr = sitesArr.filter(el => el.url === url);
  console.log(matchArr);
  return matchArr.length > 0;
}

function handleAddCard(obj) {
  if (checkPresent(obj.url)) {
    alert("This url is present in your store!");
    return;
  }

  addToView(obj);
  addtoLocalStorage(obj);
  refs.form.reset();
}

function addToView(obj) {
  const markup = refs.template(obj);
  refs.result.insertAdjacentHTML('afterbegin', markup);
}

function addtoLocalStorage(obj) {
  const sitesArr = JSON.parse(localStorage.getItem('sitesArray'));
  sitesArr.unshift(obj);
  localStorage.setItem('sitesArray', JSON.stringify(sitesArr));
}

function handleRemoveCard(evt) {
  const target = evt.target;
  if (target.tagName !== 'BUTTON' || !target.classList.contains('remove'))
    return;
  const card = target.closest('.card');
  const cardUrl = card.querySelector('.url-id').textContent;
  removeFromView(card);
  removeFromLocalStorage(cardUrl);
}

function removeFromView(elem) {
  elem.remove();
}

function removeFromLocalStorage(id) {
  const sitesArr = JSON.parse(localStorage.getItem('sitesArray'));
  const objToDelete = sitesArr.filter(el => el.url === id)[0];
  sitesArr.splice(sitesArr.indexOf(objToDelete), 1);
  localStorage.setItem('sitesArray', JSON.stringify(sitesArr));
}

function showItems(evt) {
  evt.preventDefault();
  const sitesArr = JSON.parse(localStorage.getItem('sitesArray'));
  const markup = sitesArr.map(el => refs.template(el));
  markup.map(el => refs.result.insertAdjacentHTML('beforeend', el));
}
