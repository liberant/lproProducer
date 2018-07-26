import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [
    OrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersPage),
    NgArrayPipesModule,
    NgObjectPipesModule,
      MomentModule,
  ],
})
export class ReceivePageModule {}
