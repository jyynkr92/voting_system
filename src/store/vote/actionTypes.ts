import {
  DELETE_VOTE_REQUEST,
  DELETE_VOTE_SUCCESS,
  DETAIL_VOTE_REQUEST,
  DETAIL_VOTE_SUCCESS,
  INSERT_VOTE_REQUEST,
  INSERT_VOTE_SUCCESS,
  LIST_VOTE_REQUEST,
  LIST_VOTE_SUCCESS,
  UPDATE_VOTE_REQUEST,
  UPDATE_VOTE_SUCCESS,
  SET_VOTE_REQUEST,
  SET_VOTE_SUCCESS,
  VoteInfo,
  VoteItem,
  SET_DETAIL_VOTE_RESET,
  VOTE_FAILURE,
} from './types';

export interface InsertVoteRequestAction {
  type: typeof INSERT_VOTE_REQUEST;
  title: string;
  startDate: Date;
  endDate: Date;
  list: Array<VoteItem>;
}

export interface InsertVoteSuccessAction {
  type: typeof INSERT_VOTE_SUCCESS;
}

export interface UpdateVoteRequestAction {
  type: typeof UPDATE_VOTE_REQUEST;
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  list: Array<VoteItem>;
}

export interface UpdateVoteSuccessAction {
  type: typeof UPDATE_VOTE_SUCCESS;
}

export interface DeleteVoteRequestAction {
  type: typeof DELETE_VOTE_REQUEST;
  id: string;
}

export interface DeleteVoteSuccessAction {
  type: typeof DELETE_VOTE_SUCCESS;
}

export interface ListVoteRequestAction {
  type: typeof LIST_VOTE_REQUEST;
}

export interface ListVotesuccessAction {
  type: typeof LIST_VOTE_SUCCESS;
  list: Array<VoteInfo>;
}

export interface DetailVoteRequestAction {
  type: typeof DETAIL_VOTE_REQUEST;
  id: string;
}

export interface DetailVoteSuccessAction {
  type: typeof DETAIL_VOTE_SUCCESS;
  vote: VoteInfo;
}

export interface SetVoteRequestAction {
  type: typeof SET_VOTE_REQUEST;
  id: string;
  listId: string;
}

export interface SetVoteSuccessAction {
  type: typeof SET_VOTE_SUCCESS;
}

export interface SetDetailVoteResetAction {
  type: typeof SET_DETAIL_VOTE_RESET;
}

export interface VoteFailureAction {
  type: typeof VOTE_FAILURE;
}

export type InsertVoteActionTypes = InsertVoteRequestAction | InsertVoteSuccessAction;
export type UpdateVoteActionTypes = UpdateVoteRequestAction | UpdateVoteSuccessAction;
export type DeleteVoteActionTypes = DeleteVoteRequestAction | DeleteVoteSuccessAction;
export type ListVoteActionTypes = ListVoteRequestAction | ListVotesuccessAction;
export type DetailVoteActionTypes = DetailVoteRequestAction | DetailVoteSuccessAction;
export type SetVoteActionTypes = SetVoteRequestAction | SetVoteSuccessAction;

export type VoteActionTypes =
  | InsertVoteActionTypes
  | UpdateVoteActionTypes
  | DeleteVoteActionTypes
  | ListVoteActionTypes
  | DetailVoteActionTypes
  | SetVoteActionTypes
  | SetDetailVoteResetAction
  | VoteFailureAction;
