const paint = document.getElementById('paint');
const context = paint.getContext('2d');
const state = {
  isDrowing: false,
  prevX: 0,
  currX: 0,
  prevY: 0,
  currY: 0,
  strokeStyle: 'black',
  lineWidth: 2,
};
const color = document.querySelector('.js-color');
const eraser = document.querySelector('.eraser-elem');
const eraseBtn = document.querySelector('.erase-btn');

function initDrawing() {
  paint.addEventListener('mousedown', evt => {
    getCoords('down', evt);
  });
  paint.addEventListener('mousemove', evt => {
    getCoords('move', evt);
  });
  paint.addEventListener('mouseup', evt => {
    getCoords('stop', evt);
  });
  paint.addEventListener('mouseout', evt => {
    getCoords('stop', evt);
  });
}

function draw() {
  context.beginPath();
  context.moveTo(state.prevX, state.prevY);
  context.lineTo(state.currX, state.currY);
  context.strokeStyle = state.strokeStyle;
  context.lineWidth = state.lineWidth;
  context.stroke();
  context.closePath();
}

function getCoords(type, evt) {
  if (type === 'move') {
    if (state.isDrowing) {
      state.prevX = state.currX;
      state.prevY = state.currY;
      state.currX = evt.clientX - paint.offsetLeft;
      state.currY = evt.clientY - paint.offsetTop;
      draw();
    }
  }
  if (type === 'down') {
    state.currX = evt.clientX - paint.offsetLeft;
    state.currY = evt.clientY - paint.offsetTop;
    state.isDrowing = true;
    state.isDot = true;
    context.beginPath();
    context.fillStyle = state.strokeStyle;
    context.fillRect(state.currX, state.currY, 2, 2);
    context.closePath();
    state.isDot = false;
  }
  if (type === 'stop') {
    state.isDrowing = false;
  }
}

function toggleColor() {
  state.strokeStyle = color.value;
  state.lineWidth = 2;
  paint.style.cursor = 'url(./img/pencil.png), auto';
}

function setEraser() {
  state.strokeStyle = 'white';
  state.lineWidth = 14;
  paint.style.cursor = 'url(./img/eraser.png), auto';
}

function erase() {
  context.clearRect(0, 0, paint.clientWidth, paint.clientHeight);
  toggleColor();
}

color.addEventListener('input', toggleColor);
eraser.addEventListener('click', setEraser);
eraseBtn.addEventListener('click', erase);

initDrawing();
