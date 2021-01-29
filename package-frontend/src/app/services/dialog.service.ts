import { ActionDialogComponent } from './../components/dialog/action/action-dialog.component';

import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../components/dialog/alert/alert-dialog.component';
import { Package } from '../models/package.model';
import { PackageDialogComponent } from '../components/dialog/edit/package-dialog.component';

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

  packageDialog = (pkg: Package, title: string, packageEmitter?: EventEmitter<any>) => {
    const config: any = { title: title, package: pkg };
    const dialogRef = this.dialog.open(PackageDialogComponent, { data: config });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true && packageEmitter)
        packageEmitter.emit(null);
    });
  }


}
