import randomStr from 'lib/randomStr';
import { UserInfo } from 'store/user/types';
import { VoteInfo, VoteItem } from 'store/vote/types';

//insert
export function insertVote({
  title,
  startDate,
  endDate,
  list,
  user,
}: {
  title: string;
  startDate: Date;
  endDate: Date;
  list: Array<VoteItem>;
  user: UserInfo;
}) {
  const voteList = localStorage.getItem('votes');

  if (!title.trim() || !startDate || !endDate || list.length < 1) {
    return { data: { stauts: 400, message: 'invalidate form' } };
  }

  if (voteList) {
    const { vote } = JSON.parse(voteList);
    const votes = vote.concat({ id: randomStr(), title, startDate, endDate, list, creator: user });
    localStorage.setItem('votes', JSON.stringify({ vote: votes }));
  } else {
    const votes = { id: randomStr(), title, startDate, endDate, list, creator: user };
    localStorage.setItem('votes', JSON.stringify({ vote: votes }));
  }

  return { data: { status: 200 } };
}

//update
export function updateVote({
  id,
  title,
  startDate,
  endDate,
  list,
}: {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  list: Array<VoteItem>;
}) {
  const voteList = localStorage.getItem('votes');

  if (!title.trim() || !startDate || !endDate || list.length < 1) {
    return { data: { stauts: 400, message: 'invalidate form' } };
  }

  if (voteList) {
    const { vote } = JSON.parse(voteList);
    let isExist = false;

    const updated = vote.map((data: VoteInfo) => {
      if (data.id === id) {
        data.title = title;
        data.startDate = startDate;
        data.endDate = endDate;
        data.list = list;
        isExist = true;
      }

      return data;
    });

    if (isExist) {
      localStorage.setItem('votes', JSON.stringify({ vote: updated }));
      return { data: { status: 200 } };
    } else {
      return { data: { status: 400, message: 'no data' } };
    }
  } else {
    return { data: { status: 400, message: 'no data' } };
  }
}

//delete
export function deleteVote({ id }: { id: string }) {
  const voteList = localStorage.getItem('votes');
  if (voteList) {
    const { vote } = JSON.parse(voteList);
    const deleted = vote.filter((data: VoteInfo) => data.id !== id);
    localStorage.setItem('votes', JSON.stringify({ vote: deleted }));
    return { data: { status: 200 } };
  } else {
    return { data: { status: 400, message: 'no data' } };
  }
}

//vote
export function voteItem({ userId, voteId, listId }: { userId: string; voteId: string; listId: string }) {
  const voteList = localStorage.getItem('votes');

  if (voteList) {
    const { vote } = JSON.parse(voteList);
    let isExist = false;

    const updated = vote.map((data: VoteInfo) => {
      if (data.id === voteId) {
        const updatedVote = data.list.map((item: VoteItem) => {
          if (item.id === listId) {
            if (item.vote.includes(userId)) {
              isExist = false;
            } else {
              item.vote.push(userId);
              isExist = true;
            }
          }

          return item;
        });

        data.list = updatedVote;
      }

      return data;
    });

    if (isExist) {
      localStorage.setItem('votes', JSON.stringify({ vote: updated }));
      return { data: { status: 200 } };
    } else {
      return { data: { status: 400, message: 'already exist' } };
    }
  } else {
    return { data: { status: 400, message: 'no data' } };
  }
}

//list
export function getVoteList() {
  const voteList = localStorage.getItem('votes');

  if (voteList) {
    const { vote } = JSON.parse(voteList);
    return { data: { status: 200, data: vote } };
  } else {
    return { data: { status: 200, data: [] } };
  }
}

//detail
export function getVoteDetail({ id }: { id: string }) {
  const voteList = localStorage.getItem('votes');

  if (voteList) {
    const { vote } = JSON.parse(voteList);

    const targetVote = vote.filter((data: VoteInfo) => data.id === id)[0];

    if (targetVote) {
      return { data: { status: 200, data: targetVote } };
    } else {
      return { data: { status: 400, message: 'no data' } };
    }
  } else {
    return { data: { status: 400, message: 'no data' } };
  }
}
