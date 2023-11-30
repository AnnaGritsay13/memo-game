const game = document.querySelector('.wrap'),
  imgs = [
    'img/luna.jpg',
    'img/busya.jpg',
    'img/luna&sunny.jpg',
    'img/sunny.jpg',
  ],
  allImgs = Array.prototype.concat(imgs, imgs),
  btn = document.querySelector('.my-btn');

let sortAllImg = allImgs.sort(() => (Math.random() > 0.5 ? 2 : -1)),
  x = 2,
  y = 2,
  length = sortAllImg.length;

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

for (let i = 0; i < allImgs.length; i++) {
  let box = document.createElement('div');
  box.classList.add('cards');

  box.innerHTML = `
     <div class="card" data-id="${sortAllImg[i]}">
        <div class="front"></div>
        <div class="back" >
          <img src="${sortAllImg[i]}" alt="#" />
        </div>
     </div>
`;
  game.appendChild(box);
}

const cards = document.querySelectorAll('.card');
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

      firstCard.forEach((item) => item.classList.remove('no-click'));
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

btn.addEventListener('click', closeCard);

function closeCard() {
  cards.forEach((card) => {
    card.firstElementChild.classList.remove('front__rotate');
    card.lastElementChild.classList.remove('back__rotate');
    card.classList.remove('no-click');
  });
}

cards.forEach((card) => {
  card.addEventListener('click', onClick);
});
