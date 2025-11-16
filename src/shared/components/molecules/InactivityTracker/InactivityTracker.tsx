import { useInactivityLogout } from '@/lib/hooks';

export function InactivityTracker() {
  useInactivityLogout();
  return null;
}
