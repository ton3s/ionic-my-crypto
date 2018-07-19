import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoinInfoPage } from './coin-info';

@NgModule({
  declarations: [
    CoinInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(CoinInfoPage),
  ],
})
export class CoinInfoPageModule {}
