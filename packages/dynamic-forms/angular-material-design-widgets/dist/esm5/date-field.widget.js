import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FieldWidget } from '@libertyware/ngx-form-gen';
var NgxMaterialDateWidget = /** @class */ (function (_super) {
    tslib_1.__extends(NgxMaterialDateWidget, _super);
    // tslint:disable-next-line: component-class-suffix
    function NgxMaterialDateWidget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NgxMaterialDateWidget = tslib_1.__decorate([
        Component({
            // tslint:disable-next-line: component-selector
            selector: 'ngx-material-date-widget',
            template: "\n    <div class=\"example-container\" [id]=\"fieldName + '-controls'\">\n      <mat-form-field>\n        <input\n          matInput\n          [matDatepicker]=\"picker\"\n          [placeholder]=\"formControl?.readableName\"\n        />\n        <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n        <mat-datepicker #picker></mat-datepicker>\n        <mat-hint>{{ hintText }}</mat-hint>\n        <mat-error *ngIf=\"group?.customValidateErrors | async as errors\">\n          <ng-container *ngFor=\"let error of errors[fieldName]; let i = index\">\n            <div>\n              {{ error }}\n            </div>\n          </ng-container>\n        </mat-error>\n      </mat-form-field>\n    </div>\n  "
        })
        // tslint:disable-next-line: component-class-suffix
    ], NgxMaterialDateWidget);
    return NgxMaterialDateWidget;
}(FieldWidget));
export { NgxMaterialDateWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1maWVsZC53aWRnZXQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tbWF0ZXJpYWwtZGVzaWduLXdpZGdldC8iLCJzb3VyY2VzIjpbImRhdGUtZmllbGQud2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQTRCeEQ7SUFBMkMsaURBQVc7SUFEdEQsbURBQW1EO0lBQ25EOztJQUF3RCxDQUFDO0lBQTVDLHFCQUFxQjtRQTFCakMsU0FBUyxDQUFDO1lBQ1QsK0NBQStDO1lBQy9DLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsUUFBUSxFQUFFLCt0QkFvQlQ7U0FDRixDQUFDO1FBQ0YsbURBQW1EO09BQ3RDLHFCQUFxQixDQUF1QjtJQUFELDRCQUFDO0NBQUEsQUFBekQsQ0FBMkMsV0FBVyxHQUFHO1NBQTVDLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRXaWRnZXQgfSBmcm9tICdAbGliZXJ0eXdhcmUvbmd4LWZvcm0tZ2VuJztcblxuQENvbXBvbmVudCh7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAnbmd4LW1hdGVyaWFsLWRhdGUtd2lkZ2V0JyxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiZXhhbXBsZS1jb250YWluZXJcIiBbaWRdPVwiZmllbGROYW1lICsgJy1jb250cm9scydcIj5cbiAgICAgIDxtYXQtZm9ybS1maWVsZD5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgbWF0SW5wdXRcbiAgICAgICAgICBbbWF0RGF0ZXBpY2tlcl09XCJwaWNrZXJcIlxuICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJmb3JtQ29udHJvbD8ucmVhZGFibGVOYW1lXCJcbiAgICAgICAgLz5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyLXRvZ2dsZSBtYXRTdWZmaXggW2Zvcl09XCJwaWNrZXJcIj48L21hdC1kYXRlcGlja2VyLXRvZ2dsZT5cbiAgICAgICAgPG1hdC1kYXRlcGlja2VyICNwaWNrZXI+PC9tYXQtZGF0ZXBpY2tlcj5cbiAgICAgICAgPG1hdC1oaW50Pnt7IGhpbnRUZXh0IH19PC9tYXQtaGludD5cbiAgICAgICAgPG1hdC1lcnJvciAqbmdJZj1cImdyb3VwPy5jdXN0b21WYWxpZGF0ZUVycm9ycyB8IGFzeW5jIGFzIGVycm9yc1wiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGVycm9yIG9mIGVycm9yc1tmaWVsZE5hbWVdOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICB7eyBlcnJvciB9fVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbWF0LWVycm9yPlxuICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICA8L2Rpdj5cbiAgYFxufSlcbi8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogY29tcG9uZW50LWNsYXNzLXN1ZmZpeFxuZXhwb3J0IGNsYXNzIE5neE1hdGVyaWFsRGF0ZVdpZGdldCBleHRlbmRzIEZpZWxkV2lkZ2V0IHt9XG4iXX0=