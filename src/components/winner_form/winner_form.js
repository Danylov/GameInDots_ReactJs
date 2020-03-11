import React from 'react';

import './winner_form.css';
import {getDataFW} from "../../reducers";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import fetchWinnersAction from "../../reducers/fetchWinners";

class WinnerForm extends React.Component {

    render() {

        const {fetchWinners} = this.props;
        fetchWinners();

        return (
            <div className="winners">
                <div className="winners__title">Winners</div>
                <div className="winners__block">
                    {
                        this.props.winners.map(winner => (
                            <div className="winners__item winner" key={winner.id}>
                                <div className="winner__name">{winner.winner}</div>
                                <div className="winner__time">{winner.date}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    winners: getDataFW(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchWinners:   fetchWinnersAction
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(WinnerForm);
