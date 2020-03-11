import {fetchWinnersPending, fetchWinnersSuccess, fetchWinnersError} from '../actions';

function fetchWinners() {
    return dispatch => {
        dispatch(fetchWinnersPending());
        fetch('https://starnavi-frontend-test-task.herokuapp.com/winners')
            .then(res => res.json())
            .then(res => {
                dispatch(fetchWinnersSuccess(res));
            })
            .catch(error => {
                dispatch(fetchWinnersError(error));
            })
    }
}

export default fetchWinners;
