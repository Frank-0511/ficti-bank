import { IconCalendarTime, IconCreditCard, IconPigMoney } from '@tabler/icons-react';

/**
 * Account types configuration for navigation menus
 * Used in Header and Navbar components
 */
export const ACCOUNT_TYPES = [
  {
    icon: IconPigMoney,
    title: 'Cuenta de Ahorros',
    description: 'Ahorra y gana intereses',
    href: '/cuentas/ahorros',
  },
  {
    icon: IconCreditCard,
    title: 'Cuenta Corriente',
    description: 'Para tus operaciones diarias',
    href: '/cuentas/corriente',
  },
  {
    icon: IconCalendarTime,
    title: 'Cuenta a Plazo Fijo',
    description: 'Inversión a largo plazo',
    href: '/cuentas/plazo-fijo',
  },
] as const;
