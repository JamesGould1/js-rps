const ROCK = {toString: () => "Rock", 
    beats: (other) => other === SCISSORS}
const PAPER = {toString: () => "Paper", 
    beats: (other) => other === ROCK}
const SCISSORS = {toString: () => "Scissors", 
    beats: (other) =>  other === PAPER}

const MOVES = [ROCK,PAPER,SCISSORS]
const computerplayer = {
    chooseMove: () => {return MOVES[Math.floor(Math.random() * MOVES.length)]}
}
const humanPlayer = {
    playerSelectedValue: 1,
    chooseMove: () => {return MOVES[playerSelectedValue-1]}
}
const playGame = (player1, player2) => {
    let move1 = player1.chooseMove();
    let move2 = player2.chooseMove();
    let winner;

    console.log("Player one played " +move1)
    console.log("Player two played " +move2)
    if (move1.beats(move2)) {
        winner = player1
        console.log("Player one won")
    }
    else if (move2.beats(move1)){
        winner = player2
        console.log("Player two won")
    }
    else {
        console.log("It's a draw!")
    }
    return winner
}
module.exports = {MOVES, computerplayer, humanPlayer, playGame}