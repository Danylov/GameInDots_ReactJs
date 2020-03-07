import React from 'react';
import Choice from "../choice/choice";
import {setBegRandEnum, setPlayer, setWinner} from '../../actions'
import {connect} from "react-redux";
import Board from "../board/board";
import {getBegRandEnum, getEndRandEnum, getWinnerName} from "../../reducers";

import './name_form.css';

let CPlay = "PLAY";

class NameForm extends React.Component {

    submithName = (e) => {
        e.preventDefault();
        let playerName_ = this.refs.playerName;
        let playerName = playerName_.value;
        if  (playerName === "") alert("Please, input player name.");
        else
        {
            this.props.setBegRandEnum(true);
            this.props.setPlayer(playerName);
            this.props.setWinner("");
        }
    };

    componentDidUpdate(prevProps) {
        if ((prevProps.endRandEnum === false) && (this.props.endRandEnum === true))  this.props.setBegRandEnum(false);
    }

        render() {

        const {winnerName, begRandEnum, endRandEnum} = this.props;

        if  ((begRandEnum === false) && (endRandEnum === true))  CPlay = "PLAY AGAIN";

        return (
            <div>
                <form>
                    <Choice/>
                    <input type="text" id="name" ref="playerName" placeholder="Enter your name"/>
                    <button onClick={(e) => this.submithName(e)}>{CPlay}</button>
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

const mapDispatchToProps = dispatch => {
    return {
        setBegRandEnum : begRandEnum => dispatch(setBegRandEnum(begRandEnum)),
        setPlayer      : playerName => dispatch(setPlayer(playerName)),
        setWinner      : winnerName => dispatch(setWinner(winnerName))
    };
}

const mapStateToProps = state => ({
    begRandEnum: getBegRandEnum(state),
    endRandEnum: getEndRandEnum(state),
    winnerName:  getWinnerName(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
