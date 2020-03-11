import React from 'react';
import Choice from "../choice/choice";
import {setBegRandEnum, setPlayer, setWinner} from '../../actions'
import {connect} from "react-redux";
import Board from "../board/board";
import {getBegRandEnum, getEndRandEnum, getField, getWinnerName} from "../../reducers";
import { TextField, Button } from '@material-ui/core';

import './name_form.css';

let CPlay = "PLAY";

class NameForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            playerName: ''
        }
    }

    submithName = (e) => {
        e.preventDefault();
        this.props.setBegRandEnum(true);
        this.props.setPlayer(this.state.playerName);
        this.props.setWinner("");
    };


    handleChangeName = (e) => {
        this.setState({
            playerName: e.target.value
        });
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.endRandEnum === false) && (this.props.endRandEnum === true))  this.props.setBegRandEnum(false);
    }

    render() {

        const {winnerName, begRandEnum, endRandEnum, field} = this.props;

        if  ((begRandEnum === false) && (endRandEnum === true))  CPlay = "PLAY AGAIN";

        return (
            <div>
                <div className="game_settings">
                    <Choice/>
                    <TextField
                        className="player_name"
                        label={"Enter your name"}
                        value={this.state.playerName}
                        onChange={this.handleChangeName}
                    />
                    <Button
                        variant='contained'
                        className="game_play"
                        disabled={(field === 0) || (begRandEnum === true) || (this.state.playerName === "")}
                        onClick={(e) => this.submithName(e)}>{CPlay}
                    </Button>
                </div>
                <div className="message_settings">
                    { (endRandEnum === true) ?
                        // <input type="text" className="game_message" readOnly value = {winnerName} />
                        <TextField
                            className="game_message"
                            readOnly
                            value= {`Winner: ${winnerName}`}
                        />
                        : null
                    }
                </div>
                <br/>
                <div>
                    <Board/>
                </div>
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
    winnerName:  getWinnerName(state),
    field:       getField(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(NameForm);
