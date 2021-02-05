import { Package } from './../../../models/package.model';
import { ProductService } from './../../../services/product.service';
import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from "src/app/models/product.model";
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: "app-package-dialog",
  templateUrl: "create-package-dialog.component.html",
  styleUrls: ['create-package-dialog.component.scss']

})
export class CreatePackageDialogComponent implements OnInit {


  columns: string[] = ['select', 'no', 'name', 'price', 'quantity'];
  products: any[] = [];
  dataSource = new MatTableDataSource(this.products);
  selection = new SelectionModel<Product>(true, []);
  exportData: any = { result: false }
  buttonLabel: string = '';
  copiedPackage: any = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public productService: ProductService) {
    if (!data.package) {
      data.package = new Package();
      data.package.mine = true;
      this.buttonLabel = 'Create & Add To Basket';
    } else {
      this.buttonLabel = 'Update & Add To Basket';
      this.copiedPackage = JSON.parse(JSON.stringify(data.package));
    }
    this.exportData = { result: true, package: data.package };
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(prods => {
      this.products = prods;
      for (let prod of this.products) {
        if (this.copiedPackage.products.length <= 0) { //create new package
          prod.quantity = 1;
          this.onSelect(prod, false);
        } else { //edit package
          const count = this.copiedPackage.products.filter(p => (prod.id === p.id)).length
          prod.quantity = count === 0 ? 1 : count;
          this.onSelect(prod, count === 0 ? false : true);
        }
      }
    });
  }

  onSelectAll = (checked: boolean): void => {
    this.products.forEach(prod => {
      this.onSelect(prod, checked);
    });
  }

  onSelect = (prod: any, checked: boolean): void => {
    prod.select = checked
  }

  getTotalPriceForSelected() {
    this.data.package.products = [];
    let total = 0;
    this.products.forEach(prod => {
      if (prod.select === true) {
        total += (prod.usdPrice * prod.quantity)
        for (let i = 0; i < prod.quantity; i++) {
          const product = new Product();
          product.id = prod.id;
          product.price = prod.usdPrice;
          product.name = prod.name;
          product.priceType = this.data.package.priceType;
          this.data.package.products.push(product);
        }
      }
    });
    this.data.package.price = total;
    return total + '';
  }

  getTotalQuantity() {
    let total = 0;
    this.products.forEach(prod => prod.select === true ? total += (prod.quantity) : 0);
    return total + '';
  }

}
