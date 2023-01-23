const Volume = require("../models/volume");

const SaveVolume = async ({ type, collectionId, price }) => {
  try {
    let volumes = await Volume.find();
    let mainCount = 0, sonicCount = 0, mtopCount = 0, totalVolume = 0;
    if(volumes.length > 0){
      mainCount = volumes[0].mainCount;
      sonicCount = volumes[0].sonicCount;
      mtopCount = volumes[0].mtopCount;
      totalVolume = volumes[0].totalVolume;
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
    
    if(volumes.length > 0){ 
      const updateVolume = await Volume.findById(volumes[0]._id);
      updateVolume.mainCount = mainCount;
      updateVolume.sonicCount = sonicCount;
      updateVolume.mtopCount = mtopCount;
      updateVolume.totalVolume = totalVolume;
      updateVolume.save();
    } else {
      const newVolume = new Volume({
        mainCount: mainCount,
        sonicCount: sonicCount,
        mtopCount: mtopCount,
        totalVolume: totalVolume,
      });
      newVolume.save();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = SaveVolume;
