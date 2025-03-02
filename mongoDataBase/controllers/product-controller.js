const Products = require("../models/Products");
const { sampleProducts } = require("../data/sampleData");

const insertSampleProducts = async (req, res) => {
  try {
    const result = await Products.insertMany(sampleProducts);
    return res.status(201).json({
      success: true,
      data: `Inserted ${result.length} sample products.`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

const getProductsStats = async (req, res) => {
  try {
    const results = await Products.aggregate([
      //Stage 1: Fillter
      {
        $match: {
          inStock: true,
          price: {
            $gte: 200,
          },
        },
      },
      //Stage 2: Group documents
      {
        $group: {
          _id: "$category",
          avgPrice: {
            $avg: "$price",
          },
          count: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Some error occured.",
    });
  }
};

module.exports = { insertSampleProducts, getProductsStats };
