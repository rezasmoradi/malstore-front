import { GET_USER_INFO } from "../constants";

const initialState = {}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            return 'yes';
        default:
            return false;
    }
}

export default homeReducer;