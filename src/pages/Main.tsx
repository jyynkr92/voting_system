import { push } from 'lib/browserHistory';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from 'store';
import { getVoteList } from 'store/vote/actions';

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
    const { id } = e.currentTarget;
    id && push(`/vote/info/${id}`);
  };

  return (
    <div className="main-wrapper">
      <div>{user.id && <button onClick={onCreateClick}>Create</button>}</div>
      <div>리스트</div>
      <div>
        {list.map((data) => (
          <div onClick={onVoteClick}>{data.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Main;
