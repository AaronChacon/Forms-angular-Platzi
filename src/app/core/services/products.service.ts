import { Injectable } from '@angular/core';
import { IProduct } from 'src/app/product.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  /* products: IProduct[] = [
    {
      id: '1',
      image: 'assets/image/TWISTER-EDGE-X-RB.webp',
      title: 'TWISTER EDGE X - ROLLERBLADE',
      price: 279.99,
      description: `Twister Edge X is an extremely versatile and durable urban skate. A new, anatomical Transfer footbed provides superior support with extra cushioning and shock-absorbing padding in the heel. The V-cut liner ensures breathability for comfort while molded boots, including an Anti-torsion Box, create an ideal fit. Aluminum plates and lateral sliders are built-in with torsional 243mm frame rigidity, adding power transfer and control. 80mm Hydrogen wheels paired with ILQ-9 Classic Plus bearings provide excellent grip and speed. The secure closure system includes 45 degree micro-buckles and lacing; brake is included. Team riders helped design this skate for a superior combination of premium fit, optimal support and advanced maneuverability.`
    },
    {
      id: '2',
      image: 'assets/image/RB-PRO-X-RB.webp',
      title: 'RB PRO X - ROLLERBLADE',
      price: 199.99,
      description: `RB Pro X is designed for molded-boot comfort in all skating environments. A new, anatomical and sublimated liner paired with added top eyelets and a training footbed create ideal support. The 45° dual-buckle/lace secure closure system provides optimal fit. A 243mm/9.6” extruded frame with lateral sliders, 80mm/85A Supreme Urban wheels and Twincam ILQ-7 Plus bearings wheels provide control, stability and speed; brake is standard. RB Pro X is an ultra-responsive and versatile Urban skate.`
    },
    {
      id: '3',
      image: 'assets/image/MAXXUM-EDGE-125-3WD-RB.webp',
      title: 'MAXXUM EDGE 125 3WD - ROLLERBLADE',
      price: 359.99,
      description: `Maxxum Edge 125 3WD is the pinnacle of versatility for molded skates. Appealing to racers while maintaining the lateral support typically found in the urban category, the molded and vented boot creates advanced comfort. An extruded aluminum frame, micro-buckle closures, premium mesh liner with anatomical padding and 125mm Hydrogen wheels paired with Twincam ILQ-7 bearings provide professional performance and secure fit; an optional brake is included. Popular with Rollerblade's “Skate to Ski” program which educates athletes about the benefits of using inline skates during the off season, Maxxum Edge 125 3WD is a phenomenal skate`
    },
    {
      id: '4',
      image: 'assets/image/NEXT-GRAY-100-PS.webp',
      title: 'NEXT GREY 100 - POWERSLIDE',
      price: 229.99,
      description: `The Powerslide NEXT Grey 100 is a skate for women who are not afraid of heat up the asphalt. An urban skate loaded with Powerslide's latest innovations to boost your performance and improve your comfort. The grey and purple pastel color combination offers a touch of elegance while the heat moldable MYFIT Recall dual fit liner feat. memory foam padding provides that extra bit of superior comfort for the everyday skate session. This freeskate comes with a lot of sleek features as standard like the advanced TRINITY mounting system just to name one. Perfect power transfer, more control and improved balance, superior vibration control - this is all TRINITY! The setup is made for easy cruising as well as for thrilling action - the Elite casted aluminum frame with its unique shape combined with fast and grippy Spinner 100mm/88A wheels and high smooth running Wicked ABEC 9 bearings perfectly match to deliver unmatched skating pleasure. The NEXT Grey 100 proves that true style doesn't scream for attention.`
    },
    {
      id: '5',
      image: 'assets/image/NEXT-PRO-BLACK-110-PS.webp',
      title: 'NEXT PRO BLACK 110 - POWERSLIDE',
      price: 279.99,
      description: `Next skates have been THE shooting stars in 2018 world wide. With the Next Pro Black 110 Powerslide introduces a new skate high light. The skate scores high with an unmatched mix of performance, comfort and custom options. The heat moldable MYFIT SPC Dual Fit liner offers great comfort and performance. The MYFIT SPC material is a ?super-foam?, casted polyurethane that will never break down and keeps all its features for years. SPC super-foam absorbs shocks, gives extra cushioning, controls impact and is really comfortable while providing maximum and direct power transfer. The boot offers plenty of unique custom options. Adjusted the cuff height or cant the cuff, get more forward flex by cutting the wings of the shell, adjust the length of your cuff wing if needed or check out one of several lacing options to either get more flex and more support when skating. The Brand new super light Ego SL 243mm extruded and CNC machined frame is the perfect base for a fast and easy skating experience. Undercover 110mm / 86A wheels and Wicked SKF bearings deliver ultimate speed and grip. The Next Pro Black 110 is hot - you need to be fast to get your pair.`
    },
    {
      id: '6',
      image: 'assets/image/TWISTER-EDGE-W-RB.webp',
      title: 'TWISTER EDGE W - ROLLERBLADE',
      price: 249.99,
      description: `Twister Edge is a highly-versatile and durable urban skate created for women. A new, anatomical Transfer footbed provides superior support with extra cushioning and shock-absorbing padding in the heel. The V-cut liner ensures breathability for comfort while molded boots, including an Anti-torsion Box, create an ideal fit. Aluminum plates and lateral sliders are built-in with torsional 243mm frame rigidity, adding power transfer and control. 80mm Supreme wheels paired with ILQ-7 Plus bearings provide excellent grip and speed. The secure closure system includes 45° micro-buckles and lacing; brake is included. Twister Edge is an excellent combination of premium fit, optimal support and advanced maneuverability for every urban skater.`
    }
  ] */

  products: IProduct[] = []

  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts() {
    return this.http.get<IProduct[]>(`${environment.url_api}/products`);
  }

  getProduct(id: string) {
    /* return this.products.find(item => id === item.id) */
    return this.http.get<IProduct>(`${environment.url_api}/products/${id}`);
  }

  createProduct(product: IProduct){
    return this.http.post(`${environment.url_api}/products`, product)
  }

  updateProduct(id: string, changes: Partial<IProduct>) {
    return this.http.put(`${environment.url_api}/products/${id}`, changes)
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/products/${id}`);
  }

}
