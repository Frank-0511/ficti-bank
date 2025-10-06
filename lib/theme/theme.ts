import { createTheme, CSSVariablesResolver } from '@mantine/core';

export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const fontSizes = {
  '6xl': '56px',
  '5xl': '48px',
  '4xl': '40px',
  '3xl': '32px',
  '2xl': '24px',
  xl: '20px',
  lg: '18px',
  md: '16px',
  sm: '14px',
  xs: '12px',
} as const;

export const theme = createTheme({
  spacing,
  fontSizes,
  components: {
    Button: {
      classNames: { root: 'global-transition global-hover-scale' },
    },
    Card: {
      classNames: { root: 'global-transition' },
    },
    Text: {
      classNames: { root: 'global-transition' },
    },
    Title: {
      classNames: { root: 'global-transition' },
    },
    Anchor: {
      classNames: { root: 'global-transition' },
    },
  },
});

export const cssVariablesResolver: CSSVariablesResolver = () => ({
  variables: {},
  light: {
    '--mantine-color-scrolled-background': 'white',
    '--mantine-color-border': '1px solid var(--mantine-color-gray-4)',
    '--mantine-color-header-title': 'var(--mantine-color-dark-8)',
    '--mantine-color-header-title-2': 'var(--mantine-color-blue-6)',
    '--mantine-color-text-secondary': 'var(--mantine-color-dark-8)',
    '--mantine-color-text-tertiary': 'var(--mantine-color-dark-5)',
    '--mantine-color-text-quaternary': 'var(--mantine-color-dark-4)',
    '--mantine-color-switch-theme': 'var(--mantine-color-cyan)',
    '--mantine-color-card': 'var(--mantine-color-white)',
    '--mantine-color-card-shadow': '0 1.25rem 2.5rem rgba(0, 0, 0, 0.08)',
    '--mantine-color-primary-icon-shadow': '0 0.625rem 2rem rgba(59, 130, 246, 0.2)',
    '--mantine-color-body': 'var(--mantine-color-blue-0)',
    '--mantine-color-balance-section': 'var(--mantine-color-gray-0)',
    '--mantine-color-detail-item': 'var(--mantine-color-gray-0)',
    '--mantine-border-card-selector': 'var(--mantine-color-blue-6)',
  },
  dark: {
    '--mantine-color-scrolled-background': 'var(--mantine-color-dark-9)',
    '--mantine-color-border': '1px solid var(--mantine-color-dark-3)',
    '--mantine-color-header-title': 'var(--mantine-color-gray-1)',
    '--mantine-color-header-title-2': 'var(--mantine-color-cyan-4)',
    '--mantine-color-text-secondary': 'var(--mantine-color-gray-2)',
    '--mantine-color-text-tertiary': 'var(--mantine-color-gray-3)',
    '--mantine-color-text-quaternary': 'var(--mantine-color-gray-4)',
    '--mantine-color-switch-theme': 'var(--mantine-color-blue)',
    '--mantine-color-card': 'var(--mantine-color-dark-6)',
    '--mantine-color-card-shadow': '0 1.25rem 2.5rem rgba(0, 0, 0, 0.3)',
    '--mantine-color-primary-icon-shadow': '0 0.625rem 2rem rgba(59, 130, 246, 0.3)',
    '--mantine-color-balance-section': 'var(--mantine-color-dark-5)',
    '--mantine-color-detail-item': 'var(--mantine-color-dark-5)',
    '--mantine-border-card-selector': 'var(--mantine-color-cyan-4)',
  },
});
