const express = require("express");
const router = express.Router();

const fetch = require("node-fetch");
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
const AbiCoder = require("web3-eth-abi");

const Transaction = require('../../models/mintTransaction');

// @route   get api/users/test
// @desc    test User
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "this is test" }));

let totalVolume = 112;
let mainMintedCount = 70;
let sonicMintedCount = 15;
let mtopMintedCount = 4;

// @route   POST api/transaction
// @desc    Register User
// @access  Public
router.post("/", (req, res) => {
  try {
    totalVolume += req.body.amount;
    if (req.body.collectionId === 1) {
      mainMintedCount++;
    }
    if (req.body.collectionId === 3) {
      sonicMintedCount++;
    }
    if (req.body.collectionId === 4) {
      mtopMintedCount++;
    }
    res.json("success");
  } catch (err) {
    res.status(404).json("Transaction Error");
  }
});


router.post('/getTransactions',async(req,res) => {
  try{
    const {address,game,type,sort} = req.body;
    let transactions;
    if(sort == "pricePlus"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({amount: -1});
    }

    if(sort == "priceMinus"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({amount: 1});
    }

    if(sort == "latest"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({date: -1});
    }

    if(sort == "oldest"){
      transactions = await Transaction.find({userAddress: address,game: game,transferType: type}).sort({date: 1});
    }
    res.json(transactions);
  } catch(err) {
    res.status(404).json("find error");
  }
})

router.get("/getTotalVolume", (req, res) => {
  try {
    res.json(totalVolume);
  } catch (err) {
    res.json(totalVolume);
  }
});

//get MainMintedCount
router.get("/getMainMintedCount", (req, res) => {
  try {
    res.json(mainMintedCount);
  } catch (err) {
    res.json(mainMintedCount);
  }
});

//get SonicMintedCount
router.get("/getSonicMintedCount", (req, res) => {
  try {
    res.json(sonicMintedCount);
  } catch (err) {
    res.json(sonicMintedCount);
  }
});

//get MtopMintedCount
router.get("/getMtopMintedCount", (req, res) => {
  try {
    res.json(mtopMintedCount);
  } catch (err) {
    res.json(mtopMintedCount);
  }
});

//get currentAvaxPrice
router.get("/getCurrentAvaxPrice", async (req, res) => {
  try {
    let response;
    await fetch(
      "https://min-api.cryptocompare.com/data/price?fsym=AVAX&tsyms=USD&api_key=f7a6a1d6d3ef3ad2eabc8f0ddf13be828741c5e7e65d43c07aa4d1b0321f41d4"
    )
      .then((res) => res.text())
      .then((text) => (response = JSON.parse(text)));
    res.json(response.USD);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
