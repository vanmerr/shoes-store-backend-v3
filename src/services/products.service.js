const ProductRepository = require("../repositories/product.repository");

class ProductService {
    constructor() {
        this.productRepository = new ProductRepository();
    }

    async createProduct(data) {
        return await this.productRepository.createProduct(data);
    }

    async getProductById(id) {
        return await this.productRepository.getProductById(id);
    }

    async getAllProducts(options) {
        return await this.productRepository.getAllProducts(options);
    }

    async updateProduct(id, data) {
        return await this.productRepository.updateProduct(id, data);
    }

    async deleteProduct(id) {
        return await this.productRepository.deleteProduct(id);
    }

    async getProductReviews(productId, options) {
        return await this.productRepository.getProductReviews(productId, options);
    }

    async getProductStocks(productId, options) {
        return await this.productRepository.getProductStocks(productId, options);
    }
}

module.exports = ProductService;