import { Phone, StorageOption } from './Phone';

export interface CartItem {
  phone: Phone;
  selectedColor: string;
  selectedStorage: StorageOption;
  quantity: number;
}

export class Cart {
  private items: CartItem[] = [];

  addItem(phone: Phone, color: string, storage: StorageOption): void {
    const existingItem = this.items.find(
      (item) =>
        item.phone.id === phone.id &&
        item.selectedColor === color &&
        item.selectedStorage.size === storage.size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        phone,
        selectedColor: color,
        selectedStorage: storage,
        quantity: 1,
      });
    }
  }

  removeItem(phoneId: string, color: string, storage: string): void {
    this.items = this.items.filter(
      (item) =>
        !(
          item.phone.id === phoneId &&
          item.selectedColor === color &&
          item.selectedStorage.size === storage
        )
    );
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      return total + item.phone.getFullPrice(item.selectedStorage) * item.quantity;
    }, 0);
  }

  getItemCount(): number {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  clear(): void {
    this.items = [];
  }
}
