import { COLLAPSE_SIDEBAR } from './types';

export const toggle = isCollapsed => dispatch => {
    dispatch({
        type: COLLAPSE_SIDEBAR,
        payload: {
            isCollapsed: !isCollapsed
        }
    });
};
