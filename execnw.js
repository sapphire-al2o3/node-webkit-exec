(function() {
	'use strict';
	
	var exec = require('child_process').exec;
	
	function execnw(dir, nw) {
		exec(nw + ' ' + dir, function(err, stdout, stderr) {
		});
	}
	
	function init(domainManager) {
		if (!domainManager.hasDomain("simple")) {
			domainManager.registerDomain("simple", {major: 0, minor: 1});
		}
		domainManager.registerCommand(
			"simple",       // domain name
			"execnw",         // command name
			execnw,           // command handler function
			false,          // this command is synchronous in Node
			"Run Node-Webkit",
			[{name: "dir", // parameters
				type: "string",
				description: "dir"}]
		);
	}

	exports.init = init;
	
}());