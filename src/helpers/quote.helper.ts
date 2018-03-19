import { Injectable } from "@angular/core";

@Injectable()
export class QuoteHelper {
    constructor() { }

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
}