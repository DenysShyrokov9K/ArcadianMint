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

// router.post("/getTransactions", async (req, res) => {
//   const { userAddress, type, game } = req.body;
//   let _mintRandomType = "0xf031bc11";
//   let _mintSpecifyType = "0xfa490592";
//   let _upgradeType = "0xe0072ada";
//   let mintResults = [];
//   let upgradeResults = [];
//   let mintTransactionHashs = [];
//   let upgradeTransactionHashs = [];
//   let mintTypes = [];
//   if (game === 1) {
//     const address = "0x10c43C1947d08e6fE69cAaC1730F8863a4Ddaa69";

//     const chain = EvmChain.FUJI;
//     const _response = await Moralis.EvmApi.transaction.getWalletTransactions({
//       address,
//       chain,
//     });

//     const response = _response.toJSON().result;
//     // res.json(response);

//     for (let i = 0; i < response.length; i++) {
//       if (response[i].input === _mintRandomType) {
//         mintTypes.push(_mintRandomType);
//         mintTransactionHashs.push(response[i].hash);
//       } else if (String(response[i].input).slice(0, 10) === _mintSpecifyType) {
//         mintTypes.push(_mintSpecifyType);
//         mintTransactionHashs.push(response[i].hash);
//       }
//     }

//     for (let j = 0; j < mintTransactionHashs.length; j++) {
//       const transactionHash = mintTransactionHashs[j];
//       const responseLogs = await Moralis.EvmApi.transaction.getTransaction({
//         transactionHash,
//         chain,
//       });
//       if (mintTypes[j] === _mintRandomType) {
//         if (
//           responseLogs.jsonResponse.logs[2] !== undefined &&
//           String(
//             AbiCoder.decodeParameters(
//               ["address"],
//               responseLogs.jsonResponse.logs[2].topic1
//             )[0]
//           ) === String(userAddress)
//         ) {
//           const date = responseLogs.jsonResponse.logs[2].block_timestamp;
//           const tokenId = AbiCoder.decodeParameters(
//             ["uint256", "uint256", "uint256", "uint256"],
//             responseLogs.jsonResponse.logs[2].data
//           )[0];
//           const price = AbiCoder.decodeParameters(
//             ["uint256", "uint256", "uint256", "uint256"],
//             responseLogs.jsonResponse.logs[2].data
//           )[3];
//           const transactionId = transactionHash;
//           const result = { date, tokenId, price, transactionId };
//           mintResults.push(result);
//         }
//       } else if (mintTypes[j] === _mintSpecifyType) {
//         if (
//           responseLogs.jsonResponse.logs[1] !== undefined &&
//           String(
//             AbiCoder.decodeParameters(
//               ["address"],
//               responseLogs.jsonResponse.logs[1].topic1
//             )[0]
//           ) === String(userAddress)
//         ) {
//           const date = responseLogs.jsonResponse.logs[1].block_timestamp;
//           const tokenId = AbiCoder.decodeParameters(
//             ["uint256", "uint256", "uint256", "uint256"],
//             responseLogs.jsonResponse.logs[1].data
//           )[0];
//           const price = AbiCoder.decodeParameters(
//             ["uint256", "uint256", "uint256", "uint256"],
//             responseLogs.jsonResponse.logs[1].data
//           )[3];
//           const transactionId = transactionHash;
//           const result = { date, tokenId, price, transactionId };
//           mintResults.push(result);
//         }
//       }
//     }

//     for (let i = 0; i < response.length; i++) {
//       if (String(response[i].input).slice(0, 10) === _upgradeType) {
//         upgradeTransactionHashs.push(response[i].hash);
//       }
//     }

//     for (let j = 0; j < upgradeTransactionHashs.length; j++) {
//       const transactionHash = upgradeTransactionHashs[j];
//       const responseLogs = await Moralis.EvmApi.transaction.getTransaction({
//         transactionHash,
//         chain,
//       });
//       if (
//         responseLogs.jsonResponse.logs[0] !== undefined &&
//         String(
//           AbiCoder.decodeParameters(
//             ["address"],
//             responseLogs.jsonResponse.logs[0].topic1
//           )[0]
//         ) === String(userAddress)
//       ) {
//         const date = responseLogs.jsonResponse.logs[0].block_timestamp;
//         const tokenId = AbiCoder.decodeParameters(
//           ["uint256", "uint256", "uint256", "uint256"],
//           responseLogs.jsonResponse.logs[0].data
//         )[0];
//         const price = AbiCoder.decodeParameters(
//           ["uint256", "uint256", "uint256", "uint256"],
//           responseLogs.jsonResponse.logs[0].data
//         )[3];
//         const transactionId = transactionHash;
//         const result = { date, tokenId, price, transactionId };
//         upgradeResults.push(result);
//       }
//     }
//     res.json({ mintResults, upgradeResults });
//   } else {
//     res.json({});
//   }
// });

//get TotalVolume

router.post('/getTransactions',async(req,res) => {
  try{
    const {address,game,type,sort} = req.body;
    console.log(address);
    console.log(game);
    console.log(type);
    console.log(sort);
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
