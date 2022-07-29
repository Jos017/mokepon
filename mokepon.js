const sectionSelectPet = document.getElementById('select-pet');
const sectionSelectAttack = document.getElementById('select-attack');
const sectionMessages = document.getElementById('messages');
const sectionBattles = document.getElementById('battles');

const restart = document.getElementById('restart');

const buttonPlayerPet = document.getElementById('button-pet');
const buttonFire = document.getElementById('button-fire');
const buttonWater = document.getElementById('button-water');
const buttonPlant = document.getElementById('button-plant');
const buttonRestart = document.getElementById('button-restart');

const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const namePlayerPet = document.getElementById('pet-player');
const nameEnemyPet = document.getElementById('pet-enemy');
const result = document.getElementById('result');
const resultPlayerAttack = document.getElementById('attack-player');
const resultEnemyAttack = document.getElementById('attack-enemy');
const textPlayerLives = document.getElementById('lives-player');
const textEnemyLives = document.getElementById('lives-enemy');

let playerAttack;
let enemyAttack;
let playerLives = 3;
let enemyLives = 3;

function startGame() {
    sectionSelectAttack.style.display = 'none';
    restart.style.display = 'none';
    sectionMessages.style.display = 'none';
    sectionBattles.style.display = 'none';
    
    buttonPlayerPet.addEventListener('click', selectPlayerPet);
    buttonFire.addEventListener('click', attackFire);
    buttonWater.addEventListener('click', attackWater);
    buttonPlant.addEventListener('click', attackPlant);
    buttonRestart.addEventListener('click', restartGame);
}

function selectPlayerPet() {
    sectionSelectAttack.style.display = 'flex';
    sectionSelectPet.style.display = 'none';
    sectionMessages.style.display = 'flex';
    sectionBattles.style.display = 'grid';
    
    if (inputHipodoge.checked) {
        namePlayerPet.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        namePlayerPet.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        namePlayerPet.innerHTML = 'Ratigueya';
    } else {
        alert('Select a pet');
        sectionSelectAttack.style.display = 'none';
        sectionSelectPet.style.display = 'flex';
        sectionMessages.style.display = 'none';
        sectionBattles.style.display = 'none';
    }
    
    selectEnemyPet();
}

function selectEnemyPet () {
    let randPet = randNum(1, 3);
    if (randPet == 1) {
        nameEnemyPet.innerHTML = 'Hipodoge';
    } else if (randPet == 2) {
        nameEnemyPet.innerHTML = 'Capipepo';
    } else if (randPet == 3) {
        nameEnemyPet.innerHTML = 'Ratigueya';
    }
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
    resultPlayerAttack.innerHTML = enemyAttack;
    resultEnemyAttack.innerHTML = playerAttack;
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

window.addEventListener('load', startGame);