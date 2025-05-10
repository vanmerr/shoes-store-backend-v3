const CrudData = require("../utils/crudData");

class ProductRepository {
    constructor() {
        this.PRODUCT = new CrudData("products");
    }

    async createProduct(data) {
        return await this.PRODUCT.create(data);
    }

    async getProductById(id) {
        return await this.PRODUCT.read(id);
    }

    async getAllProducts(options) {
        return await this.PRODUCT.readAll(options);
    }

    async updateProduct(id, data) {
        return await this.PRODUCT.update(id, data);
    }

    async deleteProduct(id) {
        return await this.PRODUCT.delete(id);
    }

    async getProductReviews(productId, options) {
        const productRef = this.PRODUCT.collection.doc(productId);
        const reviewsCollection = new CrudData(`${productRef.path}/product_review`);
        return await reviewsCollection.readAll(options);
    }

    async getProductStocks(productId, options) {
        const productRef = this.PRODUCT.collection.doc(productId);
        const stocksCollection = new CrudData(`${productRef.path}/product_stock`);
        return await stocksCollection.readAll(options);
    }
}

module.exports = ProductRepository;