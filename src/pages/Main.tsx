import { push } from 'lib/browserHistory';
import moment from 'moment';
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
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.currentTarget;
    id && push(`/vote/info/${id}`);
  };

  const setVoteStatus = (startDate: Date, endDate: Date) => {
    const date = moment().toDate();
    const startDateWithUTC = moment(startDate).toDate();
    const endDateWithUTC = moment(endDate).toDate();

    if (date < startDateWithUTC) {
      return '예정';
    } else if (startDateWithUTC <= date && date <= endDateWithUTC) {
      return '진행중';
    } else {
      return '종료';
    }
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const response = window.confirm('정말로 삭제하시겠습니까?');

    if (!response) return;

    const itemId = e.currentTarget.getAttribute('data-itemid');
    itemId && dispatch(deleteVote({ id: itemId }));
  };

  const onResultClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const { id } = e.currentTarget;
    id && push(`/vote/result/${id}`);
  };

  return (
    <div className="main-wrapper">
      <div className="create">{user.id && <button onClick={onCreateClick}>Create</button>}</div>
      <div className="list-title">투표 리스트</div>
      <div className="list-wrapper">
        {list.map((data, idx) => (
          <div
            onClick={
              data.startDate && data.endDate && setVoteStatus(data.startDate, data.endDate) === '종료'
                ? onResultClick
                : onVoteClick
            }
            key={data.id}
            id={data.id}
            className="item"
          >
            <span>{idx + 1}</span>
            <span className="item-title">{data.title}</span>
            <span>{data.startDate && moment(data.startDate).format('YYYY-MM-DD HH:mm')}</span>
            <span>{data.endDate && moment(data.endDate).format('YYYY-MM-DD HH:mm')}</span>
            <span className="item-status">{data.creator.name}</span>
            <span className="item-status">
              {data.startDate && data.endDate && setVoteStatus(data.startDate, data.endDate)}
            </span>
            <span>
              {data.creator.id === user.id && (
                <button onClick={onDeleteClick} data-itemid={data.id} className="delete-button">
                  삭제
                </button>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Main;
