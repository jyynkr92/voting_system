import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import { userSignIn, userSignUp } from 'lib/api/userApi';
import { push } from 'lib/browserHistory';
import { GetUserSignInRequestAction, GetUserSignUpRequestAction } from './actionTypes';
import {
  GET_USER_LOGOUT,
  GET_USER_SIGNIN_REQUEST,
  GET_USER_SIGNIN_SUCCESS,
  GET_USER_SIGNUP_REQUEST,
  USER_FAILURE,
} from './types';

interface Response {
  data: { result: number; data?: any; message?: string };
}

function* signin({ id, password }: GetUserSignInRequestAction) {
  try {
    const response: Response = yield call(userSignIn, { id, password });
    const { result } = response.data;

    if (result === 200) {
      const { data } = response.data;
      localStorage.setItem('login', JSON.stringify({ ...data }));
      yield put({
        type: GET_USER_SIGNIN_SUCCESS,
        name: data.name,
        id: data.id,
      });
      push('/');
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(userFailure, e);
  }
}

function* signup({ id, password, name }: GetUserSignUpRequestAction) {
  try {
    const response: Response = yield call(userSignUp, { id, password, name });
    const { result } = response.data;

    if (result === 200) {
      alert('회원가입되었습니다. 로그인을 시도해주세요.');
      push('/');
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(userFailure, e);
  }
}

function* logout() {
  localStorage.removeItem('login');
}

function* userFailure(e: any) {
  const { message } = e;

  if (message && message === 'existed data') {
    alert('이미 존재하는 아이디 입니다.');
  } else if (message && message === 'no data') {
    alert('아이디와 비밀번호를 다시 확인해주세요.');
  } else {
    alert('문제가 발생하였습니다.');
  }

  yield put({
    type: USER_FAILURE,
  });
}

function* userRequest() {
  yield takeLatest(GET_USER_SIGNUP_REQUEST, signup);
  yield takeLatest(GET_USER_SIGNIN_REQUEST, signin);
  yield takeLatest(GET_USER_LOGOUT, logout);
}

export default function* userSaga() {
  yield all([userRequest()]);
}
