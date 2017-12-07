/**
 * Blockchain spec file
 * @since 1.0.0
 */

const crypto = require('crypto-js');
const Blockchain = require('./Blockchain');
const Block = require('./Block');

describe('Test Block and BlockChain Class' , () => {
    const liorCoin = new Blockchain();

    const block1 = new Block(1, '1512149263', { amount: 5});

    liorCoin.addBlock(block1);
    console.log('Mining Block 1...');
    liorCoin.addBlock(new Block(2, '1512235663', { amount: 10}));
    console.log('Mining Block 2...');

    console.log('Block Class Format: ' , JSON.stringify(block1, null, 4))
    console.log('BlockChain Format: ' , JSON.stringify(liorCoin, null, 4))

    describe('Block', () => {
        it('Should calculate block hash correctly', () => {

            const hash = crypto.SHA256(block1.n + block1.id + block1.prevHash + block1.timestamp + JSON.stringify(block1.data)).toString();

            expect(hash).to.be.equal(liorCoin.chain[1].calculateBlockHash());
        });

        it('Should re-calculate block hash correctly', () => {
            expect(liorCoin.chain[1].hash).to.be.equal(liorCoin.chain[1].calculateBlockHash());
        });

        describe('Genesis Block' , () => {
            it('Should generate a genesis block with previous hash equal to 0', () => {
                expect(liorCoin.chain[0].prevHash).to.be.equal(0);
            });

            it('Should generate genesis block with id 0', () => {
                expect(liorCoin.chain[0].id).to.be.equal(0);
            })
        });
    });

    describe('Block Chain', () => {
        it('Should be array type of data', () => {
            expect(liorCoin.chain).to.be.an('array');
        });

        it('Should start with genesis block', () => {
            expect(liorCoin.chain[0].prevHash).to.be.equal(0);
            expect(liorCoin.chain[0].id).to.be.equal(0);
        });

        it('Should return last block in chain', () => {
            const lastBlock = liorCoin.getLastBlock();
            const totalCoins = liorCoin.chain.length - 1;

            expect(lastBlock.id).to.be.equal(totalCoins);
        });
    });

    describe('Mine!', () => {
        it('Should add a new block', () => {
            const expectedChainLength = liorCoin.chain.length + 1;

            liorCoin.addBlock(new Block(3, '1512235663', { amount: 20}));

            expect(liorCoin.chain.length).to.be.equal(expectedChainLength);
        });

        it('Should take more than 100ms to mine a block', (done) => {
            liorCoin.difficulty = 3;

            const t0 = +new Date();
            liorCoin.addBlock(new Block(4, '1512235663', { amount: 20}));
            const t1 = +new Date();

            const diff = t1 - t0;

            expect(diff).to.be.above(100);
            done();
        });
    });

    describe('Chain Validity', () => {
        it('Should return true', () => {
            expect(liorCoin.isChainValid()).to.be.equal(true);
        });

        it('Should return false due to bad hash after malicious change to data of a block', () => {
            liorCoin.chain[2].data = {amount: 100};
            expect(liorCoin.isChainValid()).to.be.equal(false);
        });

        it('Should return false even when we try to re-calculate the hash', () => {
            liorCoin.chain[2].hash = liorCoin.chain[2].calculateBlockHash();
            expect(liorCoin.isChainValid()).to.be.equal(false);
        });

        it('Should return false since current block id is same as previous block id', () => {
            // delete previous corrupted block
            liorCoin.chain.splice(-1);
            // generate new one, with same block id as previous block id
            liorCoin.addBlock(new Block(2, '1512235663', { amount: 20}));

            expect(liorCoin.isChainValid()).to.be.equal(false);
        });
    });
});