const cardsTable = document.querySelector('.game-desk');
let scoreDiv = document.querySelector('.scoreNum');

const easyBtn = document.querySelector('.easy');
const hardBtn = document.querySelector('.hard');
const resetBtn = document.querySelector('.reset');

const modelWindow = document.querySelector('.modal');
const winWindow = document.querySelector('.win');
const loseWindow = document.querySelector('.lose');
let resultScore = document.querySelectorAll('.modelScoreNumber');

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

// ------------------------------------ Card render --------------------------//
let cardsRender = function (arr) {
  let itemsStr = '';
  // Rendering the HTML code to fill the page
  for (let i = 0; i < arr.length; i++) {
      let element = arr[i];
      itemsStr += (`
        <div id="${element.id}" data-key='${element.id}-${i}' class="flip-container cards ${element.class}";>
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

// Render amount of cards on card table
function showMode () {
  let cardEl = cardsRender(shuffleCards(cardsArr, mode));
  cardsTable.insertAdjacentHTML('afterBegin', cardEl);
}
// Render home screen with 12 cards
showMode();
// -------------------------- Making Easy & Hard modes ----------------------//

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
    // reset();
  };
});

// Click on Hard Btn to show 6 cards and refresh them
hardBtn.addEventListener('click', function () {
  cardsTable.style.gridTemplateColumns = '100px 100px 100px 100px 100px 100px';
  cardsTable.style.removeProperty("justifyContent");
  cardsTable.style.removeProperty("alignContent");
  mode = 12;

// Check if card table is empty  
  if (cardsTable.innerHTML === '') {
    showMode();
  } else {
    cardsTable.innerHTML = '';
    showMode();
  };
  // reset();
});

// -------------------------- Making Easy & Hard modes ----------------------//
// Storage to memories selected cards
let cardStorage = [];
let cardValue = [];
let counter = 0;

// ---------------------------- Rotate card on click ------------------------//

document.addEventListener('click', function (e) {
  let flip = e.target.closest('.flipper').classList.toggle('is-flipped');
  let cardId = { id: e.target.closest('.flip-container').getAttribute('id'), key: e.target.closest('.flip-container').getAttribute('data-key') };
  let cardDiv = e.target.closest('.flip-container');

  addingToArr(cardId, cardDiv);
});
  
// ---------------------------- Rotate card on click ------------------------//

// ------------------------ Adding to Arr to check Match --------------------//

  function addingToArr (cardId, cardDiv) {
    cardValue.push(cardId);
    cardStorage.push(cardDiv);
    counter++;
    
    if (counter === 2) {
      matching(cardValue, cardStorage);
      counter = 0;
    }
  }

// ------------------------ Adding to Arr to check Match --------------------//

// ---------------------- Checking for Match (card === card) ----------------//

function matching () {
  let score = +document.querySelector('.scoreNum').innerHTML;
  let cardOne = cardStorage[0];
  let cardTwo = cardStorage[1];
  console.log(cardOne);
  console.log(cardTwo);

  // console.log(cardStorage[0].classList.contains('.open') === cardStorage[1].classList.contains('.open'));
  const isSameCard = cardValue[0].key === cardValue[1].key;
  if (cardValue[0].id === cardValue[1].id && !isSameCard) {
    cardOne.classList.add('match');
    cardTwo.classList.add('match');
    cardOne.removeEventListener('click', function (e) {
      e.target.closest('.flipper').classList.remove('is-flipped');
    });
    cardTwo.removeEventListener('click', function (e) {
      e.target.closest('.flipper').classList.remove('is-flipped');
    });
    scoreDiv.innerHTML = score + 10;
    cardsLeft();
    
  } else if (cardValue[0] !== cardValue[1] && !isSameCard) {
    scoreDiv.innerHTML = score - 5;

    setTimeout(function () {
      cardOne.querySelector('.flipper').classList.toggle('is-flipped');
      cardTwo.querySelector('.flipper').classList.toggle('is-flipped');
    }, 500);
  };
  console.log(scoreDiv.innerText);
  cardStorage = [];
  cardValue = [];
  
};
// --------------------- Checking for Match (card === card) ----------------//

// --------------------------------- Win \ Lose ----------------------------//

  function win () {
    resultScore.innerText = rate();
    modelWindow.style.visibility = 'visible';
    winWindow.style.visibility = 'visible';

// Hide Win screen after some time
    setTimeout(function () {
      reset();
      modelWindow.style.visibility = 'hidden';
      winWindow.style.visibility = 'hidden';
    }, 2000);
  };

  function lose () {
    resultScore.innerText = rate();
    modelWindow.style.visibility = 'visible';
    loseWindow.style.visibility = 'visible';

    setTimeout(function () {
      reset();
      modelWindow.style.visibility = 'hidden';
      loseWindow.style.visibility = 'hidden';
    }, 2000);
  };

// --------------------------------- Win \ Lose ----------------------------//

// ------------------------------------ Rate -------------------------------//

function rate () {
  let modelResult = resultScore.forEach(function (el) {
     return el.innerText = +scoreDiv.innerText;
  });
}

// ------------------------------------ Rate -------------------------------//

// -------------------- Chacking if there is cards on table ----------------//

function cardsLeft () {
  let pairsHave = document.querySelectorAll(`.match`).length;
  // Checking if num of cards = matching cards
  if (pairsHave === cardsTable.children.length) {
    // 
    if (scoreDiv.innerHTML > 0) {
      win();
    } else {
      lose();
    }
  };
};
// --------------------- Chacking if there is cards on table ---------------//

// ------------------------------- Click on Reset --------------------------//

  function reset () {
    let pairsHave = document.querySelectorAll(`.match`);
    let allCards = document.querySelectorAll('.cards');
    allCards.forEach (function (el) {
      el.querySelector('.flipper').classList.toggle('is-flipped');
    })
    pairsHave.forEach( function (el) {
      el.classList.remove('match');
    })
    scoreDiv.innerHTML = 0;
  };

// ------------------------------- Click on Reset --------------------------//

// ----------------------------------- Reset -------------------------------//

  resetBtn.addEventListener('click', function (e) {
    reset();

    if (cardsTable.innerHTML === '') {
      showMode();
    } else {
      cardsTable.innerHTML = '';
      showMode();
    };
  });

// ----------------------------------- Reset -------------------------------//