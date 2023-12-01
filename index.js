const game = document.querySelector('.wrap'),
  imgs = [
    'img/luna.jpg',
    'img/busya.jpg',
    'img/luna&sunny.jpg',
    'img/sunny.jpg',
  ],
  btn = document.querySelectorAll('.my-btn');

let allImgs = [],
  x = 2,
  y = 2;

function createArr(n) {
  for (let i = 0; n > i; i++) {
    allImgs.push(imgs[i], imgs[i]);
  }
  allImgs.sort(() => (Math.random() > 0.5 ? 2 : -1));
}

function createCards(arr) {
  arr.forEach((item) => {
    let box = document.createElement('div');
    box.classList.add('cards');
    box.innerHTML = `
       <div class="card" data-id="${item}}">
          <div class="front"></div>
          <div class="back" >
            <img src="${item}" alt="#" />
          </div>
       </div>
  `;
    game.appendChild(box);
  });

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', onClick);
  });
}

function createGrid(length) {
  if (length <= 4) {
    game.setAttribute(
      'style',
      `grid-template-columns: repeat(${x}, 20vmin); grid-template-rows: repeat(${y}, 25vmin)`
    );
  } else if (length > 4 && window.screen.width <= 650) {
    game.setAttribute(
      'style',
      `grid-template-columns: repeat(${2}, 25vmin); grid-template-rows: repeat(${
        length / x
      }, 30vmin)`
    );
  } else {
    game.setAttribute(
      'style',
      `grid-template-columns: repeat(${
        x * 2
      }, 20vmin); grid-template-rows: repeat(${length / (x * 2)}, 25vmin)`
    );
  }
}

let arr = [],
  a = [];

function onClick(e) {
  let card = e.target.parentElement;
  let firstCard = document.querySelectorAll(`[data-id='${a[0]}']`);
  card.firstElementChild.classList.add('front__rotate');
  card.lastElementChild.classList.add('back__rotate');

  card.classList.add('no-click');

  arr.push(card.lastElementChild.firstElementChild.src);
  let id = card.dataset.id;
  a.push(id);

  if (arr.length === 2) {
    if (arr[0] === arr[1]) {
      arr.length = 0;
      a.length = 0;
    } else if (arr[0] !== arr[1]) {
      game.classList.add('no-click');

      firstCard.forEach((item) => {
        item.addEventListener('click', timer);
        item.classList.remove('no-click');
      });

      card.classList.remove('no-click');

      setTimeout(() => {
        firstCard.forEach((item) => {
          item.firstElementChild.classList.remove('front__rotate');
          item.lastElementChild.classList.remove('back__rotate');
        });

        card.firstElementChild.classList.remove('front__rotate');
        card.lastElementChild.classList.remove('back__rotate');

        arr.length = 0;
        a.length = 0;
        game.classList.remove('no-click');
      }, 1000);
    }
  }
}

btn.forEach((item) => {
  item.addEventListener('click', (e) => {
    if (e.target.innerText === 'RESET') {
      let count = allImgs.length;
      reset();
      createArr(count / 2);
      createGrid(allImgs.length);
      createCards(allImgs);
      clearInterval(interval);
      clearTimer();
      interval = setInterval(updateTime, 100);
    } else if (e.target.innerText === 'EASY') {
      if (allImgs.length === 0 || allImgs.length > 4) {
        reset();
        createArr(2);
        createGrid(allImgs.length);
        createCards(allImgs);
        clearInterval(interval);
        clearTimer();
        interval = setInterval(updateTime, 100);
      }
    } else if (e.target.innerText === 'NORMAL') {
      if (allImgs.length === 0 || allImgs.length < 8) {
        reset();
        createArr(4);
        createGrid(allImgs.length);
        createCards(allImgs);
        clearInterval(interval);
        clearTimer();
        interval = setInterval(updateTime, 100);
      }
    }
  });
});

function reset() {
  if (allImgs.length > 0) {
    allImgs = [];
    let cards = document.querySelectorAll('.cards');
    cards.forEach((item) => item.remove());
  }
}

//timer
let timer = document.getElementById('timer');

let milseconds = 0,
  seconds = 0,
  minutes = 0,
  interval;

function updateTime() {
  milseconds++;
  if (milseconds === 60) {
    seconds++;
    milseconds = 0;
  }
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }
  timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}:${milseconds.toString().padStart(2, '0')}`;
}

function clearTimer() {
  (milseconds = 0), (seconds = 0), (minutes = 0);
  timer.textContent = '00:00:00';
}
