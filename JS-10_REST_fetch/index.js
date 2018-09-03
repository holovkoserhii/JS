'use strict';

/*
  Написать приложение для работы с REST сервисом, 
  все функции делают запрос и возвращают Promise 
  с которым потом можно работать. 
  
  Реализовать следующий функционал:
  - функция getAllUsers() - должна вернуть текущий список всех пользователей в БД.
  
  - функция getUserById(id) - должна вернуть пользователя с переданным id.
  
  - функция addUser(name, age) - должна записывать в БД юзера с полями name и age.
  
  - функция removeUser(id) - должна удалять из БД юзера по указанному id.
  
  - функция updateUser(id, user) - должна обновлять данные пользователя по id. 
    user это объект с новыми полями name и age.
  Документацию по бэкенду и пример использования прочитайте 
  в документации https://github.com/trostinsky/users-api#users-api.
  Сделать минимальный графический интерфейс в виде панели с полями и кнопками. 
  А так же панелью для вывода результатов операций с бэкендом.
*/
const API_URL = 'https://test-users-api.herokuapp.com/users/';
const refs = {
  showAllBtn: document.querySelector('[data-action="showAll"]'),
  result: document.querySelector('.result'),
  idSpecific: document.querySelector('.id-specific'),
  addNew: document.querySelector('[data-action="addNew"]'),
  userName: document.querySelector('.name'),
  userAge: document.querySelector('.age'),
  userId: document.querySelector('.id'),
  updateBtn: null,
  removeBtn: null,
};
refs.idSpecific.addEventListener('input', changeBtnTitle);
refs.showAllBtn.addEventListener('click', getAllUsersOrById);
refs.addNew.addEventListener('click', addUser);

//Creates / Updates user. Triggers viewUsersInTable
function addUser(ev) {
  ev.preventDefault();
  const uName = refs.userName.value.trim();
  const uAge = +refs.userAge.value.trim();
  const userCredentials = { name: uName, age: uAge };
  //Update
  if (refs.userId.value) {
    if (!uName || !uAge) return;
    fetch(`${API_URL}${refs.userId.value}`, {
      method: 'PUT',
      body: JSON.stringify(userCredentials),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => viewUsersInTable(data.data))
      .catch(err => console.log(err));
  } else {

    //Create
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(userCredentials),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) throw new Error('Cannot add user');
        return response.json();
      })
      .then(data => {
        viewUsersInTable(data.data);
      })
      .catch(error => console.log(error));
  }
}

// Changes first button's title depending on whether there if an ID psecified by user or not
function changeBtnTitle() {
  if (refs.idSpecific.value) {
    refs.showAllBtn.textContent = 'Show user by ID';
  } else {
    refs.showAllBtn.textContent = 'Show all users';
  }
}

//Reads data: all or specific. Triggers viewUsersInTable
function getAllUsersOrById(ev) {
  ev.preventDefault();
  fetch(`${API_URL}${refs.idSpecific.value}`)
    .then(response => {
      if (response.ok) return response.json();
      throw new Error(`Error when fetching data: ${response.statusText}`);
    })
    .then(data => viewUsersInTable(data['data']))
    .catch(error => console.log('User not found! ' + error));
}

//Displays search result into a table. Hangs eventListener for updateUser and removeUser
function viewUsersInTable(obj) {
  let tableBegin =
    '<table><thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Controls</th></tr></thead><tbody>';
  const tableEnd = '</tbody></table>';
  let newArr = [];

  if (obj instanceof Array) {
    newArr = obj;
  } else {
    // Якщо fetch поверне 1 елемент, то на ньому map не спрацює. Обертаємо в масив
    newArr.push(obj);
  }
  newArr.map(el => {
    tableBegin += `<tr><td>${el.id || el._id}</td><td>${el.name}</td><td>${
      el.age
    }</td><td><button class="button" data-action="upd">Update</button><button class="button" data-action="rem">Remove</button></td></tr>`;
  });
  refs.result.innerHTML = tableBegin + tableEnd;

  refs.updateBtn = refs.result.querySelectorAll('[data-action="upd"]');
  refs.removeBtn = refs.result.querySelectorAll('[data-action="rem"]');
  Array.from(refs.removeBtn).map(btn =>
    btn.addEventListener('click', removeUser),
  );
  Array.from(refs.updateBtn).map(btn =>
    btn.addEventListener('click', updateUser),
  );
  init();
}

//Deletes user
function removeUser(event) {
  event.preventDefault();
  const tr = event.target.closest('tr');
  const id = tr.firstElementChild.textContent;
  fetch(`${API_URL}${id}`, { method: 'DELETE' })
    .then(response => {
      if (!response.ok) throw new Error('Cannot delete');
      tr.remove();
    })
    .catch(error => console.log(error));
}

//Updates user credentials
function updateUser() {
  const tr = event.target.closest('tr');
  const id = tr.firstElementChild.textContent;
  refs.addNew.textContent = 'Update user credentials';
  refs.userName.value = tr.querySelector(':nth-child(2)').textContent;
  refs.userAge.value = tr.querySelector(':nth-child(3)').textContent;
  refs.userId.value = tr.querySelector(':nth-child(1)').textContent;
}

function init() {
  refs.userId.value = "";
  refs.userName.value = "";
  refs.userAge.value = "";
  refs.addNew.textContent = '+ Add new user';

}
// old
// function updateUser() {
//   const tr = event.target.closest('tr');
//   const id = tr.firstElementChild.textContent;
//   const newName = prompt('Enter new name');
//   const newAge = +prompt('Enter new age');
//   if (!newName || !newAge) return;
//   const newParams = {
//     name: newName,
//     age: newAge,
//   };
//   fetch(`${API_URL}${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(newParams),
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   })
//     .then(resp => resp.json())
//     .then(data => {
//       data.data.id = id;
//       viewUsersInTable(data.data);
//     })
//     .catch(err => console.log(err));
// }
