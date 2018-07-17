import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Loading, LoadingController} from "ionic-angular";

@Injectable()
export class UtilityProvider {

  public loading: Loading;

  constructor(public http: HttpClient,
              public loadingCtrl: LoadingController) {
  }

  // Loading Controller
  displayLoading() {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });
    this.loading.present();
  }

  dismissLoading(callback = () => {
  }) {
    if (this.loading) {
      this.loading.dismiss();
      this.loading.onDidDismiss(callback)
    }
  }

}
