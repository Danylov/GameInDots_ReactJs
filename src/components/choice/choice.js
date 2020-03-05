import React, {Component} from 'react';
import uniqid from 'uniqid';
import {bindActionCreators} from "redux";
import fetchDataAction from "../../reducers/fetchData";
import {connect} from 'react-redux';
import {getDataError, getData, getDataPending} from "../../reducers";
import Spinner from "../spinner";
import {isSelected} from '../../actions'

import './choice.css';

class Choice  extends Component {

    componentWillMount() {
        const {fetchData} = this.props;
        fetchData();
    }

    render() {
        const {pending, data, isSelected} = this.props;

        if (pending) return <Spinner />

        const choices = Object.entries(data).map(el => {
            const choiceName = el[0].substr(0, 1).toUpperCase() +
                               el[0].substr(1, el[0].lastIndexOf('M') - 1);
            return <option key={uniqid()} value={el[1].field.toString() + "|" + el[1].delay.toString()}>{`${choiceName}`}</option>
        });

        return (
            <select  onChange={ (e) => isSelected(e)  }>
                 {choices}
            </select>
        );
    }
};

const mapStateToProps = state => ({
    error:   getDataError(state),
    data:    getData(state),
    pending: getDataPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchData:   fetchDataAction,
    isSelected:  (e) => isSelected(e)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Choice);
