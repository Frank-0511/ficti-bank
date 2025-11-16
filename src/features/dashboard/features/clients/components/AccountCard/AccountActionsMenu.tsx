import {
  IconDotsVertical,
  IconGavel,
  IconLock,
  IconSwitchHorizontal,
  IconTransferIn,
  IconTransferOut,
  IconX,
} from '@tabler/icons-react';
import { Button, Menu } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '@/lib/constants';
import type { Account } from '@/lib/types';

interface AccountActionsMenuProps {
  account: Account;
  onClose: (accountNumber: string) => void;
}

export const AccountActionsMenu = ({
  account,
  onClose,
  className,
}: AccountActionsMenuProps & { className?: string }) => {
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button
          variant="subtle"
          color="primary"
          size="xs"
          px={6}
          style={{ minWidth: 0, height: 28 }}
          className={className}
        >
          <IconDotsVertical size={18} />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        {(account.accountType === ACCOUNT_TYPE.SAVINGS ||
          account.accountType === ACCOUNT_TYPE.CHECKING) && (
          <>
            <Menu.Item
              leftSection={<IconLock size={14} />}
              onClick={() =>
                openContextModal({
                  modal: 'inactivateAccount',
                  title: 'Inactivar Cuenta',
                  innerProps: { accountNumber: account.accountNumber },
                })
              }
            >
              Inactivar Cuenta
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTransferIn size={14} />}
              onClick={() => {
                openContextModal({
                  modal: 'depositAccount',
                  title: 'Depositar',
                  innerProps: { accountNumber: account.accountNumber, currency: account.currency },
                });
              }}
            >
              Depositar
            </Menu.Item>
            <Menu.Item
              leftSection={<IconSwitchHorizontal size={14} />}
              onClick={() => {
                openContextModal({
                  modal: 'transferAccount',
                  title: 'Transferencia',
                  innerProps: {
                    accountNumber: account.accountNumber,
                    currency: account.currency,
                  },
                });
              }}
            >
              Transferencia
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTransferOut size={14} />}
              onClick={() =>
                openContextModal({
                  modal: 'withdrawAccount',
                  title: 'Retiro',
                  innerProps: {
                    accountNumber: account.accountNumber,
                    currency: account.currency,
                    accountType: account.accountType,
                    availableBalance: account.availableBalance,
                    overdraftLimit: account.overdraftLimit,
                  },
                })
              }
            >
              Retiro
            </Menu.Item>
          </>
        )}
        {account.status === ACCOUNT_STATUS.BLOCKED ? (
          <Menu.Item
            leftSection={<IconGavel size={14} />}
            color="green"
            onClick={() =>
              openContextModal({
                modal: 'unfreezeAccount',
                title: 'Desembargar Cuenta',
                innerProps: { accountNumber: account.accountNumber },
              })
            }
          >
            Desembargar Cuenta
          </Menu.Item>
        ) : (
          <Menu.Item
            leftSection={<IconGavel size={14} />}
            onClick={() => {
              openContextModal({
                modal: 'freezeAccount',
                title: 'Embargar Cuenta',
                innerProps: { accountNumber: account.accountNumber, currency: account.currency },
              });
            }}
          >
            Embargar Cuenta
          </Menu.Item>
        )}
        <Menu.Item
          leftSection={<IconX size={14} />}
          color="red"
          onClick={() => onClose(account.accountNumber)}
          disabled={account.currentBalance !== 0}
        >
          Cerrar Cuenta
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
