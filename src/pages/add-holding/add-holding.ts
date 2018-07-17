import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {IListing, IQuote} from "../../providers/quote/quote.interface";
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HoldingsProvider} from "../../providers/holdings/holdings.provider";
import {default as swal} from 'sweetalert2';
import {UtilityProvider} from "../../providers/utility/utility.provider";

@IonicPage()
@Component({
  selector: 'page-add-holding',
  templateUrl: 'add-holding.html',
})
export class AddHoldingPage {

  listing: IListing;
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
    })
  }

  ionViewDidLoad() {
    setTimeout(() => this.loadQuote(), 500);
  }

  loadQuote() {
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
      this.holdingProvider.addHolding({
        id: this.listing.id,
        symbol: this.listing.symbol,
        currency: 'USD',
        amount: this.form.value.amount,
        price: this.form.value.price
      }).then(_ => {
        this.utilityProvider.dismissLoading();
        this.navCtrl.popToRoot();
      });
    });
  }

}
