import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomersPage } from './customers';
import { NgArrayPipesModule, NgObjectPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    CustomersPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomersPage),
    NgArrayPipesModule,
    NgObjectPipesModule,
  ],
})
export class CustomersPageModule {}
