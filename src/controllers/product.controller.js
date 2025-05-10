const ProductService = require("../services/products.service");

class ProductController {
    constructor() {
        this.productService = new ProductService();
    }

    async createProduct(req, res, next) {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    }

    async getProductById(req, res, next) {
        try {
            const product = await this.productService.getProductById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async getAllProducts(req, res, next) {
        try {
            const products = await this.productService.getAllProducts(req.query);
            res.json(products);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const product = await this.productService.updateProduct(req.params.id, req.body);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        } catch (error) {
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const product = await this.productService.deleteProduct(req.params.id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            next(error);
        }
    }

    async getProductReviews(req, res, next) {
        try {
            const reviews = await this.productService.getProductReviews(req.params.productId, req.query);
            res.json(reviews);
        } catch (error) {
            next(error);
        }
    }

    async getProductStocks(req, res, next) {
        try {
            const stocks = await this.productService.getProductStocks(req.params.productId, req.query);
            res.json(stocks);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProductController;