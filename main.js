var snd = new Audio("http://www.soundjay.com/button/button-20.wav");
var matchend = new Audio("https://www.soundjay.com/misc/sounds/magic-chime-02.mp3");
var btnsnd = new Audio("https://www.soundjay.com/button/sounds/button-30.mp3");

table = [];
roundPlays = 1;
player1p = 0
player2p = 0
player1 = document.querySelector('.p1 p');
player2 = document.querySelector('.p2 p');
winner = document.querySelector('#modal p');
currentp = document.querySelector('p.currentp');

function random_bg_color() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    document.body.style.background = bgColor;
}

for (var x = 0; x <= 2; x++) {
    row = [];
    for (var y = 0; y <= 2; y++) {
        var block = document.querySelector('div.b'+x+'_'+y+" p");
        row.push(block);       
    }
    table.push(row);
}  

function onOff() {
    document.querySelector("#game").style.backgroundColor = "white";
    div = document.querySelectorAll("div#game div");
    for(var i = 0; i <= 8; i++) {
        div[i].style.visibility = "hidden";
    }

    matchend.play();
    document.querySelector("#modal").classList.toggle("hide");
    }

function continueButton() {
    document.querySelector("#game").style.backgroundColor = "black";
    div = document.querySelectorAll("div#game div");
    for(var i = 0; i <= 8; i++) {
        div[i].style.visibility = "visible";
    }
    document.querySelector("#modal").classList.toggle("hide");
    btnsnd.play();
}

function setPlayer() {
    if (roundPlays % 2 == 1) {
        currentp.innerHTML = "Player X"
        
    } else {
        currentp.innerHTML = "Player O"
    }
}

function setScore() {
    player1.innerHTML = "PLAYER X =   "+player1p+ " Wins";
    player2.innerHTML = "PLAYER O =   "+player2p+ " Wins";
}

function restart() {
    for (var x = 0; x <= 2; x++) {
        for (var y = 0; y <= 2; y++) {
            table[x][y].innerHTML = "";
            document.querySelector('div.b'+x+'_'+y).removeAttribute("onclick");
            document.querySelector('div.b'+x+'_'+y).setAttribute("onclick", "play("+x+","+y+")");
        }
    }
    onOff();
    roundPlays = 1;
} 

function checkWinner() {
    if (
        (table[0][0].innerHTML == "X" && table[0][1].innerHTML == "X" && table[0][2].innerHTML == "X") ||
        (table[1][0].innerHTML == "X" && table[1][1].innerHTML == "X" && table[1][2].innerHTML == "X") ||
        (table[2][0].innerHTML == "X" && table[2][1].innerHTML == "X" && table[2][2].innerHTML == "X") ||
        (table[0][0].innerHTML == "X" && table[1][0].innerHTML == "X" && table[2][0].innerHTML == "X") ||
        (table[0][1].innerHTML == "X" && table[1][1].innerHTML == "X" && table[2][1].innerHTML == "X") ||
        (table[0][2].innerHTML == "X" && table[1][2].innerHTML == "X" && table[2][2].innerHTML == "X") ||
        (table[0][0].innerHTML == "X" && table[1][1].innerHTML == "X" && table[2][2].innerHTML == "X") ||
        (table[0][2].innerHTML == "X" && table[1][1].innerHTML == "X" && table[2][0].innerHTML == "X")
    ) {
        player1p++;
        setScore();
        winner.innerHTML = "X Won";
        restart();
    } else if (
        (table[0][0].innerHTML == "O" && table[0][1].innerHTML == "O" && table[0][2].innerHTML == "O") ||
        (table[1][0].innerHTML == "O" && table[1][1].innerHTML == "O" && table[1][2].innerHTML == "O") ||
        (table[2][0].innerHTML == "O" && table[2][1].innerHTML == "O" && table[2][2].innerHTML == "O") ||
        (table[0][0].innerHTML == "O" && table[1][0].innerHTML == "O" && table[2][0].innerHTML == "O") ||
        (table[0][1].innerHTML == "O" && table[1][1].innerHTML == "O" && table[2][1].innerHTML == "O") ||
        (table[0][2].innerHTML == "O" && table[1][2].innerHTML == "O" && table[2][2].innerHTML == "O") ||
        (table[0][0].innerHTML == "O" && table[1][1].innerHTML == "O" && table[2][2].innerHTML == "O") ||
        (table[0][2].innerHTML == "O" && table[1][1].innerHTML == "O" && table[2][0].innerHTML == "O")
    ) {
        player2p++;
        setScore();
        winner.innerHTML = "O Won";
        restart();
    } else if (
        (table[0][0].innerHTML != "" && table[0][1].innerHTML != "" && table[0][2].innerHTML != "") &&
        (table[1][0].innerHTML != "" && table[1][1].innerHTML != "" && table[1][2].innerHTML != "") &&
        (table[2][0].innerHTML != "" && table[2][1].innerHTML != "" && table[2][2].innerHTML != "")
    ) {
        setScore();
        winner.innerHTML = "Draw";
        restart();
    }
} 
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

function play(x, y) {
    snd.play();
    random_bg_color();
    if (roundPlays % 2 == 1) {
        table[x][y].innerHTML = "X";

        
    } else {
        table[x][y].innerHTML = "O"

    }
    document.querySelector('div.b'+x+'_'+y).removeAttribute("onclick");

    sleep(2000).then(() => {
    checkWinner();
    });
    setPlayer();
    roundPlays += 1;

}