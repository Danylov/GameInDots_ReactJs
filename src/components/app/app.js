import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import NameForm from '../name_form';
import LeaderForm from '../leader_form';

import './app.css';


const App = () => {
    return (
        <Provider store = {store}>
            <div className="App">
                <div id="n_f">
                    <NameForm />
                </div>
                <div id="l_f">
                    <LeaderForm />
                </div>
            </div>
        </Provider>
    );
};

export default App;
