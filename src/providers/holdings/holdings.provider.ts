import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IHolding} from './holdings.interface';
import {QuoteProvider} from "../quote/quote.provider";
import {IQuote} from "../quote/quote.interface";

@Injectable()
export class HoldingsProvider {

  public holdings: IHolding[] = [
    {
      id: 1,
      symbol: 'BTC',
      currency: 'USD',
      amount: 100
    },
    {
      id: 1619,
      symbol: 'SKY',
      currency: 'USD',
      amount: 10000
    },
    {
      id: 1737,
      symbol: 'XEL',
      currency: 'USD',
      amount: 500000
    }
  ];

  constructor(public http: HttpClient,
              public storage: Storage,
              public quoteProvider: QuoteProvider) {
  }

  addHolding(holding: IHolding): void {
    this.holdings.push(holding);
    this.saveHoldings();
  }

  removeHolding(holding: IHolding): void {
    this.holdings.splice(this.holdings.indexOf(holding), 1);
    this.saveHoldings();
  }

  saveHoldings(): void {
    this.storage.set('holdings', this.holdings);
  }

  loadHoldings(): Promise<IHolding[]> {
    // this.storage.get('holdings').then(holdings => {
    //   if (holdings !== null) {
    //     this.holdings = holdings;
    //   }
    // });
    return this.fetchPrices();
  }

  fetchPrices(): Promise<IHolding[]> {
    return new Promise((resolve, reject) => {
      this.quoteProvider.getQuotes(this.holdings)
        .then(quotes => {
          quotes.forEach((quote: IQuote, index) => {
            this.holdings[index].quote = quote;
            resolve(this.holdings);
          });
        })
        .catch(reject);
    })

  }

}
