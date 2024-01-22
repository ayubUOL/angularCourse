import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { GlobalVariable } from '../../app/global';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {
  wishlist: any[] = [];

  constructor(public global: GlobalVariable, public navCtrl: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.wishlist = [];

    this.global.jsonData.forEach((element: any) => {
      if(element.addedToWishList){
        this.wishlist.push(element);
      }
    });
  }

  openCourse(course: any){
    let navigationExtras: NavigationExtras = { 
      state: { 
        course: course
      } 
    };
    this.navCtrl.navigateForward('course', navigationExtras);
  }

  addToCart(course: any){
    this.global.jsonData.forEach((element: any) => {
      if(course.courseId == element.courseId){
        if(course.addedToCart){
          this.global.presentToast('Already exists in the cart' , 2000, 'primary');
        } else {
          course.addedToCart = true;
          element.addedToCart = true;
          this.global.presentToast('Course successfully added in the cart.' , 2000, 'success');
          this.global.updateCartLength();
        }
      }
    });
  }

  removeFromWishList(course: any, index: any){
    this.global.jsonData.forEach((element: any) => {
      if(course.courseId == element.courseId){
        course.addedToWishList = false;
        element.addedToWishList = false;
        this.wishlist.splice(index, 1)
      }
    });
  }
}
