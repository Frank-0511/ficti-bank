import { useMutation } from '@tanstack/react-query';
import { fetchRucData } from '@/lib/services/ruc.service';
import { RucData } from '@/lib/types/ruc.types';
import { useRegistrationContext } from '../modals/RegisterClientModal/context';

export function useRucToForm() {
  const { juridicalPersonBasicForm, contactInfoForm } = useRegistrationContext();

  return useMutation<RucData, Error, string>({
    mutationFn: fetchRucData,
    onSuccess: (data) => {
      if (data.businessName) {
        juridicalPersonBasicForm.setFieldValue('businessName', data.businessName);
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
      if (data.legalRepresentatives && data.legalRepresentatives.length > 0) {
        const rep = data.legalRepresentatives[0];
        juridicalPersonBasicForm.setFieldValue('legalRepresentative', rep.name);
        juridicalPersonBasicForm.setFieldValue('representativeDni', rep.documentNumber);
      }
    },
  });
}
