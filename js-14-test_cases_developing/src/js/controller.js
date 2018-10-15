'use strict';

export default class Controller {
  constructor(model, view) {
    this._model = model;
    this._view = view;
    this._view.refs.addButton.addEventListener(
      'click',
      this._model.getInfo.bind(this),
    );
    document.addEventListener('DOMContentLoaded', this.show.bind(this));
    this._view.refs.result.addEventListener(
      'click',
      this._view.handleRemoveCard.bind(this),
    );
    this.init();
  }

  init() {
    this._sitesArr = JSON.parse(localStorage.getItem('sitesArray')) || [];
    console.log(this);
    console.log(this._sitesArr);
    return this;
  }

  show() {
    this._view.showItems.call(this);
  }

}