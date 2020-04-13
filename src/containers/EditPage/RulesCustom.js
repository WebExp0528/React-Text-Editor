import CustomAdverbs from './customAdvers';
import CustomSimple from './simpleAlternatives';
import CustomBold from './customBold';

const re = new RegExp('\\b(' + CustomAdverbs.join('|') + ')(?!\\B|-)', 'gi');
const reSimple = new RegExp('\\b(' + CustomSimple.map(item => Object.keys(item).pop()).join('|') + ')(?!\\B|-)', 'gi');
const reBold = new RegExp('\\b(' + CustomBold.join('|') + ')(?!\\B|-)', 'gi');

window.re = reSimple;

export default {
  customadverbs: {
    fn: function (text) {
      let suggestions = [];
      let match = re.exec(text);
      while (match) {
        if (text[match.index - 1] !== '-') {
          suggestions.push({
            index: match.index,
            offset: match[1].length,
            reason: `"${match[1]}" can weaken meaning`
          });
        }

        match = re.exec(text)
      }
      return suggestions;
    }
  },
  customsimple: {
    fn: function (text) {
      let suggestions = [];
      let match = reSimple.exec(text);
      while (match) {
        try {
          let res = match[1].toLowerCase();
          if (text[match.index - 1] !== '-') {
            suggestions.push({
              index: match.index,
              offset: res.length,
              reason: `"${match[1]}" unneeded`,
              replacements: CustomSimple.find(item => Object.keys(item).pop().toLowerCase() === res)[res].split(', ') //eslint-disable-line
            });
          }
        } catch (e) {
          console.log(e);
        }

        match = reSimple.exec(text)
      }

      return suggestions;
    }
  },
  custombold: {
    fn: function (text) {
      let suggestions = [];
      let match = reBold.exec(text);
      while (match) {
        if (text[match.index - 1] !== '-') {
          suggestions.push({
            index: match.index,
            offset: match[1].length,
            reason: `"${match[1]}" bold`
          });
        }
        match = reBold.exec(text)
      }

      return suggestions;
    }
  }
}
