import { modals } from '@mantine/modals';

export const useClientModals = () => {
  const openRegisterClientModal = () => {
    modals.openContextModal({
      modal: 'registerClient',
      title: 'Registrar Cliente',
      size: 'lg',
      innerProps: {},
    });
  };

  return {
    openRegisterClientModal,
  };
};
