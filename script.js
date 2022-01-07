alert('Bem vindo ao Genius! Clique em INICIAR para começar a jogar!')
let order = [];
let score = -1;
let clickedOrder = [];
let lock = true
// true = locked
// flase = unlocked 

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul
// 4 - start/re-start

const green = document.querySelector('.green');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const blue = document.querySelector('.blue');
const start = document.querySelector('.start');

// cria ordem aleatória de cores **
let shuffleOrder = () => {
    let randomColor = Math.floor(Math.random() * 4);
    order.push(randomColor);
    for(let i in order) {
        setTimeout(() => {
            setTimeout(() => {
                createColorElement(order[i]).classList.add('selected');
            },100);
            setTimeout(() => {
                createColorElement(order[i]).classList.remove('selected');
            },400);
        }, 400*i);
    }
}

// checa se os botões clicados são os mesmo da ordem gerada no jogo
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]){
            lose();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        nextLevel();
    }
}

//função para o clique do usuário
let click = (color) => {
    if(color == 4){
        playGame();
    }
    else{
        clickedOrder.push(color);
        createColorElement(color).classList.add('selected');

        setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
        },200)
    }
    
}

// função que retorna a cor
let createColorElement = (color) => {
    if(color == 0){
        return green;
    }else if(color == 1){
        return red; 
    }else if(color == 2){
        return yellow;  
    }else if(color == 3){
        return blue;    
    }
}

// função para próximo nível do jogo
let nextLevel = () => {
    clickedOrder = [];
    score++;
    shuffleOrder();
}

// função para fim de jogo
let lose = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em INICIAR começar um novo jogo`)
    lock = true;
}

// função de início de jogo
let playGame = () => {
    score = -1;
    order = [];
    clickedOrder = [];
    nextLevel();
}

// eventos de clique para as cores
green.onclick = () => {
    if(lock==false){
        click(0);
    }
}

red.onclick = () => {
    if(lock==false){
        click(1);
    }
}

yellow.onclick = () => {
    if(lock==false){
        click(2);
    }
}

blue.onclick = () => {
    if(lock==false){
        click(3);
    }
}

start.onclick = () => {
    lock = false;
    click(4);
}