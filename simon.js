let gameSeq = [];
let userSeq = [];
let btns = ["purple", "red", "green", "yellow"];
let h2 = document.querySelector("h2");
let started = false;
let level = 0;

document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelup();
    }
});

btns.forEach(color => {
    document.querySelector(`.${color}`).addEventListener("click", function () {
        userSeq.push(color);
        btnflash(this);
        checkAnswer(userSeq.length - 1);
    });
});

function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 300);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let ranInd = Math.floor(Math.random() * 4);
    let ranColor = btns[ranInd];
    gameSeq.push(ranColor);

    gameSeq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            btnflash(btn);
        }, index * 600);
    });
}

function checkAnswer(currentLevel) {
    if (userSeq[currentLevel] === gameSeq[currentLevel]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(() => {
                levelup();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    h2.innerText = "Game Over! Press Any Key to Restart";
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
}
