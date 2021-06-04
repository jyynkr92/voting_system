import React from 'react';
import { VoteItem } from 'store/vote/types';

interface VoteUpdateItemProps {
  item: VoteItem;
  idx: number;
  onItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteItem: (e: React.MouseEvent<HTMLElement>) => void;
}

function VoteUpdateItem({ item, idx, onItemChange, onDeleteItem }: VoteUpdateItemProps) {
  return (
    <div className='item-list'>
      <span>{idx + 1}.</span>
      <input type='text' value={item.name} onChange={onItemChange} data-itemid={item.id} />
      <button onClick={onDeleteItem} id={item.id}>
        삭제
      </button>
    </div>
  );
}

export default VoteUpdateItem;
