import { Component, Inject, OnInit } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from "src/app/models/product.model";

@Component({
  selector: "app-package-dialog",
  templateUrl: "package-dialog.component.html",
  styleUrls: ['package-dialog.component.scss']

})
export class PackageDialogComponent implements OnInit {


  columns: string[] = ['no', 'name', 'price'];
  products: Product[] = [];
  dataSource = new MatTableDataSource(this.products);;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.products = data.package.products;
  }

  ngOnInit(): void {

  }

}
