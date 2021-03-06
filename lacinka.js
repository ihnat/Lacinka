const cyrillicAlphabet = ['а', 'б', 'в', 'г', 'д', 'ж', 'з', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'н', 'ў', 'ф',  'х', 'ц', 'ч', 'ш', 'ы', 'ь', 'э'];
const latinVersion =     ['a', 'b', 'v', 'h', 'd', 'ž', 'z', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'n', 'ǔ', 'f', 'ch', 'c', 'č', 'š', 'y', '@', 'e'];

const softVowelsCyrillic = [  'е',  'ё', 'і',  'ю',  'я'];
const softVowelsLatin =    [ 'je', 'jo', 'i', 'ju', 'ja'];

const latinAdition = [ 'ł', 'ń', 'ś', 'š', 'dz', 'dź','dž', 'ź']

class Lacinka {
  constructor() {
    this.specialSymbolPattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,./{}|\\":<>\?]/);
    this.latinPattern = new RegExp(/[A-z\u00C0-\u00ff]+/g);
    this.cyrillicPattern = new RegExp(/[\u0400-\u04FF]/);

    let textNodes = this.getTextNodes();

    textNodes.forEach((textNode, i) => {
      textNode.nodeValue = this.latinizeStr(textNode.textContent);
    });
  }

  latinizeStr(cyrillicStr) {
    console.log(cyrillicStr);
    let latinStr = '';

    for (let i = 0; i < cyrillicStr.length; i++) {
      latinStr = latinStr + this.latinizeSymbol(cyrillicStr, i);
    }
    return latinStr;
  }

  latinizeSymbol(cyrillicStr, symbolNum) {
    let symbol = cyrillicStr[symbolNum];
    let symbolType = this.getSymbolType(symbol);

    if (!this.cyrillicPattern.test(symbol)) {
      return symbol;
    }

    else if (symbolType  === 'upper') {
      let alphabetIndex = cyrillicAlphabet.indexOf(symbol.toLowerCase());
      return this.capitalizeFirstLetter(latinVersion[alphabetIndex]);
    }
    else if (symbolType  === 'lower') {
        return latinVersion[cyrillicAlphabet.indexOf(symbol)];
    } else {
      console.log('unknown symbol detected: ' + symbol);
    }
  }

  getSymbolType(symbol) {
    if (symbol == symbol.toUpperCase()) {
        return 'upper';
    }
    if (symbol == symbol.toLowerCase()) {
        return 'lower';
    }
  }

  getTextNodes() {
    var n,
        a = [],
        walk = document.createTreeWalker( document.body,NodeFilter.SHOW_TEXT,null,false);

    while ( n = walk.nextNode()) {
      a.push(n);
    }
    return a;
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}


window.addEventListener('load', function() {
  const latinizator = new Lacinka();
});
