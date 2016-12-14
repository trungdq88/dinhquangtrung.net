// All windows component

var Windows = Windows || {};

Windows.ScreenWidth = 1366;
Windows.ScreenHeight = 768;

Windows.MOUSE_LEFT_BUTTON = 0;
Windows.MOUSE_MIDDLE_BUTTON = 1;
Windows.MOUSE_RIGHT_BUTTON = 2;

Windows.TASKBAR_HEIGHT = 30;

Windows.focusChangeListener = Array();

Windows.setFocusTo = function(obj) {
	Windows.Screen.find('*').removeClass('focus');
	if (obj !== undefined) {
	    obj.addClass('focus');
	} else {
		// Set focus to no where
	}

	for (var i = Windows.focusChangeListener.length - 1; i >= 0; i--) {
		if (typeof Windows.focusChangeListener[i] === "function") {
			Windows.focusChangeListener[i]();
		}
	};

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

Windows.setCursor = function(cursorName) {
	if (cursorName === undefined) cursorName = 'default';
	$('body').css('cursor', cursorName);
}

Windows.setWindowsMoveable = function(obj, set) {
	if (set) {
		if (!obj.hasClass('ui-draggable')) {
			obj.draggable({
		        cancel: '.window_controls',
		        handle: "titlebar",
		        start: function(e, f) {
		        	// Dragging when windows is in maximum state > to normal, this code below is to keep to mouse position
		        	if ($(f.helper).hasClass('max')) {
		        		$(this).data("offsetX",e.offsetX - 300);
                    	Windows.setWindowsSize(f.helper, 'normal');
		        	} else {
		        		$(this).data("offsetX", 0);
		        	}

		        	// Display the iframe_mask so the dragging will not be interupted by iframes
		        	// See: http://stackoverflow.com/a/5646590/1420186
		        	$(this).addClass('showmask');
			    },
				drag: function(event,ui){
					// Reposition in case of state from Maximum > Normal
					var st = parseInt($(this).data("offsetX"));
					ui.position.left += st;
				},
		        stop: function(e, f) {
		        	// If the title bar is overflowed, then reposition
		        	if (f.offset.top < 0) {
		        		Windows.setWindowsSize(f.helper, 'max');
		        	}

		        	// Hide the iframe_mask
		        	$(this).removeClass('showmask');
			    }
	    	});
		} else {
			obj.draggable('enable');
		}
		if (!obj.hasClass('ui-resizable')) {
			obj.resizable({
		        handles: 'n, e, s, w, ne, se, sw, nw',
		        minHeight: 150,
		        minWidth: 200,
		        start: function(e, f) {
		        	$(this).addClass('showmask');
		        },
		        stop: function(e, f) {
		        	if (f.position.top < 0) {
		        		// Windows.setWindowsSize(f.helper, 'max');
		        		f.helper.css({
		        			top: '0',
		        			bottom: Windows.TASKBAR_HEIGHT,
		        			height: 'auto'
		        		});
		        	}
		        	$(this).removeClass('showmask');
			    }
		    });
		} else {
			obj.resizable('enable');
		}
	} else {
		if (!obj.hasClass('ui-draggable')) {
			obj.draggable('disable');
		}
		if (!obj.hasClass('ui-resizable')) {
			obj.resizable('disable');
		}
	}
}

Windows.setWindowsSize = function(windowObj, state) {
	if (state == 'max') {
        windowObj.removeClass('min').addClass('max');
        // add draggable & resizable
		if (windowObj.hasClass('ui-resizable')) {
	        windowObj.resizable('disable');
	    }
	} else if (state == 'normal') {
        windowObj.removeClass('max').removeClass('min');
        // add draggable & resizable
		if (windowObj.hasClass('ui-resizable')) {
	        windowObj.resizable('enable');
	    }

        if (Number(windowObj.css('top').replace('px', '')) < 0) {
        	windowObj.css('top', 0);
        }

	} else if (state == 'min') {
        windowObj.removeClass('max').addClass('min');
	}
}