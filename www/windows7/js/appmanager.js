var AppManager = AppManager || {};

AppManager.Apps = {
	'cstrike': {
		name: 'Counter Strike 1.6',
		type: 'FullScreenApp',
		url: '/game/cstrike'
	},
	'learnj': {
		name: 'Learn Japanese',
		type: 'Window',
		url: '/apps/learnj',
		size: {
			width: 1000,
			height: 650
		}
	},
	'github': {
		name: 'GitHub',
		type: 'Link',
		url: 'https://github.com/trungdq88/dinhquangtrung.net',
		size: {
			width: 900,
			height: 600
		}
	},
	'wordpress': {
		name: 'My blog',
		type: 'Window',
		url: '/blog',
		size: {
			width: 900,
			height: 600
		}
	}
}

AppManager.StartApp = function(appname) {
	Windows.setCursor('progress');

	var destination = AppManager.Apps[appname];
	setTimeout(function() {
		if (destination === undefined) {
			alert('This app is not ready yet!');
		} else {
			switch (destination.type) {
				case 'FullScreenApp':
					window.location = DQT.baseUrl + destination.url;
					break;
				case 'Link':
					window.location = destination.url;
					break;
				case 'Window':
					WindowsManager.AddWindow(destination.name, appname, destination.url, Helper.getCenterPosition(destination.size));
					break;
				default:
					alert('App type is not supported!');
					break;
			}
		}

		Windows.setCursor();
	}, 1000);
}

