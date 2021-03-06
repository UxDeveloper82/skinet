import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/models/pagination';
import { IBrand } from '../shared/models/brand';
import { IType } from '../shared/models/productType';
import { map } from 'rxjs/operators';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl: 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line: typedef
  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
        params = params.append('brandId', shopParams.brandId.toString());
     }

    if (shopParams.typeId !== 0) {
       params = params.append('typeId', shopParams.typeId.toString());
     }


    if(shopParams.search) {
       params = params.append('search', shopParams.search);
     }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());

    return this.http.get<IPagination>('https://localhost:5001/api/products', { observe: 'response', params })
        .pipe(
          map(response => {
            return response.body;
          })
        );
  }

  // tslint:disable-next-line: typedef
  getProduct(id: number) {
    return this.http.get<IProduct>('https://localhost:5001/api/products/' + id);
  }



  // tslint:disable-next-line: typedef
  getBrands() {
    return this.http.get<IBrand[]>('https://localhost:5001/api/products/brands');
  }

    // tslint:disable-next-line: typedef
    getTypes() {
      return this.http.get<IType[]>('https://localhost:5001/api/products/types');
    }

}
