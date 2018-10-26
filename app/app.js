const QuarkChain = require('quarkchain-web3');
const Web3 = require('web3');
const web3 = new Web3();
const address = '0xE0265757456567116A4E6e57B2f1942d8c811FB2636EE228';
const abi = require('./config/abi');
const TokenContract = web3.eth.contract(abi);
const tokenInstance = TokenContract.at(address);

if (!process.argv[2]) {
    console.log('Type text please');
    return;
}

const text = process.argv[2];
const data = tokenInstance.setGreeting.getData(text);
QuarkChain.injectWeb3(web3, 'http://jrpc.testnet.quarkchain.io:38391')
web3.qkc.setPrivateKey('0x815F710F55ECCA7BDA21D09372A4AE4557BC6BDC1840924BF643F37EF22B4E4D');
web3.eth.sendTransaction({
    nonce: "0x2",
    to: address,
    gasPrice: "0x2540be400",
    gas: "0xf4240",
    data: data,
    value: "0x0",
    fromFullShardId: "0x636ee228",
    toFullShardId: "0x636ee228",
    networkId: "0x3",
    version: "0x01"
}, (err, txHash) => {
    if (!err) {
        console.log('TX hash: ' + txHash);
    } else {
        console.log(err);
    }
});