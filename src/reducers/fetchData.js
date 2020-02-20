import {fetchDataPending, fetchDataSuccess, fetchDataError} from '../actions';

function fetchData() {
    return dispatch => {
        dispatch(fetchDataPending());
        fetch('https://starnavi-frontend-test-task.herokuapp.com/game-settings')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchDataSuccess(res));
            })
            .catch(error => {
                dispatch(fetchDataError(error));
            })
    }
}

export default fetchData;
