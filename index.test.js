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
    }
})

describe('computerPlayer', () => {
    const realRandom = Math.random;
    const cases = [[ROCK, 0.1], [PAPER, 0.4], [SCISSORS, 0.7]]
    afterAll(() => {
        Math.random = realRandom;
    });

    for (const [move, randomValue] of cases) {
        test(`${move} should be returned when Math.random returns ${randomValue}`, () => {
            Math.random = () => { return randomValue };
            const chosenMove = computerplayer.chooseMove();
            expect(chosenMove).toBe(move);
        });
    }
});

describe('humanPlayer', () => {
    const cases = [[ROCK, 1], [PAPER, 2], [SCISSORS, 3]]
    for (const [move, value] of cases) {
        test(`Human Player should select ${move} when they provide ${value}`, () => {
            playerSelectedValue = value;
            const chosenMove = humanPlayer.chooseMove();
            expect(chosenMove).toBe(move)
        })
    }
})

describe('playGame', () => {
    const playsRock = { toString: () => "Rocky", chooseMove: () => { return ROCK } }
    const playsPaper = { toString: () => "Papery", chooseMove: () => { return PAPER } }
    const playsRockThenPaper = { toString: () => "SoftRock", chooseMove: jest.fn().mockReturnValueOnce(ROCK).mockReturnValueOnce(PAPER)}
    const realConsoleLog = console.log

    beforeEach(() => {
        console.log = jest.fn()
    })

    afterEach(() => {
        console.log = realConsoleLog
    })


    test(`player 1 move should be printed`, () => {
        playGame(playsRock, playsPaper)
        expect(console.log).toHaveBeenCalledWith('Rocky played Rock')
    })
    test(`player 2 move should be printed`, () => {
        playGame(playsPaper, playsRock)
        expect(console.log).toHaveBeenCalledWith('Papery played Paper')
    })
    test(`player1's wins should be reported`, () => {
        playGame(playsRock, playsPaper)
        expect(console.log).toHaveBeenCalledWith('Papery won')
    })
    test(`player2's wins should be reported`, () => {
        playGame(playsPaper, playsRock)
        expect(console.log).toHaveBeenCalledWith('Papery won')
    })
    test(`draws should be reported and cause a replay`, () => {
        playGame(playsRockThenPaper, playsRock)
        expect(console.log).toHaveBeenCalledWith("It's a draw!")
        expect(console.log).toHaveBeenCalledWith("SoftRock won")
    })
})