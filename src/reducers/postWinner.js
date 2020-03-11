import {postWinnerPending, postWinnerSuccess, postWinnerError} from '../actions';

function postWinner(winnerName) {
    const date = new Date();
    const date_ = `${date.toTimeString().slice(0, 5)}; ${date.getDate()} ${date.toLocaleDateString("en-US", {month: 'long'})} ${date.getFullYear()}`;
    const data = {
        winner: winnerName,
        date: date_
    };
    return dispatch => {
        dispatch(postWinnerPending());
        fetch('https://starnavi-frontend-test-task.herokuapp.com/winners',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                dispatch(postWinnerSuccess(res));
            })
            .catch(error => {
                dispatch(postWinnerError(error));
            })
    }
}

export default postWinner;
