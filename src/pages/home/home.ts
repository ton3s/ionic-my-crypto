import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {HoldingsProvider} from "../../providers/holdings/holdings.provider";
import {IHolding} from "../../providers/holdings/holdings.interface";
import {UtilityProvider} from "../../providers/utility/utility.provider";
import {ItemSliding} from 'ionic-angular';
import {default as swal} from "sweetalert2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  holdings: IHolding[] = [];
  isDisplayFiat: boolean = false;
  refreshOnLoad: boolean = true;

  constructor(public navCtrl: NavController,
              public holdingsProvider: HoldingsProvider,
              public quoteProvider: QuoteProvider,
              public utilityProvider: UtilityProvider) {
  }

  ionViewDidEnter() {
    if (this.refreshOnLoad) this.loadHoldings();
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
    this.refreshOnLoad = true;
    this.navCtrl.push('SelectCoinPage');
  }

  editCoin(holding: IHolding, index: number, slidingItem: ItemSliding) {
    this.refreshOnLoad = true;
    slidingItem.close();
    this.navCtrl.push('EditHoldingPage', {holding, index});
  }

  loadHoldings(refresher?) {
    this.utilityProvider.displayLoading();
    this.holdingsProvider.loadHoldings(refresher).then((holdings: IHolding[]) => {
      this.holdings = holdings;
      this.utilityProvider.dismissLoading();
    }).catch(_ => this.utilityProvider.dismissLoading());
  }

  refreshHoldings(refresher) {
    this.loadHoldings(refresher);
  }

  removeCoin(holding: IHolding) {
    this.holdingsProvider.removeHolding(holding).then((holdings: IHolding[]) => this.holdings = holdings)
      .then(() => {
        swal({
          title: `Coin Removed!`,
          text: `${holding.quote.name} was removed from your portfolio!`,
          confirmButtonClass: "btn btn-success",
          type: "success"
        });
      });
  }

  promptRemoveCoin(holding: IHolding, index: number, slidingItem: ItemSliding) {
    slidingItem.close();
    swal({
      title: 'Remove Coin?',
      text: `Are you sure you want delete ${holding.quote.name} from your portfolio?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) this.removeCoin(holding);
    }).catch(console.log);
  }

  coinInfo(holding: IHolding) {
    this.refreshOnLoad = false;
    this.navCtrl.push('CoinInfoPage', {holding});
  }

}
