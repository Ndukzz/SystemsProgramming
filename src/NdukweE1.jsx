/* 
---------------------------------------
Name: Chukwuebuka Ndukwe
Student ID: 101165460
Assignment 1
---------------------------------------
**/

import BinarySearchTree from "./BinaryTree";

class NdukweE1 {
  constructor(fileContent) {
    this.BSTree = new BinarySearchTree();  // Binary search tree to store symbols, values, and flags
    this.fileContent = fileContent;        // File content to be parsed
    this.currPos = 0;                      // Current position in the file content
    this.currChar = this.fileContent[this.currPos];  // Current character being processed
    this.symbol = "";                      // Placeholder for the symbol being processed
    this.value = "";                       // Placeholder for the value being processed
    this.RFlag = 0;                        // RFlag, initially set to 0
    this.IFlag = 1;                        // IFlag, initially set to 1
    this.MFlag = 1;                        // MFlag, initially set to 1
  }

  // Parses the entire program by reading symbols, values, and flags from fileContent
  parseProgram() {
    while (this.currPos < this.fileContent.length) {
      // Loop through file content until the end of file (EOF)
      let symbols = this.parseSymbol();    // Parse and validate symbol
      let values = this.parseValue();      // Parse and validate value
      let RFlags = this.parseRFlag();      // Parse and validate RFlag

      // If both value and RFlag are valid, insert into the symbol table
      if (values.validValue === true && RFlags.flag === true) {
        this.insertSymbolTable(
          symbols.storedSymbol,            // Insert symbol
          values.value,                    // Insert value
          RFlags.RFlag                     // Insert RFlag
        );
      }
    }

    // Output the contents of the binary search tree in tabular format
    this.BSTree.view();

    // Reset internal variables after processing
    this.fileContent = "";
    this.currPos = 0;
    this.symbol = "";
    this.value = "";
    this.RFlag = 0;
    this.IFlag = 1;
    this.MFlag = 1;
  }

  // Parse command line arguments and search for symbols in the tree
  parseSearch(argList) {
    for (let index = 0; index < argList.length; index++) {
      this.search(argList[index]);  // Search for each symbol in the argument list
    }
  }

  // Parse and validate a symbol from the file content
  parseSymbol() {
    let symbol = this.consume();    // Extract a symbol (lexeme)
    this.symbol = symbol;
    let validSymbol = this.validateSymbol(symbol);  // Validate the symbol
    this.symbol = validSymbol.storedSymbol;
    return { ...validSymbol };
  }

  // Parse and validate a value from the file content
  parseValue() {
    let value = this.consume();     // Extract a value (lexeme)
    this.value = value;
    let validValue = this.validateValue(value);  // Validate the value
    if (validValue) {
      this.value = value;
    }
    return { value, validValue };
  }

  // Parse and validate the RFlag from the file content
  parseRFlag() {
    let RFlag = this.consume();     // Extract an RFlag (TRUE or FALSE)
    let validRFlag = this.validateRFlag(RFlag);  // Validate the RFlag
    if (validRFlag.RFlag == "TRUE") {
      RFlag = true;
    } else {
      RFlag = false;
    }
    return { ...validRFlag };
  }

  // Insert a symbol into the binary search tree if it is valid and not already present
  insertSymbolTable(symbol, value, RFlag) {
    let search = this.BSTree.search(symbol);  // Search if the symbol already exists in the tree
    if (search) {
      console.error(`Symbol ${symbol} previously defined`);  // Error if symbol already exists
    } else {
      this.BSTree.insert(symbol, value, RFlag);  // Insert new symbol into the tree
    }
  }

  // Search for a symbol in the binary search tree
  search(symbol) {
    let shortSymbol = this.validateSymbol(symbol);  // Validate the symbol before searching
    let result = this.BSTree.search(shortSymbol.storedSymbol);  // Search the binary search tree
    if (shortSymbol.flag === true) {
      if (result) {
        console.log(`Symbol found: ${result.symbol}`);  // Symbol found
      } else {
        console.log("Symbol ", symbol, " not found in Table");  // Symbol not found
      }
    }
  }

  // Validate the symbol: must be <= 10 characters, start with a letter, and contain valid characters
  validateSymbol(symbol) {
    let flag = true;
    if (symbol.length > 10) {
      console.error(symbol + " cannot be longer than 10 characters.");
      flag = false;
    }
    if (!/^[a-zA-Z]/.test(symbol)) {
      console.error(symbol + " invalid, Symbol must start with a letter.");
      flag = false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(symbol)) {
      console.error(symbol + " is invalid, can only contain letters, digits, and underscores.");
      flag = false;
    }

    // Convert to uppercase and store only the first 4 characters
    const storedSymbol = symbol.toUpperCase().substr(0, 4);

    return { storedSymbol, flag };
  }

  // Validate the value: must be an integer, not a floating-point number
  validateValue(value) {
    const regex = /^([+-]?)0*([1-9][0-9]*|0)$/;  // Regular expression for validating integers
    const regexTest = regex.test(value);
    if (!regexTest && value % 1 !== 0) {
      console.error("The value ", value, " is not valid!");
    }
    return regex.test(value);
  }

  // Validate the RFlag: must be either TRUE or FALSE
  validateRFlag(RFlag) {
    let flag = true;
    if (RFlag === "FALSE" || RFlag === "TRUE") {
    } else {
      flag = !flag;
      console.error(`Error - invalid RFlag ${RFlag}`);
    }
    return { RFlag, flag };
  }

  // The consume() function extracts and returns the current lexeme (symbol, value, or RFlag)
  consume() {
    let scannedLex = "";

    while (this.currPos < this.fileContent.length) {
      let adv = this.advance();     // Get the next character
      if (this.isWhiteSpace(this.currChar) || this.isNewline(this.currChar)) {
        scannedLex += adv;
        break;
      } else if (this.currChar === ":") {
        scannedLex += adv;
        break;
      } else {
        scannedLex += adv;
      }
    }

    if (this.isWhiteSpace(scannedLex) || this.isNewline(scannedLex) || scannedLex === "") {
      scannedLex = "";
      let lex = this.consume();
      scannedLex = lex.replace(/\s+/g, "");  // Remove whitespace
    }
    this.advance();
    scannedLex = scannedLex.toUpperCase();  // Convert to uppercase for consistency
    return scannedLex;
  }

  // Move to the next character in the file content
  advance() {
    let lex = this.currChar;
    this.currPos++;
    this.currChar = this.fileContent[this.currPos];
    return lex;
  }

  // Helper functions to identify whitespace and newline characters
  isWhiteSpace = (char) => {
    return char === " " || char === "\t" || char === "\v" || char === "\f";
  };

  isNewline = (char) => {
    return char === "\n" || char === "\r";
  };
}

export default NdukweE1;
