import { useMutation } from '@tanstack/react-query';
import { fetchDniData } from '@/lib/services/dni.service';
import { DniData } from '@/lib/types/dni.types';
import { useRegistrationContext } from '../modals/RegisterClientModal/context/RegistrationContext';

export function useDniToForm() {
  const { naturalPersonBasicForm, contactInfoForm } = useRegistrationContext();

  return useMutation<DniData, Error, string>({
    mutationFn: fetchDniData,
    onSuccess: (data) => {
      // Setear datos en ambos formularios
      naturalPersonBasicForm.reset();
      contactInfoForm.reset();

      if (data.firstName) {
        naturalPersonBasicForm.setFieldValue('firstName', data.firstName);
      }
      if (data.lastName) {
        naturalPersonBasicForm.setFieldValue('lastName', data.lastName);
      }
      if (data.birthDate) {
        naturalPersonBasicForm.setFieldValue('birthDate', data.birthDate);
      }
      if (data.dni) {
        naturalPersonBasicForm.setFieldValue('dni', data.dni);
      }
      if (data.address) {
        contactInfoForm.setFieldValue('address', data.address);
      }
      if (data.department) {
        contactInfoForm.setFieldValue('department', data.department.toLowerCase());
      }
      if (data.province) {
        contactInfoForm.setFieldValue('province', data.province.toLowerCase());
      }
      if (data.district) {
        contactInfoForm.setFieldValue('district', data.district.toLowerCase().replace(/ /g, '-'));
      }
    },
  });
}
