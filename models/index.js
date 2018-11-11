const RecursiveRead = require('recursive-readdir');
const util = require('util');
const recursiveRead = util.promisify(RecursiveRead);
const path = require('path');

module.exports = async function (app) {
    const models = {};
    try {
        const files = await recursiveRead('./models');
        for (let i = 0; i < files.length; i++) {
            const fileName = files[i];
            if (fileName.indexOf('index.js') === -1) {
                const modelName = path.basename(fileName, path.extname(fileName));
                const model = await require(`../${fileName}`)(app);
                models[modelName] = model;
            }
        }
        return models;
    } catch (err) {
        console.log('Failed to read models directory', err);
        throw err;
    }
};