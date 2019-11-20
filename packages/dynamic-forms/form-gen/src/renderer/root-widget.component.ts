import {
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  ComponentFactory,
  ComponentRef
} from '@angular/core';
import { WidgetOptions } from '@oop-dynmic-forms/core';
import { RenderOptions } from '../models/render-options';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'govuk-root-widget',
  template: `
    <ng-container #container></ng-container>
  `
})
// tslint:disable-next-line: component-class-suffix
export class RootWidget implements OnInit {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  @Input() fieldOptions!: WidgetOptions;
  @Input() renderOptions!: RenderOptions;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.container.clear();
    const cmp = this.getRenderOption(this.fieldOptions.fieldType);
    if (cmp) {
      const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(cmp);
      const componentRef: ComponentRef<any> = this.container.createComponent(factory);
      componentRef.instance.fieldName = this.fieldOptions.fieldName;
    } else {
      throw new Error('No render support');
    }
  }

  private getRenderOption(typeName: string): any {
    return this.renderOptions[typeName];
  }
}
