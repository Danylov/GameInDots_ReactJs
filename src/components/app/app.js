import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import NameForm from '../name_form';

import './app.css';

const App = () => {
    return (
        <Provider store = {store}>
            <div className="App">
                <NameForm />
                {/*<field />*/}
            </div>
        </Provider>
    );
};

export default App;
