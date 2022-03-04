
import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Web3 from 'web3';
import './Leftside.css';
const Moralis = require('moralis');


const web3 = new Web3("https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
const etherscanApiKey = '3KR3QB1T46GYWMING2CFTN6FPZEBT7SIRV'
const serverUrl = "https://ilxzqcvo7uyf.usemoralis.com:2053/server";
const appId = "ZcGoRrPcZKEmEiDkv35kg2OQ3U8JAVT7HDIXn5oG";

const weiToEther = (wei) => {
  const etherValue = Web3.utils.fromWei(wei, 'ether');
  return etherValue
}

const getMintInfo = async (address) => {
  let mint_array = []
  const options = { 
      chain: "eth", 
      address: address ,
      limit: "10000" 
  };
  console.log("   starting to check Mint transactions...\n")
  let transfersNFT = await Moralis.Web3API.account.getNFTTransfers(options);
  transfersNFT = transfersNFT.result
  console.log("      Number of Transactions that related with NFT...\n", transfersNFT.length)
  for (let i = 0; i < transfersNFT.length; i++) {
      if (transfersNFT[i].from_address === "0x0000000000000000000000000000000000000000") {
          mint_array.push({data : transfersNFT[i], i})
      }
  }

  console.log(mint_array)
  return mint_array;
}

const getTransaction = async (hash, temp) => {

  await web3.eth.getTransaction(hash).then(result => {
    temp.gasprice = weiToEther(result.gasPrice).toString()
    console.log("temp_gasprice", temp.gasprice)
  });

  await web3.eth.getTransactionReceipt(hash).then(result => {
    temp.gasused = weiToEther(result.gasUsed.toString()).toString()
    console.log("temp_gasused", temp.gasused)
  })
  
  temp.transactionfee = parseFloat(temp.gasPrice) * parseFloat(temp.gasused)
  console.log(temp.transactionfee)
  // temp.trasactionfee = temp.gasprice * temp.gasused
}

export const Leftside = (props) => {
  Moralis.start({ serverUrl, appId });

  const wallets = [
    "0xd9f69dB235fE42188951FfFBBa2F132D84CE9B4c",
    "0xF6429FaFDb6166D145f30372717a23B966373032",
    "0xc3df219c6768B27c8f54f3E815E355f966042A9a",
    "0xdA51ADb6680405937B1ea8d790B13CDb302169F2",
    "0x86EfCD7Eb845ff993304e97dD8847068F47635eA",
    "0xE90471A2FB1d296B2cc8d37f47C49c12fF761998",
  ]

  const getOneNFTInformation = async (nftarray) => {
    const tempArray = []

    nftarray.forEach(async (nft) => {
      const temp = {}

      temp.contract = nft.data.token_address
      temp.tokenid = nft.data.token_id
      temp.timestamp = nft.data.block_timestamp
      temp.mintprice = weiToEther(nft.data.value).toString()

      // await getTransaction(nft.data.transaction_hash, temp)

      tempArray.push(temp)
    })

    console.log(tempArray)
  }

  const onTest = async () => {
    const nftarray = await getMintInfo(wallets[0])
    await getOneNFTInformation(nftarray)

  }

  return (
    <div className="setting">
          <Button onClick={onTest}>Test</Button>
    </div>
  );
}
