/**
 * Blockchain module
 * @since 1.0.0
 */

const crypto = require('crypto-js');

class Block {
    /**
     * Constructor of a single block
     * @param  {int} id     number of the block
     * @param  {int} timestamp of the block creation date
     * @param  {object} data      object that contain info about the block (amount, from, to etc..)
     * @param  {string} prevHash  the previous block's hash
     */
    constructor(id, timestamp, data, prevHash = '') {
        this.id = id;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateBlockHash();
        this.n = 0;
    }

    /**
     * Generate a block hash base on random number, block's id, previous block hash, timestamp and the string of our data object
     * @return {object} hashed with SHA250
     */
    calculateBlockHash() {
    }

    /**
     * Difficulty that will translate to how long it will take to mine a block
     * @param  {int} difficulty number, can't be less than 1
     */
    mineNewBlock(difficulty) {
    }
}

module.exports = Block;