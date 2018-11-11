const _ = require('lodash');

module.exports = function (app) {
    const Article = app.models.Article;
    const Bought = app.models.Bought;
    return {
        async buyArticles(userId, instanceIds) {
            const articles = await Article.find({
                instances : { $elemMatch : {$in: instanceIds.map(id => app.mongoose.Types.ObjectId(id))} }
            });
            const notFoundIds = [];
            instanceIds.forEach(instanceId => {
                const article = _.find(articles, (a) => {
                    return a.instances.indexOf(instanceId) !== -1;
                });
                if (!article) {
                    notFoundIds.push(instanceId);
                }
            });
            if (notFoundIds.length > 0) {
                throw app.boom.notFound('Some articles could not be found', notFoundIds);
            }
            return await Bought({
                userId,
                articles: instanceIds
            }).save();
        }
    }
};