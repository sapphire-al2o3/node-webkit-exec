
/*jslint vars: true, plusplus: true, devel: true, nomen: true,  regexp: true, indent: 4, maxerr: 50 */
/*global define, brackets, $, window*/

define(function (require, exports, module) {
	'use strict';
	
	var FileUtils      = brackets.getModule("file/FileUtils"),
		NodeDomain     = brackets.getModule("utils/NodeDomain"),
		ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
		ProjectManager = brackets.getModule("project/ProjectManager");
	
	var config = JSON.parse(require('text!./config.json'));

	var simpleDomain = new NodeDomain("node-webkit-exec", ExtensionUtils.getModulePath(module, "execnw.js"));

	
	function _run() {
		
		var root = ProjectManager.getProjectRoot(),
			dir = root ? FileUtils.getDirectoryPath(root.fullPath) : '',
			nw = config.nw;
		
		root.getContents(function(err, contents) {
			for(var i = 0; i < contents.length; i++) {
				if(contents[i].name === 'package.json') {
					if(nw) simpleDomain.exec('execnw', dir, nw);
					break;
				}
			}
		});
	}
	
	ExtensionUtils.loadStyleSheet(module, "style.css");
	
	$("<a>").attr({ id: "node-webkit-icon", href: "#" })
		.click(_run)
		.appendTo($("#main-toolbar .buttons"));
});
