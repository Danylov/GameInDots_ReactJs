import {fetchSetupPending, fetchSetupSuccess, fetchSetupError} from '../actions';

function fetchSetup() {
    return dispatch => {
        dispatch(fetchSetupPending());
        fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchSetupSuccess(res));
            })
            .catch(error => {
                dispatch(fetchSetupError(error));
            })
    }
}

export default fetchSetup;
