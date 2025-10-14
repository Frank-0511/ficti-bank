import { CLIENTS_STORAGE_KEY, DEFAULT_CLIENTS } from './data/clients.data';
import { DEFAULT_USERS, USERS_STORAGE_KEY } from './data/users.data';

export const initializeMockData = () => {
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  }

  if (!localStorage.getItem(CLIENTS_STORAGE_KEY)) {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(DEFAULT_CLIENTS));
  }
};
