'use strict';

export default class View {
  constructor() {
    this.refs = {};
    this.refs.form = document.querySelector('form');
    this.refs.userUrlField = document.querySelector('#url');
    this.refs.addButton = document.querySelector('button');
    this.refs.result = document.querySelector('.result');
    this.refs.template = Handlebars.compile(
      document.querySelector('#cards').innerHTML.trim(),
    );
  }

  checkValid(url) {
    const urlExp = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    return urlExp.test(url);
  }

  handleRemoveCard(evt) {
    const target = evt.target;
    if (target.tagName !== 'BUTTON' || !target.classList.contains('remove'))
      return;
    const card = target.closest('.card');
    console.log(target);
    console.log(card);
    console.log(this);
    const id = card.querySelector(".url-id").textContent;
    console.log(id);
    this._model.removeFromLocalStorage.call(this, id);
  }

  showItems() {
    console.log(this._sitesArr);
    const markup = this._sitesArr.map(el => this._view.refs.template(el));
    console.log(markup);
    this._view.refs.result.innerHTML = markup;
  }
}
