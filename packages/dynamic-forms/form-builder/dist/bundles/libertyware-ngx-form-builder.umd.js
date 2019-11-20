(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('util'), require('@angular/forms'), require('class-transformer'), require('class-validator'), require('rxjs'), require('@libertyware/ngx-form-core'), require('lodash.clonedeep'), require('lodash.mergewith')) :
    typeof define === 'function' && define.amd ? define('@libertyware/ngx-form-builder', ['exports', 'util', '@angular/forms', 'class-transformer', 'class-validator', 'rxjs', '@libertyware/ngx-form-core', 'lodash.clonedeep', 'lodash.mergewith'], factory) :
    (global = global || self, factory((global.libertyware = global.libertyware || {}, global.libertyware['ngx-form-builder'] = {}), global.util, global.ng.forms, global.classTransformer, global.classValidator, global.rxjs, global.ngxFormCore, global.cloneDeep, global.mergeWith));
}(this, (function (exports, util, forms, classTransformer, classValidator, rxjs, ngxFormCore, cloneDeep, mergeWith) { 'use strict';

    cloneDeep = cloneDeep && cloneDeep.hasOwnProperty('default') ? cloneDeep['default'] : cloneDeep;
    mergeWith = mergeWith && mergeWith.hasOwnProperty('default') ? mergeWith['default'] : mergeWith;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __exportStar(m, exports) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
        result.default = mod;
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function isDynamicFormGroupConfig(options) {
        return options && !util.isNullOrUndefined(options['customValidatorOptions']);
    }
    function isLegacyOrOpts(options) {
        return options && (!util.isNullOrUndefined(options['validator']) || !util.isNullOrUndefined(options['asyncValidator']));
    }
    function isAbstractControlOptions(options) {
        return (options &&
            (!util.isNullOrUndefined(options.validators) ||
                !util.isNullOrUndefined(options.asyncValidators) ||
                !util.isNullOrUndefined(options.updateOn)));
    }

    function foreverInvalid(c) {
        return {
            foreverInvalid: {
                valid: false
            }
        };
    }
    var FOREVER_INVALID_NAME = 'foreverInvalid';

    var DynamicFormControl = /** @class */ (function (_super) {
        __extends(DynamicFormControl, _super);
        function DynamicFormControl(fieldDefinition) {
            var _this = _super.call(this, fieldDefinition.data, fieldDefinition.validationFunctions) || this;
            _this.validationDefinitions = fieldDefinition.validationDefinitions;
            return _this;
        }
        Object.defineProperty(DynamicFormControl.prototype, "formModel", {
            get: function () {
                return this.parent.object;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormControl.prototype, "hint", {
            get: function () {
                return this.metaData(ngxFormCore.MetadataKeys.HINT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormControl.prototype, "readableName", {
            get: function () {
                return this.metaData(ngxFormCore.MetadataKeys.DISPLAY_NAME) || this.ControlName;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormControl.prototype, "placeholder", {
            get: function () {
                return this.metaData(ngxFormCore.MetadataKeys.PLACEHOLDER);
            },
            enumerable: true,
            configurable: true
        });
        DynamicFormControl.prototype.metaData = function (key) {
            return Reflect.getMetadata(key, this.formModel, this.ControlName);
        };
        Object.defineProperty(DynamicFormControl.prototype, "ControlName", {
            get: function () {
                var _this = this;
                var controls = this.parent.controls;
                return Object.keys(controls).find(function (name) { return _this === controls[name]; });
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormControl.prototype, "radioOptions", {
            get: function () {
                return this.metaData(ngxFormCore.MetadataKeys.RADIO_OPTIONS) || [];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormControl.prototype, "textareaOptions", {
            get: function () {
                return this.metaData(ngxFormCore.MetadataKeys.TEXTAREA_OPTIONS);
            },
            enumerable: true,
            configurable: true
        });
        return DynamicFormControl;
    }(forms.FormControl));

    var DynamicFormGroup = /** @class */ (function (_super) {
        __extends(DynamicFormGroup, _super);
        function DynamicFormGroup(factoryModel, fields, validatorOrOpts, asyncValidator) {
            var _this = _super.call(this, {}, validatorOrOpts, asyncValidator) || this;
            _this.factoryModel = factoryModel;
            _this.fields = fields;
            _this.nativeValidateErrors = new rxjs.BehaviorSubject({});
            _this.customValidateErrors = new rxjs.BehaviorSubject({});
            _this.formErrors = null;
            _this.objectChange = new rxjs.Subject();
            _this.FormControlClass = DynamicFormControl;
            _this._object = null;
            _this._externalErrors = null;
            _this._validatorOptions = null;
            _this._fb = new forms.FormBuilder();
            /*
            const classValidators = DynamicFormGroup.getClassValidators<TModel>(
              this.factoryModel,
              this.fields,
              this.defaultValidatorOptions
            );
            const formGroup = this._fb.group(
              classValidators
            );
            Object.keys(formGroup.controls).forEach(key => {
              this.addControl(key, formGroup.controls[key]);
            });
            this.valueChanges.subscribe(data => {
              this.validate(
                undefined,
                this.defaultValidatorOptions
              );
            });*/
            _this.formFields = _this.onlyFields(fields);
            _this._formGen = ngxFormCore.getFormFieldsOptions(factoryModel);
            return _this;
        }
        DynamicFormGroup.prototype.getFormGenData = function () {
            return this._formGen;
        };
        Object.defineProperty(DynamicFormGroup.prototype, "externalErrors", {
            get: function () {
                return this._externalErrors;
            },
            // Getters & Setters
            set: function (externalErrors) {
                this._externalErrors = externalErrors;
                this.validate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormGroup.prototype, "validatorOptions", {
            get: function () {
                return this._validatorOptions;
            },
            set: function (validatorOptions) {
                this._validatorOptions = validatorOptions;
                this.validate();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DynamicFormGroup.prototype, "object", {
            get: function () {
                return this.getObject();
            },
            set: function (object) {
                this.setObject(object);
            },
            enumerable: true,
            configurable: true
        });
        // Public API
        DynamicFormGroup.prototype.validate = function (externalErrors, validatorOptions) {
            this.validateAsync(externalErrors, validatorOptions).then(function () { }, function (error) {
                throw error;
            });
        };
        DynamicFormGroup.prototype.validateAsync = function (externalErrors, validatorOptions) {
            return __awaiter(this, void 0, void 0, function () {
                var result, validationErrors, allErrors, usedForeverInvalid, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (externalErrors === undefined) {
                                externalErrors = cloneDeep(this._externalErrors);
                            }
                            if (validatorOptions === undefined) {
                                validatorOptions = cloneDeep(this._validatorOptions);
                            }
                            if (!externalErrors) {
                                externalErrors = {};
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, classValidator.validate(this.object, validatorOptions)];
                        case 2:
                            result = _a.sent();
                            validationErrors = this.transformValidationErrors(result);
                            allErrors = this.mergeErrors(externalErrors, validationErrors);
                            this.markAsInvalidForExternalErrors(externalErrors);
                            this.setCustomErrors(allErrors);
                            usedForeverInvalid = false;
                            if (Object.keys(allErrors).filter(function (key) { return key !== FOREVER_INVALID_NAME; })
                                .length === 0 &&
                                this.get(FOREVER_INVALID_NAME)) {
                                this.removeControl(FOREVER_INVALID_NAME);
                                usedForeverInvalid = true;
                            }
                            if (this.valid &&
                                Object.keys(allErrors).length > 0 &&
                                !this.get(FOREVER_INVALID_NAME)) {
                                this.addControl(FOREVER_INVALID_NAME, new forms.FormControl('', [foreverInvalid]));
                                usedForeverInvalid = true;
                            }
                            if (usedForeverInvalid) {
                                this.updateValueAndValidity({
                                    onlySelf: true,
                                    emitEvent: false
                                });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        DynamicFormGroup.prototype.setCustomErrors = function (allErrors) {
            this.formErrors = allErrors;
            this.customValidateErrors.next(this.formErrors);
            this.nativeValidateErrors.next(this.collectErrors(this));
        };
        DynamicFormGroup.prototype.collectErrors = function (control, isRoot) {
            var _this = this;
            if (isRoot === void 0) { isRoot = true; }
            if (control.controls) {
                return __assign({}, (isRoot ? this.errors : {}), Object.entries(control.controls).reduce(function (acc, _a) {
                    var _b;
                    var _c = __read(_a, 2), key = _c[0], childControl = _c[1];
                    var childErrors = _this.collectErrors(childControl, false);
                    if (childErrors &&
                        key !== 'foreverInvalid' &&
                        Object.keys(childErrors).length > 0) {
                        acc = __assign({}, acc, (_b = {}, _b[key] = __assign({}, (acc && acc[key] ? acc[key] : {}), childErrors), _b));
                    }
                    return acc;
                }, {}));
            }
            else {
                return control.errors;
            }
        };
        DynamicFormGroup.prototype.validateAllFormFields = function () {
            var _this = this;
            Object.keys(this.controls).forEach(function (field) {
                var control = _this.get(field);
                // Control
                if (control instanceof forms.FormControl) {
                    control.markAsTouched({ onlySelf: true });
                }
                // Group: recursive
                else if (control instanceof DynamicFormGroup) {
                    control.validateAllFormFields();
                }
                // Array
                else if (control instanceof forms.FormArray) {
                    for (var i = 0; i < control.controls.length; i++) {
                        // Control in Array
                        if (control.controls[i] instanceof forms.FormControl) {
                            control.controls[i].markAsTouched({
                                onlySelf: true
                            });
                        }
                        // Group in Array: recursive
                        else if (control.controls[i] instanceof DynamicFormGroup) {
                            control.controls[i].validateAllFormFields();
                        }
                    }
                }
            });
        };
        DynamicFormGroup.prototype.resetValidateAllFormFields = function () {
            var _this = this;
            this.markAsInvalidForExternalErrors({});
            Object.keys(this.controls).forEach(function (field) {
                var control = _this.get(field);
                // Control
                if (control instanceof forms.FormControl) {
                    control.setErrors(null, { emitEvent: false });
                    control.markAsUntouched({ onlySelf: true });
                    control.markAsPristine({ onlySelf: true });
                }
                // Group: recursive
                else if (control instanceof DynamicFormGroup) {
                    control.resetValidateAllFormFields();
                }
                // Array
                else if (control instanceof forms.FormArray) {
                    for (var i = 0; i < control.controls.length; i++) {
                        // Control in Array
                        if (control.controls[i] instanceof forms.FormControl) {
                            control.controls[i].setErrors(null, { emitEvent: false });
                            control.controls[i].markAsUntouched({ onlySelf: true });
                            control.controls[i].markAsPristine({
                                onlySelf: true
                            });
                        }
                        // Group in Array: recursive
                        else if (control.controls[i] instanceof DynamicFormGroup) {
                            control.controls[i].resetValidateAllFormFields();
                        }
                    }
                }
            });
            this.setCustomErrors({});
        };
        DynamicFormGroup.prototype.classToClass = function (object) {
            return classTransformer.classToClass(object, { ignoreDecorators: true });
        };
        DynamicFormGroup.prototype.plainToClass = function (cls, plain) {
            return classTransformer.plainToClass(cls, plain, { ignoreDecorators: true });
        };
        DynamicFormGroup.prototype.setExternalErrorsAsync = function (externalErrors) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._externalErrors = externalErrors;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.validateAsync()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_2 = _a.sent();
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        DynamicFormGroup.prototype.setExternalErrors = function (externalErrors) {
            this.setExternalErrorsAsync(externalErrors).then(function () { }, function (error) {
                throw error;
            });
        };
        DynamicFormGroup.prototype.getExternalErrors = function () {
            return this._externalErrors;
        };
        DynamicFormGroup.prototype.clearExternalErrors = function () {
            this.setExternalErrors({});
        };
        DynamicFormGroup.prototype.clearExternalErrorsAsync = function () {
            return this.setExternalErrorsAsync({});
        };
        DynamicFormGroup.prototype.setValidatorOptionsAsync = function (validatorOptions) {
            return __awaiter(this, void 0, void 0, function () {
                var error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this._validatorOptions = validatorOptions;
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.validateAsync()];
                        case 2: return [2 /*return*/, _a.sent()];
                        case 3:
                            error_3 = _a.sent();
                            throw error_3;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        DynamicFormGroup.prototype.setValidatorOptions = function (validatorOptions) {
            this.setValidatorOptionsAsync(validatorOptions).then(function () { }, function (error) {
                throw error;
            });
        };
        DynamicFormGroup.prototype.getValidatorOptions = function () {
            return this._validatorOptions;
        };
        // Helpers
        DynamicFormGroup.prototype.onlyFields = function (fields) {
            var _this = this;
            var newFields = {};
            if (fields !== undefined) {
                Object.keys(fields).forEach(function (key) {
                    if (fields[key] instanceof DynamicFormGroup) {
                        // Group: recursive
                        newFields[key] = _this.onlyFields(fields[key].formFields);
                    }
                    else {
                        // Array
                        if (fields[key] instanceof forms.FormArray) {
                            if (fields[key].controls[0] instanceof DynamicFormGroup) {
                                // Group within Array: recursive
                                newFields[key] = _this.onlyFields(fields[key].controls[0].formFields);
                            }
                            else {
                                // Control within Array
                                newFields[key] = fields[key].controls[0].value;
                            }
                        }
                        else {
                            // Handle Control
                            newFields[key] = fields[key];
                        }
                    }
                });
            }
            return newFields;
        };
        DynamicFormGroup.prototype.transformValidationErrors = function (errors) {
            var _this = this;
            var customErrors = {};
            errors.forEach(function (error) {
                if (error && error.constraints !== undefined) {
                    Object.keys(error.constraints).forEach(function (key) {
                        if (!customErrors[error.property]) {
                            customErrors[error.property] = [];
                        }
                        if (customErrors[error.property].indexOf(error.constraints[key]) === -1) {
                            customErrors[error.property].push(error.constraints[key]);
                        }
                    });
                }
                if (error.children !== undefined && error.children.length) {
                    customErrors[error.property] = _this.transformValidationErrors(error.children);
                }
            });
            return customErrors;
        };
        DynamicFormGroup.prototype.mergeErrors = function (externalErrors, validationErrors) {
            var clonedExternalErrors = cloneDeep(externalErrors);
            return mergeWith(clonedExternalErrors, validationErrors, function (objValue, srcValue) {
                if (canMerge()) {
                    return objValue.concat(srcValue);
                }
                function canMerge() {
                    return (Array.isArray(objValue) &&
                        Array.isArray(srcValue) &&
                        objValue.filter(function (objItem) { return srcValue.indexOf(objItem) !== -1; })
                            .length === 0);
                }
            });
        };
        DynamicFormGroup.prototype.markAsInvalidForExternalErrors = function (errors, controls) {
            if (!controls) {
                controls = this.controls;
            }
            Object.keys(controls).forEach(function (field) {
                var control = controls[field];
                // Control
                if (control instanceof forms.FormControl) {
                    if (errors && errors[field]) {
                        control.setErrors({ externalError: true });
                    }
                    else {
                        if (control.errors && control.errors.externalError === true) {
                            control.setErrors(null);
                        }
                    }
                }
                // Group
                else if (control instanceof DynamicFormGroup) {
                    control.markAsInvalidForExternalErrors(errors && errors[field]
                        ? errors[field]
                        : {});
                }
                // Array
                else if (control instanceof forms.FormArray) {
                    for (var i = 0; i < control.length; i++) {
                        // Control in Array
                        if (control[i] instanceof forms.FormControl) {
                            if (errors && errors[i] && errors[i][field]) {
                                control[i].setErrors({ externalError: true });
                            }
                            else if (control[i].errors &&
                                control[i].errors.externalError === true) {
                                control[i].setErrors(null);
                            }
                        }
                        // Group in Array
                        else if (control[i] instanceof DynamicFormGroup) {
                            control[i].markAsInvalidForExternalErrors(errors && errors[i] && errors[i][field]
                                ? errors[i][field]
                                : {});
                        }
                    }
                }
            });
        };
        /**
         * Recursively gets all values from the form controls and all sub form group and array controls and returns it as
         * an object
         */
        DynamicFormGroup.prototype.getObject = function () {
            var _this = this;
            // Initialize the shape of the response
            var object = this._object
                ? this.classToClass(this._object)
                : this.factoryModel
                    ? new this.factoryModel()
                    : undefined;
            if (object !== undefined) {
                // Recursively get the value of all fields
                Object.keys(this.controls)
                    .filter(function (name) { return name !== FOREVER_INVALID_NAME; })
                    .forEach(function (key) {
                    // Handle Group
                    if (_this.controls[key] instanceof DynamicFormGroup) {
                        object[key] = _this.controls[key].object;
                    }
                    // Handle Form Array
                    else if (_this.controls[key] instanceof forms.FormArray) {
                        // Initialize value
                        object[key] = [];
                        for (var i = 0; i < _this.controls[key].controls.length; i++) {
                            var value = void 0;
                            if (_this.controls[key].controls[i] instanceof
                                DynamicFormGroup) {
                                // Recursively get object group
                                value = _this.controls[key].controls[i].object;
                            }
                            else {
                                value = _this.controls[key].controls[i].value;
                            }
                            if (value && Object.keys(value).length > 0) {
                                object[key].push(value);
                            }
                        }
                    }
                    // Handle Control
                    else {
                        object[key] = _this.controls[key].value;
                    }
                });
            }
            return (this.factoryModel
                ? this.plainToClass(this.factoryModel, object)
                : object);
        };
        /**
         * Sets the value of every control on the form and recursively sets the values of the controls
         * on all sub form groups
         *
         * @param object the data to assign to all controls of the form group and sub groups
         */
        DynamicFormGroup.prototype.setObject = function (object) {
            var _this = this;
            if (object instanceof this.factoryModel) {
                this._object = this.classToClass(object); // Ensure correct type
            }
            else {
                this._object = this.plainToClass(this.factoryModel, object); // Convert to Model type
            }
            // Recursively set the value of all fields
            Object.keys(this.controls).forEach(function (key) {
                // Handle Group
                if (_this.controls[key] instanceof DynamicFormGroup) {
                    _this.controls[key].object = _this._object
                        ? _this._object[key]
                        : {};
                }
                // Handle FormArray
                else if (_this.controls[key] instanceof forms.FormArray) {
                    var objectArray = _this._object ? _this._object[key] : [];
                    var formArray = _this.controls[key];
                    var isFormGroup = formArray.controls[0] instanceof DynamicFormGroup;
                    var firstFormGroup = formArray.controls[0];
                    var formControl = formArray.controls[0];
                    // Clear FormArray while retaining the reference
                    while (formArray.length !== 0) {
                        formArray.removeAt(0);
                    }
                    var _loop_1 = function (i) {
                        if (isFormGroup) {
                            // Create FormGroup
                            var dynamicFormGroup_1 = new DynamicFormGroup(firstFormGroup.factoryModel, firstFormGroup.formFields);
                            dynamicFormGroup_1.setParent(_this);
                            var classValidators = getClassValidators(firstFormGroup.factoryModel, firstFormGroup.formFields, undefined, _this.FormControlClass);
                            var formGroup_1 = _this._fb.group(classValidators);
                            // Add all controls to the form group
                            Object.keys(formGroup_1.controls).forEach(function (ctrlKey) {
                                dynamicFormGroup_1.addControl(ctrlKey, formGroup_1.controls[ctrlKey]);
                            });
                            // Add a value change listener to the group. on change, validate
                            dynamicFormGroup_1.valueChanges.subscribe(function (data) {
                                dynamicFormGroup_1.validate(undefined, _this._validatorOptions);
                            });
                            formArray.controls.push(dynamicFormGroup_1);
                            // Recusrively set the object value
                            formArray.controls[i].object =
                                _this._object && objectArray && objectArray[i]
                                    ? objectArray[i]
                                    : {};
                        }
                        else {
                            // Create control
                            var controlValue = _this._object && objectArray && objectArray[i]
                                ? objectArray[i]
                                : undefined;
                            var newFormControl = new forms.FormControl(controlValue, formControl.validator);
                            newFormControl.setParent(_this);
                            // Add the control to the FormArray
                            formArray.controls.push(newFormControl);
                        }
                    };
                    for (var i = 0; i < objectArray.length; i++) {
                        _loop_1(i);
                    }
                }
                // Handle Control
                else {
                    var newObject = _this._object ? _this._object[key] : [];
                    _this.controls[key].setValue(_this._object && newObject ? newObject : undefined);
                }
            });
            this.objectChange.next(this._object);
        };
        return DynamicFormGroup;
    }(forms.FormGroup));
    function getClassValidators(factoryModel, fields, validatorOptions, FormControlClass) {
        if (FormControlClass === void 0) { FormControlClass = DynamicFormControl; }
        // Get the validation rules from the object decorators
        var allValidationMetadatas = classValidator.getFromContainer(classValidator.MetadataStorage).getTargetValidationMetadatas(factoryModel, '');
        // Get the validation rules for the validation group: https://github.com/typestack/class-validator#validation-groups
        var validationGroupMetadatas = classValidator.getFromContainer(classValidator.MetadataStorage).getTargetValidationMetadatas(factoryModel, '', validatorOptions && validatorOptions.groups
            ? validatorOptions.groups
            : undefined);
        var formGroupFields = {};
        var validator = new classValidator.Validator();
        // Loop through all fields in the form definition
        Object.keys(fields)
            .filter(function (key) { return key.indexOf('__') !== 0; })
            .forEach(function (fieldName) {
            // Conditional Validation for the field
            var conditionalValidations = [];
            validationGroupMetadatas.forEach(function (validationMetadata) {
                if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.conditional.type)) {
                    conditionalValidations.push(validationMetadata);
                }
            });
            // All Nested Validation for the field
            var allNestedValidations = [];
            allValidationMetadatas.forEach(function (validationMetadata) {
                if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
                    allNestedValidations.push(validationMetadata);
                }
            });
            // Nested Validation for the field for the requested class-validator group
            var nestedGroupValidations = [];
            validationGroupMetadatas.forEach(function (validationMetadata) {
                if (isPropertyValidatorOfType(validationMetadata, fieldName, ValidationKeys.nested.type)) {
                    nestedGroupValidations.push(validationMetadata);
                }
            });
            var fieldDefinition = {
                data: formGroupFields[fieldName],
                validationFunctions: [],
                validationDefinitions: []
            };
            if (fieldDefinition.data === undefined) {
                fieldDefinition.data = fields[fieldName];
            }
            // TRY LINK EXISTS NATIVE VALIDATIONS, UNSTABLE !!!
            if (Array.isArray(fieldDefinition.data) &&
                fieldDefinition.data.length > 1 &&
                fieldDefinition.data.filter(function (validationFunction, index) {
                    return index > 0 && typeof validationFunction === 'function';
                }).length > 0) {
                fieldDefinition.data
                    .filter(function (validationFunction, index) {
                    return index > 0 && typeof validationFunction === 'function';
                })
                    .forEach(function (validationFunction) {
                    return fieldDefinition.validationFunctions.push(validationFunction);
                });
                fieldDefinition.data = fieldDefinition.data[0];
            }
            validationGroupMetadatas.forEach(function (validationMetadata) {
                if (validationMetadata.propertyName === fieldName &&
                    validationMetadata.type !== ValidationKeys.conditional.type) {
                    // Add all validation to the field except the @NestedValidation definition as
                    // being part of the form would imply it is validated if any other rules are present
                    if (validationMetadata.type !== ValidationKeys.nested.type) {
                        fieldDefinition.validationDefinitions.push(validationMetadata);
                    }
                    for (var typeKey in classValidator.ValidationTypes) {
                        if (classValidator.ValidationTypes.hasOwnProperty(typeKey)) {
                            // Handle Nested Validation
                            if (checkWithAllNestedValidations(allNestedValidations, nestedGroupValidations, fieldName)) {
                                if (isNestedValidate(validationMetadata, typeKey)) {
                                    var objectToValidate = fields[fieldName] instanceof DynamicFormGroup
                                        ? fields[fieldName].object
                                        : undefined;
                                    var nestedValidate = createNestedValidate(objectToValidate, validationMetadata);
                                    setFieldData(fieldName, fieldDefinition, nestedValidate);
                                }
                            }
                            // Handle Custom Validation
                            if (isCustomValidate(validationMetadata, typeKey)) {
                                var customValidation = createCustomValidation(fieldName, validationMetadata);
                                setFieldData(fieldName, fieldDefinition, customValidation);
                            }
                            // Handle remaining validation
                            if (isDynamicValidate(validationMetadata, typeKey)) {
                                var dynamicValidate = createDynamicValidate(validationMetadata, conditionalValidations, fieldName);
                                setFieldData(fieldName, fieldDefinition, dynamicValidate);
                            }
                        }
                    }
                }
            });
            // Convert to a structure, angular understands
            if (fieldDefinition.data instanceof DynamicFormGroup ||
                fieldDefinition.data instanceof forms.FormArray) {
                formGroupFields[fieldName] = fieldDefinition.data;
            }
            else {
                formGroupFields[fieldName] = new FormControlClass(fieldDefinition);
            }
        });
        return formGroupFields;
        // ******************************************************************************************
        // Local Helper functions to help make the main code more readable
        //
        function createNestedValidate(objectToValidate, validationMetadata) {
            return function (control) {
                var isValid = getValidateErrors(control, objectToValidate !== undefined ? objectToValidate : control.value, validatorOptions).length === 0;
                return getIsValidResult(isValid, validationMetadata, 'nestedValidate');
            };
        }
        function createDynamicValidate(validationMetadata, conditionalValidations, fieldName) {
            return function (control) {
                if (!control) {
                    return null;
                }
                var isValid = control.parent && control.parent.value
                    ? validator.validateValueByMetadata(control.value, validationMetadata)
                    : true;
                if (!isValid && conditionalValidations.length > 0) {
                    var validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
                    isValid =
                        validateErrors.filter(function (error) { return error.property === fieldName; }).length === 0;
                }
                return getIsValidResult(isValid, validationMetadata, 'dynamicValidate');
            };
        }
        function createCustomValidation(fieldName, validationMetadata) {
            return function (control) {
                var validateErrors = setObjectValueAndGetValidationErrors(control, fieldName, validatorOptions);
                var isValid = getAllErrors(validateErrors, fieldName).length === 0;
                return getIsValidResult(isValid, validationMetadata, 'customValidation');
            };
        }
        function checkWithAllNestedValidations(allNestedValidations, nestedValidations, key) {
            return (allNestedValidations.length === nestedValidations.length ||
                ((fields[key] instanceof DynamicFormGroup ||
                    fields[key] instanceof forms.FormArray) &&
                    allNestedValidations.length > 0 && nestedValidations.length === 0));
        }
        function isDynamicValidate(validationMetadata, typeKey) {
            return (validationMetadata.type === classValidator.ValidationTypes[typeKey] &&
                validator[validationMetadata.type] !== undefined);
        }
        /**
         * marked with @Validate(...)
         * https://github.com/typestack/class-validator#custom-validation-classes
         */
        function isCustomValidate(validationMetadata, typeKey) {
            return (isNotPropertyValidation(validationMetadata, typeKey) &&
                validationMetadata.type === ValidationKeys.custom.type &&
                typeKey === ValidationKeys.custom.typeKey);
        }
        /**
         * marked with @ValidateNested()
         * https://github.com/typestack/class-validator#validating-nested-objects
         */
        function isNestedValidate(validationMetadata, typeKey) {
            return (isNotPropertyValidation(validationMetadata, typeKey) &&
                validationMetadata.type === ValidationKeys.nested.type &&
                typeKey === ValidationKeys.nested.typeKey);
        }
        function isNotPropertyValidation(validationMetadata, typeKey) {
            return (validationMetadata.type === classValidator.ValidationTypes[typeKey] &&
                validator[validationMetadata.type] === undefined);
        }
        function setFieldData(fieldName, fieldDefinition, validationFunction) {
            /* todo: maybe not need, if enable this code, experemental mode not work
            if (fields[fieldName] instanceof DynamicFormGroup) {
              fields[fieldName].object = fields[fieldName].fields;
            }*/
            // Fill field data if empty
            if (fieldDefinition.data === undefined) {
                fieldDefinition.data = fields[fieldName];
            }
            fieldDefinition.validationFunctions.push(validationFunction);
        }
        function getAllErrors(validateErrors, fieldName) {
            return validateErrors.filter(function (error) {
                // Check for nested/child errors
                return (error.children.length &&
                    error.children.filter(function (children) { return children.property === fieldName; })) ||
                    error.property === fieldName;
            });
        }
    }
    // ***************************************************************
    // Global Helper functions
    //
    function isPropertyValidatorOfType(validationMetadata, fieldName, validationMetadataType) {
        return (validationMetadata.propertyName === fieldName &&
            validationMetadata.type === validationMetadataType);
    }
    function setObjectValueAndGetValidationErrors(control, key, validatorOptions) {
        var object = control.parent instanceof DynamicFormGroup
            ? control.parent.object
            : control.parent
                ? control.parent.value
                : {};
        if (object) {
            object[key] = control.value;
        }
        return getValidateErrors(control, object, validatorOptions);
    }
    function getValidateErrors(control, dataToValidate, validatorOptions) {
        var validateErrors = control.parent && control.parent.value
            ? classValidator.validateSync(dataToValidate, validatorOptions)
            : [];
        return validateErrors;
    }
    function getIsValidResult(isValid, validationMetadata, errorType) {
        var _a;
        return isValid
            ? null
            : (_a = {},
                _a[errorType] = {
                    valid: false,
                    type: validationMetadata.type
                },
                _a);
    }
    var ValidationKeys = {
        nested: {
            type: 'nestedValidation',
            typeKey: 'NESTED_VALIDATION'
        },
        conditional: {
            type: 'conditionalValidation'
        },
        custom: {
            type: 'customValidation',
            typeKey: 'CUSTOM_VALIDATION'
        }
    };

    var DynamicFormBuilder = /** @class */ (function (_super) {
        __extends(DynamicFormBuilder, _super);
        function DynamicFormBuilder() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.FormGroupClass = DynamicFormGroup;
            _this.FormControlClass = DynamicFormControl;
            return _this;
        }
        DynamicFormBuilder.prototype.group = function (factoryModel, controlsConfig, options) {
            var _this = this;
            // Process the group with the controlsConfig passed into extra instead. (What does this accomplish?)
            if (controlsConfig &&
                (isAbstractControlOptions(controlsConfig) ||
                    isLegacyOrOpts(controlsConfig) ||
                    isDynamicFormGroupConfig(controlsConfig)) &&
                !options) {
                return this.group(factoryModel, undefined, controlsConfig);
            }
            // This section of code was added in from the original code - Jordan
            if (!controlsConfig) {
                var model = new factoryModel();
                var fields = model.getFormFields();
                controlsConfig = __assign({}, fields
                    .map(function (field) {
                    var _a;
                    return (_a = {},
                        _a[field.fieldName] = '',
                        _a);
                })
                    .reduce(function (rev, current) { return (__assign({}, rev, current)); }, {}));
            }
            var extra = options;
            var validators = null;
            var asyncValidators = null;
            var updateOn;
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
                    if (extra.validator)
                        validators.push(extra.validator);
                    asyncValidators = asyncValidators || [];
                    if (extra.asyncValidator)
                        validators.push(extra.asyncValidator);
                }
                // Set default customValidatorOptions
                if (!isDynamicFormGroupConfig(extra)) {
                    extra.customValidatorOptions = { validationError: { target: false } };
                }
            }
            var newControlsConfig;
            if (controlsConfig !== undefined) {
                newControlsConfig = controlsConfig;
            }
            // experimental
            if (controlsConfig === undefined) {
                newControlsConfig = __assign({}, this.createEmptyObject(factoryModel));
                Object.keys(newControlsConfig).forEach(function (key) {
                    if (canCreateGroup()) {
                        // recursively create a dynamic group for the nested object
                        newControlsConfig[key] = _this.group(newControlsConfig[key].constructor, undefined, __assign({}, (extra.customValidatorOptions
                            ? { customValidatorOptions: extra.customValidatorOptions }
                            : {}), { asyncValidators: asyncValidators,
                            updateOn: updateOn,
                            validators: validators }));
                    }
                    else {
                        if (canCreateArray()) {
                            if (newControlsConfig[key][0].constructor) {
                                // recursively create an array with a group
                                newControlsConfig[key] = _super.prototype.array.call(_this, newControlsConfig[key].map(function (newControlsConfigItem) {
                                    return _this.group(newControlsConfigItem.constructor, undefined, __assign({}, (extra.customValidatorOptions
                                        ? { customValidatorOptions: extra.customValidatorOptions }
                                        : {}), { asyncValidators: asyncValidators,
                                        updateOn: updateOn,
                                        validators: validators }));
                                }));
                            }
                            else {
                                // Create an array of form controls
                                newControlsConfig[key] = _super.prototype.array.call(_this, newControlsConfig[key].map(function (newControlsConfigItem) {
                                    return _this.control(newControlsConfigItem);
                                }));
                            }
                        }
                    }
                    function canCreateGroup() {
                        var candidate = newControlsConfig[key];
                        return (candidate &&
                            !Array.isArray(candidate) &&
                            candidate.constructor &&
                            typeof candidate === 'object' &&
                            (candidate.length === undefined ||
                                (candidate.length !== undefined &&
                                    Object.keys(candidate).length === candidate.length)));
                    }
                    function canCreateArray() {
                        if (Array.isArray(newControlsConfig[key]) === false) {
                            return false;
                        }
                        var candidate = newControlsConfig[key][0];
                        return (candidate.constructor &&
                            typeof candidate === 'object' &&
                            (candidate.length === undefined ||
                                (candidate.length !== undefined &&
                                    Object.keys(candidate).length === candidate.length)));
                    }
                });
            }
            // Remove empty
            validators = validators && validators.filter(function (validator) { return validator; });
            asyncValidators =
                asyncValidators && asyncValidators.filter(function (validator) { return validator; });
            // Create an Angular group from the top-level object
            var classValidators = getClassValidators(factoryModel, newControlsConfig, extra && extra.customValidatorOptions, this.FormControlClass);
            var formGroup = _super.prototype.group.call(this, classValidators, __assign({}, (asyncValidators || {}), (updateOn || {}), (validators || {})));
            // Initialize the resulting group
            // Changed from internal FormGroup to DynamicFormGroup
            var dynamicFormGroup = new DynamicFormGroup(factoryModel, newControlsConfig, {
                asyncValidators: asyncValidators,
                updateOn: updateOn,
                validators: validators
            });
            // Add all angular controls to the resulting dynamic group
            Object.keys(formGroup.controls).forEach(function (key) {
                dynamicFormGroup.addControl(key, formGroup.controls[key]);
            });
            // Add a listener to the dynamic group for value changes; on change, execute validation
            dynamicFormGroup.valueChanges.subscribe(function () { return dynamicFormGroup.validate(undefined, extra && extra.customValidatorOptions); });
            return dynamicFormGroup;
        };
        // *******************
        // Helpers
        /**
         * Recursively creates an empty object from the data provided
         */
        DynamicFormBuilder.prototype.createEmptyObject = function (factoryModel, data) {
            var _this = this;
            if (data === void 0) { data = {}; }
            var modified = false;
            var object = factoryModel ? classTransformer.plainToClass(factoryModel, data) : data;
            var fields = Object.keys(object);
            fields.forEach(function (fieldName) {
                if (object[fieldName] && object[fieldName].length !== undefined) {
                    if (object[fieldName].length === 1 &&
                        Object.keys(object[fieldName][0]).length > 0 &&
                        object[fieldName][0].constructor) {
                        object[fieldName] = [
                            _this.createEmptyObject(object[fieldName][0].constructor)
                        ];
                    }
                    if (object[fieldName].length === 0) {
                        data[fieldName] = [{}];
                        modified = true;
                    }
                }
                else {
                    data[fieldName] = undefined;
                }
            });
            if (modified) {
                return this.createEmptyObject(factoryModel, data);
            }
            return object;
        };
        return DynamicFormBuilder;
    }(forms.FormBuilder));

    exports.DynamicFormBuilder = DynamicFormBuilder;
    exports.DynamicFormControl = DynamicFormControl;
    exports.DynamicFormGroup = DynamicFormGroup;
    exports.FOREVER_INVALID_NAME = FOREVER_INVALID_NAME;
    exports.foreverInvalid = foreverInvalid;
    exports.getClassValidators = getClassValidators;
    exports.isAbstractControlOptions = isAbstractControlOptions;
    exports.isDynamicFormGroupConfig = isDynamicFormGroupConfig;
    exports.isLegacyOrOpts = isLegacyOrOpts;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=libertyware-ngx-form-builder.umd.js.map
