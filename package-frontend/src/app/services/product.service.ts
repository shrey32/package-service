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
    const headers: HttpHeaders = new HttpHeaders();
    headers.append("username", "user");
    headers.append("Authorization", "Basic dXNlcjpwYXNz");
    return this.http.get<Product[]>(this.baseURL, { headers: headers }).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

}
