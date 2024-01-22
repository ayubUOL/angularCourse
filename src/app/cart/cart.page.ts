import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import { GlobalVariable } from '../../app/global';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  cartList: any[] = [];
  total = 0;
  actualTotal = 0;
  savings = 0;

  constructor(public global: GlobalVariable, private alertController: AlertController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.cartList = [];

    this.global.jsonData.forEach((element: any) => {
      if(element.addedToCart){
        this.cartList.push(element);
      }
    });

    if(this.cartList.length > 0){
      this.calculateCart();
    } 
  }

  openCourse(course: any){
    let navigationExtras: NavigationExtras = { 
      state: { 
        course: course
      } 
    };
    this.navCtrl.navigateForward('course', navigationExtras);
  }

  addToWishList(course: any){
    this.global.jsonData.forEach((element: any) => {
      if(course.courseId == element.courseId){
        if(course.addedToWishList){
          this.global.presentToast('Already exists in the Wish List' , 2000, 'primary');
        } else {
          course.addedToWishList = true;
          element.addedToWishList = true;
          this.global.presentToast('Course successfully added to Wish List.' , 2000, 'success');
        }
      }
    });
  }

  removeFromCart(course: any, index: any){
    this.global.jsonData.forEach((element: any) => {
      if(course.courseId == element.courseId){
        course.addedToCart = false;
        element.addedToCart = false;
        this.cartList.splice(index, 1);
        this.global.updateCartLength();
        this.calculateCart();
      }
    });
  }

  calculateCart(){
    this.total = 0;
    this.actualTotal = 0;
    this.savings = 0;

    if(this.cartList.length > 0){
      this.cartList.forEach((course: any) => {
        this.actualTotal = this.actualTotal + course.actualPrice;

        if(course.discountValue > 0){
          this.total = this.total + course.discountedPrice;
        } else {
          this.total = this.total + course.actualPrice;
        }

        this.savings = this.total - this.actualTotal;
        this.savings = Math.abs(this.savings);
      });
    } else {
      this.total = 0;
      this.actualTotal = 0;
      this.savings = 0;
    }
  }

  async checkout(){
    const alert = await this.alertController.create({
      header: "Order Successfully Placed",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            
          },
        },
        {
          text: 'Ok',
          role: 'confirm',
          handler: () => {
            this.cartList = [];
            this.global.jsonData.forEach((element: any) => {
              element.addedToCart = false;
            });
            this.global.updateCartLength();
            this.navCtrl.navigateRoot('home');
          },
        },
      ],
    });

    await alert.present();
  }
}
