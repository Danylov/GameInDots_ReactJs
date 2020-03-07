import {FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, ISSELECTED, BEG_RAND_ENUM, END_RAND_ENUM, PLAYER, WINNER} from '../actions';

const initialState = {
    pending: false,
    data: [],
    error: null,
    field: 5,
    delay: 2000,
    begRandEnum: false,
    endRandEnum: false,
    playerName: "",
    winnerName: ""
};

export function Reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_DATA_PENDING:
            return {
                ...state,
                pending: true
            }
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                pending: false,
                data: action.payload
            }
        case FETCH_DATA_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case ISSELECTED:
            return {
                ...state,
                field: action.field,
                delay: action.delay
            }
        case BEG_RAND_ENUM:
            return {
                ...state,
                begRandEnum: action.begRandEnum
            }
        case END_RAND_ENUM:
            return {
                ...state,
                endRandEnum: action.endRandEnum
            }
        case PLAYER:
            return {
                ...state,
                playerName: action.playerName
            }
        case WINNER:
            return {
                ...state,
                winnerName: action.winnerName
            }
        default:
            return state;
    }
}

export const getData        = state => state.data;
export const getDataPending = state => state.pending;
export const getDataError   = state => state.error;
export const getField       = state => state.field;
export const getDelay       = state => state.delay;
export const getBegRandEnum = state => state.begRandEnum;
export const getEndRandEnum = state => state.endRandEnum;
export const getPlayerName  = state => state.playerName;
export const getWinnerName  = state => state.winnerName;
