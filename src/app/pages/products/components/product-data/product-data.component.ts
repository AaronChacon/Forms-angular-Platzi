import { Component, Input, Output, EventEmitter} from "@angular/core";
import { IProduct } from "../../../../product.model";
import { CartService } from '../../../../core/services/cart.service';

@Component({
    selector: 'app-product',
    templateUrl: './product-data.component.html',
    styleUrls: ['./product-data.component.scss']
})
export class ProductDataComponent {

    @Input() product: IProduct;
    @Output() productClicked: EventEmitter<any> = new EventEmitter;

    today = new Date();

    constructor(
        private cartService: CartService,
    ) {
    }

    addCard(){
        console.log('add to card');
        //this.productClicked.emit(this.product.id);
        this.cartService.addCart(this.product)
    }

}