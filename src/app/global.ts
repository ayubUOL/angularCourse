import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable()
export class GlobalVariable {
    jsonData: any;
    cartCount = 0;

    constructor(public toastCtrl: ToastController) { }

    async presentToast(msg: any, duration = 1500, color = 'primary') {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: duration,
            color: color,
            cssClass: 'globalToastCss'
        });
        toast.present();
    }

    updateCartLength(){
        this.cartCount = 0;
        this.jsonData.forEach((element: any) => {
            if(element.addedToCart){
                this.cartCount++;
            }
        });
    }
}