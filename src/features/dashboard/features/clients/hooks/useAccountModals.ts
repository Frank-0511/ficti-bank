import { useCallback } from 'react';
import { modals } from '@mantine/modals';

export const useAccountModals = () => {
  const openAccountModal = useCallback((clientCode?: string) => {
    modals.openContextModal({
      modal: 'openAccount',
      title: 'Abrir Nueva Cuenta',
      size: 'md',
      centered: true,
      innerProps: { clientCode },
    });
  }, []);

  const openCloseAccountModal = useCallback((accountNumber: string) => {
    modals.openContextModal({
      modal: 'closeAccount',
      title: 'Cerrar Cuenta',
      size: 'md',
      centered: true,
      innerProps: {
        accountNumber,
      },
    });
  }, []);

  return {
    openAccountModal,
    openCloseAccountModal,
  };
};
