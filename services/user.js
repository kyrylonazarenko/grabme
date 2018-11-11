module.exports = function (app) {
    const User = app.models.User;
    return {
        async findUser(name) {
            const user = await User.findOne({name});
            if (!user) {
                throw app.boom.notFound('User not found');
            }
            return user;
        }
    }
};