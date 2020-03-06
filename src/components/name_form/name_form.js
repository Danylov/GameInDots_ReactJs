import React from 'react';
import Choice from "../choice/choice";
import {begRandEnum} from '../../actions'
import {connect} from "react-redux";
import Board from "../board/board";
import {getWinnerName} from "../../reducers";

import './name_form.css';

let prRandEnum = false;
let playerName = "";
let winnerName = "";

class NameForm extends React.Component {

    // componentDidUpdate(prevProps) {
    //     if (this.props.winnerName !== prevProps.winnerName)  winnerName = this.props.winnerName;
    // }

       submithName = (e) => {
            e.preventDefault();
            prRandEnum = true;
            let playerName_ = this.refs.playerName;
            playerName = playerName_.value;
            this.props.submith(prRandEnum, playerName);
        };

    render() {

        const {winnerName} = this.props;

        return (
            <div>
                <form>
                    <Choice/>
                    <input type="text" id="name" ref="playerName" placeholder="Enter your name"/>
                    <button onClick={(e) => this.submithName(e)}>PLAY</button>
                    <br/>
                    <br/>
                    <input type="text" readOnly id="winner" value = {winnerName} />
                    <br/>
                    <br/>
                    <Board/>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submith : (prRandEnum, playerName) => dispatch(begRandEnum(prRandEnum, playerName))
    };
}

const mapStateToProps = state => {
    return {
        winnerName: getWinnerName(state)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
