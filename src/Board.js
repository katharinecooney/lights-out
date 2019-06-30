import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nRows: 5,
    nCols: 5,
    chanceLightStartsOn: 0.25
  }

  constructor (props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
  }

  createBoard () {
    let board = [];
    for(let y = 0; y < this.props.nRows; y++){
      let row = []
      for(var x = 0; x < this.props.nCols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board;
  }

  flipCellsAround (coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split('-').map(Number);

    function flipCell (y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    this.setState({ board, hasWon: false });
  }

  render () {
    let tableBoard = [];
    for(let y = 0; y < this.props.nRows; y++) {
      let row = [];
      for(let x = 0; x < this.props.nCols; x++){
        row.push(<Cell isLit={this.state.board[y][x]}/>)
      }
      tableBoard.push(<tr>{row}</tr>)
    }
    return (
      <table className="Board">
        <tbody>
          {tableBoard}
        </tbody>
      </table>
    );
  }
}

export default Board;
