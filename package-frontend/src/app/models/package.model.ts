import { PriceType } from './../enum/pricetype.enum';
import { Product } from './product.model';
export class Package {

  id: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  products: Product[] = [];
  mine:boolean = false;
  priceType: PriceType = PriceType.USD;
}
