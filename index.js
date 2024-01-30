const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

// variables:-
let currentPlayer;  // so as to know which player's turn is now
let gameGrid;   // so as to know the game status.

const winningPositions = [
    [0,1,2],
    [3,4,5], 
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// function to initialize the game.
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // to render it on the UI;
    boxes.forEach((box,index)=>{
        box.innerText = ""; // as on initialising we want the boxes to be rendered to empty
        boxes[index].style.pointerEvents = "all";   // as we hid the pointer event property earlier, when a box was clicked, so on emptying, we made that property visible again.
        // re-initialise the box CSS again to default properties.
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver(){
    let answer = "";

    // checking if the winning positions are non-empty and have either X or O at all the three positions.
    winningPositions.forEach((position)=>{
        if(gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== ""
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
                
                //check if winner is X or O
                if(gameGrid[position[0]] === "X"){
                    answer = "X";
                }else{
                    answer = "O";
                }

                // as the game is won, there is no further need to allow any clickable boxes as then it will make two winner, thus after winner is declared, disable the clickables.
                boxes.forEach((box)=>{
                    box.style.pointerEvents = "none";
                })

                // to paint the winner boxes green.
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if(answer !== ""){  // that is we have an answer.
        gameInfo.innerText = `Winner Player - ${answer}`;   // to display the winner on the gameInfo container.
        newGameBtn.classList.add("active");     // so as to make visible the new game button, after the game is won or is tied.
    }

    // check for tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box !== ""){
            fillCount++;
        }
    })

    if(fillCount === 9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
}

function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else{
        currentPlayer = "X";
    }

    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index){
    if(gameGrid[index] === ""){ // that is, if the particular grid index is empty, then only we'll take action.
        boxes[index].innerText = currentPlayer; // this is so as to display on the UI.
        gameGrid[index] = currentPlayer;    // this is for the grid we have initially as empty, so as to know the status.
        boxes[index].style.pointerEvents = "none";  // so that after it is marked, cursor wont be able to click on it again.
        swapTurn(); // for changing the current player.
        checkGameOver();    // to check if someone won or not.
    }  
}

boxes.forEach((box,index)=>{                    // this basically means --> ki har ek box ke liye   // index isliye pass karaya so that i know which box is clicked.
    box.addEventListener("click",() => {        // ye vala code chalaunga
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);