import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    isCollapsed: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COLLAPSE_SIDEBAR:
            return {isCollapsed: action.payload.isCollapsed};
        default:
            return state;
    }
}