const exec = require("execute-command-sync");
exec("bash dev/gitano.sh", {cwd: __dirname + "/.."});
exec("gitanoaddfile README.md package.json src/* test/* dist/* dev/* && gitanopush", {
	cwd: __dirname + "/../"
});