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

  constructor(public navCtrl: NavController, private _api: Api) {
    this.init();
  }

  init(){
    this._api.get('quotes.json').subscribe((data)=>{
      this.allQuotes = data;
      this.chooseQuote();
      console.log(this.allQuotes.quotes);
    })
  }

  chooseQuote(){
    this.showQuote = this.allQuotes.quotes[Math.floor(Math.random() * this.allQuotes.quotes.length)];
    console.log(this.showQuote);
    this.author = this.showQuote.author;
    this.text = this.showQuote.text;
  }

}
