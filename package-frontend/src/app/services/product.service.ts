import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseURL = "https://product-service.herokuapp.com/api/v1/products";

  constructor(public http: HttpClient) { }


  getProducts = (): Observable<Product[]> => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa('user:pass')
      })
    };
    return this.http.get<Product[]>(this.baseURL, httpOptions).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

}
