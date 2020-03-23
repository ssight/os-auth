# os-auth
 > Authenticate a user using native authentication request boxes

# Screenshots
### Windows
![the os-auth screen running on Windows](https://github.com/ssight/os-auth/blob/master/screenshots/windows.png)

### Linux
![the os-auth screen running on Linux](https://github.com/ssight/os-auth/blob/master/screenshots/linux.png)

### MacOS
![the os-auth screen running on MacOS](https://github.com/ssight/os-auth/blob/master/screenshots/macos.png)

# Installation
### Through NPM:
`npm i os-auth` or `npm install os-auth  --save`
### Through Git:
`git clone https://github.com/ssight/os-auth.git`

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
Since `osAuth` returns a promise, the following will also work:
```js
const osAuth = require('os-auth');

(async () => {
    var authenticated = await osAuth("Test", "Please enter your username and password");

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

# Known Issues
* The `message` property currently has not effect on the prompt in Linux.

* The username is always assumed correct on MacOS, with no box for it.
