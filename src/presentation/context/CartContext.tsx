import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Cart } from '../../domain/entities/Cart';
import { Phone, StorageOption } from '../../domain/entities/Phone';
import { CartStorage } from '../../infrastructure/persistence/localStorage/CartStorage';

interface CartContextType {
  cart: Cart;
  addToCart: (phone: Phone, color: string, storage: StorageOption) => void;
  removeFromCart: (phoneId: string, color: string, storage: string) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const cartStorage = new CartStorage();

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => cartStorage.loadCart());

  useEffect(() => {
    cartStorage.saveCart(cart);
  }, [cart]);

  const addToCart = (phone: Phone, color: string, storage: StorageOption) => {
    const newCart = new Cart();
    cart.getItems().forEach((item) => {
      newCart.addItem(item.phone, item.selectedColor, item.selectedStorage);
    });
    newCart.addItem(phone, color, storage);
    setCart(newCart);
  };

  const removeFromCart = (phoneId: string, color: string, storage: string) => {
    const newCart = new Cart();
    cart.getItems().forEach((item) => {
      if (
        !(
          item.phone.id === phoneId &&
          item.selectedColor === color &&
          item.selectedStorage.size === storage
        )
      ) {
        newCart.addItem(item.phone, item.selectedColor, item.selectedStorage);
      }
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart(new Cart());
    cartStorage.clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        itemCount: cart.getItemCount(),
        totalPrice: cart.getTotalPrice(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
