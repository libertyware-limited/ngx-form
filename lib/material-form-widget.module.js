var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaterialDateWidget } from './date-field.widget';
import { NgxMaterialInputWidget } from './input-field.widget';
import { NgxMaterialRadioWidget } from './radio-field.widget';
import { NgxMaterialTextareaWidget } from './textarea-field.widget';
const widgets = [NgxMaterialDateWidget, NgxMaterialInputWidget, NgxMaterialRadioWidget, NgxMaterialTextareaWidget];
let NgxMaterialFormModule = class NgxMaterialFormModule {
};
NgxMaterialFormModule = __decorate([
    NgModule({
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
], NgxMaterialFormModule);
export { NgxMaterialFormModule };
