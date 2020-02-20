import {FETCH_DATA_PENDING, FETCH_DATA_SUCCESS, FETCH_DATA_ERROR, ISSELECTED} from '../actions';

const initialState = {
    pending: false,
    data: [],
    error: null,
    isSelected: 5
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
                isSelected: Number(action.isSelected)
            }
        default:
            return state;
    }
}

export const getData        = state => state.data;
export const getDataPending = state => state.pending;
export const getDataError   = state => state.error;
