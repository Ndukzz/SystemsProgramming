

class Parser {
  constructor(tokens) {
 
    // this.hashTable = new HashTable();
    //  Create a binary search table to replace the hashTable
  }

  // -------------- This is a sample for the parseProgram method ------------
  // parseProgram() {
  //   this.consume("moduleT"); // Consume "moduleT"
  //   this.consume("idT"); // Consume module name
  //   this.consume("semicolonT"); // Consume semicolon
  //   this.depth++;
  //   // //  console.log(this.depth);
  //   this.DeclarativePart();
  //   this.StatementPart();
  //   this.parseEndToken();
  //   this.consume("idT");
  //   let list = this.hashTable.writeTable(this.depth);
  //   this.depth--;
  //   console.log(this.mainStack);
  //   console.log(this.threeAddressCode);
  //   return this.threeAddressCode;
  // }
  // -------------- This is a sample for the parseProgram method ------------

  parseProgram() {
    
  }
  
  
  consume(expectedType) {
    // //  console.log("Consume: ", this.currentTokenIndex + 1);
    if (
      this.currentTokenIndex + 1 === this.tokens.length &&
      this.currentToken.token === "eofT"
    ) {
      return;
    } else if (this.currentToken.token === expectedType) {
      // //  console.log(this.currentToken);
      let currLex = this.currentToken.lexeme;
      this.advance();
      return currLex;
    } else {
      throw new SyntaxError(
        `Expected ${expectedType} but found ${this.currentToken.token} at ${
          this.currentTokenIndex + 1
        }`
      );
    }
  }

  advance() {
    // //  console.log("Advance: ", this.currentToken.lexeme);
    if (this.currentTokenIndex < this.tokens.length - 1) {
      const oldToken = this.currentToken;
      // //  console.log(this.currentToken.token);
      this.currentTokenIndex++;
      this.currentToken = this.tokens[this.currentTokenIndex];
      return oldToken.lexeme;
    } else {
      this.currentToken = { type: "EOF" };
    }
  }
}
export default Parser;
