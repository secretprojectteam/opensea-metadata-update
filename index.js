require('dotenv').config();
const Web3 = require('web3');
const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`);
const args = process.argv;
const abi = require('./abi/ERC721.json').abi;
const axios = require('axios');

if (args.length !== 5) {
    console.log("missing contract; node index.js <contract_address> <start token id> <end token id>");
}

(async (web3) => {
    let contract = new web3.eth.Contract(abi, args[2]);

    for (let x=parseInt(args[3]); x<=parseInt(args[4]); x++) {
        console.log(`Querying Token ${x}`);
        if (await exists(contract, x)) {
            console.log(`Processing Token ${x}`);
            try {
                let r = await axios.get(`https://api.opensea.io/api/v1/asset/${args[2]}/${x}/?force_update=true`, {
                    headers: {
                        'X-API-KEY': process.env.OPENSEA_API_KEY
                    }
                });
            } catch (e) {
                console.log(`Token ${x} failed to update opensea`);
            }
        }
    }
})(web3);

async function exists(contract, tokenId) {
    try {
        await contract.methods.ownerOf(tokenId).call();
        return true;
    } catch (e) {
        return false;
    }
}