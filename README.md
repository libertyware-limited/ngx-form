# Object oriented forms

## Angular Form builder

Angular form builder breaks conventional design. Good design should also be framework agnostic. If your a full stack developer you want a common appraoch to validate your data models.

We've taken inspiration from ngx-dynamic-form-builder (https://github.com/EndyKaufman/ngx-dynamic-form-builder) and now allowed your forms to be generated and validated from your data model.

## Packages

@libertyware/ngx-form-core
This has originally been design as angular form builder. But we will work on a react render too. This is the underlying package for both.

@libertyware/ngx-form-builder
new angular form builder to support validation and render from a class datamodel

@libertyware/ngx-form-gen
Angular render component. You just need to supply the widgets
