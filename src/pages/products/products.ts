import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { filter, find, pluck } from 'rxjs/operators';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  user: User;
  productsList: Observable<Product[]>;
  groupvar = 'region';
  ordervar = 'unitCost';


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public afs: FirestoreProvider, public op: OrdersProvider, public modalCtrl: ModalController) {
    this.user = auth.user$.value;

  }

  ionViewWillEnter() {
    this.productsList = this.afs.col$<Product>(`product`, ref => {
        return ref.where('pid', '==', this.user.busId);
    });
  }

  edit(product) {
    this.navCtrl.push('ProductFormPage', { product });
  }
  create() {
        this.navCtrl.push('ProductFormPage');
    }


}
