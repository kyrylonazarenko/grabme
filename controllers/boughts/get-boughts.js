const { check, validationResult } = require('express-validator/check');

module.exports = function (app) {
    const boughtService = require('./../../services/bought')(app);
    const userService = require('./../../services/user')(app);
    app.express.get('/boughts', [
        check('user_name').exists()
    ], async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ ok: false, errors: errors.mapped() });
            }
            const user = await userService.findUser(req.query.user_name);
            const boughts = await boughtService.findAll(user.id);
            res.json(boughts);
        } catch (err) {
            console.log('Error while getting boughts', err);
            res.status(500).json({ok: false, err: err.message});
        }
    });
};