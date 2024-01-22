import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { GlobalVariable } from '../../app/global';

import * as moment from 'moment';

@Component({
  selector: 'app-course',
  templateUrl: './course.page.html',
  styleUrls: ['./course.page.scss'],
})
export class CoursePage implements OnInit {
  course: any;

  courseTimeInterval: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public global: GlobalVariable) { 

    this.activatedRoute.params.subscribe((params: any) => {
      this.course = this.router.getCurrentNavigation()!.extras.state!['course'];
      console.log("Course Data -> ", this.course)

      
      this.course.remainingTime = 5 * 60; // Remaining Time for course for example

      this.courseTimeInterval = setInterval(() => {
        if(this.course.remainingTime > 0){
          this.course.remainingTime--;
        }
      }, 1000)
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.courseTimeInterval);
  }

  ngOnInit() {
  
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

}
