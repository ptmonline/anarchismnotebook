import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../providers/api';
import { QuoteHelper } from '../../helpers/quote.helper';

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
  public transformedquote: string;

  constructor(public navCtrl: NavController, private _api: Api, public _quoteHelper: QuoteHelper) {
    this.init();
  }

  init() {
    this._api.get('quotes.json').subscribe((data) => {
      this.allQuotes = data;
      this.quotesArrayInit = this._quoteHelper.shuffle(this.allQuotes.quotes);
      this.chooseQuoteInit();
    })
  }

  chooseQuoteInit(): void {
    this.showQuote = this.quotesArrayInit[this.n];
    this.quotesArray.push(this.showQuote.id);
    this.buildQuote();
  }

  nextQuote(): void {
    this.n += 1;
    this.showQuote = this.quotesArrayInit[this.n];
    if (this.quotesArray.indexOf(this.showQuote.id) < 0) this.quotesArray.push(this.showQuote.id);
    console.log(this.quotesArray);
    this.buildQuote();
  }
  prevQuote(): void {
    this.n -= 1;
    (this.n >= 0) ? this.showQuote = this.quotesArrayInit[this.n] : this.showQuote = this.quotesArrayInit[0]
    this.buildQuote();
  }

  swipeEvent(ev?: any): void {
    if (ev.direction == 2) this.nextQuote();
    if (ev.direction == 4) this.prevQuote();
  }

  buildQuote(): void {
    this.scrClass = null;
    let quoter = this.showQuote.text;
    if (quoter.length <= 250 && this.showQuote.extract != null) {
      this.rndClass = this._quoteHelper.getRandomClass(3,3);
      if (this.rndClass == 'randclass randclass-5') {
        this.state4 = true;
      } else {
        this.state4 = false;
      }
      this.transformedquote = null
    } else {
      this.rndClass = this._quoteHelper.getRandomClass(2, 1);
      this.state4 = false;
      this.transformedquote = null;
      if(this.rndClass === 'randclass randclass-2'){
        let textlong = this.showQuote.text;
        let textarray = textlong.split(" ");
        let x = 0;
        while(x <= (Math.floor(Math.random() * textarray.length)/ 2)){
          let n = Math.floor(Math.random() * textarray.length)
          textarray[n] = '<span>'+textarray[n]+'</span>';
          x++;
          this.transformedquote = textarray.join(' ');
        }
      }
    }
  }
}
