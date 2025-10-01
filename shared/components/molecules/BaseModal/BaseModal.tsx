import { type ReactNode } from 'react';
import { Modal, type ModalProps } from '@mantine/core';

interface BaseModalProps extends Omit<ModalProps, 'opened' | 'onClose'> {
  /** Whether the modal is opened */
  opened: boolean;
  /** Called when modal is closed */
  onClose: () => void;
  /** Modal content */
  children: ReactNode;
}

/**
 * BaseModal component with consistent default props for all modals in the app
 *
 * @example
 * ```tsx
 * <BaseModal opened={isOpen} onClose={close} title="Mi Modal">
 *   <div>Contenido del modal</div>
 * </BaseModal>
 * ```
 */
export function BaseModal({
  opened,
  onClose,
  children,
  size = 'md',
  centered = true,
  overlayProps = {
    backgroundOpacity: 0.55,
    blur: 3,
  },
  transitionProps = {
    transition: 'fade',
    duration: 300,
    timingFunction: 'ease-in-out',
  },
  ...props
}: BaseModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size={size}
      centered={centered}
      overlayProps={overlayProps}
      transitionProps={transitionProps}
      {...props}
    >
      {children}
    </Modal>
  );
}
