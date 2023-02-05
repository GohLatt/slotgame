//price data----------------------------------------------------------
const priceArr = [
  {
    realPrice: 1000,
    kPrice: "1k.jpeg",
  },
  {
    realPrice: 5000,
    kPrice: "5k.jpeg",
  },
  {
    realPrice: 10000,
    kPrice: "10k.jpg",
  },
  {
    realPrice: 25000,
    kPrice: "25k.jpg",
  },
];

// fro alret box message-----------------------------------------

const alretArr = new Map([
  [true, "Please bet as you like"],
  [false, "Please chose money chips"],
  ["click", "Please wait! The answer will show After 5 seconds"],
  ["noRef", "Refree mod is not available right now.Thank You"],
]);

let gameMode = 0; // game mode ref = 0 (or) playermode (1)
let betPrice, betChip, betImgsrc, amount, itemNumber, winPrice;
const moneyChip = document.querySelectorAll(".money-chip img");
const gameSection = document.querySelector(".game-section");
const playerModeContainer = document.querySelector(".player-mode-container");
const btnRef = document.querySelector(".btn-ref");
const btnPlayer = document.querySelector(".btn-player");
const item = document.querySelectorAll(".item");
const alretbox = document.querySelector(".alretbox-container");
const alretText = document.querySelector(".alret-text");
const randonImgOne = document.querySelector(".q1");
const randonImgTwo = document.querySelector(".q2");
const randonImgThree = document.querySelector(".q3");
const playerAmount = document.querySelector(".player--amount");
const playerWin = document.querySelector(".player-win");
const btnNextRound = document.querySelector(".btn-nextRound");
const adding = document.querySelector(".adding");
const playernewAmount = document.querySelector(".player--newAmount");
const winOrLose = document.querySelector(".win-container h2");
const backgroundAudio = document.getElementById("backgroundAudio");
const winingAudio = document.getElementById("winingAudio");
const loseAudio = document.getElementById("loseAudio");

// nextround function----------------------------------------------------

const nextRoundFun = () => {
  btnNextRound.addEventListener("click", () => {
    playerWin.style.right = "-500px";
    itemNumber.classList.add("hidden");
    randonImgOne.src = `img/img7.jpg`;
    randonImgTwo.src = `img/img7.jpg`;
    randonImgThree.src = `img/img7.jpg`;

    winingAudio.pause();
    loseAudio.pause();
    backgroundAudio.play();
  });
};

//-----------win state------------------------------------------

const winState = (amount) => {
  setTimeout(() => {
    playerWin.style.right = "410px";
    winOrLose.textContent = "Congratulations";
    adding.textContent = `You win ${winPrice} Kyats and We added it to your acc`;
    playernewAmount.textContent = `${amount}`;
  }, 1000);
  nextRoundFun();
};

//-------------lose state------------------------------------------------

const loseState = (betamount, amount) => {
  setTimeout(() => {
    playerWin.style.right = "410px";
    winOrLose.textContent = "GoodLcuk! You will be win next round";
    adding.textContent = `You lose ${betamount} Kyats and We substraction it from your acc`;
    playernewAmount.textContent = `${amount}`;
  }, 1000);
  nextRoundFun();
};

const priceCondition = (num) => {
  backgroundAudio.pause();
  winingAudio.play();
  winPrice = betPrice * num;
  amount = Number(playerAmount.textContent) + winPrice;
  playerAmount.textContent = amount;
  console.log(winPrice);
  winState(amount);
};

//randow answer-----------------------------------------------------

const randonAns = () => {
  let randonNumber = Math.trunc(Math.random() * 6) + 1;
  let randontwo = Math.trunc(Math.random() * 6) + 1;
  let randonthree = Math.trunc(Math.random() * 6) + 1;
  let randonImgsrcOne = (randonImgOne.src = `img/img${randonNumber}.jpg`);
  let randonImgsrcTwo = (randonImgTwo.src = `img/img${randontwo}.jpg`);
  let randonImgsrcThree = (randonImgThree.src = `img/img${randonthree}.jpg`);

  if (
    betImgsrc === randonImgsrcOne &&
    betImgsrc === randonImgsrcTwo &&
    betImgsrc === randonImgsrcThree
  )
    return priceCondition(3);

  if (betImgsrc === randonImgsrcOne && betImgsrc === randonImgsrcTwo)
    return priceCondition(2);

  if (betImgsrc === randonImgsrcOne && betImgsrc === randonImgsrcThree)
    return priceCondition(2);

  if (betImgsrc === randonImgsrcTwo && betImgsrc === randonImgsrcThree)
    return priceCondition(2);

  if (
    betImgsrc === randonImgsrcOne ||
    betImgsrc === randonImgsrcTwo ||
    betImgsrc === randonImgsrcThree
  ) {
    priceCondition(1);
  } else {
    loseAudio.play();
    backgroundAudio.pause();
    amount = Number(playerAmount.textContent) - betPrice;
    playerAmount.textContent = amount;
    loseState(betPrice, amount);
  }
};

//alret box ----------------------------------------------------------

const alretboxFun = (str) => {
  alretbox.style.top = "0px";
  alretText.textContent = `${str}`;

  setTimeout(() => {
    alretbox.style.top = `-37px`;
  }, 3000);
};

//click bet item-------------------------------------------------------

const clickItem = () => {
  item.forEach((i) => {
    i.addEventListener("click", (e) => {
      const [first] = e.target.className.split(" ");
      let imgNumber = first.split("").at(-1);
      itemNumber = document.querySelector(`.${first} div`);
      const itemNumberImg = document.querySelector(`.${first} img`);

      if (betChip) {
        itemNumberImg.src = `img/${betChip}`;
        itemNumber.classList.remove("hidden");
        betImgsrc = `img/img${imgNumber}.jpg`;

        alretboxFun(alretArr.get("click"));
        setTimeout(() => {
          randonAns();
        }, 5000);
      } else {
        alretboxFun(alretArr.get(false));
      }
    });
  });
};

//price chose to betting------------------------------------------------

const chosingBettngPrice = () => {
  moneyChip.forEach((chip) => {
    chip.addEventListener("click", (e) => {
      const moneyChipId = Number(e.target.id);
      betPrice = priceArr[moneyChipId].realPrice;
      betChip = priceArr[moneyChipId].kPrice;
      alretboxFun(alretArr.get(true));
    });
  });
};

// ---------------------choice playe mode ------------------------------

const chosingPlayMode = (btnType, value) => {
  btnType.addEventListener("click", () => {
    gameSection.classList.remove("blur");
    playerModeContainer.style.top = "-333px";
    gameMode = value;

    backgroundAudio.play();
    if (gameMode === 1) {
      chosingBettngPrice();
      clickItem();
    } else {
      alretboxFun(alretArr.get("noRef"));
    }
  });
};

//starting page----------------------------------------------------

setTimeout(() => {
  gameSection.classList.add("blur");
  playerModeContainer.style.top = "100px";
  chosingPlayMode(btnPlayer, 1);
}, 2000);
