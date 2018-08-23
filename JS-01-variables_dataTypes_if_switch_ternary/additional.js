/*
  ⚠️ ДОПОЛНИТЕЛЬНОЕ ЗАДАНИЕ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Создайте скрипт турагенства, продающего поездки в 3-х группах: sharm, hurgada и taba.
  Кол-во мест в группах ограничено (создайте переменные для хранения мест в группах): 
    * sharm - 15
    * hurgada - 25
    * taba - 6.
  Когда пользователь посещает страницу, ему необходимо предложить ввести число необходимых мест,
  результат сохранить в переменную.
  Необходимо проверить являются ли введенные данные целым положительным числом. 
  
    - В случае неверного ввода от пользователя, скрипт показывает alert с текстом 
      "Ошибка ввода" и больше ничего не делает.
    - В случае верного ввода, последовательно проверить кол-во мест в группах, 
      и кол-во необходимых мест введенных пользователем.
  Если была найдена группа в которой количество мест больше либо равно необходимому, 
  вывести сообщение через confirm, что есть место в группе такой-то, согласен ли 
  пользоваетель быть в этой группе?
    * Если ответ да, показать alert с текстом 'Приятного путешествия в группе <имя группы>'
    * Если ответ нет, показать alert с текстом 'Нам очень жаль, приходите еще!'
  
  Если мест нигде нет, показать alert с сообщением 'Извините, столько мест нет ни в одной группе!'
*/

'use strict';

const totalSharm = 15;
const totalHurgada = 25;
const totalTaba = 6;
let userGroup;

const number = Number(prompt('Enter the desired places number'));

if (Number.isInteger(number) && number > 0) {
  if (number > totalSharm && number > totalHurgada && number > totalTaba) {
    alert("Sorry, we don't have enough places in any group!");
  } else {
    if (number <= totalSharm) {
      userGroup = 'Sharm';
    } else if (number <= totalHurgada) {
      userGroup = 'Hurgada';
    } else {
      userGroup = 'Taba';
    }

    const userResponse = confirm(
      `There is enough places in the ${userGroup} group. Do you confirm?`,
    );

    if (userResponse) {
      alert(`Have a nice journey in the ${userGroup} group`);
    } else {
      alert("We're very sorry. Please come again!");
    }
  }
} else {
  alert('Wrong entry');
}
