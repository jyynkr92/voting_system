import React from 'react';
import { VoteItem } from 'store/vote/types';

interface VoteItemProps {
  item: VoteItem;
  onItemVoteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selItem: string;
  hasVote: Array<VoteItem>;
}

function VoteItem({ item, onItemVoteChange, selItem, hasVote }: VoteItemProps) {
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

export default VoteItem;
