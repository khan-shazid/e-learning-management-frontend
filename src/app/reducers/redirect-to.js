import { REDIRECT_TO } from '../actions/types';

const initialState = {
    link: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case REDIRECT_TO:
            return {link: action.payload.link};
        default:
            return state;
    }
}