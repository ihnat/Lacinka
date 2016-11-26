const exampleString = 'Я не такі як гэта маленькая дзяўчынка, якая баіцца заразіцца бацыйлай прапаганды.Куды падзелася мілая дзяўчына, якая хавае сваё габрэйскае паходжанне?';

const cyrillicAlphabet = ['а', 'б', 'в', 'г', 'д',  'e',  'ё', 'ж', 'з', 'і', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'н', 'ў', 'ф',  'х', 'ц', 'ч', 'ш', 'ы', 'ь', 'э',  'ю',  'я'];
const latinVersion =  ['a', 'b', 'v', 'h', 'd', 'je', 'jo', 'ž', 'z', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'n', 'ǔ', 'f', 'ch', 'c', 'č', 'š', 'y', '@', 'e', 'ju', 'ja'];

const latinAdition = [ 'ł', 'ń', 'ś', 'š', 'dz', 'dź','dž', 'ź']

class Latinca {
  constructor(htmlString) {
    this.cyrilicAlpabet = ['а', ]
    this.htmlString = htmlString;
  }
  latinize(cyrillicStr) {
    let latinStr = '';
    for (let i = 0; i < cyrillicStr.length; i++) {
      latinStr = latinStr + latinVersion[cyrillicAlphabet.indexOf(cyrillicStr[i])];
    }
    return latinStr;
  }
}

var latinizator = new Latinca(exampleString);

console.log(latinizator.latinize(exampleString))



function isLowercaseLetter(symbol) {
  if (!isNaN(character * 1)) {
    alert("numberic: " + symbol);
    return false;
  }
  else {
    if (character == character.toUpperCase()) {
        alert ('upper case true: ' + symbol);
        return false;
    }
    if (character == character.toLowerCase()) {
        alert ('lower case true: ' + symbol);
        return true;
    }
  }
}
