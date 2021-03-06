import { DateTimePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import VoteUpdateItem from 'components/vote/VoteUpdateItem';
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
      alert('?????? ?????? ????????? ????????? ??????????????????.');
      return;
    }

    setList(list.filter((data) => data.id !== id));
  };

  const onSubmitClick = () => {
    if (!startDate) {
      alert('??????????????? ???????????????.');
      return;
    }

    if (!endDate) {
      alert('??????????????? ???????????????.');
      return;
    }

    if (!title.trim()) {
      alert('????????? ??????????????????.');
      return;
    }

    if (list.filter((data) => data.name.trim() === '').length > 0) {
      alert('????????? ????????? ?????? ??????????????????.');
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
    <div className='vote-wrapper'>
      <div className='title'>{voteId === 'new' ? '?????? ????????????' : '?????? ????????????'}</div>
      <div className='update-item'>
        <span className='item-title'>?????? ??????</span>
        <input type='text' value={title} onChange={onTitleChange} />
      </div>
      <div className='update-item'>
        <span className='item-title'>?????? ??????</span>
        <DateTimePicker value={startDate} onChange={onStartDateChange} />
      </div>
      <div className='update-item'>
        <span className='item-title'>?????? ??????</span>
        <DateTimePicker value={endDate} onChange={onEndDateChange} />
      </div>
      <div className='update-item fullsize'>
        <span className='item-title'>??????</span>
        <button onClick={onAddItem}>??????</button>
        {list.map((data, idx) => (
          <VoteUpdateItem key={data.id} item={data} idx={idx} onItemChange={onItemChange} onDeleteItem={onDeleteItem} />
        ))}
      </div>
      <div className='button-wrapper'>
        {voteId === 'new' && <button onClick={onSubmitClick}>??????</button>}
        {voteId !== 'new' && <button onClick={onSubmitClick}>??????</button>}
        <button onClick={onCancelClick}>??????</button>
      </div>
    </div>
  );
}

export default VoteUpdate;
