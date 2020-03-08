# os-auth
 > Authenticate a user using native authentication request boxes

# Screenshots
![the os-auth screen running on windows]('https://github.com/ssight/os-auth/blob/master/screenshots/windows.png')

![the os-auth screen running on linux]('https://github.com/ssight/os-auth/blob/master/screenshots/linux.png')

# Usage
## Synopsis
```js
osAuth( TITLE, MESSAGE )
```
Title - The title of the window

Message - The text that is displayed. Note that this has no effect on Linux.

This will return a promise with the value of `true`, authenticated, or `false`, not authenticated

---

## Example
```js
const osAuth = require('os-auth');
osAuth().then(console.log)
```
This will ask the user for authentication, printing out `true` or `false`, depending on weather they inputted their credentials correctly or not.

### Async function usage:
Since, `osAuth` returns a promise, the following will also work:
```js
const osAuth = require('os-auth');

(async () => {
    var authenticated = osAuth("Test", "Please enter your username and password");

    if (authenticated) {
        // The user is authenticated! Do whatever now.
    } else {
        // The user's entered their username or password wrong.
    }

})();
```

### Regular promise usage:
You could also do this:
```js
const osAuth = require('os-auth');

osAuth("Test", "Please enter your username and password").then(authenticated => {
    if (authenticated) {
        // The user is authenticated! Do whatever now.
    } else {
        // The user's entered their username or password wrong.
    }
}).catch(error => {
    // There was an error.
})
```