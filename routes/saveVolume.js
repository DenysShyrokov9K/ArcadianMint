const Volume = require("../models/volume");

const SaveVolume = async ({ type, collectionId, price }) => {
  try {
    let volume = await Volume.find();
    console.log(volume);
    let totalVolume = volume.totalVolume;
    let mainCount = volume.mainCount;
    let sonicCount = volume.sonicCount;
    let mtopCount = volume.mtopCount;
    if (type === "mint") {
      if (totalVolume === undefined) totalVolume = price;
      else totalVolume += price;
      if (collectionId == 1) {
        if (mainCount === undefined) mainCount = 1;
        else mainCount++;
      }
      if (collectionId == 3) {
        if (sonicCount === undefined) sonicCount = 1;
        else sonicCount++;
      }
      if (collectionId == 4) {
        if (mtopCount === undefined) mtopCount = 1;
        else mtopCount++;
      }
    } else {
      if (totalVolume === undefined) totalVolume = price;
      else totalVolume += price;
    }
    volume.totalVolume = totalVolume;
    volume.updateOne
    console.log("totalVolume===",volume.totalVolume);
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = SaveVolume;
