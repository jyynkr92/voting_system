import React from 'react';

interface UserInputProps {
  title: string;
  value: string;
  type: string;
  setValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function UserInput({ title, value, type, setValue }: UserInputProps) {
  return (
    <div className='field'>
      <div className='field-title'>{title}</div>
      <input type={type} value={value} onChange={setValue} />
    </div>
  );
}

export default UserInput;
