import React from 'react';
import Choice from "../choice/choice";

import './name_form.css';

const NameForm = () => {

    const submithName = (e) => {
        e.preventDefault();
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

export default NameForm;
