import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {IListing} from "../../providers/quote/quote.interface";
import {QuoteProvider} from "../../providers/quote/quote.provider";

@IonicPage()
@Component({
  selector: 'page-add-holding',
  templateUrl: 'add-holding.html',
})
export class AddHoldingPage {

  searchTerm: string = '';
  listings: IListing[];
  public loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public quoteProvider: QuoteProvider) {
  }

  ionViewDidLoad() {
    this.displayLoading();
    setTimeout(() => this.setFilteredItems(), 350);
  }

  setFilteredItems() {
    this.quoteProvider.filterListings(this.searchTerm)
      .then((listings: IListing[]) => {
        this.listings = listings;
        this.dismissLoading();
      });
  }

  // Loading Controller
  displayLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  dismissLoading(callback = () => {
  }) {
    if (this.loading) {
      this.loading.dismiss();
      this.loading.onDidDismiss(callback)
    }
  }

}
