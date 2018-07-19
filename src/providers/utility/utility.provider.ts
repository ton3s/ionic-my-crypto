import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Loading, LoadingController, Platform} from "ionic-angular";
import {InAppBrowser} from '@ionic-native/in-app-browser';

@Injectable()
export class UtilityProvider {

  public loading: Loading;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController,
              public platform: Platform,
              public inAppBrowser: InAppBrowser) {
  }

  // Loading Controller
  displayLoading() {
    if (!this.loading) {
      this.loading = this.loadingCtrl.create({
        spinner: 'crescent'
      });
      this.loading.present();
    }
  }

  dismissLoading(callback = () => {
  }) {
    if (this.loading) {
      this.loading.dismiss();
      this.loading.onDidDismiss(callback);
      this.loading = null;
    }
  }

  openBrowser(url: string, target: string = '_blank', callback = () => {
  }) {
    let inAppBrowserRef = this.inAppBrowser.create(url, target, 'location=no,enableViewportScale=yes');
    if (this.platform.is('cordova')) {
      inAppBrowserRef.on('exit').subscribe(() => callback());
    }
  }

}
