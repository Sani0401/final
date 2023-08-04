function customParseJsonWithArbitraryPrecision(jsonString) {
    let index = 0;
  
    function parseValue() {
      skipWhiteSpace();
  
      if (jsonString[index] === '{') {
        return parseObject();
      } else if (jsonString[index] === '[') {
        return parseArray();
      } else if (jsonString[index] === '"') {
        return parseString();
      } else if (jsonString[index] === '-' || isDigit(jsonString[index])) {
        return parseNumber();
      } else if (jsonString.startsWith('true', index)) {
        index += 4;
        return true;
      } else if (jsonString.startsWith('false', index)) {
        index += 5;
        return false;
      } else if (jsonString.startsWith('null', index)) {
        index += 4;
        return null;
      } else {
        throw new Error('Invalid JSON string');
      }
    }
  
    function parseObject() {
      const obj = {};
  
      index++; 
      while (jsonString[index] !== '}') {
        skipWhiteSpace();
        const key = parseString();
        skipWhiteSpace();
        if (jsonString[index] !== ':') {
          throw new Error('Invalid JSON string: Expected ":"');
        }
        index++; 
        const value = parseValue();
        obj[key] = value;
        skipWhiteSpace();
  
        if (jsonString[index] === ',') {
          index++;
        } else if (jsonString[index] !== '}') {
          throw new Error('Invalid JSON string: Expected "," or "}"');
        }
      }
  
      index++;
      return obj;
    }
  
    function parseArray() {
      const arr = [];
  
      index++; 
      while (jsonString[index] !== ']') {
        skipWhiteSpace();
        const value = parseValue();
        arr.push(value);
        skipWhiteSpace();
  
        if (jsonString[index] === ',') {
          index++; 
        } else if (jsonString[index] !== ']') {
          throw new Error('Invalid JSON string: Expected "," or "]"');
        }
      }
  
      index++; 
      return arr;
    }
  
    function parseString() {
      let str = '';
      index++;   
      while (jsonString[index] !== '"') {
        if (jsonString[index] === '\\') {
     
          const nextChar = jsonString[index + 1];
          if (nextChar === 'n') {
            str += '\\n'; 
          } else if (nextChar === 't') {
            str += '\\t'; 
          } else {
            str += jsonString[index]; 
          }
          index++;
        } else {
          str += jsonString[index];
        }
        index++;
      }
    
      index++; 
      return str;
    }
  
    function parseNumber() {
      let numberValue = '';
      while (
        jsonString[index] === '-' ||
        jsonString[index] === '.' ||
        isDigit(jsonString[index])
      ) {
        numberValue += jsonString[index];
        index++;
      }
  
     return numberValue;
    }
  
    function isDigit(char) {
      return char >= '0' && char <= '9';
    }
  
    function skipWhiteSpace() {
      while (
        index < jsonString.length &&
        (jsonString[index] === ' ' ||
          jsonString[index] === '\n' ||
          jsonString[index] === '\r' ||
          jsonString[index] === '\t')
      ) {
        index++;
      }
    }
  
    return parseValue();
  }
  
 
  const jsonString = '{ "sign" : "\t" ,"name": "John", "age": 30, "salary": 1000001234567895555555555555555555555555555554444444444444545454545455454545455499999999999999999999999999990, "height": 1.2222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222211111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000000000000001, "Exclamation" : "!@#4343ewereed", "grades": [95, 88, 91.5], "visa" : true}';
  

  const parsedObject = customParseJsonWithArbitraryPrecision(jsonString);

  console.log(parsedObject);
  