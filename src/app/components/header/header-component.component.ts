import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NavController, AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';

import { GlobalVariable } from '../../../app/global';

@Component({
  selector: 'app-header-component',
  templateUrl: './header-component.component.html',
  styleUrls: ['./header-component.component.scss'],
})
export class HeaderComponentComponent implements OnInit {

  constructor(public navCtrl: NavController, public global: GlobalVariable) { 
   
  }

  ngOnInit() {}

  openPage(page: string){
    if(page == 'home'){
      this.navCtrl.navigateRoot(page);
    } else {
      this.navCtrl.navigateForward(page);
    }
  }
  
}
