import { PriceType } from './../enum/pricetype.enum';
export class Product {

  id: string = '';
  name: string = '';
  price: number = 0;
  priceType: PriceType = PriceType.USD;

}
