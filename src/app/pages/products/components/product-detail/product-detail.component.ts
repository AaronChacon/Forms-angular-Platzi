import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../../../core/services/products.service';
import { IProduct } from '../../../../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;


  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params) => {
      const id = params.id;
      this.fetchProduct(id);
    });
  }

  fetchProduct(id: string) {
    this.productsService.getProduct(id)
    .subscribe((product: IProduct) => {
      this.product = product
    });
  }

  createProduct() {

    const newProduct: IProduct = {
      id: '100',
      title: 'TWISTER-EDGE-X',
      image: 'assets/image/TWISTER-EDGE-X-RB.webp',
      price: 329.99,
      description: 'LoremIpsum'
    }

    this.productsService.createProduct(newProduct)
    .subscribe((product: IProduct) => {
      console.log(product);
    });
  }

  updateProduct() {

    const newProduct: Partial<IProduct> = {
      title: 'TWISTER-EDGE-X',
      image: 'assets/image/TWISTER-EDGE-X-RB.webp',
      price: 329.99,
      description: 'LoremIpsum'
    }

    this.productsService.updateProduct('1', newProduct)
    .subscribe((product: IProduct) => {
      console.log(product);
    });

  }

  deleteProduct(id: string){
    this.productsService.deleteProduct(id)
    .subscribe((product: IProduct) => {
      console.log(product);
    });
  }

}
