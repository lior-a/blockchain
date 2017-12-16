/**
 * Blockchain module
 * @since 1.0.0
 */
const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [this.genesisBlock()];
        this.difficulty = 2;
    }

    /**
     * Genesis block is the initial, first block of our blockchain - it doesn't have previous hash since it's the first one
     * @return {object} object of the genesis block
     */
    genesisBlock() {
    }

    /**
     * get the last block from the blockchain
     * @return {object} the last block
     */
    getLastBlock() {
    }

    /**
     * Add new block to the blockchain
     * @param {object} newBlock new block that we want to add
     */
    addBlock(newBlock) {
    }

    /**
     * Check and validate the blockchain is correctly linked together
     * @return {Boolean} is the blockchain valid or not.
     */
    isChainValid() {
    }
}

module.exports = Blockchain;