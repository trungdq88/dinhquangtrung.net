var CSConsole = CSConsole || {};





CSConsole.config = {
    consoleDOM: '#console-dialog .textarea',
    wrapper: 'span',
    commandFactory: CSCmdFactory
};

CSConsole.clipboard =  new CSClipboard();

CSConsole.out = {
	writeAll: function(string) {
		if (typeof string === 'undefined') string = '';
		var obj = $(CSConsole.config.consoleDOM);
		obj.html(string);
	},
    write: function(string, style) {
    	if (typeof string === 'undefined') string = '';
    	if (typeof style === 'undefined') style = '';

    	string = Helper.String.htmlentities(string);

        var config = CSConsole.config;
        var obj = $(config.consoleDOM);
        var preHtml = obj.html();
        CSConsole.out.writeAll(preHtml + "<" + config.wrapper + " style=\"" + style + "\">" + string + "</" + config.wrapper + ">");
        obj.scrollTop(obj[0].scrollHeight);
    },
    writeln: function(string, style) {
        CSConsole.out.write(string, style);
        CSConsole.out.write("\n");
    },
    printInfo: function(mess) {
        CSConsole.out.writeln(mess);
    },
    printError: function(mess) {
        CSConsole.out.writeln(mess, "color: #FF7171");
    },
    printSuccess: function(mess) {
        CSConsole.out.writeln(mess, "color: #71FF7C");
    },
    printWarning: function(mess) {
        CSConsole.out.writeln(mess, "color: #FFD771");
    },
    clearScreen: function() {
    	CSConsole.out.writeAll();
    }
};

CSConsole.execute = function(command) {
	CSConsole.out.printInfo("> " + command);
    CSConsole.config.commandFactory.execute(command, CSConsole.out);
};
