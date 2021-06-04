import { VoteItem } from 'store/vote/types';

interface VoteResultItemProps {
  item: VoteItem;
  totalVotes: number;
}

function VoteResultItem({ item, totalVotes }: VoteResultItemProps) {
  return (
    <div key={item.id} className='item'>
      <span className='name'>{item.name}</span> <span>{item.vote.length}명</span>
      <span>
        <progress value={item.vote.length} max={totalVotes} />
      </span>
    </div>
  );
}

export default VoteResultItem;
