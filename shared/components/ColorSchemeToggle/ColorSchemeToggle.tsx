import { useEffect, useState } from 'react';
import { IconMoonStars, IconSun } from '@tabler/icons-react';
import { Switch, useMantineColorScheme } from '@mantine/core';
import styles from './ColorSchemeToggle.module.css';

export const ColorSchemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  } // evitar mismatch SSR

  const isDark = colorScheme === 'dark';

  return (
    <Switch
      size="lg"
      color="var(--mantine-color-switch-theme)"
      checked={isDark}
      onChange={toggleColorScheme}
      title={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      onLabel={<IconSun size={16} stroke={2.5} color="var(--mantine-color-blue-6)" />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--mantine-color-cyan-4)" />}
      className={styles.customSwitch}
      data-testid="color-scheme-toggle"
      classNames={{
        track: isDark ? styles.darkTrack : styles.lightTrack,
        thumb: isDark ? styles.darkThumb : styles.lightThumb,
      }}
    />
  );
};
