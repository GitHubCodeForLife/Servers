const mockData = require("./mock.data");

function queryProducts(req, res) {
  // Get the query parameters
  const query = req.query;

  const mockProducts = mockData.mockProducts();
  res.json(mockProducts);
}

function updateProducts(req, res) {
  const product = req.body;
  const mockProducts = mockData.mockProducts();
  const index = mockProducts.findIndex((p) => p.id === product.id);
  mockProducts[index] = product;
  res.json(mockProducts);
}

function addProducts(req, res) {
  const product = req.body;
  console.log({ product });
  const mockProducts = mockData.mockProducts();
  //check exist product by name
  const index = mockProducts.findIndex((p) => p.name === product.name);
  if (index === -1) {
    product.id = mockProducts.length + 1;
    mockProducts.push(product);
    res.json(mockProducts);
  } else {
    console.log("run this code");
    return res.status(400).json({
      message: "Product already exists",
    });
  }
}

module.exports = {
  queryAllProducts: queryProducts,
  updateProducts,
  addProducts,
};
