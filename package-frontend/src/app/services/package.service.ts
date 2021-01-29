import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Package } from "../models/package.model";


@Injectable({
  providedIn: 'root'
})
export class PackageService {


  private baseURL: string = "http://localhost:8090/package";

  constructor(public http: HttpClient) {

  }


  /**
   * list all the available packages
   */
  list = (): Observable<Package[]> => {
    const listURL = this.baseURL + '/list';
    return this.http.get<Package[]>(listURL).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  /**
   * get package by package id
   */
  get = (packageId: string): Observable<Package> => {
    const getURL = this.baseURL + '/get/' + packageId;
    return this.http.get<Package>(getURL).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  /**
   * delete package by package id
   */
  delete = (packageId: string): Observable<Boolean> => {
    const deleteURL = this.baseURL + '/delete/' + packageId;
    return this.http.delete<Boolean>(deleteURL).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  /**
   * create a new package
   */
  create = (pkg: Package): Observable<Package> => {
    const createURL = this.baseURL + '/create';
    return this.http.post<Package>(createURL, pkg).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

  /**
   * update an existing package
   */
  update = (pkg: Package): Observable<Package> => {
    const updateURL = this.baseURL + '/update';
    return this.http.put<Package>(updateURL, pkg).pipe(
      tap( // Log the result or error
        data => console.log(data),
        error => console.error(error)
      )
    );
  }

}
