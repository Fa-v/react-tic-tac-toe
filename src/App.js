import React, { Component } from 'react';
import './index.css';

function Square(props) {
  return (
    <button className="square"
      onClick={props.onClick}>
      {props.squares}
    </button>
  );
}

class Board extends React.Component{
  renderSquare(squareIndex) {
    return (
      <Square
        squares={this.props.squares[squareIndex]}  
        onClick={() => this.props.onClick(squareIndex)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      squares: Array(9).fill(null),
      xPlayer: true,
      moves: [],
      result: null
    }
  }

  handleClick(squareIndex) {
    const { squares, xPlayer, moves } = this.state;
    const squaresCopy = squares.slice();
    const updatedMoves = moves.concat(squareIndex);
    const winnerResult = this.winner(updatedMoves);
    squaresCopy[squareIndex] = xPlayer ? 'X' : 'O';

    if (squares[squareIndex] !== null) {
      return;
    }

    this.setState({
      squares: squaresCopy,
      xPlayer: !this.state.xPlayer,
      moves: updatedMoves,
      result: winnerResult
    });
  }

  winner(moves) {
    const lineCompleted = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
    const xMoves = [];
    const oMoves = [];
      
    moves.filter((move, index) => {
      return index % 2 === 0 ? xMoves.push(move) : oMoves.push(move);
    });

    const result = lineCompleted.map((line) => {
      const [a, b, c] = line;
      
      return (xMoves.includes(a) && xMoves.includes(b) && xMoves.includes(c))
        ? 'X' : (oMoves.includes(a) && oMoves.includes(b) && oMoves.includes(c))
          ? 'O' : null;
      
    }); 

    return result.includes('X') ? 'X' : result.includes('O') ? 'O' : null;
  }

  resetBoard() {
    this.setState({
      squares: Array(9).fill(null),
      xPlayer: true,
      moves: [],
      result: null
    })
  }  

  render() {
    const { xPlayer, squares, result } = this.state;
    return (
      <div className="game">
        <div className="board">
          {(result)
            ? <p className="winner">{result === null ? '' : '🏆 The winner is: ' + result}</p>
            : <p>{xPlayer ? 'X\'s turn' : 'O\'s turn'}</p>
          }
          <Board
            squares={squares}
            onClick={(squareIndex) => this.handleClick(squareIndex)} />
          <button className="reset" onClick={() => this.resetBoard()}>{'Reset'}</button>
        </div>
      </div>
    );
  }
}

export default App;
