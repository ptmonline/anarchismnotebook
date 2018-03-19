import { Injectable } from "@angular/core";

@Injectable()
export class QuoteHelper {
    constructor() { }

    shuffle(array: string[]): string[] {
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

    getRandomClass(length?: number, added?: number): string {
        return "randclass randclass-" + (Math.floor(Math.random() * length) + added);
    }

    getHeight() {
        let quoteHeight = document.getElementById('center-quote');
        console.log(quoteHeight.clientHeight);
    }
}