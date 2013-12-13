var CSDataAdapter = CSDataAdapter || {};




CSDataAdapter.config = {
    dataDirName: 'data'
}


CSDataAdapter.readfile = function(filename, callback) {
    var _url = CSDataAdapter.config.dataDirName + "/" + filename.replace(/^\//, '');
    $.ajax({
        url: _url,
        type: 'get'
    }).done(function(data) {
        callback(data);
    }).fail(function(data) {
        callback(null);
    });
}

CSDataAdapter.listfile = function(currDir, callback) {
    // Remove the first and the last / character
    currDir = currDir.replace(/^\//, '').replace(/\/$/, '');

    var result = Array();
    var dirPathSelector = 'dir[name=root]>dir';
    var filePathSelector = 'dir[name=root]>file';

    // If not root
    if (currDir !== '') {
        result.push('..');
        // Build dir selector path
        // Input: /about_me/subfolder/fileabc.txt
        // dir[name=root]>dir[name=about_me]>dir[name=subfolder]>dir
        dirPathSelector = 'dir[name=root]>dir[name=' 
                            + currDir.replace('/',']>dir[name=')
                            + ']>dir';
        filePathSelector = 'dir[name=root]>dir[name=' 
                            + currDir.replace('/',']>dir[name=')
                            + ']>file';
    }

    var dirs = $('#data-string ' + dirPathSelector);
    var files = $('#data-string ' + filePathSelector);

    dirs.each(function(k, v) {
        result.push($(v).attr('name') + "/");
    });

    
    files.each(function(k, v) {
        result.push($(v).attr('name').replace('-', '.'));
    });

    callback(result.join("\n"));
}

CSDataAdapter.checkDir = function(dir) {
    // Remove the first and the last / character
    dir = dir.replace(/^\//, '').replace(/\/$/, '');

    var dirPathSelector = 'dir[name=root]>dir';
    var filePathSelector = 'dir[name=root]>file';

    if (dir !== '') {
        dirPathSelector = 'dir[name=root]>dir[name=' 
                            + dir.replace('/',']>dir[name=')
                            + ']';
    }

    try {
        var dirs = $('#data-string ' + dirPathSelector);
        return dirs.length > 0;
    } catch(e) {
        return false;
    }
}

CSDataAdapter.checkFile = function(file) {
    // Remove the first and the last / character
    file = file.replace(/^\//, '').replace(/\/$/, '');

    var filePathSelector = 'dir[name=root]';

    var stack = file.split('/');
    var filename = stack.pop();
    var dir = stack.join('/');

    if (dir !== '') {
        filePathSelector = 'dir[name=root]>dir[name=' 
                            + dir.replace('/',']>dir[name=')
                            + ']';
    }

    filePathSelector += '>file[name=' + filename.replace('.','-') + ']';

    try {
        var files = $('#data-string ' + filePathSelector);
        return files.length > 0;
    } catch(e) {
        return false;
    }
}