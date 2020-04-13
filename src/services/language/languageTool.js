import config from '../../config/languageTool';
import axios from "axios";

class LanguageTool {
    check(text) {
        const requestBody = {
            data: JSON.stringify(this.prepareData(text)),
            language: 'en-US',
            enabledCategories: 'TYPOS',
            disabledCategories: 'TYPOGRAPHY',
            username: config.username,
            apiKey: config.apiKey
        };

        const data = Object.entries(requestBody)
            .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
            .join('&');

        const requestConfig = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };

        return new Promise((resolve, reject) => {
            axios.post('https://api.languagetoolplus.com/v2/check', data, requestConfig)
                .then(({ data: result }) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                })
        })
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

export default new LanguageTool();
