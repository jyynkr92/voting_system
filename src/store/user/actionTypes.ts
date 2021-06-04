import {
  GET_USER_LOGOUT,
  GET_USER_SIGNIN_REQUEST,
  GET_USER_SIGNIN_SUCCESS,
  GET_USER_SIGNUP_REQUEST,
  GET_USER_SIGNUP_SUCCESS,
  REFRESH_USER,
  USER_FAILURE,
} from './types';

export interface GetUserSignInRequestAction {
  type: typeof GET_USER_SIGNIN_REQUEST;
  id: string;
  password: string;
}

export interface GetUserSignInSuccessAction {
  type: typeof GET_USER_SIGNIN_SUCCESS;
  id: string;
  name: string;
}

export interface GetUserSignUpRequestAction {
  type: typeof GET_USER_SIGNUP_REQUEST;
  id: string;
  password: string;
  name: string;
}

export interface GetUserSignUpSuccessAction {
  type: typeof GET_USER_SIGNUP_SUCCESS;
}

export interface GetUserLogoutAction {
  type: typeof GET_USER_LOGOUT;
}

export interface RefreshUserAction {
  type: typeof REFRESH_USER;
  id: string;
  name: string;
}

export interface UserFailureAction {
  type: typeof USER_FAILURE;
}

export type GetUserSignInActionTypes = GetUserSignInRequestAction | GetUserSignInSuccessAction;
export type GetUserSignUpActionTypes = GetUserSignUpRequestAction | GetUserSignUpSuccessAction;

export type UserActionTypes =
  | GetUserSignInActionTypes
  | GetUserSignUpActionTypes
  | GetUserLogoutAction
  | RefreshUserAction
  | UserFailureAction;
