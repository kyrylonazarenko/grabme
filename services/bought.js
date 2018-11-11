const _ = require('lodash');
module.exports = function (app) {
    const Bought = app.models.Bought;
    const Article = app.models.Article;
    return {
        async findAll(userId) {
            const boughts = await Bought.find({userId});
            const instanceIds = [];
            boughts.forEach(b => b.articles.map(i => instanceIds.push(i)));
            const articles = await Article.find({
                instances : { $elemMatch : {$in: instanceIds} }
            });
            const res = [];
            boughts.forEach(bought => {
                const boughtArticles = [];
                let boughtTotal = 0;
                bought.articles.forEach(instanceId => {
                    const article = _.find(articles, (item) => {
                        return item.instances.indexOf(instanceId) !== -1;
                    });
                    const boughtArticle = _.find(boughtArticles, {id: article.id});
                    if (boughtArticle) {
                        boughtArticle.count += 1;
                        boughtArticle.total = parseFloat(boughtArticle.price) * boughtArticle.count;
                    } else {
                        boughtArticles.push({
                            id: article.id,
                            name: article.name,
                            price: article.price,
                            total: parseFloat(article.price),
                            count: 1
                        });
                    }
                    boughtTotal += parseFloat(article.price);
                });
                res.push({
                    id: bought.id,
                    articles: boughtArticles,
                    total: boughtTotal
                });
            });
            const total = res.map(b => b.total).reduce((a, b) => a + b, 0);
            return {boughts: res, total};
        },
        async find(userId, id) {
            const bought = await Bought.findOne({_id: id, userId});
            if (!bought) {
                throw app.boom.notFound('Bought not found');
            }
            const articles = await Article.find({
                instances: { $elemMatch : {$in: bought.articles} }
            });
            const boughtArticles = [];
            let boughtTotal = 0;
            bought.articles.forEach(instanceId => {
                const article = _.find(articles, (item) => {
                    return item.instances.indexOf(instanceId) !== -1;
                });
                const boughtArticle = _.find(boughtArticles, {id: article.id});
                if (boughtArticle) {
                    boughtArticle.count += 1;
                    boughtArticle.total = parseFloat(boughtArticle.price) * boughtArticle.count;
                } else {
                    boughtArticles.push({
                        id: article.id,
                        name: article.name,
                        price: article.price,
                        total: parseFloat(article.price),
                        count: 1
                    });
                }
                boughtTotal += parseFloat(article.price);
            });
            return {articles: boughtArticles, total: boughtTotal};
        }
    }
};