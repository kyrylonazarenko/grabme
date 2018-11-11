module.exports = async function (app) {
    const boughtSchema = new app.mongoose.Schema({
        userId: {
            type: app.mongoose.Types.ObjectId,
            ref: 'User'
        },
        articles: Array
    });
    return await app.mongoose.model('Bought', boughtSchema);
};