
const createData = async (model, data) => {
    try {
        const newData = new model(data);
        await newData.save();
        return newData;
    } catch (error) {
        throw new Error('Error creating data: ' + error.message);
    }
};

const readData = async (model, query) => {
    try {
        const data = await model.find(query);
        return data;
    } catch (error) {
        throw new Error('Error reading data: ' + error.message);
    }
};

const updateData = async (model, query, update) => {
    try {
        const updatedData = await model.findOneAndUpdate(query, update, { new: true });
        return updatedData;
    } catch (error) {
        throw new Error('Error updating data: ' + error.message);
    }
};

const deleteData = async (model, query) => {
    try {
        await model.findOneAndDelete(query);
        return { message: 'Data deleted successfully' };
    } catch (error) {
        throw new Error('Error deleting data: ' + error.message);
    }
};

module.exports = {
    createData,
    readData,
    updateData,
    deleteData
};
