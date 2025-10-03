/**
 * Ubigeo queries - React Query hooks for ubigeo operations
 */

import { useQuery } from '@tanstack/react-query';
import { UbigeoService } from '../../../services/customer';
import { useUIStore } from '../../../store/ui.store';

// Query keys
export const ubigeoKeys = {
  all: ['ubigeo'] as const,
  departments: () => [...ubigeoKeys.all, 'departments'] as const,
  provinces: (department: string) => [...ubigeoKeys.all, 'provinces', department] as const,
  districts: (department: string, province: string) =>
    [...ubigeoKeys.all, 'districts', department, province] as const,
  detail: (code: string) => [...ubigeoKeys.all, 'detail', code] as const,
};

// Get all ubigeos
export const useUbigeos = () => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: ubigeoKeys.all,
    queryFn: async () => {
      try {
        const response = await UbigeoService.getUbigeos();
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching ubigeos';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000, // 30 minutes - ubigeo data doesn't change often
  });
};

// Get departments
export const useDepartments = () => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: ubigeoKeys.departments(),
    queryFn: async () => {
      try {
        const response = await UbigeoService.getDepartments();
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching departments';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    staleTime: 30 * 60 * 1000,
  });
};

// Get provinces by department
export const useProvinces = (department: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: ubigeoKeys.provinces(department),
    queryFn: async () => {
      try {
        const response = await UbigeoService.getProvinces(department);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching provinces';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!department,
    staleTime: 30 * 60 * 1000,
  });
};

// Get districts by department and province
export const useDistricts = (department: string, province: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: ubigeoKeys.districts(department, province),
    queryFn: async () => {
      try {
        const response = await UbigeoService.getDistricts(department, province);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching districts';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!(department && province),
    staleTime: 30 * 60 * 1000,
  });
};

// Get ubigeo by code
export const useUbigeo = (code: string) => {
  const { addNotification } = useUIStore();

  return useQuery({
    queryKey: ubigeoKeys.detail(code),
    queryFn: async () => {
      try {
        const response = await UbigeoService.getUbigeoByCode(code);
        return response;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error fetching ubigeo';
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
        });
        throw error;
      }
    },
    enabled: !!code,
    staleTime: 30 * 60 * 1000,
  });
};
