var updatePageNav = function() {
	
	var ToC = $('.documentation-table-of-contents'),
		ToContent = $('.toc-content'),
		ToClbl = $('<strong class="f-14 toc-label">In this section:</strong>');

    if (!ToC[0]) {
        return
    }

    ToContent.html('')
	$('h2, h3, h4', '#main-content').each(function() {
		ToC.prepend(ToClbl);
		ToContent.append('<a href="#' + $(this).attr('id') +'" class="button">' + $(this).text() +'</a><br>');
	});
	
	var ToClength = ToContent.children().length;
	
	if(ToClength < 4) {
		ToC.remove();
	}
	
}

$(document).ready(updatePageNav)
$(document).on("turbolinks:load", updatePageNav)
