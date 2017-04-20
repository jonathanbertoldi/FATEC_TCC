import { GET_ADMINS_REQUEST, GET_ADMINS_SUCCESS, GET_ADMINS_FAILURE } from '../actions/actionsTypes';

function adminReducer(state = {
    isFetching: false,
    admins: [],
    errorMessage: ''
}, action) {
    switch(action.type) {
        case GET_ADMINS_REQUEST:
            console.log(GET_ADMINS_REQUEST);
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_ADMINS_SUCCESS:
            console.log(GET_ADMINS_SUCCESS);
            return Object.assign({}, state, {
                isFetching: false,
                admins: action.admins,
                errorMessage: ''
            });
        case GET_ADMINS_FAILURE:
            console.log(GET_ADMINS_FAILURE);
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.message
            });
        default:
            return state;
    }
}

export default adminReducer;