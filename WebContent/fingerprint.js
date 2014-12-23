function getPluginDetails() {
	var plugins = "";

	/*
	 * This method said to not be supported by IE.
	 */
	for (var i = 0; i < navigator.plugins.length; ++i) {
		var plugin = navigator.plugins[i];
		plugins += "Plugin " + i + ": " + plugin.name + "; "
				+ plugin.description + "; " + plugin.filename + ";";

		for (var j = 0; j < plugin.length; ++j) {
			plugins += " (" + plugin[j].description + "; " + plugin[j].type
					+ "; " + plugin[j].suffixes + ")";
		}
		plugins += ". ";
	}

	if (plugins == "") {
		/*
		 * Try the method that works with IE. Uses an MIT licensed script,
		 * PluginDetect.
		 */
		var plugin_names = [ "Java", "QuickTime", "DevalVR", "Shockwave",
				"Flash", "WindowsMediaplayer", "Silverlight", "VLC" ];
		for (var i = 0; i < plugin_names.length; ++i) {
			var version = PluginDetect.getVersion(plugin_names[i]);
			if (version) {
				plugins += plugin_names[i] + " " + version + "; ";
			}
		}
	}

	return plugins;
}

function getScreenDetails() {
	return screen.width + "x" + screen.height + "x" + screen.colorDepth;
}

function getTimeZone() {
	return new Date().getTimezoneOffset();
}

function getSuperCookie() {
	var test = "";

	test += "DOM localStorage: ";
	if ('localStorage' in window && window['localStorage'] !== null) {
		test += "Yes";
	} else {
		test += "No";
	}
	test += ", ";

	test += "DOM sessionStorage: ";
	if ('sessionStorage' in window && window['sessionStorage'] !== null) {
		test += "Yes";
	} else {
		test += "No";
	}
	test += ", ";

	test += "IE userData: ";
	var persistDiv = $('<div id="tmpDiv" style="behavior:url(#default#userdata)"></div>');
	persistDiv.appendTo(document.body);
	try {
		tmpDiv.setAttribute("remember", "original value");
		tmpDiv.save("oXMLStore");
		tmpDiv.setAttribute("remember", "overwritten");
		tmpDiv.load("oXMLStore");
		if ((tmpDiv.getAttribute("remember")) == "original value") {
			test += "Yes";
		} else {
			test += "No";
		}
	} catch (ex) {
		return test += "No";
	}

	return test;
}