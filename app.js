const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#timeList');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');

let time = 0;
let score = 0;
let colors = ['#92f1c9', '#f95289', '#fff1f1', '#3aaa80', '#ff0051', '#ffc63a', '#77fcd6', '#ffbcfa', '#e4e1ff', '#191a1a']

startBtn.addEventListener('click', (e) => {
    e.preventDefault()

    screens[0].classList.add('up')
})

board.addEventListener('click', (e) => {
    if(e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
})

timeList.addEventListener('click',(e) => {
    if(e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
      finishGame();
    } else {
        let current = --time;
        if(current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    const circle = document.createElement('div');
    const size = getRandomNum(10, 60);
    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNum(0, width - size);
    const y = getRandomNum(0, height - size);

    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.background = colors[Math.floor(Math.random() * 10)];


    board.append(circle);
}

function getRandomNum(min, max) {
    return  Math.round(Math.random() * (max - min) + min)
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`
}

//HACK
function winTheGame() {
    function kill() {
        const circle = document.querySelector('.circle');
        if(circle) {
            circle.click()
        }
    }
    setInterval(kill, 50);
}