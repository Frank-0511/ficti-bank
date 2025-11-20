import { useInactivityLogout } from '@/lib/hooks/auth/useInactivityLogout';

export function InactivityTracker() {
  useInactivityLogout();
  return null;
}
