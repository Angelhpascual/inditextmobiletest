import { useQuery } from '@tanstack/react-query';
import { PhoneApiRepository } from '../../infrastructure/api/phoneApi';

const phoneRepository = new PhoneApiRepository();

export function usePhones() {
  return useQuery({
    queryKey: ['phones'],
    queryFn: () => phoneRepository.getPhones(),
  });
}

export function usePhoneDetail(id: string) {
  return useQuery({
    queryKey: ['phone', id],
    queryFn: () => phoneRepository.getPhoneById(id),
    enabled: !!id,
  });
}

export function useSearchPhones(query: string) {
  return useQuery({
    queryKey: ['phones', 'search', query],
    queryFn: () => phoneRepository.searchPhones(query),
    enabled: query.length > 0,
  });
}

export function useSimilarPhones(phoneId: string) {
  return useQuery({
    queryKey: ['phones', 'similar', phoneId],
    queryFn: () => phoneRepository.getSimilarPhones(phoneId),
    enabled: !!phoneId,
  });
}
