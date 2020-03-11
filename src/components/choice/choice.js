import React, {Component} from 'react';
import uniqid from 'uniqid';
import {bindActionCreators} from "redux";
import fetchSetupAction from "../../reducers/fetchSetup";
import {connect} from 'react-redux';
import {getDataS, getDataPendingS} from "../../reducers";
import Spinner from "../spinner";
import {isSelected} from '../../actions';
import { TextField, MenuItem } from '@material-ui/core';

import './choice.css';

class Choice  extends Component {

    componentWillMount() {
        const {fetchSetup} = this.props;
        fetchSetup();
    }

    render() {
        const {pending_s, data_s, isSelected} = this.props;

        if (pending_s) return <Spinner />

        const choices = Object.entries(data_s).map(el => {
            const choiceName = el[0].substr(0, 1).toUpperCase() +
                el[0].substr(1, el[0].lastIndexOf('M') - 1);
            return <MenuItem key={uniqid()} value={el[1].field.toString() + "|" + el[1].delay.toString()}>{`${choiceName}`}</MenuItem>
        });

        return (
                <TextField  className="game_mode"
                    select
                    label="Choose game mode"
                    onChange={ (e) => isSelected(e)  }
                            // defaultValue={choices}
                    >
                            {choices}
                    </TextField>
        );
    }
};

const mapStateToProps = state => ({
    data_s:    getDataS(state),
    pending_s: getDataPendingS(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchSetup:   fetchSetupAction,
    isSelected:  (e) => isSelected(e)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Choice);
