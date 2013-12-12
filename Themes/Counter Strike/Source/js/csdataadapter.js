var CSDataAdapter = CSDataAdapter || {};

CSDataAdapter.readfile = function(filename, callback) {
    // TODO: ajax request to read file here.
    var fakeFile = $('#' + filename.replace('.', '-'));
    console.log(fakeFile);
    if (fakeFile.length) {
        callback(fakeFile.html());
    } else {
        callback(null);
    }
}

CSDataAdapter.listfile = function(callback) {
    var fakeFiles = $('#data-string div');

    var result = Array();
    fakeFiles.each(function(k, v) {
        result.push($(v).attr('id').replace('-', '.'));
    });

    callback(result.join("\n"));
}
