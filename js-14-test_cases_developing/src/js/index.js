'use strict';

/*
  Возьмите домашнее задание №12 и перепишите его ипользуя паттерн MVC.
  
  Вынесите отдельно логику, отдельно представление и реакцию на действия пользователя. 
  Model, View и Controller вынести в отдельные файлы и сделать классами.
  
  Используйте ES6 модули и Webpack для сборки.
  
  Использование будет выглядеть следующим образом.
*/

// в index.js
import Model from './model';
import View from './view';
import Controller from './controller';

const model = new Model();
const view = new View();

new Controller(model, view);