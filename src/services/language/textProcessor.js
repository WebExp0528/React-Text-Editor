import {split} from "sentence-splitter";

export class TextProcessor {
    static get readabilityLevels() {
        return {
            great: {
                name: 'Great',
                color: '#35B986'
            },
            good: {
                name: 'Good',
                color: '#35B986'
            },
            ok: {
                name: 'Ok',
                color: '#FBC512'
            },
            poor: {
                name: 'Poor',
                color: '#FF6060'
            }
        };
    };

    static get maxScore() {
        return 14;
    };


    getSentences(text) {
        return split(text).filter(item => item.type === "Sentence");
    }

    countWords(text) {
        return (text.match(/(\w+)/g) || []).length;
    }

    getReadTime(numberOfWords) {
        return Math.ceil(numberOfWords / 265);
    }

    getReadabilityInfo(readability) {
        let levelOfReadability = TextProcessor.readabilityLevels.great;
        let scoreOfReadability = 1;

        if (readability > 6) scoreOfReadability = 2;
        if (readability > 7) scoreOfReadability = 3;
        if (readability > 9) scoreOfReadability = 4;
        if (readability > 10) scoreOfReadability = 5;
        if (readability > 11) scoreOfReadability = 6;
        if (readability > 12) scoreOfReadability = 7;
        if (readability > 13) scoreOfReadability = 8;
        if (readability > 14) scoreOfReadability = 9;
        if (readability > 15) scoreOfReadability = 10;
        if (readability > 16) scoreOfReadability = 11;
        if (readability > 17) scoreOfReadability = 12;
        if (readability > 18) scoreOfReadability = 13;
        if (readability > 24) scoreOfReadability = 14;

        if (scoreOfReadability >= 7 && scoreOfReadability <= 9) levelOfReadability = TextProcessor.readabilityLevels.good;
        if (scoreOfReadability >= 10 && scoreOfReadability <= 12) levelOfReadability = TextProcessor.readabilityLevels.ok;
        if (scoreOfReadability >= 13) levelOfReadability = TextProcessor.readabilityLevels.poor;


        return {
            levelOfReadability,
            scoreOfReadability
        };
    }

    extractText(s, space) {
        var span= document.createElement('span');
        span.innerHTML= s;
        if(space) {
            var children= span.querySelectorAll('*');
            for(var i = 0 ; i < children.length ; i++) {
                if(children[i].textContent)
                    children[i].textContent+= ' ';
                else
                    children[i].innerText+= ' ';
            }
        }
        return [span.textContent || span.innerText].toString().replace(/ +/g,' ');
    };
}

export default new TextProcessor();
