import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IHolding} from "../../providers/holdings/holdings.interface";
import {QuoteProvider} from "../../providers/quote/quote.provider";
import {TabsPage} from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-coin-info',
  templateUrl: 'coin-info.html',
})
export class CoinInfoPage {

  holding: IHolding;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public quoteProvider: QuoteProvider) {

    this.holding = this.navParams.get("holding");
  }

  ionViewDidLoad() {
    if (!this.navCtrl.canGoBack()) this.backToHomePage();
  }

  getIconImage(id: number): string {
    return this.quoteProvider.getIcon(id, 64);
  }

  backToHomePage() {
    this.navCtrl.setRoot(TabsPage).then(() => this.navCtrl.popToRoot());
  }
}
