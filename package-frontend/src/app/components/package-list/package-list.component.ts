import { PriceType } from './../../enum/pricetype.enum';
import { ShoppingBasketService } from './../../services/shopping-basket.service';
import { DialogService } from './../../services/dialog.service';
import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Package } from "src/app/models/package.model";
import { PackageService } from "src/app/services/package.service";
import { CurrencyExchangeService } from 'src/app/services/currency-exchange.service';

@Component({
  selector: 'app-package-list',
  templateUrl: 'package-list.component.html',
  styleUrls: ['package-list.component.scss']
})
export class PackageListComponent implements OnInit, AfterViewInit {

  packages: Package[] = [];
  dataSource;
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'details', 'edit', 'delete', 'add'];
  currencyList: PriceType[] = [PriceType.USD, PriceType.EUR, PriceType.GBP];
  selectedCurrencyType = PriceType.USD;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public shoppingBasketService: ShoppingBasketService, public packageService: PackageService, public dialogService: DialogService, public currencyExhangeService: CurrencyExchangeService) {

  }

  ngOnInit(): void {
    this.fetchList();
    this.dataSource = new MatTableDataSource(this.packages);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchList() {
    this.packageService.list().subscribe((packages: Package[]) => {
      this.packages = packages;
    });
  }

  /**
   *
   */
  createCustomPackage = (): void => {
    const createEmitter: EventEmitter<any> = new EventEmitter<any>();
    createEmitter.subscribe((pkg: Package) => {
      this.packageService.create(pkg).subscribe((p: any) => {
        this.dialogService.alertDialog('Success', 'Package Created and Added to the Basket.');
        this.packages.push(p.pkg);
        this.addToBasket(p.pkg);
        this.dataSource = new MatTableDataSource(this.packages);
      }, error => {
        this.dialogService.alertDialog('Error while creating Package', error);
      });
    });
    this.dialogService.createPackageDialog('Create Custom Package', null, createEmitter);
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

  edit(pkg: Package) {
    const editEmitter: EventEmitter<any> = new EventEmitter<any>();
    editEmitter.subscribe((updatedPkg: Package) => {
      if (JSON.stringify(pkg) == JSON.stringify(updatedPkg)) {
        this.addToBasket(updatedPkg);
        return;
      }
      this.packageService.update(pkg).subscribe((p: any) => {
        this.dialogService.alertDialog('Success', 'Package Updated and Added to the Basket.');
        this.packages.push(p.pkg);
        this.addToBasket(p.pkg);
        this.dataSource = new MatTableDataSource(this.packages);
      }, error => {
        this.dialogService.alertDialog('Error while updating Package', error);
      });
    });
    this.dialogService.createPackageDialog('Edit Package', pkg, editEmitter);
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
          prod.price = prod.price / rate;
          prod.priceType = this.selectedCurrencyType;
          total += prod.price;
        }
        pkg.price = total;
        pkg.priceType = this.selectedCurrencyType;
      }
    });
  }

}
