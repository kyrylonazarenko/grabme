module.exports = async function (app) {
    const articleSchema = new app.mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        price: Number,
        instances: Array
    });
    return await app.mongoose.model('Article', articleSchema);
};