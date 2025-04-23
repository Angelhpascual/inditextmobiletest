export interface PhoneModel {
  id: string;
  brand: string;
  model: string;
  price: number;
  image: string;
  colors: string[];
  storageOptions: StorageOption[];
}

export interface StorageOption {
  size: string;
  priceIncrement: number;
}

export class Phone {
  constructor(
    public readonly id: string,
    public readonly brand: string,
    public readonly model: string,
    public readonly price: number,
    public readonly image: string,
    public readonly colors: string[],
    public readonly storageOptions: StorageOption[]
  ) {}

  static fromModel(model: PhoneModel): Phone {
    return new Phone(
      model.id,
      model.brand,
      model.model,
      model.price,
      model.image,
      model.colors,
      model.storageOptions
    );
  }

  getFullPrice(storageOption: StorageOption): number {
    return this.price + storageOption.priceIncrement;
  }
}
