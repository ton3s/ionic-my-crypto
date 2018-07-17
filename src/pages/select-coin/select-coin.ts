import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {IListing, IQuote} from "../../providers/quote/quote.interface";
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-select-coin',
  templateUrl: 'select-coin.html',
})
export class SelectCoinPage {

  searchTerm: string = '';
  listings: IListing[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quoteProvider: QuoteProvider,
              public utilityProvider: UtilityProvider) {
  }

  ionViewDidLoad() {
    if (!this.navCtrl.canGoBack()) this.backToHomePage();
    this.utilityProvider.displayLoading();
    setTimeout(() => this.setFilteredItems(), 350);
  }

  setFilteredItems() {
    this.quoteProvider.filterListings(this.searchTerm)
      .then((listings: IListing[]) => {
        this.listings = listings;
        this.utilityProvider.dismissLoading();
      });
  }

  addCoinDetails(listing: IListing) {
    this.navCtrl.push('AddHoldingPage', {listing});
  }

  backToHomePage() {
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }
}
