
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


Helper.Path = {};

Helper.Path.buildAbsolutePath = function (currDir, dest) {

	// If destination starts with /, then look up from root
	if (dest.length === 0) {
		return currDir;
	}

	var canonicalPath;

	if (dest.substring(0, 1) === '/') {
		dest = dest.replace(/\/$/, '');
		canonicalPath = dest;
	} else {
		// Format destination
		dest = dest.replace(/^\//, '').replace(/\/$/, '');

		// Join
		// This string will start with / and end with non-/
		// EX: /abc/def/../ghi/aer/../../asd
		canonicalPath = currDir + dest; 
	}

	// Convert canonicalPath to absolute path
	var stack = canonicalPath.split('/');
	var absolutePathStack = Array();
	for (i = 0; i < stack.length; ++i) {
		if (stack[i] === '.') {
			continue;
		} else if (stack[i] === '..') {
			absolutePathStack.pop();
		} else {
			absolutePathStack.push(stack[i]);
		}
	}

	// Return
	return absolutePathStack.join('/');
}

Helper.DOM = {};

Helper.DOM.sendCursorToEnd = function(obj) {
    var value =  $(obj).val(); //store the value of the element
    var message = "";
    if (value != "") {
        message = value + "\n";
     };
    $(obj).focus().val(message);
    $(obj).unbind();
 }