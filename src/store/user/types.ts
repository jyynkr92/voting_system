export interface User {
  user: UserInfo;
}

export interface UserInfo {
  id: string;
  name: string;
}

export const GET_USER_SIGNIN_REQUEST = 'GET_USER_SIGNIN_REQUEST';
export const GET_USER_SIGNIN_SUCCESS = 'GET_USER_SIGNIN_SUCCESS';

export const GET_USER_SIGNUP_REQUEST = 'GET_USER_SIGNUP_REQUEST';
export const GET_USER_SIGNUP_SUCCESS = 'GET_USER_SIGNUP_SUCCESS';

export const GET_USER_LOGOUT = 'GET_USER_LOGOUT';

export const REFRESH_USER = 'REFRESH_USER';
export const USER_FAILURE = 'USER_FAILURE';
