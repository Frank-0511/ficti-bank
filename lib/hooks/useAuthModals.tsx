import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

export const useAuthModals = () => {
  const AUTH_MODAL_IDS = {
    LOGIN: 'auth-login-modal',
    REGISTER: 'auth-register-modal',
  };

  const modalConfig = {
    login: () =>
      modals.openContextModal({
        modal: 'login',
        modalId: AUTH_MODAL_IDS.LOGIN,
        title: (
          <Group gap="sm">
            <IconLogin size={20} />
            <Text fw={600}>Iniciar Sesión</Text>
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
      }),

    register: () =>
      modals.openContextModal({
        modal: 'register',
        modalId: AUTH_MODAL_IDS.REGISTER,
        title: (
          <Group gap="sm">
            <IconUserPlus size={20} />
            <Text fw={600}>Crear Cuenta</Text>
          </Group>
        ),
        size: 'lg',
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
      }),
  };

  const closeAuthModals = () => {
    modals.close(AUTH_MODAL_IDS.LOGIN);
    modals.close(AUTH_MODAL_IDS.REGISTER);
    modals.closeAll();
  };

  return {
    openLogin: modalConfig.login,
    openRegister: modalConfig.register,
    closeModal: (id: string) => modals.close(id),
    closeAll: () => modals.closeAll(),
    switchToRegister: () => {
      closeAuthModals();
      setTimeout(modalConfig.register, 250);
    },
    switchToLogin: () => {
      closeAuthModals();
      setTimeout(modalConfig.login, 250);
    },
  };
};
