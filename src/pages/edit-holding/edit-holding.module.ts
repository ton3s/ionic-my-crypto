import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditHoldingPage } from './edit-holding';

@NgModule({
  declarations: [
    EditHoldingPage,
  ],
  imports: [
    IonicPageModule.forChild(EditHoldingPage),
  ],
})
export class EditHoldingPageModule {}
