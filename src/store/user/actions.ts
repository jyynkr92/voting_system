import { GET_USER_LOGOUT, GET_USER_SIGNIN_REQUEST, GET_USER_SIGNUP_REQUEST, REFRESH_USER } from './types';

export const userSignIn = ({ id, password }: { id: string; password: string }) => ({
  type: GET_USER_SIGNIN_REQUEST,
  id,
  password,
});

export const userSignUp = ({ id, name, password }: { id: string; name: string; password: string }) => ({
  type: GET_USER_SIGNUP_REQUEST,
  id,
  name,
  password,
});

export const userLogout = () => ({
  type: GET_USER_LOGOUT,
});

export const refreshUser = ({ id, name }: { id: string; name: string }) => ({
  type: REFRESH_USER,
  id,
  name,
});
