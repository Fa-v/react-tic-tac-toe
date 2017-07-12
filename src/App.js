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
  renderSquare(i) {
    return (
      <Square
        squares={this.props.squares[i]}  
        onClick={() => this.props.onClick(i)}
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
      firstPlayer: 'X',
      nextMove: false
    }
  }

  handleClick(i) {
    let squares = this.state.squares;
    squares[i] = this.state.firstPlayer; 
    console.log(squares)
    this.setState({
      squares: squares
    })
  }

  render() {
    return (
      <div className="game">
        <div className="board">
          <Board
            squares={this.state.squares}
            onClick={i => this.handleClick(i)}/>
        </div>
      </div>
    );
  }


}

export default App;
