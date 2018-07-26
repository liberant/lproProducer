var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
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
};
import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { TabsPage } from '../tabs/tabs';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, loadingCtrl, alertCtrl, auth, formBuilder) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.loginForm = formBuilder.group({
            email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }
    LoginPage.prototype.goToSignup = function () {
        this.navCtrl.push('SignupPage');
    };
    LoginPage.prototype.goToPasswordReset = function () {
        this.navCtrl.push('PasswordResetPage');
    };
    LoginPage.prototype.loginUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loading, email, password, error_1, alert_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.loginForm.valid) return [3 /*break*/, 1];
                        console.log('Form not ready');
                        return [3 /*break*/, 7];
                    case 1:
                        loading = this.loadingCtrl.create();
                        loading.present();
                        email = this.loginForm.value.email;
                        password = this.loginForm.value.password;
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, , 7]);
                        return [4 /*yield*/, this.auth.loginUser(email, password)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, loading.dismiss()];
                    case 4:
                        _a.sent();
                        this.navCtrl.setRoot(TabsPage);
                        return [3 /*break*/, 7];
                    case 5:
                        error_1 = _a.sent();
                        return [4 /*yield*/, loading.dismiss()];
                    case 6:
                        _a.sent();
                        alert_1 = this.alertCtrl.create({
                            message: error_1.message,
                            buttons: [{ text: 'Ok', role: 'cancel' }]
                        });
                        alert_1.present();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    LoginPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-login',
            templateUrl: 'login.html',
        }),
        __metadata("design:paramtypes", [NavController, LoadingController, AlertController, AuthProvider, FormBuilder])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map