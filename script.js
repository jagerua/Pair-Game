const cardsTable = document.querySelector('.game-desk');

const easyBtn = document.querySelector('.easy');
const hardBtn = document.querySelector('.hard');
const resetBtn = document.querySelector('.reset');

let mode = 12;



const cardsArr = [
  {
    id: "card01",
    imgSrc: "./assets/card01.png",
    title: 'Seymour Skinner',
    class: 'card01'
  },
  {
    id: "card02",
    imgSrc: "./assets/card02.png",
    title: 'Moe Szyslak',
    class: 'card02'
  },
  {
    id: "card03",
    imgSrc: "./assets/card03.png",
    title: 'Homer Simpson',
    class: 'card03'
  },
  {
    id: "card04",
    imgSrc: "./assets/card04.png",
    title: 'Ned Flanders',
    class: 'card04'
  },
  {
    id: "card05",
    imgSrc: "./assets/card05.png",
    title: 'Chief Clancy Wiggum',
    class: 'card05'
  },
  {
    id: "card06",
    imgSrc: "./assets/card06.png",
    title: 'Bart Simpson',
    class: 'card06'
  },
  {
    id: "card07",
    imgSrc: "./assets/card07.png",
    title: 'Barney Gumble',
    class: 'card07'
  },
  {
    id: "card08",
    imgSrc: "./assets/card08.png",
    title: 'Reverend Timothy Lovejoy',
    class: 'card08'
  },
  {
    id: "card09",
    imgSrc: "./assets/card09.png",
    title: 'Krusty The Clown',
    class: 'card09'
  },
  {
    id: "card10",
    imgSrc: "./assets/card10.png",
    title: 'Maggie Simpson',
    class: 'card10'
  },
  {
    id: "card11",
    imgSrc: "./assets/card11.png",
    title: 'Barry Huffman',
    class: 'card11'
  },
  {
    id: "card12",
    imgSrc: "./assets/card12.png",
    title: 'Abraham Simpson',
    class: 'card12'
  }
];

// --------------------------------- Card render -----------------------//
let cardsRender = function (arr) {
  let itemsStr = '';
  // Rendering the HTML code to fill the page
  for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      itemsStr += (`
        <div id="${element.id}" class="flip-container cards ${element.class}";>
          <div class="flipper">
            <div class="front">
              <img src="./assets/backCard.png" alt="">
            </div>
            <div class="back">
              <img src="${element.imgSrc}" alt="">
            </div>
          </div>
        </div>`);
  }
  return itemsStr;
};

// Shuffleing the cards 
function shuffleCards (arr, mode) {
  return arr.slice(0, mode).flatMap(i => [i, i]).sort(() => .5 - Math.random());
}

function showMode () {
  let cardEl = cardsRender(shuffleCards(cardsArr, mode));
  cardsTable.insertAdjacentHTML('afterBegin', cardEl);
}

showMode();
// ------------------------ Making Easy & Hard modes -------------------//

// Click on Easy Btn to show 12 cards and refresh them
easyBtn.addEventListener('click', function () {
  cardsTable.style.gridTemplateColumns = '100px 100px 100px 100px';
  cardsTable.style.justifyContent = 'center';
  cardsTable.style.alignContent = 'center';
  mode = 6;

  if (cardsTable.innerHTML === '') {
    showMode();
  } else {
    cardsTable.innerHTML = '';
    showMode();
  };
});

// Click on Hard Btn to show 6 cards and refresh them
hardBtn.addEventListener('click', function () {
  cardsTable.style.gridTemplateColumns = '100px 100px 100px 100px 100px 100px';
  cardsTable.style.removeProperty("justifyContent");
  cardsTable.style.removeProperty("alignContent");
  mode = 12;

  if (cardsTable.innerHTML === '') {
    showMode();
  } else {
    cardsTable.innerHTML = '';
    showMode();
  };
});

// ------------------------ Making Easy & Hard modes -------------------//
let cardStorage = [];
let cardValue = [];
let counter = 0;

// ------------------------ Rotate card on click -------------------//


  let click = document.addEventListener('click', function (e) {
    let flip = e.target.closest('.flipper').classList.toggle('is-flipped');
    let cardId = e.target.closest('.flip-container').getAttribute('id');
    let cardDiv = e.target.closest('.flip-container');

    addingToArr(cardId, cardDiv);
    // console.log(e.target.closest('.flip-container').getAttribute('id'));
  });

  
// ------------------------ Rotate card on click -------------------//

// ------------------------ Rotate card on click -------------------//

  function addingToArr (cardId, cardDiv) {
    if (counter !== 2) {
      cardValue.push(cardId);
      cardDiv.classList.add('open');
      counter++;
    } else {
      matching();
      counter = 0;
    }
    
    console.log(cardValue);
    console.log(counter);
    console.log(cardDiv);
  }

// ------------------------ Rotate card on click -------------------//

// ------------------------ Checking for Match (card === card) -------------------//


function matching () {
  if (cardValue[0] === cardValue[1]) {
    
  }
};

// ------------------------ Checking for Match (card === card) -------------------//