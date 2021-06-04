import { all, takeLatest, put, call, select } from '@redux-saga/core/effects';
import { deleteVote, getVoteDetail, getVoteList, insertVote, updateVote, voteItem } from 'lib/api/voteApi';
import { push } from 'lib/browserHistory';
import { Rootstate } from 'store';
import { User } from 'store/user/types';
import {
  InsertVoteRequestAction,
  UpdateVoteRequestAction,
  DeleteVoteRequestAction,
  DetailVoteRequestAction,
  SetVoteRequestAction,
} from './actionTypes';
import {
  DELETE_VOTE_REQUEST,
  DETAIL_VOTE_REQUEST,
  DETAIL_VOTE_SUCCESS,
  INSERT_VOTE_REQUEST,
  INSERT_VOTE_SUCCESS,
  LIST_VOTE_REQUEST,
  LIST_VOTE_SUCCESS,
  SET_VOTE_REQUEST,
  SET_VOTE_SUCCESS,
  UPDATE_VOTE_REQUEST,
  UPDATE_VOTE_SUCCESS,
  VOTE_FAILURE,
} from './types';

interface Response {
  data: { status: number; data?: any; message?: string };
}

function* insert({ title, startDate, endDate, list }: InsertVoteRequestAction) {
  try {
    const userInfo = (state: Rootstate) => state.user;
    const user: User = yield select(userInfo);

    if (!user.user || !user.user.id) {
      throw Error('no data');
    }

    const response: Response = yield call(insertVote, { title, startDate, endDate, list, user: user.user });
    const { status } = response.data;

    if (status === 200) {
      yield put({
        type: INSERT_VOTE_SUCCESS,
      });

      push('/');
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(voteFailure, e);
  }
}

function* update({ id, title, startDate, endDate, list }: UpdateVoteRequestAction) {
  try {
    const response: Response = yield call(updateVote, { id, title, startDate, endDate, list });
    const { status } = response.data;

    if (status === 200) {
      yield put({
        type: UPDATE_VOTE_SUCCESS,
      });

      push('/');
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(voteFailure, e);
  }
}

function* deleteItem({ id }: DeleteVoteRequestAction) {
  try {
    const response: Response = yield call(deleteVote, { id });
    const { status } = response.data;

    if (status === 200) {
      yield call(listItem);
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(voteFailure, e);
  }
}

function* listItem() {
  try {
    const response: Response = yield call(getVoteList);
    const { status, data } = response.data;

    if (status === 200) {
      yield put({
        type: LIST_VOTE_SUCCESS,
        list: data || [],
      });
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(voteFailure, e);
  }
}

function* detailItem({ id }: DetailVoteRequestAction) {
  try {
    const response: Response = yield call(getVoteDetail, { id });
    const { status, data } = response.data;

    if (status === 200) {
      yield put({
        type: DETAIL_VOTE_SUCCESS,
        vote: data,
      });
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(voteFailure, e);
  }
}

function* vote({ id, listId }: SetVoteRequestAction) {
  try {
    const userInfo = (state: Rootstate) => state.user;
    const user: User = yield select(userInfo);

    if (!user.user || !user.user.id) {
      throw Error('no data');
    }

    const response: Response = yield call(voteItem, { userId: user.user.id, voteId: id, listId });
    const { status } = response.data;

    if (status === 200) {
      yield put({
        type: SET_VOTE_SUCCESS,
      });

      yield call(detailItem, { id } as DetailVoteRequestAction);
    } else {
      const { message } = response.data;
      throw Error(message);
    }
  } catch (e) {
    yield call(voteFailure, e);
  }
}

function* voteFailure(e: any) {
  const { message } = e;
  if (message && message === 'invalidate form') {
    alert('올바르지 않은 형태의 입력입니다.');
  } else if (message && message === 'no data') {
    alert('데이터가 없습니다.');
  } else {
    alert('문제가 발생하였습니다.');
  }

  yield put({
    type: VOTE_FAILURE,
  });
}

function* voteRequest() {
  yield takeLatest(INSERT_VOTE_REQUEST, insert);
  yield takeLatest(UPDATE_VOTE_REQUEST, update);
  yield takeLatest(DELETE_VOTE_REQUEST, deleteItem);
  yield takeLatest(LIST_VOTE_REQUEST, listItem);
  yield takeLatest(DETAIL_VOTE_REQUEST, detailItem);
  yield takeLatest(SET_VOTE_REQUEST, vote);
}

export default function* voteSaga() {
  yield all([voteRequest()]);
}
