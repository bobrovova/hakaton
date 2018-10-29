const QuarkChain = require('quarkchain-web3');
const Web3 = require('web3');
const web3 = new Web3();
const contractMaker = require('./helpers/contract');
const solc = require('solc');

if (!process.argv[2]) {
    console.log('Type name please');
    return;
}

if (!process.argv[3]) {
    console.log('Type symbol please');
    return;
}

if (!process.argv[4]) {
    console.log('Type decimals please');
    return;
}

if (!process.argv[5]) {
    console.log('Type amount tokens please');
    return;
}

const name = process.argv[2];
const symbol = process.argv[3];
const decimals = process.argv[4];
const startAmountTokens = process.argv[5];

QuarkChain.injectWeb3(web3, 'http://jrpc.testnet.quarkchain.io:38391')
web3.qkc.setPrivateKey('0x815F710F55ECCA7BDA21D09372A4AE4557BC6BDC1840924BF643F37EF22B4E4D');

const contractCode = contractMaker(name, symbol, decimals, startAmountTokens);
const output = solc.compile({
    sources: {
        'token.sol': contractCode
    }
});

web3.eth.sendTransaction({
    nonce: "0x2",
    gasPrice: "0x2540be400",
    gas: "0x2DC6C0",
    data: "0x"+output.contracts['token.sol:Token'].bytecode,
    value: "0x0",
    fromFullShardId: "0x636ee228",
    toFullShardId: "0x636ee228",
    networkId: "0x3",
    version: "0x01"
}, (err, txHash) => {
    if (!err) {
        let tx = null;
        while (tx === null) {
            tx = web3.eth.getTransactionReceipt(txHash);
        }
        
        if (tx.status === '0x1') {
            console.log("Contract Address: " + tx.contractAddress);
        }
    } else {
        console.log(err);
    }
});