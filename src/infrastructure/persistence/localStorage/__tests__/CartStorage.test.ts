import { CartStorage } from '../CartStorage';
import { Cart } from '../../../../domain/entities/Cart';
import { Phone } from '../../../../domain/entities/Phone';

describe('CartStorage', () => {
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

  const mockStorage = { size: '256GB', priceIncrement: 100 };
  const mockColor = 'Black';
  let storage: { [key: string]: string } = {};

  // Mock localStorage
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

  beforeEach(() => {
    storage = {};
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should save cart to localStorage', () => {
    const cartStorage = new CartStorage();
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);

    cartStorage.saveCart(cart);

    const storedData = localStorage.getItem('inditex_cart');
    expect(storedData).toBeTruthy();

    const parsedData = JSON.parse(storedData!);
    expect(parsedData).toHaveLength(1);
    expect(parsedData[0].phone.id).toBe(mockPhone.id);
    expect(parsedData[0].selectedColor).toBe(mockColor);
    expect(parsedData[0].selectedStorage.size).toBe(mockStorage.size);
  });

  it('should load cart from localStorage', () => {
    const cartStorage = new CartStorage();
    const originalCart = new Cart();
    originalCart.addItem(mockPhone, mockColor, mockStorage);

    // Save and then load
    cartStorage.saveCart(originalCart);
    const loadedCart = cartStorage.loadCart();

    const items = loadedCart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].phone.id).toBe(mockPhone.id);
    expect(items[0].selectedColor).toBe(mockColor);
    expect(items[0].selectedStorage.size).toBe(mockStorage.size);
  });

  it('should return empty cart when localStorage is empty', () => {
    localStorage.clear(); // Make extra sure localStorage is empty
    const cartStorage = new CartStorage();
    const loadedCart = cartStorage.loadCart();

    expect(loadedCart.getItems()).toHaveLength(0);
  });

  it('should clear cart from localStorage', () => {
    const cartStorage = new CartStorage();
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);

    cartStorage.saveCart(cart);
    cartStorage.clearCart();

    const storedData = localStorage.getItem('inditex_cart');
    expect(storedData).toBeNull();
  });
});
