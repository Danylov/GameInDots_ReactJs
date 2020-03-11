import {FETCH_SETUP_PENDING,  FETCH_SETUP_SUCCESS,  FETCH_SETUP_ERROR,
        FETCH_WINNER_PENDING, FETCH_WINNER_SUCCESS, FETCH_WINNER_ERROR,
        POST_WINNER_PENDING,  POST_WINNER_SUCCESS,  POST_WINNER_ERROR,
        ISSELECTED, BEG_RAND_ENUM, END_RAND_ENUM, PLAYER, WINNER} from '../actions';

const initialState = {
    pending_s: false,
    data_s: [],
    error_s: null,
    pending_fw: false,
    data_fw: [],
    error_fw: null,
    pending_pw: false,
    data_pw: [],
    error_pw: null,
    field: 0,
    delay: 0,
    begRandEnum: false,
    endRandEnum: false,
    playerName: "",
    winnerName: ""
};

export function Reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_SETUP_PENDING:
            return {
                ...state,
                pending_s: true
            }
        case FETCH_SETUP_SUCCESS:
            return {
                ...state,
                pending_s: false,
                data_s: action.payload
            }
        case FETCH_SETUP_ERROR:
            return {
                ...state,
                pending_s: false,
                error_s: action.error
            }
        case FETCH_WINNER_PENDING:
            return {
                ...state,
                pending_fw: true
            }
        case FETCH_WINNER_SUCCESS:
            return {
                ...state,
                pending_fw: false,
                data_fw: action.payload
            }
        case FETCH_WINNER_ERROR:
            return {
                ...state,
                pending_fw: false,
                error_fw: action.error
            }
        case POST_WINNER_PENDING:
            return {
                ...state,
                pending_pw: true
            }
        case POST_WINNER_SUCCESS:
            return {
                ...state,
                pending_pw: false,
                data_pw: action.payload
            }
        case POST_WINNER_ERROR:
            return {
                ...state,
                pending_pw: false,
                error_pw: action.error
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

export const getDataS         = state => state.data_s;
export const getDataPendingS  = state => state.pending_s;
export const getDataErrorS    = state => state.error_s;
export const getDataFW        = state => state.data_fw;
export const getDataPendingFW = state => state.pending_fw;
export const getDataErrorFW   = state => state.error_fw;
export const getDataPW        = state => state.data_pw;
export const getDataPendingPW = state => state.pending_pw;
export const getDataErrorPW   = state => state.error_pw;
export const getField         = state => state.field;
export const getDelay         = state => state.delay;
export const getBegRandEnum   = state => state.begRandEnum;
export const getEndRandEnum   = state => state.endRandEnum;
export const getPlayerName    = state => state.playerName;
export const getWinnerName    = state => state.winnerName;
