import {Component} from '@angular/core';
import {NewsPage} from '../news/news';
import {HomePage} from '../home/home';
import {AboutPage} from "../about/about";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = NewsPage;
  tab3Root = AboutPage;

  constructor() {
  }
}
