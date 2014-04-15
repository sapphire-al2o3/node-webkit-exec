(function() {
	'use strict';
	
	var exec = require('child_process').exec;
	
	function execnw(dir, nw) {
		exec(nw + ' ' + dir, function(err, stdout, stderr) {
		});
	}
	
	function init(domainManager) {
		if (!domainManager.hasDomain("node-webkit-exec")) {
			domainManager.registerDomain("node-webkit-exec", {major: 0, minor: 1});
		}
		domainManager.registerCommand(
			"node-webkit-exec",       // domain name
			"execnw",         // command name
			execnw,           // command handler function
			false,          // this command is synchronous in Node
			"Run Node-Webkit",
			[
				{name: "dir", type: "string", description: "dir"},
				{name: "nw", type: "string", description: "node-webkit path"}
			] // parameters
		);
	}

	exports.init = init;
	
}());