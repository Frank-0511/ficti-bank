import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import {
  AccountMovementsModal,
  ClientDetailPage,
  CloseAccountModal,
  DashboardPage,
  DepositAccountModal,
  EditUserModal,
  FreezeAccountModal,
  InactivateAccountModal,
  OpenAccountModal,
  RegisterClientModal,
  TransferAccountModal,
  UnfreezeAccountModal,
  WithdrawAccountModal,
} from '@/features/dashboard';
import { HomePage } from '@/features/home';
import { withAuth } from '@/lib/hoc';
import { cssVariablesResolver, theme } from '@/lib/theme';
import { InactivityTracker, LoginModal, RouteProgressBar } from '@/shared/components';

const ProtectedDashboard = withAuth(DashboardPage);
const ProtectedClientDetail = withAuth(ClientDetailPage);

export function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        document.documentElement.setAttribute('data-scrolled', 'true');
      } else {
        document.documentElement.removeAttribute('data-scrolled');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={cssVariablesResolver}
          defaultColorScheme="light"
        >
          <ModalsProvider
            modals={{
              login: LoginModal,
              registerClient: RegisterClientModal,
              openAccount: OpenAccountModal,
              closeAccount: CloseAccountModal,
              inactivateAccount: InactivateAccountModal,
              freezeAccount: FreezeAccountModal,
              depositAccount: DepositAccountModal,
              withdrawAccount: WithdrawAccountModal,
              unfreezeAccount: UnfreezeAccountModal,
              transferAccount: TransferAccountModal,
              accountMovements: AccountMovementsModal,
              editUser: EditUserModal,
            }}
            modalProps={{
              centered: true,
              overlayProps: {
                backgroundOpacity: 0.6,
                blur: 4,
              },
              transitionProps: {
                transition: 'fade',
                duration: 300,
                timingFunction: 'ease-in-out',
              },
            }}
          >
            <InactivityTracker />
            <RouteProgressBar />
            <Notifications />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<ProtectedDashboard />} />
              <Route path="/dashboard/clients/:id" element={<ProtectedClientDetail />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
