import { render } from '@testing-library/react';
import Header from 'components/common/Header';
import Main from 'pages/Main';
import { Fragment } from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('button in <Main/> without login ', () => {
  const mockStore: any = configureStore();
  let store: any = null;

  beforeEach(() => {
    store = mockStore({
      user: { user: { id: '', name: '' } },
      vote: {
        list: [
          {
            id: 'test',
            creator: { id: 'test', name: 'testName' },
            title: 'vote for dinner',
            startDate: new Date(new Date()),
            endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
            list: [
              { id: 'vote1', name: 'beef', vote: [] },
              { id: 'vote2', name: 'meat', vote: [] },
            ],
          },
        ],
      },
    });
  });

  test('create button should be null', () => {
    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const creatBtn = container.querySelector('.create button');
    expect(creatBtn).toBeNull();
  });

  test('signup button should be exist', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const button = getByText('SIGNUP');
    expect(button).toBeInTheDocument();
  });

  test('signin button should be exist', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const button = getByText('SIGNIN');
    expect(button).toBeInTheDocument();
  });
});

describe('button in <Main/> with login ', () => {
  const mockStore: any = configureStore();
  let store: any = null;

  beforeEach(() => {
    store = mockStore({
      user: { user: { id: 'test', name: 'testName' } },
      vote: {
        list: [
          {
            id: 'test',
            creator: { id: 'test', name: 'testName' },
            title: 'vote for dinner',
            startDate: new Date(new Date()),
            endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
            list: [
              { id: 'vote1', name: 'beef', vote: [] },
              { id: 'vote2', name: 'meat', vote: [] },
            ],
          },
        ],
      },
    });
  });

  test('create button should be seen', () => {
    const store = mockStore({
      user: { user: { id: 'test', name: 'testName' } },
      vote: { list: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const creatBtn = container.querySelector('.create button');
    expect(creatBtn).toBeInTheDocument();
  });

  test('signup button should be null', () => {
    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const button = container.querySelector('header .signup');
    expect(button).toBeNull();
  });

  test('signin button should be null', () => {
    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const button = container.querySelector('header .signin');
    expect(button).toBeNull();
  });

  test('logout button should be exist', () => {
    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const button = container.querySelector('header .logout');
    expect(button).toBeInTheDocument();
  });

  test('users name who is logged in should be exist', () => {
    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );
    const userName = container.querySelector('header .user-name');
    expect(userName?.textContent).toBe('testName');
  });
});

describe('list in <Main/>', () => {
  const mockStore: any = configureStore();
  let store: any = null;

  beforeEach(() => {
    store = mockStore({
      user: { user: { id: '', name: '' } },
      vote: {
        list: [
          {
            id: 'test',
            creator: { id: 'test', name: 'testName' },
            title: 'vote for dinner',
            startDate: new Date(new Date()),
            endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
            list: [
              { id: 'vote1', name: 'beef', vote: [] },
              { id: 'vote2', name: 'meat', vote: [] },
            ],
          },
        ],
      },
    });
  });

  test('list should be in the document', () => {
    const { container } = render(
      <Provider store={store}>
        <Fragment>
          <Header />
          <Main />
        </Fragment>
      </Provider>
    );

    const list = container.querySelector('.list-wrapper .item');
    expect(list).toBeInTheDocument();
  });

  test('creator name should be exist', () => {
    const { container } = render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const creator = container.querySelector('.list-wrapper .creator');
    expect(creator?.textContent).toBe('testName');
  });

  test('list status should be exist', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Main />
      </Provider>
    );

    const status = getByText('진행중');
    expect(status).toBeInTheDocument();
  });
});
