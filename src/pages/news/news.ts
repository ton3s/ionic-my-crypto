import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NewsProvider} from "../../providers/news/news.provider";
import {UtilityProvider} from "../../providers/utility/utility.provider";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsProvider: NewsProvider,
              public utilityProvider: UtilityProvider) {
  }

  ionViewDidLoad() {
    this.loadNews();
  }

  articleDescription(body: string) {
    let bodyLength = 110;
    return body.length < bodyLength ? body :  body.substr(0, 110) + "...";

  }

  refreshHoldings(refresher) {
    this.loadNews(refresher);
  }

  loadNews(refresher?) {
    this.utilityProvider.displayLoading();
    this.newsProvider.getNews().then(news => {
      this.news = news;
      if (refresher) refresher.complete();
      this.utilityProvider.dismissLoading();
    }).catch(_ => this.utilityProvider.dismissLoading());
  }
}
