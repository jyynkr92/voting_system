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
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="title">Sign up</div>
        <div className="form">
          <div className="field">
            <div className="field-title">아이디</div>
            <input type="text" value={id} onChange={setId} />
          </div>
          <div className="field">
            <div className="field-title">비밀번호</div>
            <input type="password" value={password} onChange={setPassword} />
          </div>
          <div className="field">
            <div className="field-title">이름</div>
            <input type="text" value={name} onChange={setName} />
          </div>
        </div>
        <div className="button-wrapper">
          <button onClick={onSubmitClick}>회원가입</button>
          <button onClick={onCancelClick}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
