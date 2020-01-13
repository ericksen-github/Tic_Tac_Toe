let currentMark = "X"; 
let boardArray = []; 

// sets container size, creates divs to fill container, gives divs listener, adds divs
function makeBoard() {

    let boxSize = 200 + "px";
    let container = document.getElementById("boardContainer");

    container.style.gridTemplateColumns = `repeat(3, 1fr)`;
    container.style.gridTemplateRows = `repeat(3, 1fr)`;

    for (i = 0; i < 9; i++) {
        let div = document.createElement("div");
        div.style.width = boxSize;
        div.style.height = boxSize;
        div.classList.add("boxes");
        div.setAttribute("id", "div" + i);
        div.addEventListener("click", markBox);
        container.appendChild(div);
        boardArray.push(""); 
    }
}

function resetGrid() {
    for (i = 0; i < 9; i++) {
        document.getElementById("div" + i).innerHTML = ""; 
        document.getElementById("div" + i).addEventListener("click", markBox);
        boardArray[i] = ""; 
    }
    currentMark = "X"; 
}

function markBox(e) {
    let divID = e.target.id.slice(3); 
    e.target.innerHTML = currentMark; 
    boardArray[divID] = currentMark; 
    e.target.removeEventListener("click", markBox); 
    checkWin(); 
    swapMark(); 
} 

function swapMark() {
    if (currentMark == "X") {
        currentMark = "O"; 
    } else {
        currentMark = "X"; 
    }
}

function checkWin() {
    if (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2] && boardArray[0] != "") {
             declareWinner(boardArray[0]); 
        } else if (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5] && boardArray[3] != "") {
             declareWinner(boardArray[3]); 
        } else if (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8] && boardArray[6] != "") {
             declareWinner(boardArray[6]); 
        } else if (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6] && boardArray[0] != "") {
             declareWinner(boardArray[0]); 
        } else if (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7] && boardArray[1] != "") {
             declareWinner(boardArray[1]); 
        } else if (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8] && boardArray[2] != "") {
            declareWinner(boardArray[2]); 
        } else if (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8] && boardArray[0] != "") {
            declareWinner(boardArray[0]);
        } else if (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6] && boardArray[2] != "") {
            declareWinner(boardArray[2]); 
        }
}

function declareWinner(winner) {
    document.getElementById("displayText").innerHTML = "The winner is " + winner + "!"; 
    for (i = 0; i < 9; i++) {
        document.getElementById("div" + i).removeEventListener("click", markBox);
    }
}
makeBoard(); 