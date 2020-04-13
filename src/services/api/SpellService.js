import ApiService from "./ApiService";

class SpellService extends ApiService {
    check = (text) => {
        return new Promise((resolve, reject) => {
            this.requestWithAuth('/spell/check', {text: this.prepareData(text)}, 'POST')
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    };

    prepareData(text) {
        let matches = text.match(/(<[^]+?>)|(.*?)(?=<)|(.+)/gm) || [ text ];

        matches = matches.filter(match => match !== '&nbsp;');

        return {
            "annotation": matches.map(match => {
                if (match.startsWith('<')) {
                    return {
                        "markup": match
                    };
                } else {
                    return {
                        "text": match.replace('&nbsp;', '')
                    }
                }
            })
        };
    };
}

export default new SpellService();
