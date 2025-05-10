const { db } = require("../configs/database.config");
const CrudData = require("../utils/crudData");

class UserRepository {
  constructor() {
    this.USER = new CrudData("users");
  }

  async getUserByEmail(email) {
    const result = await this.USER.readByCondition("email", "==", email);
    return result.data.length ? result.data[0] : null;
  }

  async getUserByPhone(phone) {
    const result = await this.USER.readByCondition("phone", "==", phone);
    return result.data.length ? result.data[0] : null;
  }

  async createUser(data) {
    return await this.USER.create(data);
  }

  async getUserById(id) {
    return await this.USER.read(id);
  }

  async getAllUsers(options) {
    return await this.USER.readAll({
      page: options.page || 1,
      limit: options.limit || 10,
      sort: options.sort || { field: 'created_at', order: 'desc' },
    });
  }

  async updateUser(id, data) {
    return await this.USER.update(id, data);
  }

  async deleteUser(id) {
    return await this.USER.delete(id);
  }
}

module.exports = UserRepository;
