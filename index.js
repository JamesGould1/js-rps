const ROCK = {
    toString: () => "Rock",
    beats: (other) => other === SCISSORS
}
const PAPER = {
    toString: () => "Paper",
    beats: (other) => other === ROCK
}
const SCISSORS = {
    toString: () => "Scissors",
    beats: (other) => other === PAPER
}

const MOVES = [ROCK, PAPER, SCISSORS]
const computerplayer = {
    chooseMove: () => { return MOVES[Math.floor(Math.random() * MOVES.length)] }
}
const humanPlayer = {
    playerSelectedValue: 1,
    chooseMove: () => { return MOVES[playerSelectedValue - 1] }
}
function playGame(player1, player2) {
    let draw = true;
    while (draw) {
        const move1 = player1.chooseMove()
        const move2 = player2.chooseMove()
        let winner
        console.log(`${player1} played ${move1}`)
        console.log(`${player2} played ${move2}`)
        if (move1.beats(move2)) {
            winner = player1
            draw = false
        }
        else if (move2.beats(move1)) {
            winner = player2
            draw = false
        }
        else {
            console.log("It's a draw!")
        }
    } console.log(`${winner} won`)
}
module.exports = { MOVES, computerplayer, humanPlayer, playGame }