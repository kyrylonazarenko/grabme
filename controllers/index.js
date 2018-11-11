const RecursiveRead = require('recursive-readdir');
const util = require('util');
const recursiveRead = util.promisify(RecursiveRead);
const path = require('path');

module.exports = async function (app) {
    try {
        const files = await recursiveRead('./controllers');
        files.forEach((fileName) => {
            if (fileName.indexOf('index.js') === -1) {
                require(`../${fileName}`)(app);
            }
        });
    } catch (err) {
        console.log('Failed to read controllers directory', err);
        throw err;
    }
};