# OPENSEA METADATA UPDATER

This tool allows individuals with an Opensea API Key to update collections metadata

## Requirements
1. Opensea API Key
2. INFURA key
3. ERC721 Contract (or a contract with the ownerOf method)
4. A token Id range to update (eg. 1000-1500)

## How it works
The script queries the blockchain to make sure the token ID exists and then uses the OS API to force update the collection


## Usage example
Chainface HD Upgrade contract, updates tokens 34638 thru 34640
`node index.js 0x55b3bd7c074ccb74a245d2546273ba690647e8db 34638 34640`