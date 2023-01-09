const Volume = require("../models/volume");

const SaveVolume = async ({ type, collectionId, price }) => {
  try {
    let volumes = await Volume.find();
    let newVolume;
    let mainCount, sonicCount, mtopCount, totalVolume;
    if(volumes.length > 0){
      volumes[volumes.length-1].mainCount === undefined
        ? (mainCount = 0)
        : (mainCount = volumes[volumes.length-1].mainCount);
      volumes[volumes.length-1].sonicCount === undefined
        ? (sonicCount = 0)
        : (sonicCount = volumes[volumes.length-1].sonicCount);
      volumes[volumes.length-1].mtopCount === undefined
        ? (mtopCount = 0)
        : (mtopCount = volumes[volumes.length-1].mtopCount);
      volumes[volumes.length-1].totalVolume === undefined
        ? (totalVolume = 0)
        : (totalVolume = volumes[volumes.length-1].totalVolume);
    } else {
      mainCount = sonicCount = mtopCount = totalVolume = 0;
    }
    if (type === "mint") {
      totalVolume += price;
      if (collectionId == 1) {
        mainCount++;
      }
      if (collectionId == 3) {
        sonicCount++;
      }
      if (collectionId == 4) {
        mtopCount++;
      }
    } else {
      totalVolume += price;
    }

    newVolume = new Volume({
      mainCount: mainCount,
      sonicCount: sonicCount,
      mtopCount: mtopCount,
      totalVolume: totalVolume,
    });
    newVolume.save();
    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = SaveVolume;
