import { Phone, PhoneModel } from '../Phone';

describe('Phone', () => {
  const mockPhoneModel: PhoneModel = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 13',
    price: 799,
    image: 'iphone13.jpg',
    colors: ['Black', 'White', 'Blue'],
    storageOptions: [
      { size: '128GB', priceIncrement: 0 },
      { size: '256GB', priceIncrement: 100 },
      { size: '512GB', priceIncrement: 300 },
    ],
  };

  it('should create a phone instance from model', () => {
    const phone = Phone.fromModel(mockPhoneModel);

    expect(phone.id).toBe(mockPhoneModel.id);
    expect(phone.brand).toBe(mockPhoneModel.brand);
    expect(phone.model).toBe(mockPhoneModel.model);
    expect(phone.price).toBe(mockPhoneModel.price);
    expect(phone.image).toBe(mockPhoneModel.image);
    expect(phone.colors).toEqual(mockPhoneModel.colors);
    expect(phone.storageOptions).toEqual(mockPhoneModel.storageOptions);
  });

  it('should calculate full price correctly with storage option', () => {
    const phone = Phone.fromModel(mockPhoneModel);
    const storage256GB = mockPhoneModel.storageOptions[1];

    const fullPrice = phone.getFullPrice(storage256GB);

    expect(fullPrice).toBe(mockPhoneModel.price + storage256GB.priceIncrement);
  });
});
