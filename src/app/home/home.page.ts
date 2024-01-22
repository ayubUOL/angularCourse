import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';

import { GlobalVariable } from '../../app/global';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  pageIndex: number = 1;

  search_keyword: any = '';
  searchedCourses: any[] = [];

  constructor(public global: GlobalVariable, public navCtrl: NavController) {}

  openCourse(course: any){
    let navigationExtras: NavigationExtras = { 
      state: { 
        course: course
      } 
    };
    this.navCtrl.navigateForward('course', navigationExtras);
  }

  addToCart(course: any){
    if(course.addedToCart){
      this.global.presentToast('Already exists in the cart' , 2000, 'primary');
    } else {
      course.addedToCart = true;
      this.global.presentToast('Course successfully added in the cart.' , 2000, 'success');
      this.global.updateCartLength();
    }
  }

  addToWishList(course: any){
    if(course.addedToWishList){
      this.global.presentToast('Already exists in the Wish List' , 2000, 'primary');
    } else {
      course.addedToWishList = true;
      this.global.presentToast('Course successfully added to Wish List.' , 2000, 'success');
    }
  }

  closeSearch() {
    this.search_keyword = '';
    this.searchedCourses = [];
  }

  clearSearchInput(){
    this.search_keyword = '';
    this.searchedCourses = [];
  }

  searchFn(){
    this.searchedCourses = [];

    let val = this.search_keyword;
    val = val.toLowerCase();

    if (val) {
      if (val && val.trim() != '') {
        this.global.jsonData.forEach((course: any) => {
          let title = String(course.courseName.toLowerCase());
          if (title.includes(val)) {
            this.searchedCourses.push(course);
          }
        });

        this.global.jsonData.forEach((course: any) => {
          let author = String(course.author.toLowerCase());
          if (author.includes(val)) {
            this.searchedCourses.push(course);
          }
        });

        this.global.jsonData.forEach((course: any) => {
          course.tags.filter((element: any) => {
            let tag = String(element.toLowerCase());
            if (tag.includes(val)) {
              this.searchedCourses.push(course);
            }
          });
        });
      } else {
        
      }
    } else {
      
    }
  }

  handleSort(e: any) {
    if(this.search_keyword){
      if(e.detail.value == 'lowToHigh'){
        // Low to High
        this.searchedCourses = this.searchedCourses.slice().sort((a: any, b: any) => a.actualPrice - b.actualPrice);
      }
      if(e.detail.value == 'highToLow'){
        // High to low
        this.searchedCourses = this.searchedCourses.slice().sort((a: any, b: any) => b.actualPrice - a.actualPrice);
      }
    } else {
      if(e.detail.value == 'lowToHigh'){
        // Low to High
        this.global.jsonData = this.global.jsonData.slice().sort((a: any, b: any) => a.actualPrice - b.actualPrice);
      }
      if(e.detail.value == 'highToLow'){
        // High to low
        this.global.jsonData = this.global.jsonData.slice().sort((a: any, b: any) => b.actualPrice - a.actualPrice);
      }
    }
  }

  handleCancel() {
    console.log('ionCancel fired');
  }

  handleDismiss() {
    console.log('ionDismiss fired');
  }
}
