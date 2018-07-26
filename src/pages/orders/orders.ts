import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';
import * as moment from 'moment';

@IonicPage() @Component({
  selector: 'page-orders', templateUrl: 'orders.html',
})
export class OrdersPage {
  user: User;
  business: Business;
  ordersList: Observable<Order[]>;
  statusList;
  expectedDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, private auth: AuthProvider, public op: OrdersProvider) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
    this.statusList = [ { order: 1, val: 'Submitted' }, { order: 2, val: 'Approved' }, { order: 3, val: 'Shipped' }, { order: 4, val: 'Received' } ];
  }

  ionViewWillLoad() {
    this.ordersList = this.afs.col$<Order>('orders', ref => {
      return ref.where('pid', '==', this.business.id);
    });
    this.expectedDate = moment().add(3,'days').format('DD/MM/YY')
  }

  detail(id: string) {
    this.navCtrl.push('OrderDetailPage', { id });
  }

}
