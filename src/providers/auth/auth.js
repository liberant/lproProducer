var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
var AuthProvider = /** @class */ (function () {
    function AuthProvider(afAuth, afs) {
        this.afAuth = afAuth;
        this.afs = afs;
        this.user$ = new BehaviorSubject(null);
        this.business$ = new BehaviorSubject(null);
    }
    AuthProvider.prototype.loadUser = function (uid) {
        var _this = this;
        this.afs.doc("user/" + uid).valueChanges().pipe(first()).subscribe(function (data) {
            _this.user$.next(data);
            _this.loadBusiness(data.busId);
        });
    };
    AuthProvider.prototype.loadBusiness = function (bid) {
        var _this = this;
        this.afs.doc("business/" + bid).valueChanges().pipe(first()).subscribe(function (data) {
            _this.business$.next(data);
        });
    };
    AuthProvider.prototype.loginUser = function (email, password) {
        return this.afAuth.auth.signInWithEmailAndPassword(email, password);
    };
    AuthProvider.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthProvider.prototype.logoutUser = function () {
        return this.afAuth.auth.signOut();
    };
    AuthProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AngularFireAuth,
            AngularFirestore])
    ], AuthProvider);
    return AuthProvider;
}());
export { AuthProvider };
//# sourceMappingURL=auth.js.map