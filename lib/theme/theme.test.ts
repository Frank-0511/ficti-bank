import { createTheme } from '@mantine/core';
import { cssVariablesResolver, fontSizes, spacing, theme } from './theme';

describe('Theme Configuration', () => {
  describe('spacing', () => {
    it('has correct spacing values', () => {
      expect(spacing).toEqual({
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      });
    });

    it('exports spacing as a const object', () => {
      expect(typeof spacing).toBe('object');
      expect(Object.keys(spacing)).toHaveLength(6);
    });
  });

  describe('fontSizes', () => {
    it('has correct font size values', () => {
      expect(fontSizes).toEqual({
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
      });
    });

    it('exports fontSizes as a const object', () => {
      expect(typeof fontSizes).toBe('object');
      expect(Object.keys(fontSizes)).toHaveLength(10);
    });

    it('has font sizes in descending order', () => {
      const sizes = [
        parseInt(fontSizes['6xl'], 10),
        parseInt(fontSizes['5xl'], 10),
        parseInt(fontSizes['4xl'], 10),
        parseInt(fontSizes['3xl'], 10),
        parseInt(fontSizes['2xl'], 10),
        parseInt(fontSizes.xl, 10),
        parseInt(fontSizes.lg, 10),
        parseInt(fontSizes.md, 10),
        parseInt(fontSizes.sm, 10),
        parseInt(fontSizes.xs, 10),
      ];

      for (let i = 0; i < sizes.length - 1; i++) {
        expect(sizes[i]).toBeGreaterThan(sizes[i + 1]);
      }
    });
  });

  describe('theme', () => {
    it('is created with createTheme function', () => {
      expect(theme).toBeDefined();
      expect(typeof theme).toBe('object');
    });

    it('includes spacing configuration', () => {
      expect(theme.spacing).toEqual(spacing);
    });

    it('includes fontSizes configuration', () => {
      expect(theme.fontSizes).toEqual(fontSizes);
    });

    it('has components configuration', () => {
      expect(theme.components).toBeDefined();
      expect(typeof theme.components).toBe('object');
    });

    it('configures Button component with correct classNames', () => {
      expect(theme.components?.Button).toBeDefined();
      expect(theme.components?.Button?.classNames).toEqual({
        root: 'global-transition global-hover-scale',
      });
    });

    it('configures Card component with correct classNames', () => {
      expect(theme.components?.Card).toBeDefined();
      expect(theme.components?.Card?.classNames).toEqual({
        root: 'global-transition',
      });
    });

    it('configures Text component with correct classNames', () => {
      expect(theme.components?.Text).toBeDefined();
      expect(theme.components?.Text?.classNames).toEqual({
        root: 'global-transition',
      });
    });

    it('configures Title component with correct classNames', () => {
      expect(theme.components?.Title).toBeDefined();
      expect(theme.components?.Title?.classNames).toEqual({
        root: 'global-transition',
      });
    });

    it('configures Anchor component with correct classNames', () => {
      expect(theme.components?.Anchor).toBeDefined();
      expect(theme.components?.Anchor?.classNames).toEqual({
        root: 'global-transition',
      });
    });
  });

  describe('cssVariablesResolver', () => {
    it('is a function', () => {
      expect(typeof cssVariablesResolver).toBe('function');
    });

    it('returns an object with variables, light, and dark properties', () => {
      const result = cssVariablesResolver({} as any);

      expect(result).toBeDefined();
      expect(typeof result).toBe('object');
      expect(result).toHaveProperty('variables');
      expect(result).toHaveProperty('light');
      expect(result).toHaveProperty('dark');
    });

    it('returns empty variables object', () => {
      const result = cssVariablesResolver({} as any);
      expect(result.variables).toEqual({});
    });

    it('has correct light theme variables', () => {
      const result = cssVariablesResolver({} as any);

      expect(result.light).toEqual({
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
      });
    });

    it('has correct dark theme variables', () => {
      const result = cssVariablesResolver({} as any);

      expect(result.dark).toEqual({
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
      });
    });

    it('light theme has one more CSS variable than dark theme', () => {
      const result = cssVariablesResolver({} as any);
      const lightKeys = Object.keys(result.light);
      const darkKeys = Object.keys(result.dark);

      expect(lightKeys).toHaveLength(12);
      expect(darkKeys).toHaveLength(11);

      // Light theme has --mantine-color-body that dark theme doesn't have
      expect(lightKeys).toContain('--mantine-color-body');
      expect(darkKeys).not.toContain('--mantine-color-body');
    });
    it('has expected number of CSS variables for each theme', () => {
      const result = cssVariablesResolver({} as any);

      // Light theme has 12 variables, dark theme has 11
      expect(Object.keys(result.light)).toHaveLength(12);
      expect(Object.keys(result.dark)).toHaveLength(11);
    });
    it('all CSS variables start with --mantine-color prefix', () => {
      const result = cssVariablesResolver({} as any);

      Object.keys(result.light).forEach((key) => {
        expect(key).toMatch(/^--mantine-color/);
      });

      Object.keys(result.dark).forEach((key) => {
        expect(key).toMatch(/^--mantine-color/);
      });
    });
  });

  describe('Integration', () => {
    it('theme can be created successfully with all configurations', () => {
      // This test ensures that the createTheme function works with our configuration
      const testTheme = createTheme({
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

      expect(testTheme).toBeDefined();
      expect(testTheme.spacing).toEqual(spacing);
      expect(testTheme.fontSizes).toEqual(fontSizes);
    });

    it('cssVariablesResolver works with different theme objects', () => {
      const mockTheme1 = { colorScheme: 'light' } as any;
      const mockTheme2 = { colorScheme: 'dark' } as any;

      const result1 = cssVariablesResolver(mockTheme1);
      const result2 = cssVariablesResolver(mockTheme2);

      // Both calls should return the same structure
      expect(result1).toEqual(result2);
    });
  });
});
