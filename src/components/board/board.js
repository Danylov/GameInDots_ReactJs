import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import Cell from '../cell';

import './board.css';

const CELL_SIZE   = 50; // px

class Board  extends React.Component {

  constructor() {
    super();
  }

  makeCells = (rows, cols) => {
    let cells = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (this.board[y][x])  cells.push({ x, y });
      }
    }
    return cells;
  };

  makeEmptyBoard = (rows, cols) => {
    let board = [];
    for (let y = 0; y < rows; y++) {
      board[y] = [];
      for (let x = 0; x < cols; x++)  board[y][x] = false;
    }
    return board;
  }

  render() {
    const { isSelected } = this.props;
    const rows = isSelected;
    const cols = isSelected;
    const BOARD_W_H = isSelected * CELL_SIZE + 1;
    this.board = this.makeEmptyBoard(rows, cols);
    const cells = this.makeCells(rows, cols);

    return (
        <div className="board"
             style={{ width:BOARD_W_H, height:BOARD_W_H, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
             onClick={this.handleClick}
             ref={(n) => { this.boardRef = n; }}>
          {cells.map(cell => (<Cell x = {cell.x} y = {cell.y} key = {uniqid()}/>
          ))}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isSelected: state.isSelected
  }
}

export default connect(mapStateToProps)(Board);
