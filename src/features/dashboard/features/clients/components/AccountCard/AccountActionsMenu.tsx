import {
  IconDotsVertical,
  IconGavel,
  IconListDetails,
  IconLock,
  IconRefresh,
  IconSwitchHorizontal,
  IconTransferIn,
  IconTransferOut,
  IconX,
} from '@tabler/icons-react';
import { Button, Menu } from '@mantine/core';
import { openContextModal } from '@mantine/modals';
import { ACCOUNT_STATUS, ACCOUNT_TYPE } from '@/lib/constants/account.constants';
import type { Account } from '@/lib/types/account.types';

interface AccountActionsMenuProps {
  account: Account;
}

export const AccountActionsMenu = ({
  account,
  className,
}: AccountActionsMenuProps & { className?: string }) => {
  // Si la cuenta está inactiva, solo mostrar Ver Movimientos y Cerrar Cuenta
  const isInactive = account.status === ACCOUNT_STATUS.INACTIVE;
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
        <Menu.Item
          leftSection={<IconListDetails size={14} />}
          onClick={() => {
            openContextModal({
              modal: 'accountMovements',
              title: 'Últimos Movimientos',
              innerProps: {
                accountNumber: account.accountNumber,
              },
              size: 'xl',
            });
          }}
        >
          Ver Movimientos
        </Menu.Item>
        {!isInactive && (
          <>
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
                      innerProps: {
                        accountNumber: account.accountNumber,
                        currency: account.currency,
                      },
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
            {account.accountType === ACCOUNT_TYPE.FIXED_TERM && (
              <>
                <Menu.Item
                  leftSection={<IconRefresh size={14} />}
                  color="blue"
                  onClick={() =>
                    openContextModal({
                      modal: 'renewFixedTerm',
                      title: 'Renovar Cuenta a Plazo',
                      innerProps: {
                        accountNumber: account.accountNumber,
                        currentTerm: account.term || 12,
                        currentInterest: account.monthlyInterest || 0,
                      },
                    })
                  }
                >
                  Renovar
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconX size={14} />}
                  color="orange"
                  onClick={() =>
                    openContextModal({
                      modal: 'closeAccount',
                      title: 'Cancelar Cuenta a Plazo',
                      innerProps: {
                        accountNumber: account.accountNumber,
                        clientCode: account.clientCode,
                        currency: account.currency,
                        currentBalance: account.currentBalance,
                        accountType: account.accountType,
                        initialBalance: account.initialBalance,
                        openingDate: account.openingDate,
                        monthlyInterest: account.monthlyInterest,
                      },
                    })
                  }
                >
                  Cancelar con Intereses
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
                    innerProps: {
                      accountNumber: account.accountNumber,
                      currency: account.currency,
                    },
                  });
                }}
              >
                Embargar Cuenta
              </Menu.Item>
            )}
          </>
        )}
        {account.accountType !== ACCOUNT_TYPE.FIXED_TERM && (
          <Menu.Item
            leftSection={<IconX size={14} />}
            color="red"
            onClick={() => {
              openContextModal({
                modal: 'closeAccount',
                title: 'Cerrar Cuenta',
                size: 'md',
                centered: true,
                innerProps: {
                  accountNumber: account.accountNumber,
                  clientCode: account.clientCode,
                  currency: account.currency,
                  currentBalance: account.currentBalance,
                },
              });
            }}
            disabled={account.currentBalance !== 0}
          >
            Cerrar Cuenta
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};
