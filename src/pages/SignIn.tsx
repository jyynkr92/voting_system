import { push } from 'lib/browserHistory';
import useInput from 'lib/useInput';
import React from 'react';
import { useDispatch } from 'react-redux';
import { userSignIn } from 'store/user/actions';

function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmitClick = () => {
    dispatch(userSignIn({ id, password }));
  };

  const onSignupClick = () => {
    push('/signup');
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="title">Sign in</div>
        <div className="form">
          <div className="field">
            <div className="field-title">아이디</div>
            <input type="text" value={id} onChange={setId} />
          </div>
          <div className="field">
            <div className="field-title">비밀번호</div>
            <input type="password" value={password} onChange={setPassword} />
          </div>
        </div>
        <div className="button-wrapper">
          <button onClick={onSubmitClick}>로그인</button>
          <button onClick={onSignupClick}>회원가입</button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
