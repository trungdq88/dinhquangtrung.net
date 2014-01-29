var CSCmdFactory = CSCmdFactory || {};



CSCmdFactory.config = {
    CS: null
}

CSCmdFactory.caller = function(func, args) {
    // Init arguments
    var i = 0;
    var _args = {};
    for (p in func.params) {
        _args[p] = args[i++];
    };

    // Call
    func.exec(_args);
}

CSCmdFactory.execute = function(command, CSConsole) {
    CSCmdFactory.config.CS = CSConsole;
    var tokens = command.trim().split(' ');
    if (command.length > 0) {
        // Get function name and arguments
        var func = tokens[0];
        var args = tokens.splice(1);

        // Check if function is exists
        if (typeof CSCmdFactory._func[func] === 'object') {
            // Call function
            CSCmdFactory.caller(CSCmdFactory._func[func], args);
        } else {
            CSCmdFactory.config.CS.out.printError('Unknown command: ' + func);
        }
    }
};

CSCmdFactory._func = {};

CSCmdFactory._func.cat = {
    description: 'Display a file',
    params: {
        filename: 'File name to read'
    },
    exec: function(args) {
        var CS = CSCmdFactory.config.CS;
        if (typeof args.filename !== 'undefined') {
            var filePath = Helper.Path.buildAbsolutePath(CS.config.currDir, args.filename);
            if (CSDataAdapter.checkFile(filePath)) {
                CSDataAdapter.readfile(filePath, function(data) {
                    if (data !== null) {
                        CS.out.printInfo(data);
                    } else {
                        CS.out.printError('File not found on server: ' + args.filename);
                    }
                });
            } else {
                CS.out.printError('File not found: ' + args.filename);
            }

        } else {
            CS.out.printError("Please provide filename to read.");
        }
    }
};

CSCmdFactory._func.ls = {
    description: 'List files',
    params: {
        dir: "Directory to list files"
    },
    exec: function(args) {
        var CS = CSCmdFactory.config.CS;

        if (typeof args.dir === 'undefined') args.dir = "";
        var dirPath = Helper.Path.buildAbsolutePath(CS.config.currDir, args.dir);
        CSDataAdapter.listfile(dirPath, function(data) {
            if (data !== null) {
                CS.out.printInfo(data);
            }
        });
    }
};

CSCmdFactory._func.cd = {
    description: 'Change directory',
    params: {
        dir: "Directory path"
    },
    exec: function(args) {
        var CS = CSCmdFactory.config.CS;
        if (typeof args.dir !== 'undefined') {
            // Build absolute path from currDir and parameter.
            var dest = Helper.Path.buildAbsolutePath(CS.config.currDir, args.dir);
            console.log('dest=' + dest);
            if (CSDataAdapter.checkDir(dest)) {
                CS.config.currDir = dest.replace(/\/$/, '') + "/";
                CS.out.printCurrDir();
            } else {
                CS.out.printError('Directory not found: ' + args.dir)
            }

        }
    }
};

CSCmdFactory._func.help = {
    description: 'Show you how to use a command.',
    params: {
        cmd: 'Command you want to lookup',
    },
    exec: function(args) {
        var CS = CSCmdFactory.config.CS;
        if (typeof args.cmd !== 'undefined') {
            var targetFunc = CSCmdFactory._func[args.cmd];
            if (typeof targetFunc === 'object') {
                CS.out.printSuccess(args.cmd + ': ' + targetFunc.description);

                if (Object.keys(targetFunc.params).length > 0) {
                    CS.out.printSuccess('Arguments: ');
                    for (p in targetFunc.params) {
                        CS.out.printSuccess('   ' + p + ': ' + targetFunc.params[p])
                    }
                } else {
                    CS.out.printSuccess('(No arguments)');
                }
            } else {
                CS.out.printError('Command not found: ' + args.cmd);
            }
        } else {
            // Print default help
            CS.out.printSuccess("Available commands: ");

            for (cmd in CSCmdFactory._func) {
                CS.out.printSuccess("   " + cmd + ": " + CSCmdFactory._func[cmd].description);
            }
        }
    }
};

CSCmdFactory._func.clear = {
    description: 'Clear console screen',
    params: {},
    exec: function(args) {
        var CS = CSCmdFactory.config.CS;
        CS.out.clearScreen();
        CS.out.printCurrDir();
    }
};
