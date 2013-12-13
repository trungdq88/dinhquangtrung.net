function CSClipboard() {
    init = {
        _cursor: -1,
        _queue: [],
        config: {
            maxEntry: 100
        },
        next: function() {
            if (CSConsole.clipboard._cursor > CSConsole.clipboard._queue.length - 1) {
                return "";
            } else {
                return CSConsole.clipboard._queue[++CSConsole.clipboard._cursor] || "";
            }
        },
        prev: function() {
            if (CSConsole.clipboard._cursor < 0) {
                return "";
            } else {
                return CSConsole.clipboard._queue[--CSConsole.clipboard._cursor] || "";
            }
        },
        add: function(str) {
            CSConsole.clipboard._queue.push(str);
            if (CSConsole.clipboard._queue.length > CSConsole.clipboard.config.maxEntry) {
                CSConsole.clipboard._queue.splice(0, 1);
            } else {
                CSConsole.clipboard._cursor = CSConsole.clipboard._queue.length;
            }
        },
        resetCursor: function() {
            CSConsole.clipboard._cursor = CSConsole.clipboard._queue.length;
        }
    };
    return init;
}
