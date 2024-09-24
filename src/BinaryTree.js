// Define a Node class to represent a symbol in the binary search tree
class Node {
  /**
   * Constructor for a Node
   * @param {string} symbol - The symbol to be stored in the node
   * @param {string} value - The value associated with the symbol
   * @param {string} rflag - The RFLAG attribute of the symbol
   */
  constructor(symbol, value, rflag) {
    this.symbol = symbol; // The symbol to be stored in the node
    this.value = value; // The value associated with the symbol
    this.rflag = rflag; // The RFLAG attribute of the symbol
    this.iflag = true; // The IFLAG attribute of the symbol (initialized to true)
    this.mflag = false; // The MFLAG attribute of the symbol (initialized to false)
    this.left = null; // The left child of the node
    this.right = null; // The right child of the node
  }
}

// Define a BinarySearchTree class to manage the symbol table
class BinarySearchTree {
  /**
   * Constructor for a BinarySearchTree
   * Initializes the root of the tree to null.
   */
  constructor() {
    this.root = null; // The root node of the binary search tree
  }

  /**
   * Insert a new node into the binary search tree
   * @param {string} symbol - The symbol to insert
   * @param {string} value - The value associated with the symbol
   * @param {string} rflag - The RFLAG attribute of the symbol
   */
  insert(symbol, value, rflag) {
    const newNode = new Node(symbol, value, rflag); // Create a new Node for the symbol
    if (!this.root) {
      // If the tree is empty, set the new node as the root
      this.root = newNode;
    } else {
      // Otherwise, recursively insert the new node into the appropriate position
      this._insertRecursive(this.root, newNode);
    }
  }

  /**
   * Recursive helper function to insert a new node into the correct position
   * @param {Node} node - The current node being processed
   * @param {Node} newNode - The new node to be inserted
   */
  _insertRecursive(node, newNode) {
    if (newNode.symbol < node.symbol) {
      // If the new node's symbol is less than the current node's, go left
      if (!node.left) {
        // If the left child is empty, insert the new node here
        node.left = newNode;
      } else {
        // Otherwise, continue the recursion to the left
        this._insertRecursive(node.left, newNode);
      }
    } else if (newNode.symbol > node.symbol) {
      // If the new node's symbol is greater than the current node's, go right
      if (!node.right) {
        // If the right child is empty, insert the new node here
        node.right = newNode;
      } else {
        // Otherwise, continue the recursion to the right
        this._insertRecursive(node.right, newNode);
      }
    } else {
      // If the symbol already exists, mark its MFLAG as true
      node.mflag = true;
    }
  }

  /**
   * Search for a symbol in the binary search tree
   * @param {string} symbol - The symbol to search for
   * @returns {Node|null} The node containing the symbol, or null if not found
   */
  search(
    symbol,
    newValue = null,
    newRFlag = null,
    newIFlag = null,
    newMFlag = null
  ) {
    // Ensure the symbol does not exceed the maximum length of 10 characters
    if (symbol.length > 10) {
      console.log(`Symbols cannot exceed 10 characters: ${symbol}`);
    }
    // Ensure the symbol only contains valid characters
    if (/[^a-zA-Z0-9_]/.test(symbol)) {
      console.log(
        `Symbols can only contain letters, digits, and underscores: ${symbol}`
      );
    }
    let resultNode = this._searchRecursive(this.root, symbol);
    if (resultNode) {
      newMFlag = true;
      // If the node is found and modification values are provided, modify the node
      if (
        newValue ||
        newRFlag !== null ||
        newIFlag !== null ||
        newMFlag !== null
      ) {
        resultNode.mflag = true;
      }

      console.log(`Symbol found: ${resultNode.symbol}`);
      return resultNode;
    } else {
      console.log(`Symbol ${symbol} not found in the Table`);
      return null;
    }
  }

  /**
   * Recursive helper function to search for a symbol in the tree
   * @param {Node} node - The current node being processed
   * @param {string} symbol - The symbol to search for
   * @returns {Node|null} The node containing the symbol, or null if not found
   */
  _searchRecursive(node, symbol) {
    if (!node) {
      // If the current node is null, the symbol is not in the tree
      // console.error(`Symbol ${symbol} not found in the table`);
      return null;
    }
    if (symbol === node.symbol) {
      // If the symbol matches the current node, return the node
      return node;
    } else if (symbol < node.symbol) {
      // If the symbol is less than the current node, search the left subtree
      return this._searchRecursive(node.left, symbol);
    } else {
      // If the symbol is greater than the current node, search the right subtree
      return this._searchRecursive(node.right, symbol);
    }
  }

  /**
   * Perform an inorder traversal of the binary search tree
   * This will return the nodes in sorted order based on their symbol.
   * @returns {Array} An array of objects containing symbol, value, RFLAG, IFLAG, and MFLAG for each node
   */
  view() {
    const result = [];
    // Perform inorder traversal and collect node data
    this._inorderTraversal(this.root, result);
    console.table(result); // Display the result in a table format
    return result;
  }

  /**
   * Recursive helper function to perform an inorder traversal
   * @param {Node} node - The current node being processed
   * @param {Array} result - Array to store the result of the traversal
   */
  _inorderTraversal(node, result) {
    if (node) {
      // Recursively traverse the left subtree
      this._inorderTraversal(node.left, result);
      // Add the current node's data to the result array
      result.push({
        symbol: node.symbol,
        value: node.value,
        rflag: node.rflag,
        iflag: node.iflag,
        mflag: node.mflag,
      });
      // Recursively traverse the right subtree
      this._inorderTraversal(node.right, result);
    }
  }

  /**
   * Modify a node's attributes after searching for it by symbol
   * @param {string} symbol - The symbol of the node to modify
   * @param {Object} newAttributes - Object containing the new attribute values
   *      newAttributes: { value, rflag, iflag, mflag }
   */
  modifyNode(symbol, newAttributes) {
    const node = this.search(symbol); // Search for the node by symbol
    if (!node) {
      console.log(`Node with symbol ${symbol} not found.`);
      return false;
    }

    // Update the node's attributes if new values are provided
    if (newAttributes.value !== undefined) node.value = newAttributes.value;
    if (newAttributes.rflag !== undefined) node.rflag = newAttributes.rflag;
    if (newAttributes.iflag !== undefined) node.iflag = newAttributes.iflag;
    if (newAttributes.mflag !== undefined) node.mflag = newAttributes.mflag;

    console.log(`Node with symbol ${symbol} has been updated.`);
    return true;
  }
}

// Export the BinarySearchTree class
export default BinarySearchTree;
