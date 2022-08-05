const sectionSelectPet = document.getElementById('select-pet');
const sectionSelectAttack = document.getElementById('select-attack');
const sectionMessages = document.getElementById('messages');
const sectionBattles = document.getElementById('battles');

const sectionViewMap = document.getElementById('view-map');
const map = document.getElementById('map');

const restart = document.getElementById('restart');

const buttonPlayerPet = document.getElementById('button-pet');
const buttonRestart = document.getElementById('button-restart');

const cardsContainer = document.getElementById('cards');
const namePlayerPet = document.getElementById('pet-player');
const nameEnemyPet = document.getElementById('pet-enemy');
const attacksContainer = document.getElementById('attacks-container');
const result = document.getElementById('result');
const resultPlayerAttack = document.getElementById('attack-player');
const resultEnemyAttack = document.getElementById('attack-enemy');
const textPlayerWins = document.getElementById('wins-player');
const textEnemyWins = document.getElementById('wins-enemy');

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
let canvas = map.getContext('2d');
let interval;

//Creating Mokepon Class
class Mokepon {
    constructor(name, type, img, hp) {
        this.name = name;
        this.type = type;
        this.img = img;
        this.hp = hp;
        this.attacks = [];
        this.x = 20;
        this.y = 30;
        this.width = 80;
        this.height = 80;
        this.mapImg = new Image();
        this.mapImg.src = img;
        this.velocityX = 0;
        this.velocityY = 0;
    }
}

let hipodoge = new Mokepon('hipodoge', 'water', './assets/images/mokepons_mokepon_hipodoge_attack.webp', 5);
let capipepo = new Mokepon('capipepo', 'plant', './assets/images/mokepons_mokepon_capipepo_attack.webp', 5);
let ratigueya = new Mokepon('ratigueya', 'fire', './assets/images/mokepons_mokepon_ratigueya_attack.webp', 5);
let langostelvis = new Mokepon('langostelvis', 'fire', './assets/images/mokepons_mokepon_langostelvis_attack.webp', 5);
let pydos = new Mokepon('pydos', 'water', './assets/images/mokepons_mokepon_pydos_attack.webp', 5);
let tucapalma = new Mokepon('tucapalma', 'plant', './assets/images/mokepons_mokepon_tucapalma_attack.webp', 5);

hipodoge.attacks.push( 
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '🌱', id: 'button-plant'},
    {name: '🔥', id: 'button-fire'}
);

capipepo.attacks.push( 
    {name: '🌱', id: 'button-plant'},
    {name: '🌱', id: 'button-plant'},
    {name: '🌱', id: 'button-plant'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'}
);

ratigueya.attacks.push( 
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '💧', id: 'button-water'},
    {name: '🌱', id: 'button-plant'}
);

langostelvis.attacks.push( 
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '🔥', id: 'button-fire'},
    {name: '💧', id: 'button-water'},
    {name: '🌱', id: 'button-plant'}
);

pydos.attacks.push( 
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '💧', id: 'button-water'},
    {name: '🌱', id: 'button-plant'},
    {name: '🔥', id: 'button-fire'}
);

tucapalma.attacks.push( 
    {name: '🌱', id: 'button-plant'},
    {name: '🌱', id: 'button-plant'},
    {name: '🌱', id: 'button-plant'},
    {name: '💧', id: 'button-water'},
    {name: '🔥', id: 'button-fire'}
);

mokepons.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

function startGame() {
    sectionSelectAttack.style.display = 'none';
    restart.style.display = 'none';
    sectionMessages.style.display = 'none';
    sectionBattles.style.display = 'none';
    sectionViewMap.style.display = 'none';

    mokepons.forEach(mokepon => {
        mokeponsOptions = `
            <input type="radio" name="pet" id="${mokepon.name}"/>
            <label class="card-mokepon card-mokepon--${mokepon.type}" for="${mokepon.name}">
                <figure>
                    <img src="${mokepon.img}" alt="${mokepon.name}" />
                </figure>
                <p>${mokepon.name.toUpperCase()}</p>
            </label>`;
        cardsContainer.innerHTML += mokeponsOptions;

        inputHipodoge = document.getElementById('hipodoge');
        inputCapipepo = document.getElementById('capipepo');
        inputRatigueya = document.getElementById('ratigueya');
        inputPydos = document.getElementById('pydos');
        inputTucapalma = document.getElementById('tucapalma');
        inputLangostelvis = document.getElementById('langostelvis');
    });
    
    buttonPlayerPet.addEventListener('click', selectPlayerPet);
    buttonRestart.addEventListener('click', restartGame);
}

function selectPlayerPet() {
    // sectionSelectAttack.style.display = 'flex';
    sectionSelectPet.style.display = 'none';
    // sectionMessages.style.display = 'flex';
    // sectionBattles.style.display = 'grid';
    sectionViewMap.style.display = 'flex';    
    startMap();
    
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
        alert('Select a pet');
        sectionSelectAttack.style.display = 'none';
        sectionSelectPet.style.display = 'flex';
        sectionMessages.style.display = 'none';
        sectionBattles.style.display = 'none';
        sectionViewMap.style.display = 'none';
    }
    
    if (inputHipodoge.checked || inputCapipepo.checked || inputRatigueya.checked || inputPydos.checked || inputTucapalma.checked || inputLangostelvis.checked) {
        getAttacks(playerPet);
        selectEnemyPet();
    }
}

function getAttacks(playerPet) {
    let attacks;
    mokepons.forEach((mokepon) => { 
        if (playerPet === mokepon.name) {
            attacks = mokepon.attacks;
        }
    })
    showAttacks(attacks);
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        mokeponAttacks = `
            <button class="button-attack ${attack.id}">${attack.name}</button>
        `;
        attacksContainer.innerHTML += mokeponAttacks;
    });
    buttons = document.querySelectorAll('.button-attack');
}

function attackSecuence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (event) => {
            if (event.target.textContent === '🔥') {
                playerAttack.push('FIRE');
                button.disabled = true;
            } else if (event.target.textContent === '💧') {
                playerAttack.push('WATER');
                button.disabled = true;
            }
            else if (event.target.textContent === '🌱') {
                playerAttack.push('PLANT');
                button.disabled = true;
            }
            randEnemyAttack();   
        });
    });
}

function selectEnemyPet () {
    let randPet = randNum(0, mokepons.length - 1);
    nameEnemyPet.innerHTML = titleCase(mokepons[randPet].name);
    enemyAttackArr = Object.values(mokepons[randPet].attacks);
    attackSecuence();
    
}

function randEnemyAttack() {
    let randAttack = randNum(0, enemyAttackArr.length - 1);
    if (enemyAttackArr[randAttack].name === '🔥') {
        enemyAttack.push('FIRE');
    } else if (enemyAttackArr[randAttack].name === '💧') {
        enemyAttack.push('WATER');
    } else if (enemyAttackArr[randAttack].name === '🌱') {
        enemyAttack.push('PLANT');
    }
    enemyAttackArr.splice(randAttack, 1);
    validateBattle();
}

function createMessage(battleResult) {
    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');;
    
    result.innerHTML = battleResult ;
    newPlayerAttack.innerHTML = indexPlayerAttack;
    newEnemyAttack.innerHTML = indexEnemyAttack;

    resultPlayerAttack.appendChild(newPlayerAttack);
    resultEnemyAttack.appendChild(newEnemyAttack);
}

function createFinalMessage(battleResult) {
    restart.style.display = 'block';
    result.innerHTML = battleResult;
}

function validateBattle() {
    if (playerAttack.length === 5 && enemyAttack.length === 5){
        battle();
    }
}

function indexAttacks(player, enemy, playerResult, enemyResult) {
    indexPlayerAttack = playerAttack[player] + ' ' + playerResult;
    indexEnemyAttack = enemyAttack[enemy] + ' ' + enemyResult;
}

function battle() {
    for (let index = 0; index < playerAttack.length; index++) {
        
        if (playerAttack[index] === enemyAttack[index]) {
            indexAttacks(index, index, '➖', '➖');
            createMessage(`It's a draw 😐`);
        } else if ( (playerAttack[index] === 'FIRE' && enemyAttack[index] === 'PLANT') || (playerAttack[index] === 'WATER' && enemyAttack[index] === 'FIRE') || (playerAttack[index] === 'PLANT' && enemyAttack[index] === 'WATER')) {
            playerWins++;
            textPlayerWins.innerHTML = playerWins;
            indexAttacks(index, index, '✅', '❌');
            createMessage('You win 🥳');
        } else {
            enemyWins++;
            textEnemyWins.innerHTML = enemyWins;
            indexAttacks(index, index, '❌', '✅');
            createMessage('You Lose 😢');
        }
    } 
    
    reviewLives();    
}

function reviewLives() {
    if (playerWins === enemyWins) {
        createFinalMessage("Luck next time, It's a draw")
    } else if (playerWins > enemyWins) {
        createFinalMessage('Congratulations!!! You won the battle.');
    } else if (playerWins < enemyWins) {
        createFinalMessage('Sorry, You lost the battle. Train harder and come back.');
    }
}

function randNum(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min);
}

function restartGame() {
    location.reload();
}

function titleCase(str) {
    let str2 = str[0].toUpperCase() + str.slice(1).toLowerCase();
    return str2;
}

function startMap() {
    interval = setInterval(paintPet, 50);
    window.addEventListener('keydown', keyPressed);
    window.addEventListener('keyup', stopMovement);
}

function paintPet() {
    capipepo.x = capipepo.x + capipepo.velocityX;
    capipepo.y = capipepo.y + capipepo.velocityY;
    canvas.clearRect(0, 0, map.width, map.width);
    canvas.drawImage(
        capipepo.mapImg,
        capipepo.x,
        capipepo.y,
        capipepo.width,
        capipepo.height
    );
}

function moveUp() {
    capipepo.velocityY = -5;
}
function moveDown() {
    capipepo.velocityY = 5;
}
function moveRight() {
    capipepo.velocityX = 5;
}
function moveLeft() {
    capipepo.velocityX = -5;
}
function stopMovement() {
    capipepo.velocityX = 0;
    capipepo.velocityY = 0;
}

function keyPressed(event) {
    console.log(event.key);
    switch(event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowRight': 
            moveRight();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        default:
            break;
    }
}

window.addEventListener('load', startGame);