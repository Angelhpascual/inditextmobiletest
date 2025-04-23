import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from '../ProductCard';
import { Phone } from '../../../../../domain/entities/Phone';

describe('ProductCard', () => {
  const mockPhone = new Phone(
    '1',
    'Apple',
    'iPhone 13',
    799,
    'iphone13.jpg',
    ['Black', 'White'],
    [
      { size: '128GB', priceIncrement: 0 },
      { size: '256GB', priceIncrement: 100 },
    ]
  );

  it('renders phone information correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard phone={mockPhone} />
      </MemoryRouter>
    );

    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('iPhone 13')).toBeInTheDocument();
    expect(screen.getByText('€799.00')).toBeInTheDocument();
    expect(screen.getByAltText('Apple iPhone 13')).toHaveAttribute('src', 'iphone13.jpg');
  });

  it('links to the correct detail page', () => {
    render(
      <MemoryRouter>
        <ProductCard phone={mockPhone} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/phone/1');
  });
});
