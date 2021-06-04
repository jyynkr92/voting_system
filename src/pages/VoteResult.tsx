import { goBack } from 'lib/browserHistory';
import moment from 'moment';
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
    <div className="vote-wrapper">
      <div>{vote.title}</div>
      <div>
        {vote.startDate && moment(vote.startDate).format('YYYY-MM-DD HH:mm')}
        {vote.endDate && ` ~ ${moment(vote.endDate).format('YYYY-MM-DD HH:mm')}`}
      </div>
      <div>전체 참여 인원 수 : {totalVotes}</div>
      <div>
        {vote.list.map((data) => (
          <div key={data.id}>
            {data.name} / {data.vote.length} / <progress value={data.vote.length} max={totalVotes} />
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
