import { lazy, Suspense, useEffect, useState } from 'react';
import { AccountMovementsModal } from '@clients/modals/AccountMovementsModal/AccountMovementsModal';
import { CloseAccountModal } from '@clients/modals/CloseAccountModal/CloseAccountModal';
import { DepositAccountModal } from '@clients/modals/DepositAccountModal/DepositAccountModal';
import { FreezeAccountModal } from '@clients/modals/FreezeAccountModal/FreezeAccountModal';
import { InactivateAccountModal } from '@clients/modals/InactivateAccountModal/InactivateAccountModal';
import { OpenAccountModal } from '@clients/modals/OpenAccountModal/OpenAccountModal';
import { RegisterClientModal } from '@clients/modals/RegisterClientModal/RegisterClientModal';
import { RenewFixedTermModal } from '@clients/modals/RenewFixedTermModal/RenewFixedTermModal';
import { TransferAccountModal } from '@clients/modals/TransferAccountModal/TransferAccountModal';
import { UnfreezeAccountModal } from '@clients/modals/UnfreezeAccountModal/UnfreezeAccountModal';
import { WithdrawAccountModal } from '@clients/modals/WithdrawAccountModal/WithdrawAccountModal';
import { HomePage } from '@features/home/pages/HomePage/Home.page';
import { InactivityTracker } from '@shared/components/molecules/InactivityTracker/InactivityTracker';
import { LoginModal } from '@shared/components/organisms/LoginModal/LoginModal';
import { RouteProgressBar } from '@shared/components/organisms/RouteProgressBar/RouteProgressBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { EditUserModal } from '@/features/dashboard/features/administration/modals/EditUserModal';
import { withAuth } from '@/lib/hoc/withAuth';
import { cssVariablesResolver, theme } from '@/lib/theme/theme';

// Lazy load de páginas pesadas
const DashboardPage = lazy(() => import('@dashboard/pages/Dashboard.page'));
const ClientDetailPage = lazy(() => import('@clients/pages/ClientDetailPage'));

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
              renewFixedTerm: RenewFixedTermModal,
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
            <Suspense
              fallback={<div style={{ padding: 40, textAlign: 'center' }}>Cargando...</div>}
            >
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dashboard" element={<ProtectedDashboard />} />
                <Route path="/dashboard/clients/:id" element={<ProtectedClientDetail />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
