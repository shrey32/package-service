import { ProductService } from './../../../services/product.service';
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Package } from "src/app/models/package.model";
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public productService: ProductService) {
    if (!data.package) {
      data.package = new Package();
      data.package.mine = true;
    } else {
      this.products = data.package.products;
    }
    this.exportData = { result: true, package: data.package };
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.products.forEach(prod => prod.quantity = 1);
      this.onChange(false);
    });
  }

  onChange = (checked: boolean): void => {
    this.products.forEach(prod => {
      prod.select = checked;
    });
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
          product.name = this.data.package.priceType;
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
