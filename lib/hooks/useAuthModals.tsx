import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

/**
 * Hook para manejar modals de autenticación usando @mantine/modals
 * Reemplaza completamente el useAuthModal anterior y su store
 * Incluye las mismas transiciones y overlay que tenía BaseModal
 */
export const useAuthModals = () => {
  // IDs únicos para trackear modales
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

  // Función para cerrar modales específicos de auth
  const closeAuthModals = () => {
    modals.close(AUTH_MODAL_IDS.LOGIN);
    modals.close(AUTH_MODAL_IDS.REGISTER);
    // También usar closeAll como backup
    modals.closeAll();
  };

  return {
    /**
     * Abre el modal de login con título y configuración completa
     */
    openLogin: modalConfig.login,

    /**
     * Abre el modal de registro con título y configuración completa
     */
    openRegister: modalConfig.register,

    /**
     * Cierra un modal específico por su ID
     */
    closeModal: (id: string) => modals.close(id),

    /**
     * Cierra todos los modals abiertos
     */
    closeAll: () => modals.closeAll(),

    /**
     * Transición de login a registro con cierre específico de auth modales
     */
    switchToRegister: () => {
      closeAuthModals();
      setTimeout(modalConfig.register, 250);
    },

    /**
     * Transición de registro a login con cierre específico de auth modales
     */
    switchToLogin: () => {
      closeAuthModals();
      setTimeout(modalConfig.login, 250);
    },
  };
};
