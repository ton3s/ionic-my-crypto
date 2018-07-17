
// Coin market cap endpoints.

/*
  endpoint:  https://api.coinmarketcap.com/v2/listings/
*/
export interface IListing {
  id: number;
  name: string;
  symbol: string;
  website_slug: string;
}

/*
  endpoint:  https://api.coinmarketcap.com/v2/ticker/{id}/?convert=BTC
*/
export interface IQuote {
  id: number;
  name: string;
  symbol: string;
  website_slug: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
    },
    BTC: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
    }
  }
}

// Crypto compare endpoints.

/*
  Historical data for charting.
  endpoint: https://min-api.cryptocompare.com/data/histoday?fsym=SKY&tsym=USD&limit=100
 */
