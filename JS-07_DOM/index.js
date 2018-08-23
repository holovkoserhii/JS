'use strict';

/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 1",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-1.com'
  },
  {
    img: "https://placeimg.com/400/150/nature",
    title: "Post title 2",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-2.com'
  },
  {
    img: "https://placeimg.com/400/150/arch",
    title: "Post title 3",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
    link: 'link-3.com'
  }
];

function createPostCard(obj) {
  
  function constructElement(tagN, attr) {
    const elem = document.createElement(tagN);
    for (const key in attr) {
      elem.setAttribute(key, attr[key]);
    }
    return elem;
  }
  console.log(obj);
  const pic = constructElement("img", {"src": obj.img, "class": "post__image", "alt": "post image"});
  
  const head = constructElement("h2", {"class": "post__title"});
  head.textContent = obj.title;
  
  const text = constructElement("p", {"class": "post__text"});
  text.textContent = obj.text;
  
  const but = constructElement("a", {"class": "button", "href": obj.link});
  but.textContent = "Read more";
  
  
  const post = constructElement("div", {"class": "post"});
  const children = [pic, head, text, but];
  children.forEach(ch => post.appendChild(ch));
  console.log(post);
  return post;
}
let myRoot = document.createElement("div");

for (const item of posts) {
  const newCard = createPostCard(item);
  myRoot.appendChild(newCard);
}

const target = document.querySelector(".target");
target.appendChild(myRoot);