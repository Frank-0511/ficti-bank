import { Card, Skeleton, Stack } from '@mantine/core';
import styles from './AccountCardSkeleton.module.css';

export const AccountCardSkeleton = () => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder className={styles.card}>
      <Stack gap="md">
        <Skeleton height={20} width="60%" />
        <Skeleton height={16} width="80%" />
        <Skeleton height={32} width="50%" mt="xs" />
        <Stack gap="xs" mt="md">
          <Skeleton height={12} />
          <Skeleton height={12} />
          <Skeleton height={12} width="70%" />
        </Stack>
        <Skeleton height={36} mt="md" />
      </Stack>
    </Card>
  );
};
