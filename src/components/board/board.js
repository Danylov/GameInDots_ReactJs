import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';
import Cell from '../cell';
import {getBegRandEnum, getField, getDelay, getPlayerName} from "../../reducers";
import {setEndRandEnum, setWinner} from "../../actions";
import postWinnerAction from "../../reducers/postWinner";

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
    let board = Array(this.state.rows).fill().map(() => Array(this.state.cols).fill(0));
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

  componentDidUpdate(prevProps) {
    if ((this.props.field !== prevProps.field) || ((prevProps.begRandEnum === false) && (this.props.begRandEnum === true)))
    {
      this.setState({rows : this.props.field, cols : this.props.field, cells: []},
          () => {
            this.props.setEndRandEnum(false);
            this.board = this.makeEmptyBoard();
            if ((prevProps.begRandEnum === false) && (this.props.begRandEnum === true)) timerId = setInterval(this.randomCell, this.props.delay);
          });
    }
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

    const fCells = Math.trunc(0.5 * kolCell);
    this.board.forEach((b_str, i, board) => {
      b_str.forEach((item, j, b_str) => {
        switch (item) {
          case 1: board[i][j] = 3;   break;
          case 2: sumGreen++; break;
          case 3: sumRed++;   break;
          default:            break;
        };
      });
    });

    if ((fCells < sumGreen) || (fCells < sumRed))
    {
      this.board[y_cell][x_cell] = 0;
      clearInterval(timerId);
      let winner = "";
      (sumGreen < sumRed) ? winner = "Computer" : winner = this.props.playerName;
      this.props.setWinner(winner);
      const {postWinner} = this.props;
      postWinner(winner);
      this.props.setEndRandEnum(true);
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

const mapDispatchToProps = dispatch => {
  return {
    setEndRandEnum : endRandEnum => dispatch(setEndRandEnum(endRandEnum)),
    setWinner      : winnerName => dispatch(setWinner(winnerName)),
    postWinner     : winnerName => dispatch(postWinnerAction(winnerName))
  };
}

const mapStateToProps = state => ({
  begRandEnum: getBegRandEnum(state),
  field:       getField(state),
  delay:       getDelay(state),
  playerName:  getPlayerName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);
