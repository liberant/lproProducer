import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Business } from '../../models/business-model';
import { Order } from '../../models/order-model';
import { Product } from '../../models/product-model';
import { AuthProvider } from '../auth/auth';
import { FirestoreProvider } from '../firestore/firestore';

@Injectable()

export class OrdersProvider {
  business: Business;
  wineList$: Observable<Product[]>;
  shortList$: Observable<Product[]>;

  constructor(public afs: FirestoreProvider, public auth: AuthProvider, public toastCtrl: ToastController) {
    const bid = auth.business$.value.id;
    this.wineList$ = this.afs.col$<Product>(`business/${bid}/winelist`);
    this.shortList$ = this.afs.col$<Product>(`business/${bid}/shortlist`);
  }

    approveOrder(id) {
        const today = new Date();
        this.afs.update<Order>(`orders/${id}`, { status: 'approved', approved: true, approvedDate: today });
    }
    shipOrder(id, expDate) {
        const today = new Date();
        this.afs.update<Order>(`orders/${id}`, { status: 'shipped', shipped: true, shippedDate: today, expectedDate: expDate });
    }


  contact(id) {
    console.log(id);
  }
  presentToast(message) {
    const toast = this.toastCtrl.create({
      message, duration: 3000, position: 'top'});

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
