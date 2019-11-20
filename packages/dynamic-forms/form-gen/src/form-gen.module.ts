import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FormGenComponent } from './form-gen.component';
import { RootWidget } from './renderer/root-widget.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [FormGenComponent, RootWidget],
  declarations: [FormGenComponent, RootWidget],
  providers: []
})
export class FormGenModule {}
