var soundStack = {};

function playsound(soundname) {
    createjs.Sound.play(soundname);
}


$(function() {

    /**********************************
    BIND EVENTS
    **********************************/

    // Set console dialog draggable
    $("#console-dialog").draggable({
        cancel: '.textarea'
    }).resizable();


    // Event for console dialog
    $(document).keydown(function(e) {
        if (e.keyCode === 192) {
            e.preventDefault();
            $('#console-dialog .commandbar input').val('');
            $('#console-dialog').stop().fadeToggle(function() {
                $('#console-dialog .commandbar input').focus();
            });
        }
    });

    // Event for sound effect on menu hover
    $('.menupart a').mouseenter(function() {
        playsound('menuhover');
    });

    // Event for command
    $('#console-dialog .commandbar input').keydown(function(e) {
        if (e.keyCode === 13) { // Key Enter
            e.preventDefault();
            $('#submit-button').click();
        } else if (e.keyCode === 38) { // Key Up
            $(this).val(CSConsole.clipboard.prev());
        } else if (e.keyCode === 40) { // Key Down
            $(this).val(CSConsole.clipboard.next());
        }
    }).click(function() {
        $(this).focus();
    });

    $('#submit-button').click(function() {
        CSConsole.clipboard.resetCursor();
        CSConsole.execute($('#console-dialog .commandbar input').val());
        $('#console-dialog .commandbar input').val('');
    });
    /**********************************
    PREPARE FOR DOMs
    **********************************/

    // Preload sounds
    createjs.Sound.registerSound({
        src: "sound/menuhover.wav",
        id: "menuhover"
    });

    // Focus the command line
    $('#console-dialog .commandbar input').focus();

    // Perform a sample command
    var sampleCmd = "cat welcome.txt";
    var i = 0;
    var sampleTimer = setInterval(function() {
        $('#console-dialog .commandbar input').val(sampleCmd.substring(0, i++));
        if ($('#console-dialog .commandbar input').val() === sampleCmd) {
        	clearTimeout(sampleTimer);
        	setTimeout(function() {
	    		$('#submit-button').click();
        	}, 100);
        }
    }, 50);
}); // End document ready
