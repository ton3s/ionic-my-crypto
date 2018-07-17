import {IQuote} from "../quote/quote.interface";

export interface IHolding {
  id: number;
  symbol: string;
  currency: string;
  amount: number;
  quote?: IQuote;
  price?: number;
}
