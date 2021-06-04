import {
  DELETE_VOTE_REQUEST,
  DETAIL_VOTE_REQUEST,
  INSERT_VOTE_REQUEST,
  LIST_VOTE_REQUEST,
  SET_DETAIL_VOTE_RESET,
  SET_VOTE_REQUEST,
  UPDATE_VOTE_REQUEST,
  VoteItem,
} from './types';

export const insertVote = ({
  title,
  startDate,
  endDate,
  list,
}: {
  title: string;
  startDate: Date;
  endDate: Date;
  list: Array<VoteItem>;
}) => ({
  type: INSERT_VOTE_REQUEST,
  title,
  startDate,
  endDate,
  list,
});

export const updateVote = ({
  id,
  title,
  startDate,
  endDate,
  list,
}: {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  list: Array<VoteItem>;
}) => ({
  type: UPDATE_VOTE_REQUEST,
  id,
  title,
  startDate,
  endDate,
  list,
});

export const deleteVote = ({ id }: { id: string }) => ({
  type: DELETE_VOTE_REQUEST,
  id,
});

export const getVoteList = () => ({
  type: LIST_VOTE_REQUEST,
});

export const getVoteDetail = ({ id }: { id: string }) => ({
  type: DETAIL_VOTE_REQUEST,
  id,
});

export const setVote = ({ id, listId }: { id: string; listId: string }) => ({
  type: SET_VOTE_REQUEST,
  id,
  listId,
});

export const setVoteDetailReset = () => ({
  type: SET_DETAIL_VOTE_RESET,
});
