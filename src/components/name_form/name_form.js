import React from 'react';
import Choice from "../choice/choice";
import {begRandEnum, RAND_ENUM} from '../../actions'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import './name_form.css';

let prRandEnum = false;

const NameForm = ({submith}) => {

    const submithName = (e) => {
        e.preventDefault();
        prRandEnum = true;
        submith(prRandEnum);
        // getName(inputName);
    };

    return (
        <div>
            <form>
                <Choice />
                <input type="text" placeholder="Enter your name" />
                <button onClick={(e) => submithName(e)} >PLAY</button>
            </form>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        submith : prRandEnum => dispatch(begRandEnum(prRandEnum))
    };
}

// const mapDispatchToProps = dispatch => bindActionCreators({
//     submith : prRandEnum => begRandEnum(prRandEnum)
// }, dispatch);

export default connect(undefined, mapDispatchToProps)(NameForm);
