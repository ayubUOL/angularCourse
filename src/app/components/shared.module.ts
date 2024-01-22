import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponentComponent } from './header/header-component.component';

@NgModule({
    declarations: [
        HeaderComponentComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule
    ],
    exports: [
        HeaderComponentComponent,
    ],
})
export class SharedModule { }