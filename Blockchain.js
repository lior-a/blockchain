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
        return new Block(0, '1512149263', 'Genesis Block', 0);
    }

    /**
     * get the last block from the blockchain
     * @return {object} the last block
     */
    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    /**
     * Add new block to the blockchain
     * @param {object} newBlock new block that we want to add
     */
    addBlock(newBlock) {
        // set the new block with the previous block's hash
        newBlock.previousHash = this.getLastBlock().hash;

        // mineNewBlock is our proof of work concept
        newBlock.mineNewBlock(this.difficulty);

        this.chain.push(newBlock);
    }

    /**
     * Check and validate the blockchain is correctly linked together
     * @return {Boolean} is the blockchain valid or not.
     */
    isChainValid() {
    }
}

module.exports = Blockchain;