import { ACCOUNTS_STORAGE_KEY, DEFAULT_ACCOUNTS } from './data/accounts.data';
import { CLIENTS_STORAGE_KEY, DEFAULT_CLIENTS } from './data/clients.data';
import { DEFAULT_MOVEMENTS, MOVEMENTS_STORAGE_KEY } from './data/movements.data';
import { DEFAULT_USERS, USERS_STORAGE_KEY } from './data/users.data';

export const initializeMockData = () => {
  if (!localStorage.getItem(USERS_STORAGE_KEY)) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
  }

  if (!localStorage.getItem(CLIENTS_STORAGE_KEY)) {
    localStorage.setItem(CLIENTS_STORAGE_KEY, JSON.stringify(DEFAULT_CLIENTS));
  }

  if (!localStorage.getItem(ACCOUNTS_STORAGE_KEY)) {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(DEFAULT_ACCOUNTS));
  }

  if (!localStorage.getItem(MOVEMENTS_STORAGE_KEY)) {
    localStorage.setItem(MOVEMENTS_STORAGE_KEY, JSON.stringify(DEFAULT_MOVEMENTS));
  }
};
