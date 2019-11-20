import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

import { NgxMaterialDateWidget } from './date-field.widget';

const widgets = [NgxMaterialDateWidget];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatNativeDateModule,
    MatRippleModule
  ],
  exports: [...widgets],
  declarations: [...widgets],
  entryComponents: [...widgets]
})
export class NgxMaterialFormModule {}
