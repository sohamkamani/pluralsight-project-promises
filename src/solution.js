const fs = require('fs').promises

module.exports = function () {
        return Promise.all([fs.readFile('sample1.txt'), fs.readFile('sample2.txt')])
                .then(([sample1, sample2]) => {
                        return sample1.toString().length + sample2.toString().length
                })
}