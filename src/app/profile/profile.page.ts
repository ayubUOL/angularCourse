import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { GlobalVariable } from '../../app/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileForm: FormGroup;
  submitProfileForm: boolean = false;

  student: boolean = false;
  professional: boolean = false;

  constructor(public formBuilder: FormBuilder, public global: GlobalVariable) { 

    this.profileForm = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.required,
      ])],
      firstName: ['', Validators.compose([
        Validators.required,
      ])],
      lastName: [''],
      about: [''],
      interest: [''],
      role: [''],
    });
  }

  ngOnInit() {
  }

  changeStudent(){
    this.professional = false;
  }

  changeProfessional(){
    this.student = false;
  }

  updateProfile(){
    this.global.presentToast('Your Profile is updated' , 2000, 'success');
  }
}
