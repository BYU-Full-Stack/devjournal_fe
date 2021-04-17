import { POST, GET, DELETE, defaultReqOptions as options, PUT } from './index';
import { USER_STATE_TYPE } from '../store/reducers/user';
import { ALERT_STATE_TYPE } from '../store/reducers/alert';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { useCallback } from 'react';
import { userStateAction } from '../store/actions/user';
import { JournalType } from '../pages/Journal/Journal';
import { addAlertAction } from '../store/actions/alert';
import { EntryType } from '../pages/Journal/ListEntries';

const {
  REACT_APP_API_DOMAIN: API_URL,
  REACT_APP_API_BASE_PATH: API_BASE,
} = process.env;

export const login = async (user: USER_STATE_TYPE) => {
  try {
    const { headers: { authorization: auth = 'Bearer ' } = {} } = await POST(
      `${API_URL}login`,
      user
    );
    return auth;
  } catch (err) {
    throw err;
  }
};

export const registerUser = async (newUser: USER_STATE_TYPE) => {
  const customOptions: typeof options = { ...options };
  try {
    const { headers: { authorization: auth = 'Bearer ' } = {} } = await POST(
      `${API_URL}${API_BASE}user/signup`,
      newUser,
      customOptions
    );

    return auth;
  } catch (err) {
    throw err;
  }
};

export const getUser = async (username: string = '', token: string = '') => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    // @ts-ignore
    const {
      data: { email, created_date, user_id, password, role } = {},
    } = await GET(`${API_URL}${API_BASE}${username}`, customOptions);
    return { email, created_date, user_id, password, role };
  } catch (err) {
    throw err;
  }
};

export const getUsers = async (token: string = '') => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    // @ts-ignore
    const { data: users = [] } = await GET(
      `${API_URL}${API_BASE}user/all`,
      customOptions
    );
    return users;
  } catch (err) {
    //    TODO: handle errors better than this
    console.log(err);
    return [];
  }
};

export const updateUser = async (
  username: string = '',
  field: string = '',
  updatedUser: USER_STATE_TYPE
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${updatedUser.token}`;

  try {
    await PUT(
      `${API_URL}${API_BASE}${username}/${field}`,
      updatedUser,
      customOptions
    );
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (
  username: string,
  userId: string,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await DELETE(`${API_URL}${API_BASE}${username}/${userId}`, customOptions);
  } catch (err) {
    throw err;
  }
};

export const getJournals = async (username: string, token: string = '') => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    const { data: journals = [] } = await GET(
      `${API_URL}${API_BASE}${username}/journal`,
      customOptions
    );
    return journals;
  } catch (err) {
    throw err;
  }
};

export const getJournalByID = async (
  username: string,
  journalId?: string,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    const { data: journal = {} } = await GET(
      `${API_URL}${API_BASE}${username}/journal/${journalId}`,
      customOptions
    );
    return journal;
  } catch (err) {
    throw err;
  }
};

export const createJournal = async (
  username: string,
  createdJournal: JournalType,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;
  try {
    await POST(
      `${API_URL}${API_BASE}${username}/journal`,
      createdJournal,
      customOptions
    );
  } catch (err) {
    throw err;
  }
};

export const deleteJournal = async (
  username: string,
  journalId?: string,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await DELETE(
      `${API_URL}${API_BASE}${username}/journal/${journalId}`,
      customOptions
    );
  } catch (err) {
    throw err;
  }
};

export const updateJournal = async (
  username: string,
  token: string = '',
  updatedJournal?: JournalType
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await PUT(
      `${API_URL}${API_BASE}${username}/journal`,
      updatedJournal,
      customOptions
    );
  } catch (err) {
    throw err;
  }
};

export const getEntries = async (
  username: string,
  journalId: string | undefined,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    const { data: entries = [] } = await GET(
      `${API_URL}${API_BASE}${username}/${journalId}/entries`,
      customOptions
    );
    return entries;
  } catch (err) {
    //    TODO: handle errors better than this
    console.log(err);
    return [];
  }
};

export const getEntry = async (
  username: string = '',
  journalId: string,
  entryId: string,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;
  try {
    // @ts-ignore
    const { data: { one, two, three, four } = {} } = await GET(
      `${API_URL}${API_BASE}${username}/${journalId}/entries/${entryId}`,
      customOptions
    );
    return { one, two, three, four };
  } catch (err) {
    throw err;
  }
};

export const createEntry = async (
  username: string,
  createdEntry: EntryType,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await POST(
      `${API_URL}${API_BASE}${username}/entries`,
      createdEntry,
      customOptions
    );
  } catch (err) {
    //    TODO: handle errors better than this
    console.log(err.response.data);
  }
};

export const updateEntry = async (
  username: string,
  updatedEntry: EntryType | undefined,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await PUT(
      `${API_URL}${API_BASE}${username}/entries`,
      updatedEntry,
      customOptions
    );
  } catch (err) {
    //    TODO: handle errors better than this
    throw err;
  }
};

export const deleteEntry = async (
  username: string,
  journalId: string,
  entryId: string,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await DELETE(
      `${API_URL}${API_BASE}${username}/${journalId}/entries/${entryId}`,
      customOptions
    );
  } catch (err) {
    //    TODO: handle errors better than this
    console.log(err);
  }
};

export const setEntry = async (
  username: string,
  journalId: string,
  token: string = ''
) => {
  const customOptions: typeof options = { ...options };
  customOptions.headers.Authorization = `Bearer ${token}`;

  try {
    await PUT(
      `${API_URL}${API_BASE}${username}/entries`,
      customOptions
    );
  } catch (err) {
    throw err;
  }
};

export const useAlertBox = (): [
  alertState: ALERT_STATE_TYPE[],
  fun: Function
] => {
  const alertsState = useSelector((state: RootState) => state.alertsReducer);

  const dispatch = useDispatch();
  const addAlert = useCallback(
    (alert: ALERT_STATE_TYPE) => {
      dispatch(addAlertAction(alert));
    },
    [dispatch]
  );

  return [alertsState, addAlert];
};

export const useUser = (): [userState: USER_STATE_TYPE, fun: Function] => {
  const userState = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const setUser = useCallback(
    (user: USER_STATE_TYPE) => {
      if (user.token) {
        window.localStorage.setItem('token', user.token);
      }
      if (user.username) {
        window.localStorage.setItem('username', user.username);
      }
      dispatch(userStateAction(user));
    },
    [dispatch]
  );
  return [userState, setUser];
};
