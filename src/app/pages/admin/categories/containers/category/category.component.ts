import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from '../../../../../core/models/category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: Category;

  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params.id) {
        this.getCategory(params.id);
      }
    })
  }


  createCategory(data) {
    this.categoriesService.createCategory(data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['/admin/categories']);
    });
  }

  updateCategory(data) {
    console.log(this.category._id);
    this.categoriesService.updateCategory(this.category._id, data)
    .subscribe(rta => {
      console.log(rta);
      this.router.navigate(['/admin/categories']);
    });
  }

  private getCategory(id: string){
    this.categoriesService.getCategory(id)
    .subscribe(data => {
      console.log(data);
      this.category = data;
    });
  }

}
