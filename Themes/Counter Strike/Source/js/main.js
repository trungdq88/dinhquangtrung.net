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
    		CSConsole.execute($(this).val());
    		if ($(this).val() !== '') {
    			CSConsole.clipboard.add($(this).val());
    		}
    		$(this).val('');
    		CSConsole.clipboard.resetCursor();
    	} else if (e.keyCode === 38) { // Key Up
    		$(this).val(CSConsole.clipboard.prev());
    	} else if (e.keyCode === 40) { // Key Down
    		$(this).val(CSConsole.clipboard.next());
    	}
    }).click(function() {
    	$(this).focus();
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

}); // End document ready
