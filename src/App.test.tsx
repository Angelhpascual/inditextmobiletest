import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

// Mock the page components
vi.mock('./presentation/pages/PhoneListPage/PhoneListPage', () => ({
  PhoneListPage: () => <div>Phone List Page</div>,
}));

vi.mock('./presentation/pages/PhoneDetailPage/PhoneDetailPage', () => ({
  PhoneDetailPage: () => <div>Phone Detail Page</div>,
}));

vi.mock('./presentation/pages/CartPage/CartPage', () => ({
  CartPage: () => <div>Cart Page</div>,
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (initialPath = '/') => {
  window.history.pushState({}, '', initialPath);

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('App', () => {
  it('renders phone list page at root route', () => {
    renderWithProviders('/');
    expect(screen.getByText('Phone List Page')).toBeInTheDocument();
  });

  it('renders phone detail page at /phone/:id route', () => {
    renderWithProviders('/phone/1');
    expect(screen.getByText('Phone Detail Page')).toBeInTheDocument();
  });

  it('renders cart page at /cart route', () => {
    renderWithProviders('/cart');
    expect(screen.getByText('Cart Page')).toBeInTheDocument();
  });

  it('includes header on all pages', () => {
    renderWithProviders('/');
    expect(screen.getByText('Mobile Catalog')).toBeInTheDocument();
  });
});
