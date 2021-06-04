import VoteListItem from 'components/vote/VoteListItem';
import { push } from 'lib/browserHistory';
import getVoteStatus from 'lib/getVotestatus';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from 'store';
import { deleteVote, getVoteList } from 'store/vote/actions';

function Main() {
  const dispatch = useDispatch();
  const { list } = useSelector((state: Rootstate) => state.vote);
  const { user } = useSelector((state: Rootstate) => state.user);

  useEffect(() => {
    dispatch(getVoteList());
  }, []);

  const onCreateClick = () => {
    push('/vote/update/new');
  };

  const onVoteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { id } = e.currentTarget;
    id && push(`/vote/info/${id}`);
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const response = window.confirm('정말로 삭제하시겠습니까?');
    if (!response) return;

    const itemId = e.currentTarget.getAttribute('data-itemid');
    itemId && dispatch(deleteVote({ id: itemId }));
  };

  const onResultClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const { id } = e.currentTarget;
    id && push(`/vote/result/${id}`);
  };

  return (
    <div className='main-wrapper'>
      <div className='create'>{user.id && <button onClick={onCreateClick}>Create</button>}</div>
      <div className='list-title'>투표 리스트</div>
      <div className='list-wrapper'>
        {list.map((data, idx) => (
          <VoteListItem
            key={data.id}
            item={data}
            voteStatus={data.startDate && data.endDate ? getVoteStatus(data.startDate, data.endDate) : ''}
            idx={idx}
            userId={user.id}
            onResultClick={onResultClick}
            onVoteClick={onVoteClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Main;
