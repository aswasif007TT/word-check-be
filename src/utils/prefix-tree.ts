/*`
 * A prefix tree is a data structure that allows for fast lookup of words
 * in a dictionary. It is a tree where each node represents a letter in a word.
 * Each node has a children property that is an object where the keys are the
 * letters and the values are the nodes for those letters.
 *
 * For example, the word "cat" would be represented as:
 *
 * {
 *  c: {
 *   a: {
 *    t: {
 *      isWord: true
 *    }
 *   }
 *  }
 * }
 *
 * The isWord property is used to indicate that the node represents the end of a word.
 *
 * The tree can be built by iterating over the words in the dictionary and inserting
 * each word into the tree.
 *
 * To check if a word is in the dictionary, we can iterate over the letters in the word
 * and check if the node for that letter exists. If it does, we can move to the next letter
 * and repeat the process. If the node for a letter does not exist, we can return false.
 *
 * If we reach the end of the word, we can check if the isWord property is true. If it is,
 * we can return true. If it is not, we can return false.
 */
export default class PrefixTree {
  store: any;

  /**
   * @param {string[]} words - The words to build the tree with
   * @constructor
   */
  constructor(words: string[]) {
    this.store = { children: {} };
    for (const word of words) {
      this.insertWord(word);
    }
  }

  /**
   * Inserts a word into the tree
   *
   * @param {string} word - The word to insert
   * @returns {void}
   */
  insertWord(word: string) {
    let node = this.store;
    word = word.toLowerCase();

    for (const ch of word.trim().split('')) {
      if (!node.children[ch]) {
        node.children[ch] = { children: {} };
      }
      node = node.children[ch];
    }

    node.isWord = true;
  }

  /**
   * Checks if a word is in the tree
   *
   * @param {string} word - The word to check
   * @returns {boolean} - Whether the word is in the tree
   */
  hasWord(word: string): boolean {
    let node = this.store;
    word = word.toLowerCase();

    for (const ch of word.split('')) {
      node = node.children[ch];
      if (!node) return false;
    }

    return Boolean(node.isWord);
  }
}
