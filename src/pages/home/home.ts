import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
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

    holdingsProvider.loadHoldings().then(holdings => this.holdings = holdings);
  }

  toggleDisplay() {
    this.isDisplayFiat = !this.isDisplayFiat;
  }

  getIconImage(holding: IHolding): string {
    return this.quoteProvider.getIcon(holding, 64);
  }

  getTotalBalance(currency: string): number {
    return this.holdings.length > 0 ? this.holdings.reduce((amount, holding: IHolding) => amount + holding.quote.quotes[currency].price * holding.amount, 0) : 0;
  }

}
