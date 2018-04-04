import { Injectable } from "@angular/core";

@Injectable()
export class QuoteHelper {
    constructor() { }

    shuffle(array: string[]): string[] {
        let currentIndex: number = array.length,
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

    getRandomClass(length?: number, added?: number): string {
        return "randclass randclass-" + (Math.floor(Math.random() * length) + added);
    }

    getHeight() {
        let quoteHeight: HTMLElement = document.getElementById('center-quote');
        console.log(quoteHeight.clientHeight);
    }

    createSpanClass(content: string){ //REVIEW TO DO
        let textlong: string = content;
        let textarray: string[] = textlong.split(" ");
        let x: number = 0;
        while(x <= (Math.floor(Math.random() * textarray.length)/ 2)){
          let n: number = Math.floor(Math.random() * textarray.length)
          textarray[n] = '<span>'+textarray[n]+'</span>';
          x++;
        }
    }
}