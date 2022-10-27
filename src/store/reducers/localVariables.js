/* eslint-disable indent */
const dataInitial = {
    token: '',
    role: '',
    user: '',
    restaurantApi: '',
    id: ''
};
const CHANGES_VARIABLES = 'CHANGES_VARIABLES';

export const updateAuth = (data) => (dispatch) => {
    try {
        dispatch({
            type: CHANGES_VARIABLES,
            token: data.token,
            role: data.role,
            user: data.user,
            restaurantApi: data.restaurantApi,
            id: data.idUser
        });
    } catch (error) {
        console.log(error);
    }
};
export default function localVariablesReducer(state = dataInitial, action) {
    switch (action.type) {
        case CHANGES_VARIABLES:
            return {
                ...state,
                token: action.token,
                role: action.role,
                user: action.user,
                restaurantApi: action.restaurantApi,
                id: action.id
            };
        default:
            return state;
    }
}
