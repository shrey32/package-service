import { Product } from './product.model';
export class Package {

  id: string = '';
  name: string = '';
  description: string = '';
  price: number = 0;
  products: Product[] = [];

}
