const sectionSelectPet = document.getElementById("select-pet");
const sectionSelectAttack = document.getElementById("select-attack");
const sectionMessages = document.getElementById("messages");
const sectionBattles = document.getElementById("battles");

const sectionViewMap = document.getElementById("view-map");
const map = document.getElementById("map");

const restart = document.getElementById("restart");

const buttonPlayerPet = document.getElementById("button-pet");
const buttonRestart = document.getElementById("button-restart");

const cardsContainer = document.getElementById("cards");
const namePlayerPet = document.getElementById("pet-player");
const nameEnemyPet = document.getElementById("pet-enemy");
const attacksContainer = document.getElementById("attacks-container");
const result = document.getElementById("result");
const resultPlayerAttack = document.getElementById("attack-player");
const resultEnemyAttack = document.getElementById("attack-enemy");
const textPlayerWins = document.getElementById("wins-player");
const textEnemyWins = document.getElementById("wins-enemy");

let mokepons = [];
let mokeponsOptions;
let playerAttack = [];
let enemyAttack = [];
let enemyAttackArr = [];
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let playerPet;
let mokeponAttacks;
let buttons;
let indexPlayerAttack;
let indexEnemyAttack;
let playerWins = 0;
let enemyWins = 0;
let canvas = map.getContext("2d");
let interval;
let mapBackground = new Image();
mapBackground.src = "./assets/images/mokemap.webp";
let playerPetObj;
let mapScaleWidth = 800;
let mapScaleHeight = 600;
let mapWidthResponsive = window.innerWidth - 20;
let mapHeightResponsive = (mapWidthResponsive * mapScaleHeight) / mapScaleWidth;
const maxMapWidth = 350;

//Creating Mokepon Class
class Mokepon {
  constructor(name, type, img, hp, mapImg = img) {
    this.name = name;
    this.type = type;
    this.img = img;
    this.hp = hp;
    this.attacks = [];
    this.width = 40;
    this.height = 40;
    this.x = randNum(0, map.width - this.width);
    this.y = randNum(0, map.height - this.height);
    this.mapImg = new Image();
    this.mapImg.src = mapImg;
    this.velocityX = 0;
    this.velocityY = 0;
  }

  drawMokepon() {
    canvas.drawImage(this.mapImg, this.x, this.y, this.width, this.height);
  }
}

let hipodoge = new Mokepon(
  "hipodoge",
  "water",
  "./assets/images/mokepons_mokepon_hipodoge_attack.webp",
  5,
  "./assets/images/hipodogeFace.webp"
);
let capipepo = new Mokepon(
  "capipepo",
  "plant",
  "./assets/images/mokepons_mokepon_capipepo_attack.webp",
  5,
  "./assets/images/capipepoFace.webp"
);
let ratigueya = new Mokepon(
  "ratigueya",
  "fire",
  "./assets/images/mokepons_mokepon_ratigueya_attack.webp",
  5,
  "./assets/images/ratigueyaFace.webp"
);
let langostelvis = new Mokepon(
  "langostelvis",
  "fire",
  "./assets/images/mokepons_mokepon_langostelvis_attack.webp",
  5
);
let pydos = new Mokepon(
  "pydos",
  "water",
  "./assets/images/mokepons_mokepon_pydos_attack.webp",
  5
);
let tucapalma = new Mokepon(
  "tucapalma",
  "plant",
  "./assets/images/mokepons_mokepon_tucapalma_attack.webp",
  5
);

// EnemyPets
let hipodogeEnemy = new Mokepon(
  "hipodoge",
  "water",
  "./assets/images/mokepons_mokepon_hipodoge_attack.webp",
  5,
  "./assets/images/hipodogeFace.webp"
);
let capipepoEnemy = new Mokepon(
  "capipepo",
  "plant",
  "./assets/images/mokepons_mokepon_capipepo_attack.webp",
  5,
  "./assets/images/capipepoFace.webp"
);
let ratigueyaEnemy = new Mokepon(
  "ratigueya",
  "fire",
  "./assets/images/mokepons_mokepon_ratigueya_attack.webp",
  5,
  "./assets/images/ratigueyaFace.webp"
);

hipodoge.attacks.push(
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" },
  { name: "🔥", id: "button-fire" }
);

hipodogeEnemy.attacks.push(
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" },
  { name: "🔥", id: "button-fire" }
);

capipepo.attacks.push(
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "💧", id: "button-water" },
  { name: "🔥", id: "button-fire" }
);

capipepoEnemy.attacks.push(
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "💧", id: "button-water" },
  { name: "🔥", id: "button-fire" }
);

ratigueya.attacks.push(
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" }
);

ratigueyaEnemy.attacks.push(
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" }
);

langostelvis.attacks.push(
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "🔥", id: "button-fire" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" }
);

pydos.attacks.push(
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "💧", id: "button-water" },
  { name: "🌱", id: "button-plant" },
  { name: "🔥", id: "button-fire" }
);

tucapalma.attacks.push(
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "🌱", id: "button-plant" },
  { name: "💧", id: "button-water" },
  { name: "🔥", id: "button-fire" }
);

mokepons.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

function startGame() {
  sectionSelectAttack.style.display = "none";
  restart.style.display = "none";
  sectionMessages.style.display = "none";
  sectionBattles.style.display = "none";
  sectionViewMap.style.display = "none";

  mokepons.forEach((mokepon) => {
    mokeponsOptions = `
            <input type="radio" name="pet" id="${mokepon.name}"/>
            <label class="card-mokepon card-mokepon--${mokepon.type}" for="${
      mokepon.name
    }">
                <figure>
                    <img src="${mokepon.img}" alt="${mokepon.name}" />
                </figure>
                <p>${mokepon.name.toUpperCase()}</p>
            </label>`;
    cardsContainer.innerHTML += mokeponsOptions;

    inputHipodoge = document.getElementById("hipodoge");
    inputCapipepo = document.getElementById("capipepo");
    inputRatigueya = document.getElementById("ratigueya");
    inputPydos = document.getElementById("pydos");
    inputTucapalma = document.getElementById("tucapalma");
    inputLangostelvis = document.getElementById("langostelvis");
  });

  buttonPlayerPet.addEventListener("click", selectPlayerPet);
  buttonRestart.addEventListener("click", restartGame);
  joinGame();
}

async function joinGame() {
  const res = await fetch("http://localhost:8080/unirse");
  if (res.ok) {
    const resText = await res.text();
    console.log(resText);
  }
}

function selectPlayerPet() {
  sectionSelectPet.style.display = "none";
  sectionViewMap.style.display = "flex";

  if (inputHipodoge.checked) {
    namePlayerPet.innerHTML = titleCase(inputHipodoge.id);
    playerPet = inputHipodoge.id;
  } else if (inputCapipepo.checked) {
    namePlayerPet.innerHTML = titleCase(inputCapipepo.id);
    playerPet = inputCapipepo.id;
  } else if (inputRatigueya.checked) {
    namePlayerPet.innerHTML = titleCase(inputRatigueya.id);
    playerPet = inputRatigueya.id;
  } else if (inputPydos.checked) {
    namePlayerPet.innerHTML = titleCase(inputPydos.id);
    playerPet = inputPydos.id;
  } else if (inputTucapalma.checked) {
    namePlayerPet.innerHTML = titleCase(inputTucapalma.id);
    playerPet = inputTucapalma.id;
  } else if (inputLangostelvis.checked) {
    namePlayerPet.innerHTML = titleCase(inputLangostelvis.id);
    playerPet = inputLangostelvis.id;
  } else {
    alert("Select a pet");
    sectionSelectAttack.style.display = "none";
    sectionSelectPet.style.display = "flex";
    sectionMessages.style.display = "none";
    sectionBattles.style.display = "none";
    sectionViewMap.style.display = "none";
  }

  if (
    inputHipodoge.checked ||
    inputCapipepo.checked ||
    inputRatigueya.checked ||
    inputPydos.checked ||
    inputTucapalma.checked ||
    inputLangostelvis.checked
  ) {
    getAttacks(playerPet);
    startMap();
  }
}

function getPlayerPet() {
  mokepons.forEach((mokepon) => {
    if (playerPet === mokepon.name) {
      playerPetObj = mokepon;
    }
  });
}

function getAttacks(playerPet) {
  let attacks;
  mokepons.forEach((mokepon) => {
    if (playerPet === mokepon.name) {
      attacks = mokepon.attacks;
    }
  });
  showAttacks(attacks);
}

function showAttacks(attacks) {
  attacks.forEach((attack) => {
    mokeponAttacks = `
            <button class="button-attack ${attack.id}">${attack.name}</button>
        `;
    attacksContainer.innerHTML += mokeponAttacks;
  });
  buttons = document.querySelectorAll(".button-attack");
}

function attackSecuence() {
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (event.target.textContent === "🔥") {
        playerAttack.push("FIRE");
        button.disabled = true;
      } else if (event.target.textContent === "💧") {
        playerAttack.push("WATER");
        button.disabled = true;
      } else if (event.target.textContent === "🌱") {
        playerAttack.push("PLANT");
        button.disabled = true;
      }
      randEnemyAttack();
    });
  });
}

function selectEnemyPet(enemy) {
  nameEnemyPet.innerHTML = titleCase(enemy.name);
  enemyAttackArr = Object.values(enemy.attacks);
  attackSecuence();
}

function randEnemyAttack() {
  let randAttack = randNum(0, enemyAttackArr.length - 1);
  if (enemyAttackArr[randAttack].name === "🔥") {
    enemyAttack.push("FIRE");
  } else if (enemyAttackArr[randAttack].name === "💧") {
    enemyAttack.push("WATER");
  } else if (enemyAttackArr[randAttack].name === "🌱") {
    enemyAttack.push("PLANT");
  }
  enemyAttackArr.splice(randAttack, 1);
  validateBattle();
}

function createMessage(battleResult) {
  let newPlayerAttack = document.createElement("p");
  let newEnemyAttack = document.createElement("p");

  result.innerHTML = battleResult;
  newPlayerAttack.innerHTML = indexPlayerAttack;
  newEnemyAttack.innerHTML = indexEnemyAttack;

  resultPlayerAttack.appendChild(newPlayerAttack);
  resultEnemyAttack.appendChild(newEnemyAttack);
}

function createFinalMessage(battleResult) {
  restart.style.display = "block";
  result.innerHTML = battleResult;
}

function validateBattle() {
  if (playerAttack.length === 5 && enemyAttack.length === 5) {
    battle();
  }
}

function indexAttacks(player, enemy, playerResult, enemyResult) {
  indexPlayerAttack = playerAttack[player] + " " + playerResult;
  indexEnemyAttack = enemyAttack[enemy] + " " + enemyResult;
}

function battle() {
  for (let index = 0; index < playerAttack.length; index++) {
    if (playerAttack[index] === enemyAttack[index]) {
      indexAttacks(index, index, "➖", "➖");
      createMessage(`It's a draw 😐`);
    } else if (
      (playerAttack[index] === "FIRE" && enemyAttack[index] === "PLANT") ||
      (playerAttack[index] === "WATER" && enemyAttack[index] === "FIRE") ||
      (playerAttack[index] === "PLANT" && enemyAttack[index] === "WATER")
    ) {
      playerWins++;
      textPlayerWins.innerHTML = playerWins;
      indexAttacks(index, index, "✅", "❌");
      createMessage("You win 🥳");
    } else {
      enemyWins++;
      textEnemyWins.innerHTML = enemyWins;
      indexAttacks(index, index, "❌", "✅");
      createMessage("You Lose 😢");
    }
  }

  reviewLives();
}

function reviewLives() {
  if (playerWins === enemyWins) {
    createFinalMessage("Luck next time, It's a draw");
  } else if (playerWins > enemyWins) {
    createFinalMessage("Congratulations!!! You won the battle.");
  } else if (playerWins < enemyWins) {
    createFinalMessage(
      "Sorry, You lost the battle. Train harder and come back."
    );
  }
}

function randNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function restartGame() {
  location.reload();
}

function titleCase(str) {
  let str2 = str[0].toUpperCase() + str.slice(1).toLowerCase();
  return str2;
}

function startMap() {
  if (mapWidthResponsive < maxMapWidth) {
    map.width = mapWidthResponsive;
    map.height = mapHeightResponsive;
  } else {
    map.width = maxMapWidth;
    map.height = (maxMapWidth * mapScaleHeight) / mapScaleWidth;
  }
  getPlayerPet();
  interval = setInterval(paintCanvas, 50);
  window.addEventListener("keydown", keyPressed);
  window.addEventListener("keyup", stopMovement);
}

function paintCanvas() {
  playerPetObj.x = playerPetObj.x + playerPetObj.velocityX;
  playerPetObj.y = playerPetObj.y + playerPetObj.velocityY;
  canvas.clearRect(0, 0, map.width, map.width);
  canvas.drawImage(mapBackground, 0, 0, map.width, map.height);
  playerPetObj.drawMokepon();
  hipodogeEnemy.drawMokepon();
  capipepoEnemy.drawMokepon();
  ratigueyaEnemy.drawMokepon();
  if (playerPetObj.velocityX !== 0 || playerPetObj.velocityY !== 0) {
    reviewCollision(hipodogeEnemy);
    reviewCollision(capipepoEnemy);
    reviewCollision(ratigueyaEnemy);
  }
}

function moveUp() {
  playerPetObj.velocityY = -5;
}
function moveDown() {
  playerPetObj.velocityY = 5;
}
function moveRight() {
  playerPetObj.velocityX = 5;
}
function moveLeft() {
  playerPetObj.velocityX = -5;
}
function stopMovement() {
  playerPetObj.velocityX = 0;
  playerPetObj.velocityY = 0;
}

function keyPressed(event) {
  console.log(event.key);
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowLeft":
      moveLeft();
      break;
    default:
      break;
  }
}

function reviewCollision(enemy) {
  const topEnemy = enemy.y;
  const bottomEnemy = enemy.y + enemy.height;
  const rightEnemy = enemy.x + enemy.width;
  const leftEnemy = enemy.x;

  const topPlayer = playerPetObj.y;
  const bottomPlayer = playerPetObj.y + playerPetObj.height;
  const rightPlayer = playerPetObj.x + playerPetObj.width;
  const leftPlayer = playerPetObj.x;

  if (
    !(
      bottomPlayer < topEnemy ||
      topPlayer > bottomEnemy ||
      rightPlayer < leftEnemy ||
      leftPlayer > rightEnemy
    )
  ) {
    stopMovement();
    clearInterval();
    alert(`A savage ${enemy.name} has appeared`);
    selectEnemyPet(enemy);
    sectionSelectAttack.style.display = "flex";
    sectionMessages.style.display = "flex";
    sectionBattles.style.display = "grid";
    sectionViewMap.style.display = "none";
  }
}

window.addEventListener("load", startGame);
