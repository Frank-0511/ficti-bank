import { IconPlus, IconX } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export const useAccountModals = () => {
  const ACCOUNT_MODAL_IDS = {
    OPEN_ACCOUNT: 'account-open-modal',
    CLOSE_ACCOUNT: 'account-close-modal',
  };

  const openAccountModal = () =>
    modals.openContextModal({
      modal: 'openAccount',
      modalId: ACCOUNT_MODAL_IDS.OPEN_ACCOUNT,
      title: (
        <Group gap="sm">
          <IconPlus size={20} />
          <Text fw={600}>Aperturar Nueva Cuenta</Text>
        </Group>
      ),
      size: 'md',
      centered: true,
      closeOnClickOutside: true,
      closeOnEscape: true,
      trapFocus: true,
      overlayProps: {
        backgroundOpacity: 0.6,
        blur: 4,
      },
      transitionProps: {
        transition: 'fade',
        duration: 300,
        timingFunction: 'ease-in-out',
      },
      innerProps: {},
    });

  const openCloseAccountModal = (accountNumber: string) =>
    modals.openContextModal({
      modal: 'closeAccount',
      modalId: ACCOUNT_MODAL_IDS.CLOSE_ACCOUNT,
      title: (
        <Group gap="sm">
          <IconX size={20} />
          <Text fw={600}>Cerrar Cuenta</Text>
        </Group>
      ),
      size: 'md',
      centered: true,
      closeOnClickOutside: true,
      closeOnEscape: true,
      trapFocus: true,
      overlayProps: {
        backgroundOpacity: 0.6,
        blur: 4,
      },
      transitionProps: {
        transition: 'fade',
        duration: 300,
        timingFunction: 'ease-in-out',
      },
      innerProps: {
        accountNumber,
      },
    });

  return {
    openAccountModal,
    openCloseAccountModal,
    closeModal: (id: string) => modals.close(id),
    closeAll: () => modals.closeAll(),
  };
};
