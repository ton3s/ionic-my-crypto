import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IHolding} from './holdings.interface';
import {QuoteProvider} from "../quote/quote.provider";
import {IQuote} from "../quote/quote.interface";

@Injectable()
export class HoldingsProvider {

  public holdings: IHolding[] = [];

  constructor(public http: HttpClient,
              public storage: Storage,
              public quoteProvider: QuoteProvider) {
  }

  addHolding(holding: IHolding): Promise<IHolding[]> {
    this.holdings.push(holding);
    return this.fetchPrices().then(holdings => this.saveHoldings(holdings));
  }

  removeHolding(holding: IHolding): Promise<IHolding[]> {
    this.holdings.splice(this.holdings.indexOf(holding), 1);
    return this.fetchPrices().then(holdings => this.saveHoldings(holdings));
  }

  saveHoldings(holdings: IHolding[]): Promise<IHolding[]> {
    return new Promise((resolve, reject) => {
      this.storage.set('holdings', holdings)
        .then(_ => resolve(holdings))
        .catch(reject);
    });
  }

  loadHoldings(refresher?) {
    return new Promise((resolve, reject) => {
      this.storage.get('holdings').then(holdings => {
        if (holdings !== null) {
          this.holdings = holdings;
          this.fetchPrices(refresher).then(holdings => resolve(holdings)).catch(reject);
        }
      }).catch(reject);
    })
  }

  fetchPrices(refresher?): Promise<IHolding[]> {
    return new Promise((resolve, reject) => {
      this.quoteProvider.getQuotes(this.holdings)
        .then(quotes => {
          quotes.forEach((quote: IQuote, index) => {
            this.holdings[index].quote = quote;
          });
          if (refresher) setTimeout(() => refresher.complete(), 500);
          resolve(this.holdings);
        })
        .catch(reject);
    })
  }

}
