/* eslint-disable indent */
const dataInitial = {
    state: false
};
const CHANGES_REACT_LOADING = 'CHANGES_REACT_LOADING';

export const changeReactLoading = (newValue) => (dispatch) => {
    try {
        dispatch({
            type: CHANGES_REACT_LOADING,
            newValue
        });
    } catch (error) {
        console.log(error);
    }
};
export default function reactLoadingReducer(state = dataInitial, action) {
    switch (action.type) {
        case CHANGES_REACT_LOADING:
            return {
                ...state,
                state: action.newValue
            };
        default:
            return state;
    }
}
