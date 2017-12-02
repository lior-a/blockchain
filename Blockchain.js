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

    genesisBlock() {
        return new Block(0, '1512149263', 'Genesis Block', 0);
    }

    getLastBlock() {
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLastBlock().hash;

        newBlock.mineNewBlock(this.difficulty);

        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const previousBlock = this.chain[i -1];
            const currentBlock = this.chain[i];

            if(currentBlock.hash !== currentBlock.calculateBlockHash()) {
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }

        return true;
    }
}

module.exports = Blockchain;