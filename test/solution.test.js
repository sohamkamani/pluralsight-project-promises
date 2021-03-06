const assert = require('assert')
const fn = require('../src/solution.js')
const fileParser = require('../utils/file-parser')
const fs = require('fs')

const taskTests = [
        fileContents => {
                assert.equal(fileContents instanceof Buffer, true, 'Are you returning the file contents?')
                assert.equal(fileContents.toString(), 'hello world!', 'Are you reading sample1.txt?')
        },
        fileContents => {
                assert.equal(typeof fileContents, 'number', 'Are you returning a number?')
                assert.equal(fileContents, 12, 'Are you returning the correct character length?')
        },
        () => {
                assert.fail('')
        },
        fileContents => {
                assert.equal(typeof fileContents, 'number', 'Are you returning a number?')
                assert.notEqual(fileContents, 12, 'Are you returning the character length of both the files (sample1.txt and sample2.txt)?')
                assert.equal(fileContents, 38, 'Are you returning the correct character length?')
        }
]

const doAllLaterTaskTestsThrowError = (fileContents, n) => {
        if (n >= (taskTests.length - 1)) {
                return true
        }
        let errors = 0

        for (let i = n; i < taskTests.length; i++) {
                const testFn = taskTests[i]
                try {
                        testFn(fileContents)
                } catch (err) {
                        errors++
                }
        }
        return errors >= (taskTests.length - n)
}

const runTaskTests = i => fileContents => {
        try {
                taskTests[i](fileContents)
        } catch (err) {
                if (doAllLaterTaskTestsThrowError(fileContents, i)) {
                        throw err
                }
        }
}

fileParser('src/solution.js', ({ containsMethodCall, memberExpressions }) => {


        it('Task 1: Read the sample.txt file', function () {
                assert.equal(typeof fn, 'function', 'Are you exporting a function?')
                assert.equal(hasPromiseMemberExpression(memberExpressions), true, 'Are you using the fs.promises module?')
                const returnVal = fn()
                catchIfPromise(returnVal)
                assert.notStrictEqual(returnVal, undefined, 'Is the function returning anything?')
                assert.equal(returnVal instanceof Promise, true, 'Are you returning a promise from the function?')
                assert.equal(containsMethodCall('fs', 'readFile'), true, 'Are you calling fs.readFile from your function?')
                return returnVal.then(runTaskTests(0))
        })

        it('Task 2: Return the total character length of sample1.txt', function () {
                const returnVal = fn()
                catchIfPromise(returnVal)
                return returnVal.then(runTaskTests(1))
        })

        it('Task 3: Handle errors', function () {
                const oldReadFile = fs.promises.readFile
                fs.promises.readFile = () => {
                        fs.promises.readFile = oldReadFile
                        return new Promise((_, reject) => {
                                reject(new Error('failure for test'))
                        })
                }
                const oldConsoleError = console.error
                let calledMsg = null
                console.error = (logTxt) => {
                        calledMsg = logTxt
                        console.error = oldConsoleError
                }
                return fn()
                        .then(() => {
                                assert.equal(calledMsg, 'Error: failure for test', 'Are you logging the error via console.error?')
                        })
                        .catch(err => {
                                if (err.code === 'ERR_ASSERTION') {
                                        throw err
                                }
                                assert.fail('are you handling promise errors with the "catch" method?')
                                fs.promises.readFile = oldReadFile
                        })
        })

        it('Task 4: Return the total character length', function () {
                assert.equal(containsMethodCall('Promise', 'all'), true, 'Are you calling the Promise.all method?')
                return fn()
                        .then(runTaskTests(3))
        })
})

function catchIfPromise(p) {
        if (p instanceof Promise) {
                p.catch(() => { })
        }
}

function hasPromiseMemberExpression(memberExpressions) {
        for (let i = 0; i < memberExpressions.length; i++) {
                if (memberExpressions[i].property.name === 'promises') {
                        return true
                }
        }
        return false
}