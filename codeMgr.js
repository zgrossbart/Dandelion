codeMgr = {
    runScript: function() {
        // Update script to edited version
    	var code = codeMgr.editor.getValue();
        var canvas = codeMgr.scope.view.canvas;
        codeMgr.scope.clear();
        codeMgr.scope.setup(canvas);
    	codeMgr.scope.evaluate(code);
        
        $('#editContainer').hide();
        $('#container').show();
    },
    
    editScript: function() {
        $('#container').hide();
        $('#editContainer').show();
         
        var editorDiv = $('.CodeMirror-scroll');
        editorDiv.addClass('fullscreen');
        editorDiv.height('100%');
        editorDiv.width('100%');

        codeMgr.editor.focus();
        codeMgr.editor.refresh();
    }
};

jQuery(document).ready(function() {
    
    var file = (function func1() {
        var result;
        
        $.ajax({
            type: "GET",
            url: 'dandelion.pjs',
            async: false,
            processData: false,
            dataType: 'html',
            success: function(data){
                result = data;
            }
        });
        
        return result;
    })();
    
    $('#code').val(file);
    
    codeMgr.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        matchBrackets: true,
        mode: 'javascript',
        lineNumbers: true,
        matchBrackets: true,
        indentUnit: 4,
        tabMode: 'shift'
    });
    
    $('#editContainer').css('height', ($(window).height() - 75) + 'px');
    
    $('#reload').click(function(evt) {
        window.location.reload();
    });
    
    
    $('#run').click(function(evt) {
        codeMgr.runScript();
    });
    
    $('#edit').click(function(evt) {
        codeMgr.editScript();
    });
});
