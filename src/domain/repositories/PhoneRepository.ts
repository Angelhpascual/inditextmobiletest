import { Phone } from '../entities/Phone';

export interface PhoneRepository {
  getPhones(page?: number, limit?: number): Promise<Phone[]>;
  getPhoneById(id: string): Promise<Phone>;
  searchPhones(query: string): Promise<Phone[]>;
  getSimilarPhones(phoneId: string): Promise<Phone[]>;
}
