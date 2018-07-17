import {Component} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {HoldingsProvider} from "../../providers/holdings/holdings.provider";
import {IQuote} from "../../providers/quote/quote.interface";
import {IHolding} from "../../providers/holdings/holdings.interface";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  holdings: IHolding[] = [];
  isDisplayFiat: boolean = false;

  constructor(public navCtrl: NavController,
              public holdingsProvider: HoldingsProvider,
              public quoteProvider: QuoteProvider) {
  }

  ionViewDidEnter() {
    console.log("ionViewDidEnter");
    this.holdingsProvider.loadHoldings().then((holdings: IHolding[]) => this.holdings = holdings);
  }

  toggleDisplay() {
    this.isDisplayFiat = !this.isDisplayFiat;
  }

  getIconImage(holding: IHolding): string {
    return this.quoteProvider.getIcon(holding.id, 64);
  }

  getTotalBalance(currency: string): number {
    return this.holdings.length > 0 ? this.holdings.reduce((amount, holding: IHolding) => amount + holding.quote.quotes[currency].price * holding.amount, 0) : 0;
  }

  addCoin() {
    this.navCtrl.push('SelectCoinPage');
  }

  deleteCoin(holding: IHolding) {
    this.holdingsProvider.removeHolding(holding).then((holdings: IHolding[]) => this.holdings = holdings);
  }

}
