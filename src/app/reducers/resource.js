// import { COLLAPSE_SIDEBAR } from '../actions/types';

const initialState = {
    resources: [],
    resource:{}
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_RESOURCES_RESOLVED": {
        return {
          ...state,
          resources: action.payload
        };
      }
      default:
        return state;
  }
}
