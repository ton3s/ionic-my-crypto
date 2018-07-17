import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {IListing, IQuote} from "../../providers/quote/quote.interface";
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HoldingsProvider} from "../../providers/holdings/holdings.provider";
import {default as swal} from 'sweetalert2';
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {HomePage} from "../home/home";
import {IHolding} from "../../providers/holdings/holdings.interface";

@IonicPage()
@Component({
  selector: 'page-add-holding',
  templateUrl: 'add-holding.html',
})
export class AddHoldingPage {

  listing: IListing = null;
  quote: IQuote;
  form: FormGroup;

  constructor(public navCtrl: NavController,
              public formBuilder: FormBuilder,
              public navParams: NavParams,
              public quoteProvider: QuoteProvider,
              public holdingProvider: HoldingsProvider,
              public utilityProvider: UtilityProvider) {

    this.listing = this.navParams.get('listing');

    this.form = formBuilder.group({
      amount: ['', Validators.required],
      price: ['', Validators.required]
    });

    if (!navCtrl.canGoBack()) this.backToHomePage();
  }

  ionViewDidLoad() {
    setTimeout(() => this.loadQuote(), 500);
  }

  loadQuote() {
    if (!this.navCtrl.canGoBack()) return;
    this.quoteProvider.getQuote(this.listing.id)
      .then((quote: IQuote) => {
        this.quote = quote;
      });
  }

  saveCoin() {
    swal({
      title: `Coin Added!`,
      html: `${this.listing.name} was added to your portfolio!`,
      type: "success",
      confirmButtonColor: '#337ae4',
      confirmButtonText: 'Awesome!',
      allowOutsideClick: false
    }).then(_ => {
      this.utilityProvider.displayLoading();
      let holding: IHolding = {
        id: this.listing.id,
        symbol: this.listing.symbol,
        currency: 'USD',
        amount: this.form.value.amount,
        price: this.form.value.price
      };
      this.holdingProvider.addHolding(holding).then(_ => {
        this.utilityProvider.dismissLoading(() => this.navCtrl.popToRoot());
      });
    });
  }

  backToHomePage() {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

  getIconImage(id: number): string {
    return this.quoteProvider.getIcon(id, 64);
  }

}
