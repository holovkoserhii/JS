'use strict';

export default class Model {

  updLS() {
    console.log("starting LS update");
    console.log(this._sitesArr);
    localStorage.setItem('sitesArray', JSON.stringify(this._sitesArr));
  }

  addToLocalStorage(obj) {
    console.log('start');
    console.log('this._sitesArr: ', this._sitesArr);
    console.log('obj : ', obj);
    this._sitesArr.unshift(obj);
    console.log(this._sitesArr);
    this._model.updLS.call(this);
    console.log(this);
    this._view.showItems.call(this);
    this._view.refs.form.reset();
  }

  removeFromLocalStorage(id) {
    console.log(this);
    const objToDelete = this._sitesArr.find(el => el.url === id);
    this._sitesArr.splice(this._sitesArr.indexOf(objToDelete), 1);
    console.log(this._sitesArr);
    this._model.updLS.call(this);
    this._view.showItems.call(this);
  }

  checkPresent(url) {
    const matchArr = this._sitesArr.filter(el => el.url === url);
    console.log(this._sitesArr);
    console.log(matchArr);
    return matchArr.length > 0;
  }

  getInfo(evt) {
    evt.preventDefault();
    const userUrlValue = this._view.refs.userUrlField.value;
    console.log(userUrlValue);
    console.log(this);
    console.log(this._view.checkValid(userUrlValue));

    const API_KEY = '5baa8080bf727afb735190e7841c374bda633412561ba';
    const API_URL = 'http://api.linkpreview.net/';

    if (!this._view.checkValid(userUrlValue)) {
      alert('You have entered a wrong url!');
      return;
    }

    fetch(`${API_URL}?key=${API_KEY}&q=${userUrlValue}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error(`Error when fetching data: ${response.statusText}`);
      })
      .then(data => {
        console.log(data);
        if (this._model.checkPresent.call(this, data.url)) {
          alert('This url is present in your storage!');
          throw new Error('This url is present in your storage!');
        };
        return data;
      })
      .then(data => {
        console.log(this);
        console.log(data);
        console.log("calling addtolocalstorage");
        this._model.addToLocalStorage.call(this, data);
      })
      .catch(error => console.log('Site not found! ' + error));
  }
}
