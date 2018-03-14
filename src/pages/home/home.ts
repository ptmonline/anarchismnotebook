import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../providers/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public allQuotes: any;
  public showQuote: any;
  public author: string;
  public text: string;
  public id: number;
  public subtext: string;
  public extract: string;
  public src: any;
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

  chooseQuote() {
    this.showQuote = this.allQuotes.quotes[Math.floor(Math.random() * this.allQuotes.quotes.length)];
    this.rndClass = "randclass randclass-" + (Math.floor(Math.random() * 2) + 1);
    console.log(this.rndClass);
    console.log(this.showQuote);
    if (this.showQuote.img == null) {
      this.id = this.showQuote.id;
      this.author = this.showQuote.author;
      this.text = this.showQuote.text;
      this.src = null;
      (this.showQuote.extract) ? this.extract = this.showQuote.extract : this.extract = null;
      (this.showQuote.subtext) ? this.subtext = this.showQuote.subtext : this.subtext = null;
    } else {
      this.src = './assets/imgs/' + this.showQuote.img;
      this.scrClass = this.showQuote.class;
      this.rndClass = "bigimage bigimage-" + this.showQuote.id;
      console.log(this.rndClass);
      // this.getHeight();
    }
  }

  getHeight() {
    setTimeout(() => {
      let imageHeight = document.getElementById('imgId');
      let newHeight = ((window.innerHeight - imageHeight.clientHeight) / 2) - 16 ;
      imageHeight.style.marginTop = newHeight.toString() + 'px';
    }, 50)
  }

}
