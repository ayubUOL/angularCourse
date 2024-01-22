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

  experience: string = '';
  expertise: string = '';

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

    this.profileForm.controls['name'].setValue(localStorage.getItem("name"));
    this.profileForm.controls['firstName'].setValue(localStorage.getItem("firstName"));
    this.profileForm.controls['lastName'].setValue(localStorage.getItem("lastName"));
    this.profileForm.controls['about'].setValue(localStorage.getItem("about"));
    this.profileForm.controls['interest'].setValue(localStorage.getItem("interest"));
    this.profileForm.controls['role'].setValue(localStorage.getItem("role"));

    this.experience = String(localStorage.getItem("experience"));
    this.expertise = String(localStorage.getItem("expertise"));

    if (localStorage.getItem("student") == 'false' || localStorage.getItem("student") == null || localStorage.getItem("student") == undefined) {
      this.student = false;
    } else {
      this.student = true;
    }

    if (localStorage.getItem("professional") == 'false' || localStorage.getItem("professional") == null || localStorage.getItem("professional") == undefined) {
      this.professional = false;
    } else {
      this.professional = true;
    }
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
    localStorage.setItem("name", this.profileForm.value.name);
    localStorage.setItem("firstName", this.profileForm.value.firstName);
    localStorage.setItem("lastName", this.profileForm.value.lastName);
    localStorage.setItem("about", this.profileForm.value.about);
    localStorage.setItem("interest", String(this.profileForm.value.interest));
    localStorage.setItem("role", this.profileForm.value.role);
    localStorage.setItem("student", String(this.student));
    localStorage.setItem("professional", String(this.professional));
    localStorage.setItem("experience", this.experience);
    localStorage.setItem("expertise", this.expertise);
  }
}
