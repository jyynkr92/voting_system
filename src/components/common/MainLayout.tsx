import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Rootstate } from 'store';
import Header from 'components/common/Header';
import Loading from 'components/common/Loading';
import { refreshUser, userLogout } from 'store/user/actions';
import { UserInfo } from 'store/user/types';

interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}

function MainLayout({ component: Component, ...rest }: IProps) {
  const { loading } = useSelector((root: Rootstate) => root.common);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('login');
    if (user) {
      const data: UserInfo = JSON.parse(user);
      dispatch(refreshUser({ id: data.id, name: data.name }));
    }
  }, []);

  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <Fragment>
          {loading && <Loading />}
          <Header />
          <Component {...matchProps} />
        </Fragment>
      )}
    />
  );
}

export default MainLayout;
