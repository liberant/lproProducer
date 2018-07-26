import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { GroupByPipe, PairsPipe } from 'ngx-pipes';

import { Business } from '../../models/business-model';
import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { AuthProvider } from '../../providers/auth/auth';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { OrdersProvider } from '../../providers/orders/orders';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
  providers: [GroupByPipe, PairsPipe],
})
export class CustomersPage {
  user: User;
  business: Business;
  customersList$: Observable<Business[]>;
  interestedList$: Observable<Business[]>;
  groupvar = 'state';
  ordervar = 'name';

  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: FirestoreProvider, public auth: AuthProvider, public viewCtrl: ViewController, public op: OrdersProvider, public groupby: GroupByPipe, public pairs: PairsPipe) {
    this.user = this.auth.user$.value;
    this.business = this.auth.business$.value;
  }

  ionViewWillLoad() {
    this.customersList$ = this.afs.col$<Business>(`business/${this.business.id}/interested`);
    this.interestedList$ = this.afs.col$<Business>(`business/${this.business.id}/interested`);

  }

  detail(id: string) {
    this.navCtrl.push('ProfilePage', { id });
  }

}
