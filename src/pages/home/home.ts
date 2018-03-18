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
  public rndClass: string;
  public scrClass: string;
  public quotesArrayInit: any = [];
  public quotesArray: any = [];
  public n: number = 0;
  public state4: boolean = false;

  constructor(public navCtrl: NavController, private _api: Api) {
    this.init();
  }

  init() {
    this._api.get('quotes.json').subscribe((data) => {
      this.allQuotes = data;
      this.quotesArrayInit = this.shuffle(this.allQuotes.quotes);
      this.chooseQuoteInit();
    })
  }

  chooseQuoteInit() {
    this.showQuote = this.quotesArrayInit[this.n];
    this.quotesArray.push(this.showQuote.id);
    this.buildQuote();
  }

  nextQuote() {
    this.n += 1;
    this.showQuote = this.quotesArrayInit[this.n];
    if (this.quotesArray.indexOf(this.showQuote.id) < 0) this.quotesArray.push(this.showQuote.id);
    console.log(this.quotesArray);
    this.buildQuote();
  }
  prevQuote() {
    this.n -= 1;
    (this.n >= 0) ? this.showQuote = this.quotesArrayInit[this.n] : this.showQuote = this.quotesArrayInit[0]
    this.buildQuote();
  }

  swipeEvent(ev?: any) {
    if (ev) console.log('DIRECTION: ', ev.direction);
    if (ev.direction == 2) this.nextQuote();
    if (ev.direction == 4) this.prevQuote();
  }

  buildQuote() {

    this.scrClass = null;
    let quoter = this.showQuote.text;
    if (quoter.length <= 250 && this.showQuote.extract != null) {
      this.rndClass = this.getRandomClass2();
      console.log(this.rndClass);
      if (this.rndClass == 'randclass randclass-5') {
        this.state4 = true;
        console.log("STATE 4 ACTIVATED");
      } else {
        this.state4 = false;
      }
    } else {
      this.rndClass = this.getRandomClass();
      this.state4 = false;
    }
  }

  getRandomClass() {
    return "randclass randclass-" + (Math.floor(Math.random() * 2) + 1);
  }

  getRandomClass2() {
    return "randclass randclass-" + (Math.floor(Math.random() * 3) + 3);
  }

  getHeight() {

    let quoteHeight = document.getElementById('center-quote');
    console.log(quoteHeight.clientHeight);

  }

  shuffle(array: string[]) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
