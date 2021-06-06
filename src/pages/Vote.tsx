import VoteItemInfo from 'components/vote/VoteItemInfo';
import VotePeriod from 'components/vote/VotePeriod';
import { push } from 'lib/browserHistory';
import getVoteStatus from 'lib/getVotestatus';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rootstate } from 'store';
import { getVoteDetail, setVote, setVoteDetailReset } from 'store/vote/actions';

type Params = {
  voteId: string;
};

type VoteProps = RouteComponentProps<Params>;

function Vote({ match }: VoteProps) {
  const { voteId } = match.params;
  const dispatch = useDispatch();
  const { vote } = useSelector((root: Rootstate) => root.vote);
  const { user } = useSelector((root: Rootstate) => root.user);
  const [selItem, setSelItem] = useState('');
  const hasVote = vote.list.filter((data) => data.vote.includes(user.id));
  const [voteStatus, setVoteStatus] = useState('');

  useEffect(() => {
    return () => {
      dispatch(setVoteDetailReset());
    };
  }, []);

  useEffect(() => {
    dispatch(getVoteDetail({ id: voteId }));
  }, [voteId]);

  useEffect(() => {
    if (vote.id && vote.startDate && vote.endDate) {
      const status = getVoteStatus(vote.startDate, vote.endDate);
      setVoteStatus(status);
    }
  }, [vote]);

  useEffect(() => {
    if (voteStatus === '종료') {
      onResultClick();
    }
  }, [voteStatus]);

  const onItemVoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    id && setSelItem(id);
  };

  const onVoteClick = () => {
    if (!user.id) {
      push('/signin');
      return;
    }

    if (hasVote.length > 0) {
      alert('이미 참여하였습니다.');
      return;
    }

    dispatch(setVote({ id: voteId, listId: selItem }));
  };

  const onUpdateClick = () => {
    push(`/vote/update/${voteId}`);
  };

  const onResultClick = () => {
    push(`/vote/result/${voteId}`);
  };

  return (
    <div className='vote-wrapper'>
      <div className='title'>{vote.title}</div>
      {vote.startDate && vote.endDate && (
        <VotePeriod startDate={vote.startDate} endDate={vote.endDate} status={voteStatus} />
      )}
      <div className='list'>
        {vote.list.map((data) => (
          <VoteItemInfo
            item={data}
            onItemVoteChange={onItemVoteChange}
            selItem={selItem}
            hasVote={hasVote}
            key={data.id}
          />
        ))}
      </div>
      <div className='button-wrapper'>
        {voteStatus === '진행중' && <button onClick={onVoteClick}>투표하기</button>}
        {voteStatus !== '진행중' && <button onClick={onUpdateClick}>수정하기</button>}
        {(voteStatus === '진행중' || voteStatus === '완료') && <button onClick={onResultClick}>결과보기</button>}
      </div>
    </div>
  );
}

export default Vote;
