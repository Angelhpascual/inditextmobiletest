import { Cart, CartItem } from '../../../domain/entities/Cart';
import { Phone } from '../../../domain/entities/Phone';

const CART_STORAGE_KEY = 'inditex_cart';

export class CartStorage {
  saveCart(cart: Cart): void {
    const items = cart.getItems();
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }

  loadCart(): Cart {
    const cart = new Cart();
    const storedItems = localStorage.getItem(CART_STORAGE_KEY);

    if (storedItems) {
      const items: CartItem[] = JSON.parse(storedItems);
      items.forEach((item) => {
        cart.addItem(Phone.fromModel(item.phone), item.selectedColor, item.selectedStorage);
      });
    }

    return cart;
  }

  clearCart(): void {
    localStorage.removeItem(CART_STORAGE_KEY);
  }
}
