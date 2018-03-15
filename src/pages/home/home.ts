import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../providers/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public allQuotes: any;
  public showQuote: Api.Client.Quote;
  public src: boolean;
  public rndClass: string;
  public scrClass: string;

  constructor(public navCtrl: NavController, private _api: Api) {
    this.init();
  }

  init() {
    this._api.get('quotes.json').subscribe((data) => {
      this.allQuotes = data;
      this.chooseQuote();
      console.log(this.allQuotes.quotes);
    })
  }

  chooseQuote(): void {
    this.showQuote = this.allQuotes.quotes[Math.floor(Math.random() * this.allQuotes.quotes.length)];
    if (this.showQuote.img == null) {
      this.src = false;
      this.scrClass = null;
      (this.showQuote.id >= 251) ? this.rndClass = "randclass randclass-3" : this.rndClass = this.getRandomClass();
    } else {
      this.src = true;
      this.scrClass = this.showQuote.title;
      this.rndClass = "bigimage bigimage-" + this.showQuote.id;
      console.log(this.rndClass);
    }
  }

  getRandomClass() {
    return "randclass randclass-" + (Math.floor(Math.random() * 2) + 1);
  }

  getHeight() {
    setTimeout(() => {
      let imageHeight = document.getElementById('imgId');
      let newHeight = ((window.innerHeight - imageHeight.clientHeight) / 2) - 16;
      imageHeight.style.marginTop = newHeight.toString() + 'px';
    }, 50)
  }

}
