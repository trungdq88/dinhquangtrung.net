// All windows component

var Windows = Windows || {};

Windows.ScreenWidth = 1366;
Windows.ScreenHeight = 768;

Windows.MOUSE_LEFT_BUTTON = 0;
Windows.MOUSE_MIDDLE_BUTTON = 1;
Windows.MOUSE_RIGHT_BUTTON = 2;

Windows.setFocusTo = function(obj) {
	Windows.Screen.find('*').removeClass('focus');
	if (obj !== undefined) {
	    obj.addClass('focus');
	} else {
		// Set focus to no where
	}
}

/********************************************************
	START MENU PANEL
********************************************************/

Windows.StartMenuPanel = {};

// jQuery object that represent Start Menu Panel
Windows.StartMenuPanel.DOM = undefined; 

Windows.StartMenuPanel.setDOM = function(obj) {
	Windows.StartMenuPanel.DOM = obj;
}

Windows.StartMenuPanel.getDOM = function() {
	return Windows.StartMenuPanel.DOM;
}

// Check if the start menu is open or not
Windows.StartMenuPanel.isOpen = function() {
	return Windows.StartMenuPanel.DOM.hasClass('focus');
}