import { Phone, PhoneModel } from '../../domain/entities/Phone';
import { PhoneRepository } from '../../domain/repositories/PhoneRepository';
import { api } from './config';
import axios from 'axios';

interface APIPhoneResponse {
  id: string;
  brand: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl?: string;
  img_url?: string;
  image?: string;
  ram?: string;
  os?: string;
  processor?: string;
  screen?: string;
  resolution?: string;
  battery?: string;
  primaryCamera?: string[] | string;
  secondaryCamera?: string[] | string;
  dimensions?: string;
  weight?: string;
}

export class PhoneApiRepository implements PhoneRepository {
  private mapAPIResponseToPhoneModel(apiPhone: APIPhoneResponse): PhoneModel {
    if (!apiPhone || typeof apiPhone !== 'object') {
      console.error('Invalid phone data:', apiPhone);
      throw new Error('Invalid phone data received from API');
    }

    console.log('Raw API phone data:', apiPhone); // Debug log

    // Ensure all required fields are present
    const requiredFields = ['id', 'brand', 'name', 'basePrice'];
    for (const field of requiredFields) {
      if (!(field in apiPhone)) {
        console.error(`Missing field ${field} in:`, apiPhone);
        throw new Error(`Missing required field: ${field}`);
      }
    }

    // Try to find the image URL from various possible field names
    const imageUrl = apiPhone.imageUrl || apiPhone.img_url || apiPhone.image || '';

    return {
      id: apiPhone.id,
      brand: apiPhone.brand,
      model: apiPhone.name,
      price: apiPhone.basePrice,
      image: imageUrl,
      // Default values since these aren't provided by the API
      colors: ['Black', 'White'],
      storageOptions: [
        { size: '128GB', priceIncrement: 0 },
        { size: '256GB', priceIncrement: 100 },
      ],
    };
  }

  private handleApiError(error: unknown): never {
    console.error('API Error:', error);
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check API credentials.');
      }
      if (error.response?.data) {
        console.log('API Error Response:', error.response.data);
      }
      throw new Error(`API Error: ${error.response?.data?.message || error.message}`);
    }
    throw new Error('An unexpected error occurred while fetching phone data');
  }

  async getPhones(): Promise<Phone[]> {
    try {
      const response = await api.get<APIPhoneResponse[]>('/products');
      console.log('Full API Response:', response.data);

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid API response: expected an array of phones');
      }

      return response.data
        .filter((phone) => phone !== null && typeof phone === 'object')
        .map((phone) => Phone.fromModel(this.mapAPIResponseToPhoneModel(phone)));
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getPhoneById(id: string): Promise<Phone> {
    try {
      const response = await api.get<APIPhoneResponse>(`/products/${id}`);
      console.log('API Response for ID:', id, response.data);

      if (!response.data) {
        throw new Error('Phone not found');
      }
      return Phone.fromModel(this.mapAPIResponseToPhoneModel(response.data));
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async searchPhones(query: string): Promise<Phone[]> {
    try {
      const response = await api.get<APIPhoneResponse[]>('/products');
      console.log('Search API Response:', response.data);

      if (!Array.isArray(response.data)) {
        throw new Error('Invalid API response: expected an array of phones');
      }

      const searchTerm = query.toLowerCase();
      const filteredPhones = response.data
        .filter((phone) => phone !== null && typeof phone === 'object')
        .filter(
          (phone) =>
            phone.brand.toLowerCase().includes(searchTerm) ||
            phone.name.toLowerCase().includes(searchTerm)
        );

      return filteredPhones.map((phone) => Phone.fromModel(this.mapAPIResponseToPhoneModel(phone)));
    } catch (error) {
      this.handleApiError(error);
    }
  }

  async getSimilarPhones(phoneId: string): Promise<Phone[]> {
    try {
      const [phone, allPhones] = await Promise.all([this.getPhoneById(phoneId), this.getPhones()]);

      return allPhones.filter((p) => p.brand === phone.brand && p.id !== phone.id).slice(0, 4);
    } catch (error) {
      this.handleApiError(error);
    }
  }
}
