const express = require("express");
const connectDB = require("./config/db");
const app = express();
const bodyParser = require("body-parser");
const { createServer } = require("http");
const { Contract, providers, utils } = require("ethers");
const {mintAbi,cueAbi} = require("./contract/abi.json");
const SaveTransaction = require('./routes/save');
const SaveVolume = require('./routes/saveVolume');

const httpServer = createServer(app);



require("dotenv").config();
// Connect to Database
connectDB();

// Initialize Middleware
app.use(express.json({ strict: false }));

app.use(bodyParser.urlencoded({ extended: true }));

// Define Routes
app.use("/api/transaction", require("./routes/api/transaction"));

// Set Static Folder
app.use(express.static(__dirname + "/build"));
app.get("/*", function (req, res) {
  res.sendFile(__dirname + "/build/index.html", function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

const PORT = process.env.PORT || 5000;

let Rarity = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];

const provider = new providers.WebSocketProvider(
  "wss://api.avax.network/ext/bc/C/ws",
  {
    chainId: 43114,
    name: "avalanche",
  }
);

const mintContract = new Contract(
  "0x8Dd342E845Fe738FDed2F8cF21B761a9EbC2A99f",
  mintAbi,
  provider
);

const cueContract = new Contract(
  "0xEcC82f602a7982a9464844DEE6dBc751E3615BB4",
  cueAbi,
  provider
)

const mintListener = async (from, tokenId, collectionId, rarity, price, event) => {
  try{
    console.log("-------mintListener--------");
    const tokenData = JSON.parse(
      await cueContract.tokenURIJSON(tokenId)
    );
    
    console.log("From:", from);
    console.log("Token ID:", tokenId.toNumber());
    console.log("Collection ID:", collectionId.toNumber());
    console.log("Rarity:", Rarity[rarity]);
    console.log("Price:", utils.formatEther(price), "AVAX");
    console.log("EventHash:", event.transactionHash);
  
    await SaveVolume({type:"mint",collectionId: Number(collectionId),price:Number(utils.formatEther(price))})
    await SaveTransaction({userAddress:from,nftName:tokenData.name,game:"8Ball",transferType:"mint",transactionID:event.transactionHash,amount: Number(utils.formatEther(price)) });
  } catch(err) {
    console.log(err);
  }
};

const upgradeListener = async (from, tokenId, collectionId, rarity, price, event) => {
  try{
    console.log("-------upgradeListener--------");
    const tokenData = JSON.parse(
      await cueContract.tokenURIJSON(tokenId)
    );
    
    console.log("From:", from);
    console.log("Token ID:", tokenId.toNumber());
    console.log("Collection ID:", collectionId.toNumber());
    console.log("Rarity:", Rarity[rarity]);
    console.log("Price:", utils.formatEther(price), "AVAX");
    console.log("EventHash:", event.transactionHash);
    
    SaveVolume({type:"upgrade",collectionId: Number(collectionId),price:Number(utils.formatEther(price))})
    SaveTransaction({userAddress:from,nftName:tokenData.name,game:"8Ball",transferType:"upgrade",transactionID:event.transactionHash,amount: Number(utils.formatEther(price)) });
  } catch(err) {
    console.log(err);
  }
};

const InitializeContract = () => {
  mintContract.on(mintContract.filters.CuePurchased(), mintListener);
  mintContract.on(mintContract.filters.CueUpgraded(), upgradeListener);
}

InitializeContract();


httpServer.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
