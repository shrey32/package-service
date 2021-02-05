import { ActionDialogComponent } from './../components/dialog/action/action-dialog.component';

import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialog/alert/alert-dialog.component';
import { Package } from '../models/package.model';
import { PackageDialogComponent } from '../components/dialog/info/package-dialog.component';
import { ShoppingBasketComponent } from '../components/dialog/shopping-basket/shopping-basket.component';
import { CreatePackageDialogComponent } from '../components/dialog/create/create-package-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }

  alertDialog = (title: string, message: string) => {
    const config: any = { title: title, message: message };
    this.dialog.open(AlertDialogComponent, { data: config });
  }

  actionDialog = (title: string, message: string, deleteEmitter: EventEmitter<any>) => {
    const config: any = { title: title, message: message };
    const dialogRef = this.dialog.open(ActionDialogComponent, { data: config });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true)
        deleteEmitter.emit(null);
    });
  }

  /**
   *
   */
  packageDialog = (title: string, pkg: Package, packageEmitter?: EventEmitter<Package>) => {
    const config: any = { title: title, package: pkg };
    const dialogRef = this.dialog.open(PackageDialogComponent, { width: '40%', data: config });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true && packageEmitter)
        packageEmitter.emit(null);
    });
  }

  /**
   *
   */
  createPackageDialog = (title: string, pkg?: Package, createEmitter?: EventEmitter<Package>) => {
    const config: any = { title: title, package: pkg };
    const dialogRef = this.dialog.open(CreatePackageDialogComponent, { width: '40%', data: config });
    dialogRef.afterClosed().subscribe(data => {
      if (data.result === true && createEmitter)
        createEmitter.emit(data.package);
    });

  }

  shoppingBasketView = () => {
    this.dialog.open(ShoppingBasketComponent, { width: '60%' });
  }

}
