import { Component, ViewChild } from '@angular/core';
import { Content, IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { NumberValidator } from '../../validators/number';
import { FirestoreProvider } from '../../providers/firestore/firestore';
import { AuthProvider } from '../../providers/auth/auth';
import { OrdersProvider } from '../../providers/orders/orders';
import { Observable } from 'rxjs';

import { Product } from '../../models/product-model';
import { User } from '../../models/user-model';
import { Item } from '../../models/common-model';


@IonicPage()
@Component({
  selector: 'page-product-form',
  templateUrl: 'product-form.html',
})
export class ProductFormPage {
  @ViewChild('product') content: Content;

  id: string;
  pid: string;
  user: User;
  productForm: FormGroup;
  product: Product;
  state: string;
    regionList: Observable<Item[]>;
    varietyList: Observable<Item[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: FirestoreProvider, public auth: AuthProvider,  public op: OrdersProvider, public fb: FormBuilder) {
    this.user = this.auth.user$.getValue();
    this.product = this.navParams.get('product');
  }
  ionViewDidLoad() {
    this.initForm();
    this.regionList = this.afs.col$<Item>('region');
    this.varietyList = this.afs.col$<Item>('variety');
    if(this.product){ this.patchForm(); }
    this.productForm.valueChanges.subscribe(val => {
        if(val.cartonSize && val.unitCost){
            let size = val.cartonSize;
            let cost = val.unitCost;
            if (typeof size === "string") {
                size = parseFloat(size);
            }
            if (typeof cost === 'string'){
                cost = parseFloat(cost);
            }
            const price = size * cost;
            this.productForm.patchValue({cartonSize: size, unitCost: cost, price: price}, { emitEvent: false });
        }
    });
  }

    initForm() {
        this.productForm = this.fb.group({
            id: [ '' ],
            pid: this.user.busId,
            name: [ '', Validators.compose([ Validators.required ]) ],
            producer: this.user.busName,
            // photoURL: [''],
            brand: [ '' ],
            vintage: [ '', Validators.compose([ Validators.required ]) ],
            region: [ '', Validators.compose([ Validators.required ]) ],
            variety: [ '', Validators.compose([ Validators.required ]) ],
            cartonSize: [ '', Validators.compose([ Validators.required, NumberValidator.isValid ]) ],
            unitCost: [ '', Validators.compose([ Validators.required , NumberValidator.isValid ]) ],
            price: 0,
        });
    }

    patchForm() {
        this.productForm.patchValue({
            id: this.product.id,
            pid: this.product.pid,
            name: this.product.name,
            producer: this.product.producer,
            // photoURL: this.product.photoURL,
            vintage: this.product.vintage,
            region: this.product.region,
            variety: this.product.variety,
            cartonSize: this.product.cartonSize,
            unitCost: this.product.unitCost,
            price: this.product.price,
        });
    }
/*
    calculatePrice() {
      let price;
        this.productForm.get('cartonSize').valueChanges.subscribe(size => {
            if(this.productForm.value['unitCost']) {
             price =  parseFloat(size) + parseFloat(this.productForm.value['unitCost']);
             this.productForm.patchValue({ price });
            }
        }).unsubscribe();
        this.productForm.get('unitCost').valueChanges.subscribe(cost => {
            if(this.productForm.value['cartonSize']) {
                price =  parseFloat(cost) + parseFloat(this.productForm.value['cartonSize']);
                this.productForm.patchValue({ price });
            }
        }).unsubscribe();
    }*/

    save(product){
      if (!product.id){ product.id = this.afs.getId();}
      this.afs.upsert<Product>(`product/${product.id}`, product);
    }
}
