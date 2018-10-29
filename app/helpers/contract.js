const contractCode = require('./../config/token.tmpl');
const Mustache = require('mustache');

module.exports = function (name, symbol, decimals, startAmountTokens) {
    return Mustache.render(contractCode, {
        name,
        symbol,
        decimals,
        startAmountTokens
    })
}