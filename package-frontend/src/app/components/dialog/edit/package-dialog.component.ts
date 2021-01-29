import { ProductService } from './../../../services/product.service';
import { Product } from './../../../models/product.model';
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: "app-package-dialog",
  templateUrl: "package-dialog.component.html",
  styleUrls: ['package-dialog.component.scss']

})
export class PackageDialogComponent implements OnInit {


  private products: Product[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public productService: ProductService) {

  }

  ngOnInit(): void {
    if (this.data === null) {

    }
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

}
