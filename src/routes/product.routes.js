const express = require("express");
const ProductController = require("../controllers/product.controller");

const router = express.Router();
const productController = new ProductController();

router.post("/", productController.createProduct.bind(productController));
router.get("/:id", productController.getProductById.bind(productController));
router.get("/", productController.getAllProducts.bind(productController));
router.put("/:id", productController.updateProduct.bind(productController));
router.delete("/:id", productController.deleteProduct.bind(productController));
router.get("/:productId/reviews", productController.getProductReviews.bind(productController));
router.get("/:productId/stocks", productController.getProductStocks.bind(productController));

module.exports = router;