import { IconSettings, IconUsers } from '@tabler/icons-react';
import { USER_ROLE } from '@/lib/constants/role.constants';

export interface MenuItem {
  label: string;
  icon: React.FC<{ size?: number | string }>;
  path?: string;
  items?: SubMenuItem[];
  adminOnly?: boolean;
}

export interface SubMenuItem {
  label: string;
  path: string;
  adminOnly?: boolean;
}

export const DASHBOARD_MENU: MenuItem[] = [
  {
    label: 'Clientes',
    icon: IconUsers,
    path: '/dashboard/clients',
  },
  /*   {
    label: 'Operaciones',
    icon: IconCash,
    items: [
      { label: 'Depósitos', path: '/dashboard/operations/deposits' },
      { label: 'Retiros', path: '/dashboard/operations/withdrawals' },
      { label: 'Transferencias', path: '/dashboard/operations/transfers' },
    ],
  }, */
  {
    label: 'Administración',
    icon: IconSettings,
    items: [
      { label: 'Tipo de Cambio', path: '/dashboard/admin/exchange-rate' },
      { label: 'Resumen del Día', path: '/dashboard/admin/daily-summary' },
      { label: 'Usuarios', path: '/dashboard/admin/users', adminOnly: true },
    ],
  },
];

export const filterMenuByRole = (menu: MenuItem[], userRole: string): MenuItem[] => {
  return menu
    .map((item) => {
      if (item.adminOnly && userRole !== USER_ROLE.ADMIN) {
        return null;
      }

      if (item.items) {
        const filteredItems = item.items.filter(
          (subItem) => !subItem.adminOnly || userRole === USER_ROLE.ADMIN
        );

        if (filteredItems.length === 0) {
          return null;
        }

        return {
          ...item,
          items: filteredItems,
        };
      }

      return item;
    })
    .filter((item): item is MenuItem => item !== null);
};
