export interface Vote {
  list: Array<VoteInfo>;
  vote: VoteInfo;
}

export interface VoteInfo {
  id: string;
  title: string;
  startDate: Date | null;
  endDate: Date | null;
  list: Array<VoteItem>;
}

export interface VoteItem {
  id: string;
  name: string;
  vote: Array<string>; //user id
}

export const INSERT_VOTE_REQUEST = 'INSERT_VOTE_REQUEST';
export const INSERT_VOTE_SUCCESS = 'INSERT_VOTE_SUCCESS';

export const UPDATE_VOTE_REQUEST = 'UPDATE_VOTE_REQUEST';
export const UPDATE_VOTE_SUCCESS = 'UPDATE_VOTE_SUCCESS';

export const DELETE_VOTE_REQUEST = 'DELETE_VOTE_REQUEST';
export const DELETE_VOTE_SUCCESS = 'DELETE_VOTE_SUCCESS';

export const LIST_VOTE_REQUEST = 'LIST_VOTE_REQUEST';
export const LIST_VOTE_SUCCESS = 'LIST_VOTE_SUCCESS';

export const DETAIL_VOTE_REQUEST = 'DETAIL_VOTE_REQUEST';
export const DETAIL_VOTE_SUCCESS = 'DETaIL_VOTE_SUCCESS';

export const SET_VOTE_REQUEST = 'SET_VOTE_REQUEST';
export const SET_VOTE_SUCCESS = 'SET_VOTE_SUCCESS';

export const SET_DETAIL_VOTE_RESET = 'SET_DETAIL_VOTE_RESET';
export const VOTE_FAILURE = 'VOTE_FAILURE';
