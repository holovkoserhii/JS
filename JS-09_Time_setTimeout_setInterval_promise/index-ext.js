'use strict';

/*
  ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ
  
  Выполните домашнее задание используя класс с полями и методами.
  
  На вход класс Stopwatch принимает только ссылку на DOM-узел в котором будет 
  динамически создана вся разметка для секундомера.
  
  Должна быть возможность создать сколько угодно экземпляров секундоментов 
  на странице и все они будут работать независимо.
  
  К примеру:
  
  new Stopwatch(parentA);
  new Stopwatch(parentB);
  new Stopwatch(parentC);
  
  Где parent* это существующий DOM-узел. 
*/

class Stopwatch {
  constructor(parentNode) {
    this.parentNode = parentNode;
    this.timeStarted = 0;
    this.timeDelta = 0;
    this.isActive = false;
    this.timeUpdate = null;
    this.init();
    this.start = document.querySelector(
      `.${this.parentNode.classList[0]} .js-start`,
    );
    this.lap = document.querySelector(
      `.${this.parentNode.classList[0]} .js-take-lap`,
    );
    this.reset = document.querySelector(
      `.${this.parentNode.classList[0]} .js-reset`,
    );
    this.time = document.querySelector(
      `.${this.parentNode.classList[0]} .js-time`,
    );
    this.laps = document.querySelector(
      `.${this.parentNode.classList[0]} .js-laps`,
    );
    this.prepare();
  }

  init() {
    this.parentNode.insertAdjacentHTML(
      'beforeend',
      `<div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>`,
    );
  }

  prepare() {
    this.start.addEventListener('click', this.startCount.bind(this));
    this.reset.addEventListener(
      'click',
      this.resetTime.bind(this),
    );
    this.lap.addEventListener('click', this.saveLap.bind(this));
    this.lap.disabled = true;
    this.reset.disabled = true;
  }

  // Starting or pausing
  startCount() {
    if (!this.isActive) {
      this.lap.disabled = false;
      this.reset.disabled = false;
      this.isActive = true;
      this.start.textContent = 'Pause';
      this.timeStarted = Date.now();
      this.timeUpdate = setInterval(this.timeOnDisplay.bind(this), 100);
    }
    else {
      this.isActive = false;
      this.start.textContent = 'Continue';
      clearInterval(this.timeUpdate);
      this.timeDelta += Date.now() - this.timeStarted;
    }
  }

  // Transfers and appends the current time to the js-laps element
  saveLap() {
    this.laps.insertAdjacentHTML(
      'beforeEnd',
      `<li>${this.time.textContent}</li>`,
    );
  }

  // Sets the time to 0 and renews the starting parameters
  resetTime() {
    clearInterval(this.timeUpdate);
    this.timeStarted = 0;
    this.isActive = false;
    this.time.textContent = '00:00.0';
    this.laps.innerHTML = '';
    this.timeDelta = 0;
    this.start.textContent = "Start";
  }

  // Updates the time to the time element
  timeOnDisplay() {
    const present = Date.now();
    const delta = new Date(present - this.timeStarted + this.timeDelta);
    const min =
      delta.getMinutes() > 9
        ? `${delta.getMinutes()}`
        : `0${delta.getMinutes()}`;
    const sec =
      delta.getSeconds() > 9
        ? `${delta.getSeconds()}`
        : `0${delta.getSeconds()}`;
    const mls = `${Math.floor(delta.getMilliseconds() / 100)}`;
    this.time.textContent = `${min}:${sec}.${mls}`;
  }
}

const parentA = document.querySelector('.parentA');
const parentB = document.querySelector('.parentB');
const parentC = document.querySelector('.parentC');
new Stopwatch(parentA);
new Stopwatch(parentB);
new Stopwatch(parentC);