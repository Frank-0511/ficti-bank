import { createContext, useContext, type ReactNode } from 'react';
import { useRegistration, type UseRegistrationReturn } from '../hooks';

const RegistrationContext = createContext<UseRegistrationReturn | undefined>(undefined);

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const registrationHook = useRegistration();

  return (
    <RegistrationContext.Provider value={registrationHook}>{children}</RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error('useRegistrationContext must be used within a RegistrationProvider');
  }
  return context;
};
