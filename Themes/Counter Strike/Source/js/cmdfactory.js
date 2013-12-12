var CSCmdFactory = CSCmdFactory || {};



CSCmdFactory.config = {
    outputStream: null
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

CSCmdFactory.execute = function(command, out) {
    CSCmdFactory.config.outputStream = out;
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
            out.printError('Unknown command: ' + func);
            out.printError("Use 'help' for, you know, help.");
        }
    }
};

CSCmdFactory._func = {};

CSCmdFactory._func.help = {
    description: 'Show you how to use a command.',
    params: {
        cmd: 'Command you want to lookup',
    },
    exec: function(args) {
        var out = CSCmdFactory.config.outputStream;
        if (typeof args.cmd !== 'undefined') {
            var targetFunc = CSCmdFactory._func[args.cmd];
            if (typeof targetFunc === 'object') {
                out.printSuccess(args.cmd + ': ' + targetFunc.description);

                if (Object.keys(targetFunc.params).length > 0) {
	                out.printSuccess('Arguments: ');
	                for (p in targetFunc.params) {
	                    out.printSuccess('	' + p + ': ' + targetFunc.params[p])
	                }
	            } else {
	            	out.printSuccess('(No arguments)');
	            }
            } else {
            	out.printError('Command not found: ' + args.cmd);
            }
        } else {
            // Print default help
            out.printSuccess("Available commands: ");

            for (cmd in CSCmdFactory._func) {
    			out.printSuccess("	" + cmd + ": " + CSCmdFactory._func[cmd].description);
            }
        }
    }
};

CSCmdFactory._func.echo = {
    description: 'Print out the same input.',
    params: {
        string: 'Input string for echo',
    },
    exec: function(args) {
        var out = CSCmdFactory.config.outputStream;
        if (typeof args.string !== 'undefined') {
            out.printInfo(args.string);
        } else {
            out.printError("Please provide input string. Use 'help echo' for help.");
        }
    }
};

CSCmdFactory._func.clear = {
    description: 'Clear console screen',
    params: {
    },
    exec: function(args) {
	    var out = CSCmdFactory.config.outputStream;
	    out.clearScreen();
    }
};
