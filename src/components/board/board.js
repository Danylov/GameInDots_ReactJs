import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import Cell from '../cell';

import './board.css';

const CELL_SIZE   = 50; // px

class Board  extends React.Component {

  state = {
    rows : 0,
    cols : 0,
    cells: [],
    interval: 0
  };

  makeEmptyBoard() {
    let board = [];
    for (let y = 0; y < this.state.rows; y++) {
      board[y] = [];
      for (let x = 0; x < this.state.cols; x++) {
        board[y][x] = false;
      }
    }
    return board;
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.state.rows; y++) {
      for (let x = 0; x < this.state.cols; x++) {
        if (this.board[y][x]) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  getElementOffset() {
    const rect = this.boardRef.getBoundingClientRect();
    const doc = document.documentElement;
    return {
      x: (rect.left + window.pageXOffset) - doc.clientLeft,
      y: (rect.top  + window.pageYOffset) - doc.clientTop
    };
  }

  handleClick = (event) => {
    const elemOffset = this.getElementOffset();
    const offsetX = event.clientX - elemOffset.x;
    const offsetY = event.clientY - elemOffset.y;
    const x = Math.floor(offsetX / CELL_SIZE);
    const y = Math.floor(offsetY / CELL_SIZE);
    if (0 <= x && x <= this.state.cols && 0 <= y && y <= this.state.rows) {
      this.board[y][x] = !this.board[y][x];
    }
    this.setState({ cells: this.makeCells() });
  }

  setInit = () => {
    this.setState({rows : this.props.isSelected, cols : this.props.isSelected, cells: []},
        () => {this.board = this.makeEmptyBoard()});
  };

  componentDidMount() {
    this.setInit();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isSelected !== prevProps.isSelected)  this.setInit();
  }

  render() {
    const { isSelected } = this.props;
    const BOARD_W_H = isSelected * CELL_SIZE + 1;
    const {cells} = this.state;

    return (
        <div className="board"
             style={{ width:BOARD_W_H, height:BOARD_W_H, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
             onClick={(e) => this.handleClick(e)}
             ref={(n) => { this.boardRef = n; }}>
          {cells.map(cell => (<Cell x = {cell.x} y = {cell.y} CELL_SIZE = {CELL_SIZE} key = {uniqid()}/>
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
