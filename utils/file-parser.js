const acorn = require("acorn")
const walk = require("acorn-walk")
const fs = require('fs')

module.exports = function (fileName, cb) {
        const solutionCode = fs.readFileSync(fileName).toString()

        const memberExpressions = []
        walk.simple(acorn.parse(solutionCode), {
                MemberExpression(node) {
                        memberExpressions.push(node)
                }
        })

        function containsMethodCall(obj, method) {

                for (let i = 0; i < memberExpressions.length; i++) {
                        const memEx = memberExpressions[i]
                        if (memEx.object.name === obj && memEx.property.name === method) {
                                return true
                        }
                }
                return false
        }

        cb({
                memberExpressions,
                containsMethodCall: containsMethodCall
        })
}