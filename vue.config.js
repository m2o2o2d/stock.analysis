const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const APP_PATH = resolve('src/renderer');
const alias = (dir) => path.join(APP_PATH, dir);

module.exports = {
    chainWebpack: config => {
        config.resolve.alias
            .set('@', APP_PATH)
            .set('@components', alias('components'))
            .set('@pages', alias('pages'))
            .set('@utils', alias('utils'));
    }
};
