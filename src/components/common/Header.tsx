import { push } from 'lib/browserHistory';
import { useDispatch, useSelector } from 'react-redux';
import { Rootstate } from 'store';
import { userLogout } from 'store/user/actions';

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((root: Rootstate) => root.user);
  const onHomeClick = () => {
    push('/');
  };

  const onLogoutClick = () => {
    dispatch(userLogout());
  };

  const onSigninClick = () => {
    push('/signin');
  };

  const onSignupClick = () => {
    push('/signup');
  };

  return (
    <header>
      <div>
        <span onClick={onHomeClick}>HOME</span>
      </div>
      <div>
        {user.id && user.name && <span className="user-name">{user.name}</span>}
        {user.id && <span onClick={onLogoutClick}>LOGOUT</span>}
        {!user.id && <span onClick={onSigninClick}>SIGNIN</span>}
        {!user.id && <span onClick={onSignupClick}>SIGNUP</span>}
      </div>
    </header>
  );
}

export default Header;
