import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import Cell from '../cell';

const Field = ({ isSelected }) => {

  const style = {
    gridTemplateColumns: `repeat(${isSelected}, 50px)`,
    gridTemplateRows:    `repeat(${isSelected}, 50px)`,
  }

  const res = new Array(Math.pow(isSelected, 2)).fill(null).map(el => {
    return <Cell key={uniqid()} />
  });

  return (
    <div className="field" style={style}>
      {res}
    </div>
  )
}

const mapStateToProps = state => {

  return {
    isSelected: state.isSelected
  }

}

export default connect(mapStateToProps)(Field);
