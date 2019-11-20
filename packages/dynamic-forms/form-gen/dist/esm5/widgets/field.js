import * as tslib_1 from "tslib";
import { Input, Optional, SkipSelf, Host } from '@angular/core';
var FieldWidget = /** @class */ (function () {
    function FieldWidget(groupDirective) {
        this.groupDirective = groupDirective;
    }
    FieldWidget.prototype.ngOnInit = function () {
        this.group = this.groupDirective.form;
    };
    Object.defineProperty(FieldWidget.prototype, "hintText", {
        get: function () {
            return this.formControl.hint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldWidget.prototype, "formControl", {
        get: function () {
            return this.group.get(this.fieldName);
        },
        enumerable: true,
        configurable: true
    });
    tslib_1.__decorate([
        Input()
    ], FieldWidget.prototype, "fieldName", void 0);
    FieldWidget = tslib_1.__decorate([
        tslib_1.__param(0, Optional()), tslib_1.__param(0, SkipSelf()), tslib_1.__param(0, Host())
    ], FieldWidget);
    return FieldWidget;
}());
export { FieldWidget };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AbGliZXJ0eXdhcmUvbmd4LWZvcm0tZ2VuLyIsInNvdXJjZXMiOlsid2lkZ2V0cy9maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUl4RTtJQUtFLHFCQUFvRCxjQUFrQztRQUFsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBb0I7SUFBRyxDQUFDO0lBRTFGLDhCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBNkIsQ0FBQztJQUNqRSxDQUFDO0lBRUQsc0JBQUksaUNBQVE7YUFBWjtZQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0IsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxvQ0FBVzthQUFmO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUF1QixDQUFDO1FBQzlELENBQUM7OztPQUFBO0lBaEJRO1FBQVIsS0FBSyxFQUFFO2tEQUFvQjtJQURSLFdBQVc7UUFLbEIsbUJBQUEsUUFBUSxFQUFFLENBQUEsRUFBRSxtQkFBQSxRQUFRLEVBQUUsQ0FBQSxFQUFFLG1CQUFBLElBQUksRUFBRSxDQUFBO09BTHZCLFdBQVcsQ0FrQmhDO0lBQUQsa0JBQUM7Q0FBQSxBQWxCRCxJQWtCQztTQWxCcUIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElucHV0LCBPcHRpb25hbCwgU2tpcFNlbGYsIEhvc3QsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRHluYW1pY0Zvcm1Hcm91cCwgRHluYW1pY0Zvcm1Db250cm9sIH0gZnJvbSAnQGxpYmVydHl3YXJlL25neC1mb3JtLWJ1aWxkZXInO1xuaW1wb3J0IHsgRm9ybUdyb3VwRGlyZWN0aXZlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgRmllbGRXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBmaWVsZE5hbWUhOiBzdHJpbmc7XG5cbiAgcHVibGljIGdyb3VwITogRHluYW1pY0Zvcm1Hcm91cDxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTa2lwU2VsZigpIEBIb3N0KCkgcHJpdmF0ZSBncm91cERpcmVjdGl2ZTogRm9ybUdyb3VwRGlyZWN0aXZlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZ3JvdXAgPSB0aGlzLmdyb3VwRGlyZWN0aXZlLmZvcm0gYXMgRHluYW1pY0Zvcm1Hcm91cDxhbnk+O1xuICB9XG5cbiAgZ2V0IGhpbnRUZXh0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUNvbnRyb2wuaGludDtcbiAgfVxuXG4gIGdldCBmb3JtQ29udHJvbCgpOiBEeW5hbWljRm9ybUNvbnRyb2wge1xuICAgIHJldHVybiB0aGlzLmdyb3VwLmdldCh0aGlzLmZpZWxkTmFtZSkgYXMgRHluYW1pY0Zvcm1Db250cm9sO1xuICB9XG59XG4iXX0=