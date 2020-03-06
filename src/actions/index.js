
export const FETCH_DATA_PENDING = 'FETCH_DATA_PENDING';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_ERROR   = 'FETCH_DATA_ERROR';
export const ISSELECTED         = 'ISSELECTED';
export const RAND_ENUM          = 'RAND_ENUM';
export const WINNER             = 'WINNER';

export function fetchDataPending() {
    return {
        type: FETCH_DATA_PENDING
    }
}

export function fetchDataSuccess(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        payload: data
    }
}

export function fetchDataError(error) {
    return {
        type: FETCH_DATA_ERROR,
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

export const begRandEnum = (prRandEnum, playerName) => {
    return {
        type: RAND_ENUM,
        prRandEnum: prRandEnum,
        playerName: playerName
    }
}

export const setWinner = (winnerName) => {
    return {
        type: WINNER,
        winnerName: winnerName
    }
}
