const gameBoard = (() => { // module to hide all of my functions
    let boardArray = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    let currentMark = "X"; 
    let playerOne; 
    let playerTwo; 

    function makeBoard() {  // populates board, sets ids, creates listeners, and initializes boardArray size
        const boxSize = 150 + "px";
        const container = document.getElementById("boardContainer");

        container.style.gridTemplateColumns = `repeat(3, 1fr)`;
        container.style.gridTemplateRows = `repeat(3, 1fr)`;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                let div = document.createElement("div");
                div.style.width = boxSize;
                div.style.height = boxSize;
                div.classList.add("boxes");
                div.setAttribute("id", "div" + i + j);
                container.appendChild(div);
            }
        };
    };

    function resetGrid() {  // sets all boxes to empty string, removes listeners, clears array, resets mark
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++){
                document.getElementById("div" + i + j).innerHTML = ""; 
                document.getElementById("div" + i + j).addEventListener("click", markBox);
                boardArray[i][j] = ""; 
            }
        }
        currentMark = "X"; 
    }

    function startGame() {

        playerOne = document.getElementById("playerOneName").value; 
        if (document.getElementById("checkbox").checked == true) {
            playerTwo = "the Computer"; // if computer is player 2, sets p2 name to computer
        } else {
            playerTwo = document.getElementById("playerTwoName").value; 
        }
        if (playerOne.trim() == "") {          // gives players names if string was empty
            playerOne = "Player One"; 
        }
        if (playerTwo.trim() == "") {
            playerTwo = "Player Two"; 
        }
        document.getElementById("endGameButton").style.display = "inline-block"; // shows end game button
        document.getElementById("checkbox").disabled = true;                     // prevents toggle of computer option
        document.getElementById("displayText").innerHTML = playerOne + " goes first!"; 
        resetGrid(); 
    }

    function endGame() {
        document.getElementById("endGameButton").style.display = "none";
        declareWinner("end"); 
    }

    function markBox(boxA, boxB) {
        let check; 
        if (!isNaN(boxA)) {                                  // if computer is player 2, it will pass a number
            boardArray[boxA][boxB] = currentMark;                  // to markBox. this checks if its a number and then
            boxA = document.getElementById("div" + boxA + boxB);     // uses that number to target the correct box
            check = false; 
        } else {
            boxB = boxA.target.id.slice(4);
            boxA = boxA.target.id.slice(3, 4);                 // if onclick event causes markBox, this grabs the div id
            boardArray[boxA][boxB] = currentMark;              // and uses that number to store in the array
            boxA = document.getElementById("div" + boxA + boxB); 
            check = true; 
        }
        boxA.innerHTML = currentMark;                        // sets the targeted box to the current mark
        boxA.removeEventListener("click", markBox); 
        
        swapMark(check);                                   // passes true or false last play was a human or computer
    } 

    function swapMark(check) {  // swaps the current mark and displays who's turn it is to go
        if (currentMark == "X") {
            currentMark = "O"; 
            document.getElementById("displayText").innerHTML = playerTwo + "'s turn!"; 
        } else {
            currentMark = "X"; 
            document.getElementById("displayText").innerHTML = playerOne + "'s turn!"; 
        }
        if (check == false) {   // if player 2 is the computer, returns to avoid 
            return;             // the computer going multiple times in a row
        }
        checkWin();             // checks if player one move wins before computer moves
        computerPlay();    
        console.log(boardArray)
    }

    function computerPlay() {
        if (document.getElementById("checkbox").checked == true &&  // verifies the computer is playing and the game
            document.getElementById("checkbox").disabled == true) { // has not ended
            let counter = 0; 
            while (true) {                               
                let numA = Math.floor(Math.random() * 3);
                let numB = Math.floor(Math.random() * 3);  // randomly finds a number and checks that array index
                if (counter == 20) {                       // if the array index is empty, marks that box w/ num
                    break;                                 // if all indexes are full, breaks while.
                }                                          // sometimes, the same index is generated randomly more
                if (boardArray[numA][numB] == "") {        // than once. counter at 20 to reduce chance that any index
                    markBox(numA, numB);                   // is missed.
                    break; 
                }
                counter++; 
            }
            checkWin();   // checks if computer won after it's move
        }
    }

    function checkWin() {   // compares all possible winning configurations and 
                            // passes the winning row mark to declareWinner
        if (boardArray[0][0] == boardArray[0][1] && boardArray[0][1] == boardArray[0][2] && boardArray[0][0] != "") {
                declareWinner(boardArray[0][0]); 
        } else if (boardArray[1][0] == boardArray[1][1] && boardArray[1][1] == boardArray[1][2] && boardArray[1][0] != "") {
                declareWinner(boardArray[1][0]);
        } else if (boardArray[2][0] == boardArray[2][1] && boardArray[2][1] == boardArray[2][2] && boardArray[2][0] != "") {
                declareWinner(boardArray[2][0]); 
        } else if (boardArray[0][0] == boardArray[1][0] && boardArray[1][0] == boardArray[2][0] && boardArray[0][0] != "") {
                declareWinner(boardArray[0][0]); 
        } else if (boardArray[0][1] == boardArray[1][1] && boardArray[1][1] == boardArray[2][1] && boardArray[0][1] != "") {
                declareWinner(boardArray[0][1]); 
        } else if (boardArray[0][2] == boardArray[1][2] && boardArray[1][2] == boardArray[2][2] && boardArray[0][2] != "") {
            declareWinner(boardArray[0][2]); 
        } else if (boardArray[0][0] == boardArray[1][1] && boardArray[1][1] == boardArray[2][2] && boardArray[0][0] != "") {
            declareWinner(boardArray[0][0]);
        } else if (boardArray[0][2] == boardArray[1][1] && boardArray[1][1] == boardArray[2][0] && boardArray[0][2] != "") {
            declareWinner(boardArray[0][2]); 
        } else {
            let k = 0; 
            for (i = 0; i < 3; i++) {
                for (j = 0; j < 3; j++) {                         // makes sure all array indexes are filled before
                    if (boardArray[i][j] != "") {                 // declaring match a tie
                        k++;            
                    }
                }
            };
            if (k == 9) {
                declareWinner("Tie");
            }
        }
    }

    function declareWinner(winner) {
        if (winner == "X") {
            document.getElementById("displayText").innerHTML = "The winner is " + playerOne + "!"; 
        } else if (winner == "O") {
            document.getElementById("displayText").innerHTML = "The winner is " + playerTwo + "!"; 
        } else if (winner == "end") {
            document.getElementById("displayText").innerHTML = "Game ended."; 
        } else {
            document.getElementById("displayText").innerHTML = "It's a tie!"; 
        }
        
        for (i = 0; i < 3; i++) {      // removes listeners from boxes to prevent marks after game ended
            for (j = 0; j < 3; j++) {
                document.getElementById("div" + i + j).removeEventListener("click", markBox);
            }
        }
        document.getElementById("endGameButton").style.display = "none"; // hides end game button
        document.getElementById("checkbox").disabled = false; // re enables checkbox for computer. checkbox value
    }                                                         // is used in computerplay to verify if game has ended

    function disablePlayerTwo() {   // disables naming player 2 if computer will be challenger
        if (document.getElementById("checkbox").checked == true) {
            document.getElementById("playerTwoName").disabled = true;
        } else {
            document.getElementById("playerTwoName").disabled = false;
        }
    }

    return {
      makeBoard, 
      startGame,
      disablePlayerTwo,
      endGame
    };
  })();

gameBoard.makeBoard(); 

document.getElementById("checkbox").checked = false; // these clear out old values from inputs on page load
document.getElementById("playerOneName").value = "";
document.getElementById("playerTwoName").value = "";