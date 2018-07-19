import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {IHolding} from "../../providers/holdings/holdings.interface";
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HoldingsProvider} from "../../providers/holdings/holdings.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {default as swal} from "sweetalert2";

@IonicPage()
@Component({
  selector: 'page-edit-holding',
  templateUrl: 'edit-holding.html',
})
export class EditHoldingPage {

  holding: IHolding;
  index: number;
  form: FormGroup;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public navParams: NavParams,
              public quoteProvider: QuoteProvider,
              public holdingProvider: HoldingsProvider,
              public utilityProvider: UtilityProvider) {

    this.holding = this.navParams.get('holding');
    this.index = this.navParams.get('index');

    this.form = formBuilder.group({
      amount: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    if (this.holding) {
      this.form.patchValue({
        amount: this.holding.amount,
        price: this.holding.price
      });
    }

    if (!this.navCtrl.canGoBack()) this.backToHomePage();
  }

  saveCoin() {
    swal({
      title: `Coin Updated!`,
      html: `${this.holding.quote.name} was successfully updated!`,
      type: "success",
      confirmButtonColor: '#337ae4',
      confirmButtonText: 'Nice!',
      allowOutsideClick: false
    }).then(_ => {
      this.utilityProvider.displayLoading();
      this.holding.amount = this.form.value.amount;
      this.holding.price = this.form.value.price;
      this.holdingProvider.editHolding(this.holding, this.index).then(_ => {
        this.utilityProvider.dismissLoading(() => this.navCtrl.popToRoot());
      });
    });
  }

  getIconImage(id: number): string {
    return this.quoteProvider.getIcon(id, 64);
  }

  backToHomePage() {
    this.navCtrl.setRoot(TabsPage).then(() => this.navCtrl.popToRoot());
  }
}
