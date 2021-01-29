import { ShoppingBasketService } from './../../services/shopping-basket.service';
import { ActionListener } from './../../models/action.listener';
import { DialogService } from './../../services/dialog.service';
import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Package } from "src/app/models/package.model";
import { PackageService } from "src/app/services/package.service";

@Component({
  selector: 'app-package-list',
  templateUrl: 'package-list.component.html',
  styleUrls: ['package-list.component.scss']
})
export class PackageListComponent implements OnInit, AfterViewInit {

  packages: Package[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'details', 'add'];
  dataSource = new MatTableDataSource(this.packages);

  @ViewChild(MatSort) sort: MatSort;

  constructor(public shoppingBasketService: ShoppingBasketService, public packageService: PackageService, public dialogService: DialogService) {

  }

  ngOnInit(): void {
    this.fetchList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  fetchList() {
    this.packageService.list().subscribe((packages: Package[]) => {
      this.packages = packages;
    });
  }

  delete(pkg: Package) {
    let deleteEmitter: EventEmitter<any> = new EventEmitter<any>();
    deleteEmitter.subscribe(data => {
      this.packageService.delete(pkg.id).subscribe((deleted: Boolean) => {
        if (deleted) {
          this.fetchList();
          this.dialogService.alertDialog("Success", "Package Deleted Successfully");
        } else {
          this.dialogService.alertDialog("Error", "Error occurred on deletion");
        }
      });
    });
    this.dialogService.actionDialog("Action", "Do you really want to delete this " + pkg.name + "?", deleteEmitter);
  }

  addToBasket(pkg: Package) {
    this.shoppingBasketService.addPackage(pkg);
  }

  details(pkg: Package) {
    this.dialogService.packageDialog(pkg, "Details");
  }

}
