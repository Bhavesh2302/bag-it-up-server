const { Router } = require("express");
const { Bag } = require("../models/bagModel");
const bagController = Router();


bagController.get("/get", async (req, res) => {
  const { brand, category, size, color, sort, skip, limit, search } = req.query;
  let aggregatePipeline = [];
  let matchStage = {};

  try {
    if (brand) matchStage.brand = { $in: brand };
    if (category) matchStage.category = { $in: category };
    if (size) matchStage.size = { $in: size };
    if (color) matchStage.color = { $in: color };

    if (search) {
      matchStage.$or = [
        { brand: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { size: { $regex: search, $options: "i" } },
        { color: { $regex: search, $options: "i" } },
      ];
    }

    if (Object.keys(matchStage).length > 0) {
      aggregatePipeline.push({ $match: matchStage });
    }

    if (sort) {
      aggregatePipeline.push({ $sort: { discounted_price: Number(sort) } });
    }

    const totalLengthData = await Bag.countDocuments();

    const bagData = await Bag.aggregate(aggregatePipeline)
      .skip(Number(skip) || 0)
      .limit(Number(limit) || 12);

    const totalFilteredCount = await Bag.aggregate(aggregatePipeline).count("count");

    res.send({
      msg: "Bag data successfully loaded",
      bagData: bagData,
      totalLength: totalLengthData,
      totalFilteredCount: totalFilteredCount[0].count,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = {
  bagController,
};