const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
    const articlesService = require('./../../services/article')(app);
    const userService = require('./../../services/user')(app);

    app.express.post('/articles', [
            check('instances').exists(),
            check('user_name').exists()
        ],
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(422).json({ ok: false, errors: errors.mapped() });
                }
                const user = await userService.findUser(req.body.user_name);
                const result  = await articlesService.buyArticles(user.id, req.body.instances);
                res.json({result});
            } catch (err) {
                console.log('Error while getting articles', err);
                if (err.isBoom) {
                    res.status(err.output.statusCode).json({ok: false, err: err.message, data: err.data});
                } else {
                    res.status(500).json({ok: false, err: err.message});
                }

            }
    });
};