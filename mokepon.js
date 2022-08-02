const sectionSelectPet = document.getElementById('select-pet');
const sectionSelectAttack = document.getElementById('select-attack');
const sectionMessages = document.getElementById('messages');
const sectionBattles = document.getElementById('battles');

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
const textPlayerLives = document.getElementById('lives-player');
const textEnemyLives = document.getElementById('lives-enemy');

let mokepons = [];
let mokeponsOptions;
let playerAttack;
let enemyAttack;
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let playerPet;
let mokeponAttacks;
let buttonFire;
let buttonWater;
let buttonPlant;
let buttons;
let playerLives = 3;
let enemyLives = 3;

//Creating Mokepon Class
class Mokepon {
    constructor(name, type, img, hp) {
        this.name = name;
        this.type = type;
        this.img = img;
        this.hp = hp;
        this.attacks = [];
    }
}

let hipodoge = new Mokepon('hipodoge', 'water', './assets/images/mokepons_mokepon_hipodoge_attack.webp', 5);
let capipepo = new Mokepon('capipepo', 'plant', './assets/images/mokepons_mokepon_capipepo_attack.webp', 5);
let ratigueya = new Mokepon('ratigueya', 'fire', './assets/images/mokepons_mokepon_ratigueya_attack.webp', 5);

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

mokepons.push(hipodoge, capipepo, ratigueya);

function startGame() {
    sectionSelectAttack.style.display = 'none';
    restart.style.display = 'none';
    sectionMessages.style.display = 'none';
    sectionBattles.style.display = 'none';

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
    });
    
    buttonPlayerPet.addEventListener('click', selectPlayerPet);
    buttonRestart.addEventListener('click', restartGame);
}

function selectPlayerPet() {
    sectionSelectAttack.style.display = 'flex';
    sectionSelectPet.style.display = 'none';
    sectionMessages.style.display = 'flex';
    sectionBattles.style.display = 'grid';
    
    if (inputHipodoge.checked) {
        namePlayerPet.innerHTML = titleCase(inputHipodoge.id);
        playerPet = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        namePlayerPet.innerHTML = titleCase(inputCapipepo.id);
        playerPet = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        namePlayerPet.innerHTML = titleCase(inputRatigueya.id);
        playerPet = inputRatigueya.id;
    } else {
        alert('Select a pet');
        sectionSelectAttack.style.display = 'none';
        sectionSelectPet.style.display = 'flex';
        sectionMessages.style.display = 'none';
        sectionBattles.style.display = 'none';
    }
    
    getAttacks(playerPet);
    selectEnemyPet();
}

function getAttacks(playerPet) {
    let attacks;
    mokepons.forEach((mokepon) => { 
        if (playerPet === mokepon.name) {
            attacks = mokepon.attacks;
        }
    })
    console.log(attacks);
    showAttacks(attacks);
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        mokeponAttacks = `
            <button id="${attack.id}" class="button-attack">${attack.name}</button>
        `;
        attacksContainer.innerHTML += mokeponAttacks;
    });
    buttonFire = document.getElementById('button-fire');
    buttonWater = document.getElementById('button-water');
    buttonPlant = document.getElementById('button-plant');
    buttons = document.querySelectorAll('.button-attack');
    buttonFire.addEventListener('click', attackFire);
    buttonWater.addEventListener('click', attackWater);
    buttonPlant.addEventListener('click', attackPlant);
}

function selectEnemyPet () {
    let randPet = randNum(0, mokepons.length - 1);
    nameEnemyPet.innerHTML = mokepons[randPet].name;
}

function attackFire() {
    playerAttack = 'FIRE';
    randEnemyAttack();
}
function attackWater() {
    playerAttack = 'WATER';
    randEnemyAttack();
}
function attackPlant() {
    playerAttack = 'PLANT';
    randEnemyAttack();
}

function randEnemyAttack() {
    let randAttack = randNum(1, 3);
    if (randAttack == 1) {
        enemyAttack = 'FIRE';
    } else if (randAttack == 2) {
        enemyAttack = 'WATER';
    } else if (randAttack == 3) {
        enemyAttack = 'PLANT';
    }
    
    battle();
}

function createMessage(battleResult) {
    result.innerHTML = battleResult ;
    resultPlayerAttack.innerHTML = playerAttack;
    resultEnemyAttack.innerHTML = enemyAttack;
}

function createFinalMessage(battleResult) {
    restart.style.display = 'block';
    result.innerHTML = battleResult;
    buttonFire.disabled = true;
    buttonWater.disabled = true;
    buttonPlant.disabled = true;
}

function battle() {
    if (playerAttack === enemyAttack) {
        createMessage(`It's a draw 😐`);
    } else if ( (playerAttack === 'FIRE' && enemyAttack === 'PLANT') || (playerAttack === 'WATER' && enemyAttack === 'FIRE') || (playerAttack === 'PLANT' && enemyAttack === 'WATER')) {
        enemyLives--;
        textEnemyLives.innerHTML = enemyLives;
        createMessage('You win 🥳');
    } else {
        playerLives--;
        textPlayerLives.innerHTML = playerLives;
        createMessage('You Lose 😢');
    }

    reviewLives();    
}

function reviewLives() {
    if (enemyLives == 0) {
        createFinalMessage('Congratulations!!! You won the battle.')
    } else if (playerLives == 0) {
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

window.addEventListener('load', startGame);