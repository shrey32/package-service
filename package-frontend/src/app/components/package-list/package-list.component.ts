import { PriceType } from './../../enum/pricetype.enum';
import { ShoppingBasketService } from './../../services/shopping-basket.service';
import { ActionListener } from './../../models/action.listener';
import { DialogService } from './../../services/dialog.service';
import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Package } from "src/app/models/package.model";
import { PackageService } from "src/app/services/package.service";
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-package-list',
  templateUrl: 'package-list.component.html',
  styleUrls: ['package-list.component.scss']
})
export class PackageListComponent implements OnInit, AfterViewInit {

  packages: Package[] = [];
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'details', 'add'];
  dataSource = new MatTableDataSource(this.packages);
  currencyList: PriceType[] = [PriceType.USD, PriceType.EUR, PriceType.GBP];
  selectedCurrencyType = PriceType.USD;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public shoppingBasketService: ShoppingBasketService, public packageService: PackageService, public dialogService: DialogService, public currencyExhangeService: CurrencyExchangeService) {

  }

  ngOnInit(): void {
    this.fetchList();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    let filtered = this.packages;
    if (filterValue.trim() !== '') {
      filtered = this.packages.filter(p => p.name === filterValue || p.description === filterValue || p.price + '' === filterValue);
    }
    if (filtered.length > 0)
      this.dataSource.filteredData = filtered;
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

  /**
   *
   */
  addToBasket(pkg: Package) {
    this.shoppingBasketService.addPackage(pkg);
  }

  /**
   *
   */
  details(pkg: Package) {
    let packageEmitter: EventEmitter<Package> = new EventEmitter<Package>();
    this.dialogService.packageDialog('Package Info', pkg, packageEmitter);
    packageEmitter.subscribe((pg: Package) => {
      this.addToBasket(pkg);
    });
  }

  onCurrencyChange = (): void => {
    this.currencyExhangeService.getExchangeRatesFor(this.selectedCurrencyType).subscribe((obj: any) => {
      for (let pkg of this.packages) {
        if (!pkg.priceType)
          pkg.priceType = PriceType.USD;
        const rate: number = obj.rates[pkg.priceType];
        let total: number = 0;
        for (let prod of pkg.products) {
          prod.price = parseFloat((prod.price / rate).toPrecision(2));
          prod.priceType = this.selectedCurrencyType;
          total += prod.price;
        }
        pkg.price = parseFloat(total.toPrecision(2));
        pkg.priceType = this.selectedCurrencyType;
      }
    });
  }

}
