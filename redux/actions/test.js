import { GET_USER_INFO } from '../constants';

export function getUserInfo(payload) {
    return {
        type: GET_USER_INFO,
        payload
    }
}