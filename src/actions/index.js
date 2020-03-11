
export const FETCH_SETUP_PENDING  = 'FETCH_SETUP_PENDING';
export const FETCH_SETUP_SUCCESS  = 'FETCH_SETUP_SUCCESS';
export const FETCH_SETUP_ERROR    = 'FETCH_SETUP_ERROR';
export const FETCH_WINNER_PENDING = 'FETCH_WINNER_PENDING';
export const FETCH_WINNER_SUCCESS = 'FETCH_WINNER_SUCCESS';
export const FETCH_WINNER_ERROR   = 'FETCH_WINNER_ERROR';
export const POST_WINNER_PENDING  = 'POST_WINNER_PENDING';
export const POST_WINNER_SUCCESS  = 'POST_WINNER_SUCCESS';
export const POST_WINNER_ERROR    = 'POST_WINNER_ERROR';
export const ISSELECTED           = 'ISSELECTED';
export const BEG_RAND_ENUM        = 'BEG_RAND_ENUM';
export const END_RAND_ENUM        = 'END_RAND_ENUM';
export const PLAYER               = 'PLAYER';
export const WINNER               = 'WINNER';

export function fetchSetupPending() {
    return {
        type: FETCH_SETUP_PENDING
    }
}

export function fetchSetupSuccess(data) {
    return {
        type: FETCH_SETUP_SUCCESS,
        payload: data
    }
}

export function fetchSetupError(error) {
    return {
        type: FETCH_SETUP_ERROR,
        error: error
    }
}

export function fetchWinnersPending() {
    return {
        type: FETCH_WINNER_PENDING
    }
}

export function fetchWinnersSuccess(data) {
    return {
        type: FETCH_WINNER_SUCCESS,
        payload: data
    }
}

export function fetchWinnersError(error) {
    return {
        type: FETCH_WINNER_ERROR,
        error: error
    }
}

export function postWinnerPending() {
    return {
        type: POST_WINNER_PENDING
    }
}

export function postWinnerSuccess(data) {
    return {
        type: POST_WINNER_SUCCESS,
        payload: data
    }
}

export function postWinnerError(error) {
    return {
        type: POST_WINNER_ERROR,
        error: error
    }
}

export const isSelected = event => {
    return {
        type: ISSELECTED,
        field: parseInt(event.target.value.split('|')[0]),
        delay: parseInt(event.target.value.split('|')[1])
    }
}

export const setBegRandEnum = (begRandEnum) => {
    return {
        type: BEG_RAND_ENUM,
        begRandEnum: begRandEnum
    }
}

export const setEndRandEnum = (endRandEnum) => {
    return {
        type: END_RAND_ENUM,
        endRandEnum: endRandEnum
    }
}
export const setPlayer = (playerName) => {
    return {
        type: PLAYER,
        playerName: playerName
    }
}
export const setWinner = (winnerName) => {
    return {
        type: WINNER,
        winnerName: winnerName
    }
}
