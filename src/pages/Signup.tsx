import UserInput from 'components/user/UserInput';
import { push } from 'lib/browserHistory';
import useInput from 'lib/useInput';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userSignUp } from 'store/user/actions';

function Signup() {
  const dispatch = useDispatch();
  const [id, setId] = useInput('');
  const [password, setPassword] = useInput('');
  const [name, setName] = useInput('');

  const onSubmitClick = () => {
    dispatch(userSignUp({ id, name, password }));
  };

  const onCancelClick = () => {
    push('/');
  };

  return (
    <div className='signup-wrapper'>
      <div className='signup-box'>
        <div className='title'>Sign up</div>
        <div className='form'>
          <UserInput title='아이디' type='text' value={id} setValue={setId} />
          <UserInput title='비밀번호' type='password' value={password} setValue={setPassword} />
          <UserInput title='이름' type='text' value={name} setValue={setName} />
        </div>
        <div className='button-wrapper'>
          <button onClick={onSubmitClick}>회원가입</button>
          <button onClick={onCancelClick}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
