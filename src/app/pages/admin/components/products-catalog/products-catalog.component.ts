import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/product.model';
import { ProductsService } from '../../../../core/services/products.service';


@Component({
  selector: 'app-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.scss']
})
export class ProductsCatalogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'image', 'title', 'price', 'actions'];
  dataSource: IProduct[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productsService.getAllProducts()
        .subscribe((products: IProduct[]) => {
          console.log(products);
          this.dataSource = products
        });
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id)
        .subscribe((resp: IProduct[]) => {
          console.log(resp);
          /* this.getProducts(); */
          if (resp) {
            const index = this.dataSource.findIndex((product) => {product.id ===  id});
            this.dataSource.splice(index, 1);
            this.dataSource = [...this.dataSource];
          }
        })
  }

}
