var AppManager = AppManager || {};

AppManager.Apps = {
	'cstrike': {
		name: 'Counter Strike 1.6',
		type: 'FullScreenApp',
		url: '/game/cstrike',
	},
	'learnj': {
		name: 'Learn Japanese',
		type: 'FullScreenApp',
		url: '/apps/learnj',
	},
	'github': {
		name: 'GitHub',
		type: 'Link',
		url: 'https://github.com/trungdq88/dinhquangtrung.net'
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
				default:
					alert('App type is not supported!');
					break;
			}
		}

		Windows.setCursor();
	}, 1000);		


}

