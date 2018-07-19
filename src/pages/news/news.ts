import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {NewsProvider} from "../../providers/news/news.provider";

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {

  news = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public newsProvider: NewsProvider) {
  }

  ionViewDidLoad() {
    this.newsProvider.getNews().then(news => this.news = news);
  }

}
