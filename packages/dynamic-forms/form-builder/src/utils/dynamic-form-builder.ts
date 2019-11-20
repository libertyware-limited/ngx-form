import { AbstractControlOptions, FormBuilder, ValidatorFn } from '@angular/forms';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

import {
  DynamicFormGroupConfig,
  isAbstractControlOptions,
  isDynamicFormGroupConfig,
  isLegacyOrOpts
} from '../models/dynamic-form-group-config';
import { DynamicFormGroup, FormModel, getClassValidators } from './dynamic-form-group';
import { DynamicFormControl } from './dynamic-form-control';
import { DynamicForm } from '@libertyware/ngx-form-core';

export class DynamicFormBuilder extends FormBuilder {

  protected FormGroupClass = DynamicFormGroup;
  protected FormControlClass = DynamicFormControl;
  group<TModel>(
    factoryModel: ClassType<TModel>,
    controlsConfig?:
      | FormModel<TModel>
      | DynamicFormGroupConfig
      | { [key: string]: any },
    options?: AbstractControlOptions | DynamicFormGroupConfig
  ): DynamicFormGroup<TModel> {
    // Process the group with the controlsConfig passed into extra instead. (What does this accomplish?)
    if (
      controlsConfig &&
      (isAbstractControlOptions(controlsConfig) ||
        isLegacyOrOpts(controlsConfig) ||
        isDynamicFormGroupConfig(controlsConfig)) &&
      !options
    ) {
      return this.group(factoryModel, undefined, controlsConfig);
    }

    // This section of code was added in from the original code - Jordan
    if (!controlsConfig) {
      const model = (new factoryModel() as unknown) as DynamicForm;
      const fields = model.getFormFields();
      controlsConfig = {
        ...((fields
          .map((field: any) => ({
            [field.fieldName]: ''
          }))
          .reduce(
            (rev: any, current: any) => ({ ...rev, ...current }),
            {}
          ) as unknown) as FormModel<TModel>)
      };
    }

    const extra: DynamicFormGroupConfig = options as DynamicFormGroupConfig;

    let validators: ValidatorFn[] | null = null;
    let asyncValidators: ValidatorFn[]  | null = null;
    let updateOn: any;

    if (extra != null) {
      if (isAbstractControlOptions(extra)) {
        // `extra` are `AbstractControlOptions`
        validators = extra.validators != null ? extra.validators : null;
        asyncValidators = extra.asyncValidators != null ? extra.asyncValidators : null;
        updateOn = extra.updateOn != null ? extra.updateOn : undefined;
      }
      if (isLegacyOrOpts(extra)) {
        // `extra` are legacy form group options
        validators = validators || [];
        if (extra.validator) validators.push(extra.validator);

        asyncValidators = asyncValidators || [];
        if (extra.asyncValidator) validators.push(extra.asyncValidator);
      }
      // Set default customValidatorOptions
      if (!isDynamicFormGroupConfig(extra)) {
        extra.customValidatorOptions = { validationError: { target: false } };
      }
    }

    let newControlsConfig: FormModel<TModel> | any;

    if (controlsConfig !== undefined) {
      newControlsConfig = controlsConfig as FormModel<TModel>;
    }

    // experimental
    if (controlsConfig === undefined) {
      newControlsConfig = { ...this.createEmptyObject(factoryModel) };

      Object.keys(newControlsConfig).forEach(key => {
        if (canCreateGroup()) {
          // recursively create a dynamic group for the nested object
          newControlsConfig[key] = this.group(
            newControlsConfig[key].constructor,
            undefined,
            {
              ...(extra.customValidatorOptions
                ? { customValidatorOptions: extra.customValidatorOptions }
                : {}),
              asyncValidators,
              updateOn,
              validators
            } as any
          );
        } else {
          if (canCreateArray()) {
            if (newControlsConfig[key][0].constructor) {
              // recursively create an array with a group
              newControlsConfig[key] = super.array(
                newControlsConfig[key].map((newControlsConfigItem: any) =>
                  this.group(newControlsConfigItem.constructor, undefined, {
                    ...(extra.customValidatorOptions
                      ? { customValidatorOptions: extra.customValidatorOptions }
                      : {}),
                    asyncValidators,
                    updateOn,
                    validators
                  } as any)
                )
              );
            } else {
              // Create an array of form controls
              newControlsConfig[key] = super.array(
                newControlsConfig[key].map((newControlsConfigItem: any) =>
                  this.control(newControlsConfigItem)
                )
              );
            }
          }
        }

        function canCreateGroup() {
          const candidate = newControlsConfig[key];

          return (
            candidate &&
            !Array.isArray(candidate) &&
            candidate.constructor &&
            typeof candidate === 'object' &&
            (candidate.length === undefined ||
              (candidate.length !== undefined &&
                Object.keys(candidate).length === candidate.length))
          );
        }

        function canCreateArray() {
          if (Array.isArray(newControlsConfig[key]) === false) {
            return false;
          }

          const candidate = newControlsConfig[key][0];

          return (
            candidate.constructor &&
            typeof candidate === 'object' &&
            (candidate.length === undefined ||
              (candidate.length !== undefined &&
                Object.keys(candidate).length === candidate.length))
          );
        }
      });
    }

    // Remove empty
    validators = validators && validators.filter(validator => validator);
    asyncValidators =
      asyncValidators && asyncValidators.filter(validator => validator);

    // Create an Angular group from the top-level object
    const classValidators = getClassValidators<TModel>(
      factoryModel,
      newControlsConfig,
      extra && extra.customValidatorOptions,
      this.FormControlClass
    );
    const formGroup = super.group(classValidators, {
      ...(asyncValidators || {}),
      ...(updateOn || {}),
      ...(validators || {})
    });

    // Initialize the resulting group
    // Changed from internal FormGroup to DynamicFormGroup
    const dynamicFormGroup = new DynamicFormGroup<TModel>(
      factoryModel,
      newControlsConfig,
      {
        asyncValidators,
        updateOn,
        validators
      } as any
    );

    // Add all angular controls to the resulting dynamic group
    Object.keys(formGroup.controls).forEach(key => {
      dynamicFormGroup.addControl(key, formGroup.controls[key]);
    });

    // Add a listener to the dynamic group for value changes; on change, execute validation
    dynamicFormGroup.valueChanges.subscribe(() => dynamicFormGroup.validate(undefined, extra && extra.customValidatorOptions));

    return dynamicFormGroup;
  }

  // *******************
  // Helpers

  /**
   * Recursively creates an empty object from the data provided
   */
  private createEmptyObject<TModel>(
    factoryModel: ClassType<TModel>,
    data: {[key: string]: any} = {}
  ): any {
    let modified = false;

    const object: any = factoryModel ? plainToClass(factoryModel, data) : data;
    const fields = Object.keys(object);

    fields.forEach((fieldName: any) => {
      if (object[fieldName] && object[fieldName].length !== undefined) {
        if (
          object[fieldName].length === 1 &&
          Object.keys(object[fieldName][0]).length > 0 &&
          object[fieldName][0].constructor
        ) {
          object[fieldName] = [
            this.createEmptyObject(object[fieldName][0].constructor)
          ];
        }

        if (object[fieldName].length === 0) {
          data[fieldName] = [{}];
          modified = true;
        }
      } else {
        data[fieldName] = undefined;
      }
    });

    if (modified) {
      return this.createEmptyObject(factoryModel, data);
    }

    return object;
  }
}
