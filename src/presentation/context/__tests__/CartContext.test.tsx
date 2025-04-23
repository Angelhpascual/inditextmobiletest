import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { CartProvider, useCart } from '../CartContext';
import { Phone } from '../../../domain/entities/Phone';

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

// Mock localStorage
let storage: { [key: string]: string } = {};
beforeAll(() => {
  global.Storage.prototype.setItem = vi.fn((key, value) => {
    storage[key] = value;
  });
  global.Storage.prototype.getItem = vi.fn((key) => storage[key] || null);
  global.Storage.prototype.removeItem = vi.fn((key) => {
    delete storage[key];
  });
  global.Storage.prototype.clear = vi.fn(() => {
    storage = {};
  });
});

// Test component that uses the cart context
function TestComponent() {
  const { addToCart, removeFromCart, cart, itemCount, totalPrice } = useCart();
  const storage = mockPhone.storageOptions[0];

  return (
    <div>
      <div data-testid="item-count">{itemCount}</div>
      <div data-testid="total-price">{totalPrice}</div>
      <button onClick={() => addToCart(mockPhone, 'Black', storage)} data-testid="add-button">
        Add to Cart
      </button>
      <button
        onClick={() => removeFromCart(mockPhone.id, 'Black', storage.size)}
        data-testid="remove-button"
      >
        Remove from Cart
      </button>
    </div>
  );
}

describe('CartContext', () => {
  beforeEach(() => {
    storage = {};
  });

  it('provides initial empty cart state', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('item-count')).toHaveTextContent('0');
    expect(screen.getByTestId('total-price')).toHaveTextContent('0');
  });

  it('adds items to cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-button'));

    await waitFor(() => {
      expect(screen.getByTestId('item-count')).toHaveTextContent('1');
      expect(screen.getByTestId('total-price')).toHaveTextContent('799');
    });
  });

  it('removes items from cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-button'));
    fireEvent.click(screen.getByTestId('remove-button'));

    await waitFor(() => {
      expect(screen.getByTestId('item-count')).toHaveTextContent('0');
      expect(screen.getByTestId('total-price')).toHaveTextContent('0');
    });
  });

  it('persists cart state in localStorage', async () => {
    const { unmount } = render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByTestId('add-button'));

    // Wait for state to be persisted
    await waitFor(() => {
      expect(localStorage.getItem('inditex_cart')).toBeTruthy();
    });

    unmount();

    // Re-render and check if state persists
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('item-count')).toHaveTextContent('1');
      expect(screen.getByTestId('total-price')).toHaveTextContent('799');
    });
  });
});
