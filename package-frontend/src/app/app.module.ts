import { ActionDialogComponent } from './components/dialog/action/action-dialog.component';
import { AlertDialogComponent } from './components/dialog/alert/alert-dialog.component';
import { DialogService } from './services/dialog.service';
import { ShoppingBasketService } from './services/shopping-basket.service';
import { AngularMaterialModule } from './angular-material.module';
import { PackageListComponent } from './components/package-list/package-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PackageService } from './services/package.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PackageListComponent,
    AlertDialogComponent,
    ActionDialogComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [ShoppingBasketService, PackageService, DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
