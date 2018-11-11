module.exports = async function (app) {
    const userSchema = new app.mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        }
    });
    return await app.mongoose.model('User', userSchema);
};