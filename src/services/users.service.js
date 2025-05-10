const UserRepository = require("../repositories/user.repository");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async getUserByEmail(email) {
        return await this.userRepository.getUserByEmail(email);
    }

    async getUserByPhone(phone) {
        return await this.userRepository.getUserByPhone(phone);
    }

    async createUser(data) {
        return await this.userRepository.createUser(data);
    }

    async getUserById(id) {
        return await this.userRepository.getUserById(id);
    }

    async getAllUsers(options) {
        return await this.userRepository.getAllUsers(options);
    }

    async updateUser(id, data) {
        return await this.userRepository.updateUser(id, data);
    }

    async deleteUser(id) {
        return await this.userRepository.deleteUser(id);
    }
}

module.exports = UserService;