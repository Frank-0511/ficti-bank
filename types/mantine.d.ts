import '@mantine/core';

import { fontSizes, spacing } from '../theme';

declare module '@mantine/core' {
  export interface MantineThemeOverride {
    spacing: typeof spacing;
    fontSizes: typeof fontSizes;
  }
}
