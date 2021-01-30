import { Observable } from 'rxjs';
import { PriceType } from './../enum/pricetype.enum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyExchangeService {


  constructor(public http: HttpClient) {

  }

  getExchangeRatesFor(priceType: PriceType): Observable<any> {
    const url = "https://api.exchangeratesapi.io/latest?base=" + priceType;
    return this.http.get<any>(url).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

}
