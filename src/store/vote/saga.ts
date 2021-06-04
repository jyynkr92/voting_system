import { all, takeLatest, put, call } from '@redux-saga/core/effects';
import { VOTE_FAILURE } from './types';

function* voteFailure() {
  yield put({
    type: VOTE_FAILURE,
  });
}

function* voteRequest() {}

export default function* voteSaga() {
  yield all([voteRequest()]);
}
