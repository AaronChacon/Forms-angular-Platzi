import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';

const url_admin = environment.url_api_admin;

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategories(){
    return this.http.get<Category[]>(`${url_admin}/categories/`);
  }
  
  getCategory(id: string){
    return this.http.get<Category>(`${url_admin}/categories/${id}`);
  }

  createCategory(data: Partial<Category>){
    return this.http.post<Category[]>(`${url_admin}/categories/`, data);
  }
  
  updateCategory(id: string, data: Partial<Category>){
    return this.http.put<Category[]>(`${url_admin}/categories/${id}`, data);
  }

  checkCategory(name: string){
    return this.http.post(`${url_admin}/categories/availability`, {name});
  }


}
