import { Cart } from '../Cart';
import { Phone } from '../Phone';

describe('Cart', () => {
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

  it('should add an item to the cart', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].phone).toBe(mockPhone);
    expect(items[0].selectedColor).toBe(mockColor);
    expect(items[0].selectedStorage).toBe(mockStorage);
    expect(items[0].quantity).toBe(1);
  });

  it('should increment quantity when adding same item', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);
    cart.addItem(mockPhone, mockColor, mockStorage);

    const items = cart.getItems();
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it('should add different items separately', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, 'Black', mockStorage);
    cart.addItem(mockPhone, 'White', mockStorage);

    const items = cart.getItems();
    expect(items).toHaveLength(2);
  });

  it('should remove an item from the cart', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);
    cart.removeItem(mockPhone.id, mockColor, mockStorage.size);

    const items = cart.getItems();
    expect(items).toHaveLength(0);
  });

  it('should calculate total price correctly', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);
    cart.addItem(mockPhone, mockColor, mockStorage);

    const expectedPrice = (mockPhone.price + mockStorage.priceIncrement) * 2;
    expect(cart.getTotalPrice()).toBe(expectedPrice);
  });

  it('should calculate item count correctly', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, 'Black', mockStorage);
    cart.addItem(mockPhone, 'Black', mockStorage);
    cart.addItem(mockPhone, 'White', mockStorage);

    expect(cart.getItemCount()).toBe(3);
  });

  it('should clear all items from cart', () => {
    const cart = new Cart();
    cart.addItem(mockPhone, mockColor, mockStorage);
    cart.addItem(mockPhone, 'White', mockStorage);

    cart.clear();

    expect(cart.getItems()).toHaveLength(0);
    expect(cart.getTotalPrice()).toBe(0);
    expect(cart.getItemCount()).toBe(0);
  });
});
