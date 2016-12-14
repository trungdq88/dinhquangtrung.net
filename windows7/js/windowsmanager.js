var WindowsManager = WindowsManager || {};

// Range of z-index for windows: 101 - 199 (maximum of 98 windows)
WindowsManager.DEFAULT_BEGIN_WINDOWS_ZINDEX = 101;

WindowsManager.DEFAULT_WINDOW_POSITION_X = 50;
WindowsManager.DEFAULT_WINDOW_POSITION_Y = 50;
WindowsManager.DEFAULT_WINDOW_POSITION_SHIFT = 30;
WindowsManager.DEFAULT_WINDOW_SIZE_HEIGHT = 500;
WindowsManager.DEFAULT_WINDOW_SIZE_WIDTH = 500;


WindowsManager.GenerateId = function() {
	return Math.round(Math.random()*10000000);
}

WindowsManager.WindowsStack = {
	stack: Array(),
	add: function(id) {
		id = Number(id);
		WindowsManager.WindowsStack.stack.push(id);
		WindowsManager.WindowsStack.refreshWindowsLayers();
	},
	remove: function(id) {
		id = Number(id);
		// Find the id 
		var idIndex = WindowsManager.WindowsStack.stack.indexOf(id);
		// Remove at the position
		WindowsManager.WindowsStack.stack.splice(idIndex, 1);
	},
	moveToTop: function(id) {
		id = Number(id);
		// Find the id
		var idIndex = WindowsManager.WindowsStack.stack.indexOf(id);
		// push to top
		WindowsManager.WindowsStack.stack.push(id);
		// Remove at the position
		WindowsManager.WindowsStack.stack.splice(idIndex, 1);

		WindowsManager.WindowsStack.refreshWindowsLayers();
	},
	moveToBottom: function() {
		// remove from top
		var topId = WindowsManager.WindowsStack.stack.pop();
		// console.log('move to bottom: ' + topId);
		// Add the id at the bottom
		WindowsManager.WindowsStack.stack.splice(0, 0, topId);
	},
	getTop: function() {
		return WindowsManager.WindowsStack.stack[WindowsManager.WindowsStack.stack.length - 1];
	},
	refreshWindowsLayers: function() {
		// Re-order windows layer
		for (var i = WindowsManager.WindowsStack.stack.length - 1; i >= 0; i--) {
			var windowObj = WindowsManager.getWindow(WindowsManager.WindowsStack.stack[i]);
			// console.log('index: ' + i);
			windowObj.css('z-index', WindowsManager.DEFAULT_BEGIN_WINDOWS_ZINDEX + i);
		};
	}
}

WindowsManager.activeTaskbarItem = function(id) {
	$('.task').removeClass('active');
	var windowObj = WindowsManager.getWindow(id);
	if (windowObj.hasClass('focus')) {
		var taskbarObj = WindowsManager.getTaskItem(id);
		taskbarObj.addClass('active');	
	}
}

WindowsManager.AddWindow = function(title, icon, url, position) {
	var id = WindowsManager.GenerateId();

	// Prepare HTML
	var windowHtml = '<window windowId="' + id + '">' +
                    '<titlebar>' +
                        '<img src="images/icons/' + icon + '.png" alt="' + title + '"/>' +
                        '<span class="window_title">' + title + '</span>' +
                        '<span class="window_controls">' +
                            '<span title="Fullscreen" class="control full"><span class="sprite_icon full"></span></span><span title="Minimize" class="control min"><span class="sprite_icon min"></span></span><span title="Maximize" class="control max"><span class="sprite_icon max"></span></span><span title="Close" class="control close"><span class="sprite_icon close"></span></span>' +
                        '</span>' +
                    '</titlebar>' +
                    '<content>' +
                        '<div class="iframe_mask"></div><iframe src="' + url + '"></iframe>' +
                    '</content>' +
                '</window>';

     var taskbarHtml = '<div class="task" windowId="' + id + '"><img src="images/icons/' + icon + '.png" />' + title + '</div>';

     // Add to HTML
     $('windows').append(windowHtml);
     $('tasks').append(taskbarHtml);

     // Set events & add to windows stack
     var windowObj = WindowsManager.getWindow(id);
     Windows.setWindowsMoveable(windowObj, true);
     WindowsManager.WindowsStack.add(id);

     // Set position
     if (position === undefined) {
    	windowObj.css({
	     	'left': WindowsManager.DEFAULT_WINDOW_POSITION_X + WindowsManager.DEFAULT_WINDOW_POSITION_SHIFT * (WindowsManager.WindowsStack.stack.length % 10),
	     	'top': WindowsManager.DEFAULT_WINDOW_POSITION_Y + WindowsManager.DEFAULT_WINDOW_POSITION_SHIFT * (WindowsManager.WindowsStack.stack.length % 10),
			'height': WindowsManager.DEFAULT_WINDOW_SIZE_HEIGHT,
	     	'width': WindowsManager.DEFAULT_WINDOW_SIZE_WIDTH
     	});
     } else {
    	windowObj.css(position);
     }
     
     // Set focus
	Windows.setFocusTo(windowObj);
     

}

WindowsManager.getWindow = function(id) {
	return $('window[windowId='+id+']');
}
WindowsManager.getTaskItem = function(id) {
	return $('.task[windowId='+id+']');
}
WindowsManager.closeWindows = function(id) {
	if (id !== undefined) {
		var windowObj = WindowsManager.getWindow(id);
		var taskbarObj = WindowsManager.getTaskItem(id);
		windowObj.fadeOut(200, function() {
			windowObj.remove();
		});
		taskbarObj.animate({
			'min-width': 0,
			'opacity': 0
		}, 200, function() {
			taskbarObj.remove();
		});
		WindowsManager.WindowsStack.remove(id);
	}
}

WindowsManager.releaseFocus = function() {
	WindowsManager.WindowsStack.moveToBottom();
	var nextFocusWindow = WindowsManager.getWindow(WindowsManager.WindowsStack.getTop());
	Windows.setFocusTo(nextFocusWindow);
}

WindowsManager.doMinimize = function(id) {
	var windowObj = WindowsManager.getWindow(id);
	var taskbarObj = WindowsManager.getTaskItem(id);
	
	windowObj.addClass('min');
	WindowsManager.releaseFocus();
	
}

WindowsManager.initWindowsEvents = function() {

	// Set focus when meet window
	Windows.Screen.on('mousedown', 'window', function(e) {
        if (e.button == Windows.MOUSE_LEFT_BUTTON) {
            WindowsManager.WindowsStack.moveToTop($(this).attr('windowId'));
            Windows.setFocusTo($(this));
        }
    })

    // Set focus for external apps
    Windows.Screen.on('mousedown', 'window iframe', function(e) {
        if (e.button == Windows.MOUSE_LEFT_BUTTON) {
            console.log(e);
        }
    });

    Windows.Screen.on('mouseup', 'window', function(e) {
        if (e.button == Windows.MOUSE_LEFT_BUTTON) {
            if ($(e.target).hasClass('close')) {
                // $(this).fadeOut(200);
                WindowsManager.closeWindows($(this).attr('windowId'));
            } else if ($(e.target).hasClass('max')) {
                if ($(this).hasClass('max')) {
                    Windows.setWindowsSize($(this), 'normal');
                } else {
                    Windows.setWindowsSize($(this), 'max');
                }
            } else if ($(e.target).hasClass('min')) {
            	if (!$(this).hasClass('min')) {
					WindowsManager.doMinimize($(this).attr('windowId'));
				}
            } else if ($(e.target).hasClass('full')) {
            	window.location = $(this).find('iframe').attr('src');
            }

        } else if (e.button == Windows.MOUSE_MIDDLE_BUTTON) {
            // Show context menu
        }
    });

    Windows.Screen.on('mouseup', '.task', function(e) {
    	var windowId = $(this).attr('windowId');
		var windowObj = WindowsManager.getWindow(windowId);
		var taskbarObj = WindowsManager.getTaskItem(windowId);
		
		if (!windowObj.hasClass('min')) {
			if (windowObj.hasClass('focus')) {
				WindowsManager.doMinimize(windowId);
			} else {
				WindowsManager.WindowsStack.moveToTop(windowId);
				Windows.setFocusTo(windowObj);
			}
		} else {
			windowObj.removeClass('min');
			WindowsManager.WindowsStack.moveToTop(windowId);
			Windows.setFocusTo(windowObj);
		}
    });

    Windows.Screen.on('dblclick', 'window', function(e) {
        if ($(e.target).is('titlebar') || $(e.target).hasClass("window_title")) {
            if ($(this).hasClass('max')) {
                Windows.setWindowsSize($(this), 'normal');
            } else {
                Windows.setWindowsSize($(this), 'max');
            } 
        }
    });

    // Register focus change listener to handle focus in windows and taskbar items
    Windows.focusChangeListener.push(function() {
    	// Set active taskbar item
		WindowsManager.activeTaskbarItem(WindowsManager.WindowsStack.getTop());
    });
}