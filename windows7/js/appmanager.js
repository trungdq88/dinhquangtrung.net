var AppManager = AppManager || {};

AppManager.Apps = {
  cstrike: {
    name: 'Counter Strike 1.6',
    type: 'FullScreenApp',
    url: '/game/cstrike'
  },
  learnj: {
    name: 'Learn Japanese',
    type: 'Window',
    url: '/apps/learnj',
    size: {
      width: 1000,
      height: 650
    }
  },
  sing: {
    name: 'Sing the right songs',
    type: 'Window',
    url: 'https://trungdq88.github.io/sing-the-right-songs/',
    size: {
      width: 600,
      height: 600
    }
  },
  schoolrevisiontool: {
    name: 'Memory Training Tool',
    type: 'Window',
    url: 'https://trungdq88.github.io/school-revision-tool/',
    size: {
      width: 400,
      height: 600
    }
  },
  github_explorer: {
    name: 'GitHub Explorer',
    type: 'Window',
    url: 'https://github-e.com/#/user/trungdq88',
    size: {
      width: 400,
      height: 600
    }
  },
  devutils: {
    name: 'DevUtils.app',
    type: 'Window',
    url: 'https://devutils.app/',
    size: {
      width: 900,
      height: 600
    }
  },
  profile: {
    name: 'My Twitter',
    type: 'Link',
    url: 'https://twitter.com/tdinh_me',
    size: {
      width: 900,
      height: 600
    }
  },
  chessjs: {
    name: 'ChessJS',
    type: 'Window',
    url: 'https://thawing-wave-3281.herokuapp.com/',
    size: {
      width: 1100,
      height: 700
    }
  },
  flamehackernews: {
    name: 'Flame News',
    type: 'Window',
    url: 'https://trungdq88.github.io/hn-big-threads/',
    size: {
      width: 900,
      height: 600
    }
  },
  thesimpleapi: {
    name: 'The Simple API',
    type: 'Window',
    url: 'https://thesimpleapi.com/',
    size: {
      width: 900,
      height: 600
    }
  },
  smartdoge: {
    name: 'Smart Doge',
    type: 'Window',
    url: 'https://trungdq88.github.io/smart-doge',
    size: {
      width: 700,
      height: 700
    }
  }
};

AppManager.StartApp = function (appname) {
  Windows.setCursor('progress');

  var destination = AppManager.Apps[appname];
  console.log(AppManager.Apps);
  setTimeout(function () {
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
          WindowsManager.AddWindow(
            destination.name,
            appname,
            destination.url,
            Helper.getCenterPosition(destination.size)
          );
          break;
        default:
          alert('App type is not supported!');
          break;
      }
    }

    Windows.setCursor();
  }, 1000);
};
