import moment from 'moment';
import React from 'react';

interface VotePeriodProps {
  startDate: Date;
  endDate: Date;
  status?: string;
}

function VotePeriod({ startDate, endDate, status }: VotePeriodProps) {
  return (
    <div className='period'>
      {moment(startDate).format('YYYY-MM-DD HH:mm')}
      {` ~ ${moment(endDate).format('YYYY-MM-DD HH:mm')}`}
      {status && <span className='status'>/ {status}</span>}
    </div>
  );
}

export default VotePeriod;
