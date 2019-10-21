import React from 'react'
import Square from "./Square"

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>
    }

    render() {
        return (
            <div>
                {
                    [0, 1, 2].map(i => {
                        return (
                            <div className="board-row">
                                {[0,1,2].map(j =>  this.renderSquare(3*i + j))}

                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

export default Board;

