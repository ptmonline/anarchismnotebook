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
  public quotesArray: any = [];

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

  swipeEvent(ev?: any){
    if(ev) console.log('DIRECTION: ',ev.direction);
    if(ev.direction == 2) this.chooseQuote();
    if(ev.direction == 4) this.choosePreviousQuote();
  }

  chooseQuote(): void {

    this.showQuote = this.allQuotes.quotes[Math.floor(Math.random() * this.allQuotes.quotes.length)];
    this.quotesArray.push(this.showQuote.id);
    console.log(this.quotesArray)
      this.src = false;
      this.scrClass = null;
      let quoter = this.showQuote.text;
      console.log('LENGTH: ', quoter.length);
      if (quoter.length <= 250 && this.showQuote.extract != null) {
        this.rndClass = this.getRandomClass2();
      }else{
        this.rndClass = this.getRandomClass();
      }
      console.log(this.rndClass);
    
  }

  choosePreviousQuote(){
    if(this.quotesArray == null || this.quotesArray == 'empty'){
      return null;
    }else{
      console.log('QUOTE PREV: ', this.quotesArray[this.quotesArray.length -1]);
      this.showQuote = this.allQuotes.quotes[this.quotesArray.length -2];
      console.log('PREV: ', this.showQuote);
      this.quotesArray.pop();
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
