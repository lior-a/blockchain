const Blockchain = require('./Blockchain');
const Block = require('./Block');

const liorCoin = new Blockchain();

liorCoin.addBlock(new Block(1, '1512149263', { amount: 5}));
console.log('Mining Block 1...');
liorCoin.addBlock(new Block(2, '1512235663', { amount: 10}));
console.log('Mining Block 2...');

// console.log('blockchain valid? ' , liorCoin.isChainValid());


// liorCoin.chain[1].data = {amount: 100};
// liorCoin.chain[1].hash = liorCoin.chain[1].calculateBlockHash();

// console.log('blockchain valid? ' , liorCoin.isChainValid());

// console.log(JSON.stringify(liorCoin, null, 2));