import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsPage } from './products';
import { NgArrayPipesModule, NgObjectPipesModule, NgStringPipesModule } from 'ngx-pipes';

@NgModule({
  declarations: [
    ProductsPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsPage),
    NgObjectPipesModule,
    NgArrayPipesModule,
    NgStringPipesModule,
  ],
})
export class ProductsPageModule {}
