import React from 'react';

import './cell.css';
import {getData, getDataError, getDataPending} from "../../reducers";

class Cell extends React.Component {
  render() {
    const { x, y, CELL_SIZE } = this.props;
    return (
        <div className="cell_green" style={{
          left:   `${CELL_SIZE * x + 1}px`,
          top:    `${CELL_SIZE * y + 1}px`,
          width:  `${CELL_SIZE - 1}px`,
          height: `${CELL_SIZE - 1}px`,
        }} />
    );
  }
}

export default Cell;
