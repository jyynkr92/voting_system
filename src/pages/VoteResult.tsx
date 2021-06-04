import VotePeriod from 'components/vote/VotePeriod';
import VoteResultItem from 'components/vote/VoteResultItem';
import { goBack } from 'lib/browserHistory';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rootstate } from 'store';
import { getVoteDetail, setVoteDetailReset } from 'store/vote/actions';

type Params = {
  voteId: string;
};

type VoteProps = RouteComponentProps<Params>;

function VoteResult({ match }: VoteProps) {
  const { voteId } = match.params;
  const dispatch = useDispatch();
  const { vote } = useSelector((root: Rootstate) => root.vote);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    if (vote.list) {
      let totalCount = 0;
      vote.list.forEach((data) => {
        totalCount += data.vote.length;
      });

      setTotalVotes(totalCount);
    }
  }, [vote]);
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
    <div className='vote-wrapper'>
      <div className='title'>[{vote.title}] 결과</div>
      {vote.startDate && vote.endDate && <VotePeriod startDate={vote.startDate} endDate={vote.endDate} />}
      <div className='total'>
        참여 인원 : <span>{totalVotes}명</span>
      </div>
      <div className='result-list'>
        {vote.list.map((data) => (
          <VoteResultItem key={data.id} item={data} totalVotes={totalVotes} />
        ))}
      </div>
      <div className='button-wrapper'>
        <button onClick={onBackClick}>되돌아가기</button>
      </div>
    </div>
  );
}

export default VoteResult;
