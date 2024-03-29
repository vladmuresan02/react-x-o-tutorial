import React from 'react';
import Board from "./Board/Board";
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                move: '',
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true,
            movesAscendingOrder: false
        }
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                move: `${squares[i]} to col ${(i % 3) + 1} and row ${(Math.floor(i / 3) + 1)} `,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length

        })
    }

    jumpToMove(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    sortMoves() {
        this.setState({
            movesAscendingOrder: !this.state.movesAscendingOrder
        })
    }

    composeStatus(result, current) {
        console.log(result);
        if (result) {
            if (result === 'Draw!') {
                return 'Draw!'
            }
            return `Winner: ${current.squares[result[0]]}`
        }

        return `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let status;
        status = this.composeStatus(winner, current);
        let moves = history.map((step, move) => {
            const desc = move ? `Go to move #${move}` : 'Go to game start';
            return (
                <li key={move} className={move === this.state.stepNumber ? 'li-bolded' : ''}>
                    <button onClick={() => {
                        this.jumpToMove(move)
                    }}>{desc} -- {step.move} </button>
                </li>
            );
        });

        if (!this.state.movesAscendingOrder) {
            moves = moves.sort((a, b) => b.key - a.key)
        }


        return (
            <div className="game">
                <div className="game-board">
                    <Board squares={current.squares} onClick={(i) => this.handleClick(i)}
                           win={winner ? winner : false}/>
                </div>
                <div className="game-info">
                    <div>
                        {status}
                    </div>
                    <ol>
                        <button onClick={() => this.sortMoves()}>
                            {this.state.movesAscendingOrder ? 'sort desc' : ' sort asc'}
                        </button>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {


    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }

    let nullValues = squares.filter(value => value === null);
    if (nullValues.length === 0) {
        return 'Draw!'
    }

    return null;
}

export default App;
