/**
 * Blockchain module
 * @since 1.0.0
 */

const crypto = require('crypto-js');

class Block {



    constructor(id, timestamp, data, prevHash = '') {
        this.id = id;
        this.timestamp = timestamp;
        this.data = data;
        this.prevHash = prevHash;
        this.hash = this.calculateBlockHash();
        this.n = 0;
    }

    calculateBlockHash() {
        return crypto.SHA256(this.n + this.id + this.prevHash + this.timestamp + JSON.stringify(this.data)).toString();
    }

    mineNewBlock(difficulty) {
        if (difficulty < 1) {
            throw new Error('Difficulty can\'t be lower than 1');
        }

        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
            this.n++;
            this.hash = this.calculateBlockHash();
        }

        console.log('Block Mined: ' + this.hash);
    }
}

module.exports = Block;