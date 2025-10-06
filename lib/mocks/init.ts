import { DEFAULT_USERS, USERS_STORAGE_KEY } from './data/users.data';

export const initializeMockData = () => {
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  }
};
