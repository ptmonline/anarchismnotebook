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
      let quoter = this.showQuote.text;
      console.log('LENGTH: ', quoter.length);
      if (quoter.length <= 350 && this.showQuote.extract != null) {
        this.rndClass = this.getRandomClass2();
      }else{
        this.rndClass = this.getRandomClass();
      }
      console.log(this.rndClass);
      setTimeout(()=>{
        this.getHeight();
      }, 100)
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

  getRandomClass2() {
    return "randclass randclass-" + (Math.floor(Math.random() * 2) + 3);
  }

  getHeight() {
    
      let quoteHeight = document.getElementById('center-quote');
      console.log(quoteHeight.clientHeight)
      // let newHeight = ((window.innerHeight - quoteHeight.clientHeight) / 2) - 16;
      // imageHeight.style.marginTop = newHeight.toString() + 'px';
 
  }

}
