import { OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { WidgetOptions } from '@libertyware/ngx-form-core';
import { RenderOptions } from '../models/render-options';
export declare class RootWidget implements OnInit {
    private resolver;
    container: ViewContainerRef;
    fieldOptions: WidgetOptions;
    renderOptions: RenderOptions;
    constructor(resolver: ComponentFactoryResolver);
    ngOnInit(): void;
    private getRenderOption;
}
