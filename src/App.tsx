import { lazy, Suspense, useEffect, useState } from 'react';
import { HomePage } from '@features/home/pages/HomePage/Home.page';
import { InactivityTracker } from '@shared/components/molecules/InactivityTracker/InactivityTracker';
import { RouteProgressBar } from '@shared/components/organisms/RouteProgressBar/RouteProgressBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { withAuth } from '@/lib/hoc/withAuth';
import { cssVariablesResolver, theme } from '@/lib/theme/theme';
import { lazyModal } from './shared/components/molecules/LazyModalWrapper/LazyModalWrapper';
import { LoginModal } from './shared/components/organisms/LoginModal/LoginModal';

// Lazy load de páginas pesadas
const DashboardPage = lazy(() => import('@dashboard/pages/Dashboard.page'));
const ClientDetailPage = lazy(() => import('@clients/pages/ClientDetailPage'));

// Lazy load de modales
const AccountMovementsModal = lazyModal(() =>
  import('@clients/modals/AccountMovementsModal/AccountMovementsModal').then((module) => ({
    default: module.AccountMovementsModal,
  }))
);
const CloseAccountModal = lazyModal(() =>
  import('@clients/modals/CloseAccountModal/CloseAccountModal').then((module) => ({
    default: module.CloseAccountModal,
  }))
);
const DepositAccountModal = lazyModal(() =>
  import('@clients/modals/DepositAccountModal/DepositAccountModal').then((module) => ({
    default: module.DepositAccountModal,
  }))
);
const FreezeAccountModal = lazyModal(() =>
  import('@clients/modals/FreezeAccountModal/FreezeAccountModal').then((module) => ({
    default: module.FreezeAccountModal,
  }))
);
const InactivateAccountModal = lazyModal(() =>
  import('@clients/modals/InactivateAccountModal/InactivateAccountModal').then((module) => ({
    default: module.InactivateAccountModal,
  }))
);
const OpenAccountModal = lazyModal(() =>
  import('@clients/modals/OpenAccountModal/OpenAccountModal').then((module) => ({
    default: module.OpenAccountModal,
  }))
);
const RegisterClientModal = lazyModal(() =>
  import('@clients/modals/RegisterClientModal/RegisterClientModal').then((module) => ({
    default: module.RegisterClientModal,
  }))
);
const RenewFixedTermModal = lazyModal(() =>
  import('@clients/modals/RenewFixedTermModal/RenewFixedTermModal').then((module) => ({
    default: module.RenewFixedTermModal,
  }))
);
const TransferAccountModal = lazyModal(() =>
  import('@clients/modals/TransferAccountModal/TransferAccountModal').then((module) => ({
    default: module.TransferAccountModal,
  }))
);
const UnfreezeAccountModal = lazyModal(() =>
  import('@clients/modals/UnfreezeAccountModal/UnfreezeAccountModal').then((module) => ({
    default: module.UnfreezeAccountModal,
  }))
);
const WithdrawAccountModal = lazyModal(() =>
  import('@clients/modals/WithdrawAccountModal/WithdrawAccountModal').then((module) => ({
    default: module.WithdrawAccountModal,
  }))
);

const EditUserModal = lazyModal(() =>
  import('@/features/dashboard/features/administration/modals/EditUserModal').then((module) => ({
    default: module.EditUserModal,
  }))
);

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
          <Suspense fallback={null}>
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
          </Suspense>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
