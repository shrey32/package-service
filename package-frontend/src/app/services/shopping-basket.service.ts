import { EventEmitter, Injectable, Output } from "@angular/core";

import { Package } from "../models/package.model";



@Injectable({
  providedIn: 'root'
})
export class ShoppingBasketService {

  @Output() private onAdd: EventEmitter<Package> = new EventEmitter<Package>();
  private packages: Package[] = [];

  constructor() {

  }

  addPackage = (pkg: Package): void => {
    this.packages.push(pkg);
    this.onAdd.emit(pkg);
  }

  deletePackage = (pkgId: string): void => {
    let index = 0;
    for (let pkg of this.packages) {
      if (pkgId === pkg.id) {
        this.packages.splice(index, 1);
      }
      index++;
    }
    this.onAdd.emit(null);
  }

  packageListener = (): EventEmitter<Package> => {
    return this.onAdd;
  }

  getPackages = (): Package[] => {
    return this.packages;
  }

}
