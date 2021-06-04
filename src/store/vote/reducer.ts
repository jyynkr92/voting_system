import { VoteActionTypes } from './actionTypes';
import { DETAIL_VOTE_SUCCESS, LIST_VOTE_SUCCESS, SET_DETAIL_VOTE_RESET, Vote } from './types';

const initialState: Vote = {
  list: [],
  vote: {
    id: '',
    title: '',
    startDate: null,
    endDate: null,
    list: [],
  },
};

const voteReducer = (state = initialState, action: VoteActionTypes) => {
  switch (action.type) {
    case LIST_VOTE_SUCCESS:
      return {
        ...state,
        list: action.list,
      };
    case DETAIL_VOTE_SUCCESS:
      return {
        ...state,
        vote: action.vote,
      };
    case SET_DETAIL_VOTE_RESET:
      return {
        ...state,
        vote: initialState.vote,
      };
    default:
      return state;
  }
};

export default voteReducer;
