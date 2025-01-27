const {MOVES, computerplayer, humanPlayer, playGame} = require('./index')

const ROCK = MOVES[0]
const PAPER = MOVES[1]
const SCISSORS = MOVES[2]


describe(`MOVES`, () => {
for (const move of MOVES) {
    test(`${move} should beat one other move`, () => {
        let victories = 0;
        for (const defender of MOVES) {
            victories += move.beats(defender)
        }
        expect(victories === 1).toBe(true)
    })
    test(`${move} should not beat itself`, () => {
        expect(move.beats(move)).toBeFalsy
    })
    test(`${move} should lose to one other move`, () => {
        let defeats = 0;
        for (const aggressor of MOVES) {
            defeats += aggressor.beats(move)
        }
        expect(defeats === 1).toBe(true)

    })
}})

describe('computerPlayer', () => {
    const realRandom = Math.random;
    const cases = [[ROCK, 0.1],[PAPER, 0.4],[SCISSORS, 0.7]]
    afterAll(() => {
      Math.random = realRandom;
    });
  
    for (const [move, randomValue] of cases) {
      test(`${move} should be returned when Math.random returns ${randomValue}`, () => {
        Math.random = () => {return randomValue};
        const chosenMove = computerplayer.chooseMove();
        expect(chosenMove).toBe(move);
      });
    }
});

describe('humanPlayer', () => {
    const cases = [[ROCK,1],[PAPER,2],[SCISSORS, 3]]
    for (const [move, value] of cases){
    test(`Human Player should select ${move} when they provide ${value}`, () => {
        playerSelectedValue = value;
        const chosenMove = humanPlayer.chooseMove();
        expect(chosenMove).toBe(move)
    }) 
}})

describe('playGame', () => {
    const playsRock = {toString: ()=> "Rocky", chooseMove: () => {return ROCK}}
    const playsPaper = {toString: ()=> "Papery", chooseMove: () => {return PAPER}}
    const consoleLog = console.log
    let consoleMessage = consoleLog



    test(`player 1 move should be printed`, () => { 
        let winner;
        winner = playGame(playsRock, playsPaper) 
        expect(consoleMessage.toString).toBe("Player one played Rock")
    })
})