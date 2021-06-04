import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { push } from 'lib/browserHistory';
import randomStr from 'lib/randomStr';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Rootstate } from 'store';
import { getVoteDetail, insertVote, setVoteDetailReset, updateVote } from 'store/vote/actions';
import { VoteItem } from 'store/vote/types';

type Params = {
  voteId: string;
};

type VoteUpdateProps = RouteComponentProps<Params>;

function VoteUpdate({ match }: VoteUpdateProps) {
  const { voteId } = match.params;
  const dispatch = useDispatch();
  const { vote } = useSelector((root: Rootstate) => root.vote);

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [list, setList] = useState<Array<VoteItem>>([
    { id: randomStr(), name: '', vote: [] },
    { id: randomStr(), name: '', vote: [] },
    { id: randomStr(), name: '', vote: [] },
  ]);

  useEffect(() => {
    if (voteId !== 'new') {
      dispatch(getVoteDetail({ id: voteId }));
    }

    return () => {
      dispatch(setVoteDetailReset());
    };
  }, []);

  useEffect(() => {
    if (vote.id) {
      setTitle(vote.title);
      setStartDate(vote.startDate);
      setEndDate(vote.endDate);
      setList(vote.list);
    }
  }, [vote]);

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onStartDateChange = (date: MaterialUiPickersDate) => {
    date && setStartDate(date.toDate());
  };
  const onEndDateChange = (date: MaterialUiPickersDate) => {
    date && setEndDate(date.toDate());
  };

  const onItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { dataset, value } = e.target;
    const { itemid } = dataset;
    setList(
      list.map((data) => {
        if (data.id === itemid) {
          data.name = value;
        }
        return data;
      })
    );
  };

  const onAddItem = () => {
    setList(list.concat({ id: randomStr(), name: '', vote: [] }));
  };

  const onDeleteItem = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget;
    if (list.length < 2) {
      alert('최소 하나 이상의 투표가 있어야합니다.');
      return;
    }

    setList(list.filter((data) => data.id !== id));
  };

  const onSubmitClick = () => {
    if (!startDate) {
      alert('시작날짜를 정해주세요.');
      return;
    }

    if (!endDate) {
      alert('종료날짜를 정해주세요.');
      return;
    }

    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (list.filter((data) => data.name.trim() === '').length > 0) {
      alert('항목의 이름을 모두 지정해주세요.');
      return;
    }

    if (voteId === 'new') {
      dispatch(insertVote({ title, startDate, endDate, list }));
    } else {
      dispatch(updateVote({ id: voteId, title, startDate, endDate, list }));
    }
  };

  const onCancelClick = () => {
    push('/');
  };

  return (
    <div className="vote-wrapper">
      <div className="title">{voteId === 'new' ? '투표 추가하기' : '투표 수정하기'}</div>
      <div className="update-item">
        <span className="item-title">투표 제목</span>
        <input type="text" value={title} onChange={onTitleChange} />
      </div>
      <div className="update-item">
        <span className="item-title">시작 날짜</span>
        <DateTimePicker value={startDate} onChange={onStartDateChange} />
      </div>
      <div className="update-item">
        <span className="item-title">종료 날짜</span>
        <DateTimePicker value={endDate} onChange={onEndDateChange} />
      </div>
      <div className="update-item fullsize">
        <span className="item-title">항목</span>
        <button onClick={onAddItem}>추가</button>
        {list.map((data, idx) => (
          <div key={data.id} className="item-list">
            <span>{idx + 1}.</span>
            <input type="text" value={data.name} onChange={onItemChange} data-itemid={data.id} />
            <button onClick={onDeleteItem} id={data.id}>
              삭제
            </button>
          </div>
        ))}
      </div>
      <div className="button-wrapper">
        {voteId === 'new' && <button onClick={onSubmitClick}>생성</button>}
        {voteId !== 'new' && <button onClick={onSubmitClick}>수정</button>}
        <button onClick={onCancelClick}>취소</button>
      </div>
    </div>
  );
}

export default VoteUpdate;
