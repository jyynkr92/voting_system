import { all } from '@redux-saga/core/effects';
import { combineReducers } from 'redux';
import commonReducer from 'store/common/reducer';
import commonSaga from 'store/common/saga';
import { Common } from 'store/common/types';
import userReducer from './user/reducer';
import userSaga from './user/saga';
import { User } from './user/types';
import voteReducer from './vote/reducer';
import voteSaga from './vote/saga';
import { Vote } from './vote/types';

export type Rootstate = {
  common: Common;
  user: User;
  vote: Vote;
};

export function* rootSaga() {
  yield all([commonSaga(), userSaga(), voteSaga()]);
}

const rootReducer = combineReducers({
  common: commonReducer,
  user: userReducer,
  vote: voteReducer,
});

export default rootReducer;
