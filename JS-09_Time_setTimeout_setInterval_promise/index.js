'use strict';

/*
  Создайте скрипт секундомера.  
  По ссылке можно посмотреть пример выбрав Stopwatch http://www.online-stopwatch.com/full-screen-stopwatch/
  
  Изначально в HTML есть разметка:
  
  <div class="stopwatch">
    <p class="time js-time">00:00.0</p>
    <button class="btn js-start">Start</button>
    <button class="btn js-take-lap">Lap</button>
    <button class="btn js-reset">Reset</button>
  </div>
  <ul class="laps js-laps"></ul>
  
  Добавьте следующий функционал:
  
  - При нажатии на кнопку button.js-start, запускается таймер, который считает время 
    со старта и до текущего момента времени, обновляя содержимое элемента p.js-time 
    новым значение времени в формате xx:xx.x (минуты:секунды.сотни_миллисекунд).
       
    🔔 Подсказка: так как необходимо отображать только сотни миллисекунд, интервал
                  достаточно повторять не чаще чем 1 раз в 100 мс.
    
  - Когда секундомер запущен, текст кнопки button.js-start меняется на 'Pause', 
    а функционал при клике превращается в оставновку секундомера без сброса 
    значений времени.
    
    🔔 Подсказка: вам понадобится буль который описывает состояние таймера активен/неактивен.
  
  - Если секундомер находится в состоянии паузы, текст на кнопке button.js-start
    меняется на 'Continue'. При следующем клике в нее, продолжается отсчет времени, 
    а текст меняется на 'Pause'. То есть если во время нажатия 'Pause' прошло 6 секунд 
    со старта, при нажатии 'Continue' 10 секунд спустя, секундомер продолжит отсчет времени 
    с 6 секунд, а не с 16. 
    
    🔔 Подсказка: сохраните время секундомера на момент паузы и используйте его 
                  при рассчете текущего времени после возобновления таймера отнимая
                  это значение от времени запуска таймера.
    
  - Если секундомер находится в активном состоянии или в состоянии паузы, кнопка 
    button.js-reset должна быть активна (на нее можно кликнуть), в противном случае
    disabled. Функционал при клике - остановка таймера и сброс всех полей в исходное состояние.
    
  - Функционал кнопки button.js-take-lap при клике - сохранение текущего времени секундомера 
    в массив и добавление в ul.js-laps нового li с сохраненным временем в формате xx:xx.x
*/
let timeStarted = 0;
let timeDelta = 0;
let isActive = false;
let timeUpdate;

const start = document.querySelector('.js-start');
start.addEventListener('click', startCount);

const lap = document.querySelector('.js-take-lap');
lap.disabled = true;

const reset = document.querySelector('.js-reset');
reset.disabled = true;
reset.addEventListener('click', resetTime.bind(null, timeUpdate));

const time = document.querySelector('.js-time');

const laps = document.querySelector('.js-laps');



function startCount() {
  if (!isActive) {
    lap.addEventListener('click', saveLap);
    lap.disabled = false;
    reset.disabled = false;
    isActive = true;
    start.textContent = 'Pause';
    timeStarted = Date.now();
    timeUpdate = setInterval(timeOnDisplay, 100);
  }
  else {
    isActive = false;
    start.textContent = 'Continue';
    clearInterval(timeUpdate);
    timeDelta += Date.now() - timeStarted;
  }
}

// Sets the time to 0 and renews the starting parameters
function resetTime(param) {
  clearInterval(param);
  timeStarted = 0;
  isActive = false;
  time.textContent = '00:00.0';
  laps.innerHTML = "";
  timeDelta = 0;
  start.textContent = "Start";
}

// Updates the time to the time element
function timeOnDisplay() {
  const present = Date.now();
  const delta = new Date(present - timeStarted + timeDelta);
  const min =
    delta.getMinutes() > 9 ? `${delta.getMinutes()}` : `0${delta.getMinutes()}`;
  const sec =
    delta.getSeconds() > 9 ? `${delta.getSeconds()}` : `0${delta.getSeconds()}`;
  const mls = `${Math.floor(delta.getMilliseconds() / 100)}`;
  time.textContent = `${min}:${sec}.${mls}`;
}

// Transfers and appends the current time to the js-laps element
function saveLap() {
  const timeForLap = time.textContent;
  laps.insertAdjacentHTML('beforeEnd', `<li>${timeForLap}</li>`);
}