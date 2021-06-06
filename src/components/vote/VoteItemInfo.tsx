import React from 'react';
import { VoteItem } from 'store/vote/types';

interface VoteItemInfoProps {
  item: VoteItem;
  onItemVoteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selItem: string;
  hasVote: Array<VoteItem>;
}

function VoteItemInfo({ item, onItemVoteChange, selItem, hasVote }: VoteItemInfoProps) {
  return (
    <div key={item.id} className='item'>
      <input
        type='radio'
        value={item.id}
        checked={hasVote.length > 0 ? hasVote[0].id === item.id : item.id === selItem}
        id={item.id}
        disabled={hasVote.length > 0}
        onChange={onItemVoteChange}
      />
      <label htmlFor={item.id}>{item.name}</label>
    </div>
  );
}

export default VoteItemInfo;
