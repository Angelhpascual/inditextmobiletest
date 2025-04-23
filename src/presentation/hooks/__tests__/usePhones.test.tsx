import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { usePhones, usePhoneDetail, useSearchPhones } from '../usePhones';

// Mock the PhoneApiRepository
vi.mock('../../../infrastructure/api/phoneApi', () => ({
  PhoneApiRepository: vi.fn(() => ({
    getPhones: vi.fn().mockResolvedValue([
      {
        id: '1',
        brand: 'Apple',
        model: 'iPhone 13',
        price: 799,
        image: 'iphone13.jpg',
        colors: ['Black', 'White'],
        storageOptions: [
          { size: '128GB', priceIncrement: 0 },
          { size: '256GB', priceIncrement: 100 },
        ],
      },
    ]),
    getPhoneById: vi.fn().mockResolvedValue({
      id: '1',
      brand: 'Apple',
      model: 'iPhone 13',
      price: 799,
      image: 'iphone13.jpg',
      colors: ['Black', 'White'],
      storageOptions: [
        { size: '128GB', priceIncrement: 0 },
        { size: '256GB', priceIncrement: 100 },
      ],
    }),
    searchPhones: vi.fn().mockResolvedValue([
      {
        id: '1',
        brand: 'Apple',
        model: 'iPhone 13',
        price: 799,
        image: 'iphone13.jpg',
        colors: ['Black', 'White'],
        storageOptions: [
          { size: '128GB', priceIncrement: 0 },
          { size: '256GB', priceIncrement: 100 },
        ],
      },
    ]),
  })),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('Phone Hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('usePhones', () => {
    it('fetches phones successfully', async () => {
      const { result } = renderHook(() => usePhones(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].brand).toBe('Apple');
    });
  });

  describe('usePhoneDetail', () => {
    it('fetches phone detail successfully', async () => {
      const { result } = renderHook(() => usePhoneDetail('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data?.id).toBe('1');
      expect(result.current.data?.brand).toBe('Apple');
    });
  });

  describe('useSearchPhones', () => {
    it('searches phones successfully', async () => {
      const { result } = renderHook(() => useSearchPhones('iPhone'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toHaveLength(1);
      expect(result.current.data?.[0].model).toBe('iPhone 13');
    });

    it('does not fetch when query is empty', () => {
      const { result } = renderHook(() => useSearchPhones(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.data).toBeUndefined();
    });
  });
});
