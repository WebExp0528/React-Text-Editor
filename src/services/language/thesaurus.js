import config from '../../config/thesaurus';
import axios from "axios";

class Thesaurus {
    pool = {};

    getRawSynonyms(word) {
        return new Promise((resolve, reject) => {
            if (typeof this.pool[word] !== 'undefined') {
                return resolve(this.pool[word]);
            }

            axios.get(`${config.apiLink}/${word}/json`)
                .then(data => {
                    this.pool[word] = data;

                    return resolve(data);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }

    getSynonyms(word, count=null) {
        return this.getRawSynonyms(word)
            .then(({data}) => {
                let synonyms = [];

                for (let block in data) {
                    if (typeof data[block].syn !== 'undefined') {
                        synonyms = synonyms.concat(data[block].syn);
                    }
                }

                return count === null ? synonyms : synonyms.slice(0, count);
            });
    }

    getShorterSynonym(word) {
        return this.getSynonyms(word)
            .then(synonyms => {
                return synonyms.reduce((a, b) => a.length <= b.length ? a : b);
            });
    }
}

export default new Thesaurus();
