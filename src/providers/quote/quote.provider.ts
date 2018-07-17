import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {IListing, IQuote} from "./quote.interface";
import {IHolding} from "../holdings/holdings.interface";

// All information is provided by coin market cap and cryptocompare apis.
// https://min-api.cryptocompare.com/
// https://www.cryptocompare.com/api/
// https://coinmarketcap.com/api/

@Injectable()
export class QuoteProvider {

  constructor(public http: HttpClient) {
  }

  // Get a list of all cryptocurrency listings.
  getListings(): Promise<IListing[]> {
    let apiURL = `https://api.coinmarketcap.com/v2/listings/`;
    return this.http.get(apiURL)
      .map((res: any) => res.data)
      .toPromise();
  }

  getQuotes(holdings: IHolding[]): Promise<IQuote[]> {
    return Promise.all(holdings.map(holding => this.getQuote(holding)));
  }

  // Get the ticker data for a specific cryptocurrency.
  getQuote(holding: IHolding): Promise<IQuote> {
    let apiURL = `https://api.coinmarketcap.com/v2/ticker/${holding.id}/?convert=BTC`;
    return this.http.get(apiURL)
      .map((res: any) => res.data)
      .toPromise();
  }

  // Get the image url for a coin given a CMC id.
  // https://s2.coinmarketcap.com/static/img/coins/64x64/1808.png
  // size: 32 | 64
  getIcon(holding: IHolding, size: number): string {
    return `https://s2.coinmarketcap.com/static/img/coins/${size}x${size}/${holding.id}.png`
  }

}
