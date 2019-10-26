import React from 'react'
import Square from "./Square"

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)} key={i} isWin={this.props.win ? this.props.win.includes(i) : undefined}/>
    }

    render() {
        return (
            <div>
                {
                    [0, 1, 2].map(i => {
                        return (
                            <div className="board-row" key={i}>
                                {[0, 1, 2].map(j =>  this.renderSquare(3 * i + j))}
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Board;

