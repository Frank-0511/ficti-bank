import { IconLogin, IconUserPlus } from '@tabler/icons-react';
import { Group, Text } from '@mantine/core';
import { modals } from '@mantine/modals';

/**
 * Hook para manejar modals de autenticación usando @mantine/modals
 * Reemplaza completamente el useAuthModal anterior y su store
 * Incluye las mismas transiciones y overlay que tenía BaseModal
 */
export const useAuthModals = () => {
  const modalConfig = {
    login: () =>
      modals.openContextModal({
        modal: 'login',
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
     * Transición suave de login a registro
     * Cierra el modal actual y abre registro con un delay para mejor UX
     */
    switchToRegister: (currentId?: string) => {
      if (currentId) {
        modals.close(currentId);
      }
      // Pequeño delay para permitir que se complete la animación de cierre
      setTimeout(modalConfig.register, 200);
    },

    /**
     * Transición suave de registro a login
     * Cierra el modal actual y abre login con un delay para mejor UX
     */
    switchToLogin: (currentId?: string) => {
      if (currentId) {
        modals.close(currentId);
      }
      // Pequeño delay para permitir que se complete la animación de cierre
      setTimeout(modalConfig.login, 200);
    },
  };
};
