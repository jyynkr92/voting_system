import { UserActionTypes } from './actionTypes';
import { GET_USER_LOGOUT, GET_USER_SIGNIN_SUCCESS, REFRESH_USER, User } from './types';

const initialState: User = {
  user: { id: '', name: '' },
};

const userReducer = (state = initialState, action: UserActionTypes) => {
  switch (action.type) {
    case GET_USER_SIGNIN_SUCCESS:
    case REFRESH_USER:
      return {
        ...state,
        user: { id: action.id, name: action.name },
      };
    case GET_USER_LOGOUT:
      return {
        ...state,
        user: initialState.user,
      };
    default:
      return state;
  }
};

export default userReducer;
