import {
  ACCOUNTS_STORAGE_KEY,
  CLIENTS_STORAGE_KEY,
  DEFAULT_ACCOUNTS,
  DEFAULT_CLIENTS,
  DEFAULT_EXCHANGE_RATES,
  DEFAULT_MOVEMENTS,
  DEFAULT_USERS,
  EXCHANGE_RATES_STORAGE_KEY,
  MOVEMENTS_STORAGE_KEY,
  USERS_STORAGE_KEY,
} from './data';

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

  if (!localStorage.getItem(EXCHANGE_RATES_STORAGE_KEY)) {
    localStorage.setItem(EXCHANGE_RATES_STORAGE_KEY, JSON.stringify(DEFAULT_EXCHANGE_RATES));
  }
};
