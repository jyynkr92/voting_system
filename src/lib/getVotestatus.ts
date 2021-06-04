import moment from 'moment';

const getVoteStatus = (startDate: Date, endDate: Date) => {
  const date = moment().toDate();
  const startDateWithUTC = moment(startDate).toDate();
  const endDateWithUTC = moment(endDate).toDate();

  if (date < startDateWithUTC) {
    return '예정';
  } else if (startDateWithUTC <= date && date <= endDateWithUTC) {
    return '진행중';
  } else {
    return '종료';
  }
};

export default getVoteStatus;
