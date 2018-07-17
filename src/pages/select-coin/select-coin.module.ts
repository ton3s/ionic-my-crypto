import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectCoinPage } from './select-coin';

@NgModule({
  declarations: [
    SelectCoinPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectCoinPage),
  ],
})
export class SelectCoinPageModule {}
