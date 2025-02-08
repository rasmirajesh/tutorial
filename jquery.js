$(document).ready(function() {
    // Add task functionality
    $('#add-task').on('click', function(event) {
        event.preventDefault();
        var newTask = $('#new-task').val();
        if (newTask !== '') {
            var $newListItem = $('<li>').text(newTask);
            $newListItem.css({
                'background-color': 'rgb(201, 175, 236)',
                'margin': '5px',
                'padding': '5px',
                'border-radius': '20px',
                'font-size': '20px'
            });
            $newListItem.appendTo('.container');
            $('#new-task').val('');
        }
    });
    $(document).on('click', '.container li', function() {

        $(this).remove();
    
    });
})