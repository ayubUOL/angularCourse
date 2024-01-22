import { Component } from '@angular/core';

import { GlobalVariable } from '../app/global';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  url: string = '/assets/data.json';

  constructor(public global: GlobalVariable) {
    fetch(this.url).then(res => res.json())
    .then(json => {
      this.global.jsonData = json;
      console.log("Json Data -> ", this.global.jsonData)
      this.global.jsonData.forEach((element: any) => {
        element.addedToCart = false;
        element.addedToWishList = false;

        // Discount Calculation
        if(element.discountValue > 0){
          let discountAmount = (element.actualPrice * element.discountValue) / 100;
          element.discountedPrice = Number(element.actualPrice - discountAmount).toFixed(2);;
          element.discountedPrice = Number(element.discountedPrice);
        } else {
          element.discountedPrice = 0;
        }
      });
    });
  }


}
