import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import Cell from '../cell';
import {getPrRendEnum, getField, getDelay, getPlayerName} from "../../reducers";
import {setWinner} from "../../actions";

import './board.css';

const CELL_SIZE   = 50; // px
let timerId = null;

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
        board[y][x] = 0;
      }
    }
    return board;
  }

  makeCells() {
    let cells = [];
    for (let y = 0; y < this.state.rows; y++) {
      for (let x = 0; x < this.state.cols; x++) {
// 0 - not active (white),                          1 - PC choose that cell (blue),
// 2 - player clicked on cell after mode 1 (green), 3 - player not clicked on cell after mode 1 (red)
        if (0 < this.board[y][x]) {
          let mode = this.board[y][x];
          cells.push({ x, y, mode});
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
      if (this.board[y][x] === 1)  this.board[y][x] = 2;
    }
    this.setState({ cells: this.makeCells() });
  }

  setInit = () => {
    this.setState({rows : this.props.field, cols : this.props.field, cells: []},
        () => {
          this.board = this.makeEmptyBoard();
          if (this.props.prRandEnum === true)  timerId = setInterval(this.randomCell, this.props.delay);
        });
  };

  componentWillMount() {
    this.setInit();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.field !== prevProps.field) || (this.props.prRandEnum !== prevProps.prRandEnum))  this.setInit();
  }

  randomCell = () => {
    let x_cell = 0, y_cell = 0, kolCell = 0;
    do {
      kolCell = this.props.field * this.props.field;
      let randCell = Math.floor(Math.random() * kolCell);
      y_cell = Math.trunc(randCell / this.props.field);
      x_cell = randCell - y_cell * this.props.field - 1;
    }
    while  (this.board[y_cell][x_cell] !== 0);
    let sumGreen = 0, sumRed = 0;
    for (let y = 0; y < this.state.rows; y++) {
      for (let x = 0; x < this.state.cols; x++) {
        if (this.board[y][x] === 1)  this.board[y][x] = 3;
        if (this.board[y][x] === 2)  sumGreen++;
        if (this.board[y][x] === 3)  sumRed++;
      }
    }
    if ((Math.trunc(0.5 * kolCell) < sumGreen) || (Math.trunc(0.5 * kolCell) < sumRed))
    {
      this.board[y_cell][x_cell] = 0;
      clearInterval(timerId);
      if (sumGreen < sumRed)  this.props.setWinner("Computer");
      else                    this.props.setWinner(this.props.playerName);
    }
    else  this.board[y_cell][x_cell] = 1;
    this.setState({ cells: this.makeCells() });
  };

  render() {
    const { field } = this.props;
    const BOARD_W_H = field * CELL_SIZE + 1;
    const {cells} = this.state;

    return (
        <div className="board"
             style={{ width:BOARD_W_H, height:BOARD_W_H, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
             onClick={(e) => this.handleClick(e)}
             ref={(n) => { this.boardRef = n; }}>
          {cells.map(cell => (<Cell x = {cell.x} y = {cell.y} CELL_SIZE = {CELL_SIZE} mode = {cell.mode} key = {uniqid()}/>
          ))}
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setWinner : winnerName => dispatch(setWinner(winnerName))
  };
}

const mapStateToProps = state => {
  return {
    prRandEnum: getPrRendEnum(state),
    field:      getField(state),
    delay:      getDelay(state),
    playerName: getPlayerName(state)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
