import { goBack, push } from 'lib/browserHistory';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rootstate } from 'store';
import { getVoteDetail, setVote, setVoteDetailReset } from 'store/vote/actions';

type Params = {
  voteId: string;
};

type VoteProps = RouteComponentProps<Params>;

function VoteResult({ match }: VoteProps) {
  const { voteId } = match.params;
  const dispatch = useDispatch();
  const { vote } = useSelector((root: Rootstate) => root.vote);

  useEffect(() => {
    return () => {
      dispatch(setVoteDetailReset());
    };
  }, []);

  useEffect(() => {
    dispatch(getVoteDetail({ id: voteId }));
  }, [voteId]);

  const onBackClick = () => {
    goBack();
  };

  return (
    <div className="vote-wrapper">
      <div>{vote.title}</div>
      <div>
        {vote.startDate && moment(vote.startDate).format('YYYY-MM-DD HH:mm')}
        {vote.endDate && ` ~ ${moment(vote.endDate).format('YYYY-MM-DD HH:mm')}`}
      </div>
      <div>
        {vote.list.map((data) => (
          <div key={data.id}>
            {data.name} / {data.vote.length}
          </div>
        ))}
        <div>
          <button onClick={onBackClick}>되돌아가기</button>
        </div>
      </div>
    </div>
  );
}

export default VoteResult;
