const filesystem = require('fs');
const { spawn } = require('child_process');

module.exports = (title, message) => {
    return new Promise((resolve, reject) => {
        title = title || "Authentication Request";
        message = message || "A program is requesting your authentication. Please enter your username and password.";

        if (process.platform === 'win32') {
            var authCMD_txt = filesystem.readFileSync("./lib/win32/auth", 'utf-8').replace("$title", title).replace("$message", message);
            var auther = spawn("powershell", [authCMD_txt]);
            auther.stdout.on('data', auth => {
                auth = auth.toString().trim();
                if (auth === 'True') resolve(true);
                else if (auth === 'False') resolve(false);
            })
        }

        else if (process.platform === 'linux') {
            title = title || "Authentication Request";

            var auther = spawn("bash", ["./lib/linux/auth", title]);
            auther.stdout.on('data', auth => {
                auth = auth.toString().trim();
                if (auth === 'True') resolve(true);
                else if (auth === 'False') resolve(false);
            })
        }

        else if (process.platform === 'darwin') {
            title = title || "Authentication Request";
            message = message || "A program is requesting your authentication. Please enter your password.";

            var prompt = spawn("osascript", ["./lib/darwin/prompt.scpt", title, message]);
            prompt.stdout.on('data', password => {
                password = password.toString().split(":").pop();

                var auther = spawn("bash", ["./lib/darwin/auth", password]);
                auther.stdout.on('data', auth => {
                    auth = auth.toString().trim();
                    if (auth === 'True') resolve(true);
                    else if (auth === 'False') resolve(false);
                })
            })
            prompt.stderr.on('data', err => {
                err = err.toString();
                if (err.includes("(-128)")) resolve(false);
            })
        }

        else reject("User operating system does not work with os-auth")
    })
}