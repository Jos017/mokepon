let playerAttack;
let enemyAttack;
let playerLives = 3;
let enemyLives = 3;

function startGame() {
    const sectionSelectAttack = document.getElementById('select-attack');
    const sectionRestart = document.getElementById('restart');
    sectionSelectAttack.style.display = 'none';
    sectionRestart.style.display = 'none';
    
    const buttonPlayerPet = document.getElementById('button-pet');
    buttonPlayerPet.addEventListener('click', selectPlayerPet);
    
    const buttonFire = document.getElementById('button-fire');
    const buttonWater = document.getElementById('button-water');
    const buttonPlant = document.getElementById('button-plant');
    buttonFire.addEventListener('click', attackFire);
    buttonWater.addEventListener('click', attackWater);
    buttonPlant.addEventListener('click', attackPlant);
    
    const buttonRestart = document.getElementById('button-restart');
    buttonRestart.addEventListener('click', restartGame);
}

function selectPlayerPet() {
    const sectionSelectAttack = document.getElementById('select-attack');
    const sectionSelectPet = document.getElementById('select-pet');
    sectionSelectAttack.style.display = 'block';
    sectionSelectPet.style.display = 'none';
    
    const inputHipodoge = document.getElementById('hipodoge');
    const inputCapipepo = document.getElementById('capipepo');
    const inputRatigueya = document.getElementById('ratigueya');
    const spanPlayerPet = document.getElementById('pet-player');
    
    if (inputHipodoge.checked) {
        spanPlayerPet.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanPlayerPet.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanPlayerPet.innerHTML = 'Ratigueya';
    } else {
        alert('Select a pet');
        sectionSelectAttack.style.display = 'none';
        sectionSelectPet.style.display = 'block';
    }
    
    selectEnemyPet();
}

function selectEnemyPet () {
    const spanEnemyPet = document.getElementById('pet-enemy');
    let randPet = randNum(1, 3);
    if (randPet == 1) {
        spanEnemyPet.innerHTML = 'Hipodoge';
    } else if (randPet == 2) {
        spanEnemyPet.innerHTML = 'Capipepo';
    } else if (randPet == 3) {
        spanEnemyPet.innerHTML = 'Ratigueya';
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

function createMessage(result) {
    const messages = document.getElementById('messages');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = `Your pet used a ${playerAttack} attack, the enemy's pet used a ${enemyAttack} attack - ${result}`;
    messages.appendChild(parrafo);
}

function createFinalMessage(result) {
    const sectionRestart = document.getElementById('restart');
    sectionRestart.style.display = 'block';
    const messages = document.getElementById('messages');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = result;
    messages.appendChild(parrafo);
    
    const buttonFire = document.getElementById('button-fire');
    const buttonWater = document.getElementById('button-water');
    const buttonPlant = document.getElementById('button-plant');
    buttonFire.disabled = true;
    buttonWater.disabled = true;
    buttonPlant.disabled = true;
}

function battle() {
    

    const spanPlayerLives = document.getElementById('lives-player');
    const spanEnemyLives = document.getElementById('lives-enemy');
    if (playerAttack === enemyAttack) {
        createMessage(`It's a draw 😐`);
    } else if ( (playerAttack === 'FIRE' && enemyAttack === 'PLANT') || (playerAttack === 'WATER' && enemyAttack === 'FIRE') || (playerAttack === 'PLANT' && enemyAttack === 'WATER')) {
        enemyLives--;
        spanEnemyLives.innerHTML = enemyLives;
        createMessage('You win 🥳');
    } else {
        playerLives--;
        spanPlayerLives.innerHTML = playerLives;
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