var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams, auth, afs, op, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afs = afs;
        this.op = op;
        this.viewCtrl = viewCtrl;
        this.groupvar = 'variety';
        this.ordervar = 'unitCost';
        this.listType = navParams.get('type');
        this.user = auth.user$.value;
    }
    ListPage.prototype.ionViewDidLoad = function () {
        this.productsList$ = this.afs.col$("business/" + this.user.busId + "/" + this.listType);
    };
    ListPage.prototype.detail = function (id) {
        this.navCtrl.push('ProductFormPage', { id: id });
    };
    ListPage.prototype.closeModal = function () {
        this.viewCtrl.dismiss();
    };
    ListPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-list',
            templateUrl: 'list.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, AuthProvider, FirestoreProvider, OrdersProvider, ViewController])
    ], ListPage);
    return ListPage;
}());
export { ListPage };
//# sourceMappingURL=list.js.map