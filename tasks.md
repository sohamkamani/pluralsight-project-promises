# Javascript Promises and Async Programming

This project will help you understand how promises work in javascript. 

Promises are a tool to help you express asynchronous tasks as a chain of instructions, without falling into [callback hell](http://callbackhell.com/).

Let's set up our environment first:

## Verify locally

To setup this project on your machine, follow these instructions:

1. Clone this repository
2. Within the project folder, run the command: `npm install`
3. Run the command `npm test`: This will start running the tests. Initially, the test will fail, but don't worry! We will fix all of them by the end of this project

>It is recommended to run this project on Node v12 or above, and npm v6 or above. You can install the latest version [here](https://nodejs.org/en/download/)

Your code will go in the `src/solution.js` file.

## Task 1: Read the "sample1.txt" file

The `sample1.txt` file has been provided as part of the project. We need to create a function which returns a promise that opens the file.

You can use the [readFile](https://nodejs.org/api/fs.html#fs_filehandle_readfile_options) method of the  [fs promises API](https://nodejs.org/api/fs.html#fs_fs_promises_api). The best way to do this is to require the fs promises module and use the `readFile` method in your code:

```js
const fs = require('fs').promises

module.exports = function(){
        // your code here
}
```

Use `fs.readFile` to read `sample1.txt` and return the result of the method call from the exported function.

## Task 2: Return the total character length

Using the [then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method on the `fs.readFile` promise, return the total character count of the `sample1.txt` file.

The `readFile` method resolves to a [Buffer](https://nodejs.org/api/buffer.html). You can use the `toString` method to get the string of the file contents.

## Task 3: Handle errors

Every promise can potentially resolve to an error. Add a [catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method to the `readFile` promise and log the resulting error to the console, using the `console.error` method.

## Task 4: Find the sum of character lengths of multiple files

The `sample2.txt` file has been provided as part of the project. We need to return the sum of characters in `sample1.txt` and `sample2.txt`.

We can make use of the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method to resolve multiple promises at once:

```js
Promise.all([promise1, promise2, promiseN])
        .then(([result1, result2, resultN]) => {
                // handle results here
        })
```

