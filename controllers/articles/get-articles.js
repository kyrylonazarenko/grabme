module.exports = function (app) {
    app.express.get('/articles', async (req, res) => {
        try {
            const articles = await app.models.Article.find();
            res.json({articles});
        } catch (err) {
            console.log('Error while getting articles', err);
            res.status(500).json({ok: false, err: err.message});
        }
    });
};