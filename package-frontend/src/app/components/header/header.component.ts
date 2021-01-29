import { Package } from './../../models/package.model';
import { ShoppingBasketService } from './../../services/shopping-basket.service';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {

  title: string = 'Jagex Package Service'
  logo: string = '../../assets/app-logo.jpg'
  packageCountInBasket: number = 0;

  constructor(public shoppingBasketService: ShoppingBasketService) {

  }

  ngOnInit(): void {
    this.shoppingBasketService.packageListener().subscribe((pkg: Package) => {
      this.packageCountInBasket = this.shoppingBasketService.getPackages().length;
    });
  }
}
