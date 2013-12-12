
var Helper = Helper || {};


Helper.String = {};

Helper.String.htmlentities = function (str) {
	var tagsToReplace = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;'
	};

	var replaceTag = function (tag) {
	    return tagsToReplace[tag] || tag;
	}

	return str.replace(/[&<>]/g, replaceTag);
}

