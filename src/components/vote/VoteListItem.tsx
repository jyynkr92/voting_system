import moment from 'moment';
import React from 'react';
import { VoteInfo } from 'store/vote/types';

interface VoteListItemProps {
  item: VoteInfo;
  voteStatus: string;
  idx: number;
  userId: string;
  onResultClick: (e: React.MouseEvent<HTMLElement>) => void;
  onVoteClick: (e: React.MouseEvent<HTMLElement>) => void;
  onDeleteClick: (e: React.MouseEvent<HTMLElement>) => void;
}

function VoteListItem({ item, voteStatus, idx, userId, onResultClick, onVoteClick, onDeleteClick }: VoteListItemProps) {
  return (
    <div onClick={voteStatus === '종료' ? onResultClick : onVoteClick} id={item.id} className='item'>
      <span>{idx + 1}</span>
      <span className='item-title'>{item.title}</span>
      <span>{item.startDate && moment(item.startDate).format('YYYY-MM-DD HH:mm')}</span>
      <span>{item.endDate && moment(item.endDate).format('YYYY-MM-DD HH:mm')}</span>
      <span className='item-status'>{item.creator.name}</span>
      <span className='item-status'>{voteStatus}</span>
      <span>
        {item.creator.id === userId && (
          <button onClick={onDeleteClick} data-itemid={item.id} className='delete-button'>
            삭제
          </button>
        )}
      </span>
    </div>
  );
}

export default VoteListItem;
