import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Package } from "src/app/models/package.model";
import { ShoppingBasketService } from "src/app/services/shopping-basket.service";


@Component({
  selector: 'app-shooping-basket',
  templateUrl: 'shopping-basket.component.html',
  styleUrls: ['shopping-basket.component.scss']
})
export class ShoppingBasketComponent implements OnInit {

  packages: Package[] = [];
  displayList: any[] = [];
  columns: string[] = ['no', 'name', 'price', 'quantity', 'remove']
  dataSource = new MatTableDataSource(this.displayList);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public shoppingBasketService: ShoppingBasketService) {

  }

  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.packages = this.shoppingBasketService.getPackages();
    this.createDisplay();
  }

  delete = (id: string): void => {
    this.shoppingBasketService.deletePackage(id);
    this.init();
  }

  private createDisplay = () => {
    this.displayList = [];
    const map = new Map();
    for (let pkg of this.packages) {
      if (map.has(pkg.id)) {
        map.set(pkg.id, map.get(pkg.id) + 1);
      } else {
        map.set(pkg.id, 1);
      }
    }
    let index = 1;
    for (let key of map.keys()) {
      const count = map.get(key);
      const pkg = this.packages.filter(p => p.id === key)[0];
      const basketObj = {
        id: pkg.id,
        pos: index,
        name: pkg.name,
        count: count,
        price: pkg.price
      }
      this.displayList.push(basketObj);
      index++;
    }
  }

  /**
   * 10% discount on purchasing more than 1 product
   */
  getDiscount(total: number): number {
    return (total * 10) / 100;
  }

  getTotalCost(): string {
    let total: number = 0;
    for (let obj of this.displayList) {
      total += obj.price;
    }
    let discount = 0;
    if (this.packages.length > 1) {//apply 10% discount
      discount = this.getDiscount(total);
      return "$" + total + " - $" + discount + " = " + "$" + (total - discount);
    } else {
      return "$" + total;
    }
  }

  getTotalLabel(): string {
    if (this.packages.length > 1) {
      return "Total with 10% discount";
    } else {
      return "Total"
    }
  }

  packageCountInBasket(): number {
    return this.packages.length;
  }

  checkout = (): void => {

  }


}
