const exampleString = 'Я не такі як гэта маленькая дзяўчынка, якая баіцца заразіцца бацыйлай прапаганды.Куды падзелася мілая дзяўчына, якая хавае сваё габрэйскае паходжанне?';

const cyrillicAlphabet = ['а', 'б', 'в', 'г', 'д',  'е',  'ё', 'ж', 'з', 'і', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'н', 'ў', 'ф',  'х', 'ц', 'ч', 'ш', 'ы', 'ь', 'э',  'ю',  'я'];
const latinVersion =     ['a', 'b', 'v', 'h', 'd', 'je', 'jo', 'ž', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'n', 'ǔ', 'f', 'ch', 'c', 'č', 'š', 'y', '@', 'e', 'ju', 'ja'];

const latinAdition = [ 'ł', 'ń', 'ś', 'š', 'dz', 'dź','dž', 'ź']

class Lacinka {
  constructor(htmlString) {
    this.cyrilicAlpabet = ['а', ]
    this.htmlString = htmlString;
    this.specialSymbolPattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,./{}|\\":<>\?]/);
  }

  latinizeStr(cyrillicStr) {
    console.log(cyrillicStr);
    let latinStr = '';

    for (let i = 0; i < cyrillicStr.length; i++) {
      // latinStr = latinStr + latinVersion[cyrillicAlphabet.indexOf()];
      latinStr = latinStr + this.latinizeSymbol(cyrillicStr[i]);
    }
    return latinStr;
  }



  latinizeSymbol(symbol) {
    let symbolType = this.getSymbolType(symbol);

    if (symbolType  === 'number') {
      return symbol;
    }
    else if (symbolType === 'special-symbol') {
      return symbol;
    }
    else if (symbolType  === 'upper') {
      return this.capitalizeFirstLetter(latinVersion[cyrillicAlphabet.indexOf(symbol.toLowerCase())]);
    }
    else if (symbolType  === 'lower') {
      if (latinVersion[cyrillicAlphabet.indexOf(symbol)] === undefined) {
        throw 'Unknown symbol in cyrillicAlphabet';
      } else {
        return latinVersion[cyrillicAlphabet.indexOf(symbol)];
      }

    } else {
      console.log('unknown symbol detected: ' + symbol);
    }
  }

  getSymbolType(symbol) {
    if (!isNaN(symbol * 1)) {
      console.log('number: ' + symbol);
      return 'number';
    } else if (this.specialSymbolPattern.test(symbol)) {
      return 'special-symbol';
    }
    else {
      if (symbol == symbol.toUpperCase()) {
          console.log('upper case true: ' + symbol);
          return 'upper';
      }
      if (symbol == symbol.toLowerCase()) {
          console.log('lower case true: ' + symbol);
          return 'lower';
      }
    }
  }

  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }


}

var latinizator = new Lacinka(exampleString);

console.log(latinizator.latinizeStr(exampleString))
