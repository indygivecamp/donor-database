var DD = DD || {};

// ADMIN PAGE
$(document).on( 'pagebeforeshow', 'div#admin', function( e, data ) {

	var page = $(e.currentTarget)
		, path = page.data('path')
		, id = '#' + page.attr('id')
		, content = $('#admin-page-content').html()
	;

	// GRAB DD.Lov and chunk into list items
	var results = '';
	$.each( DD.lov, function( index, item ) {
		var id = index.toLowerCase().replace( / /g, '' );
		
		results += '<li><a href="#' + id + '" data-id="' + id + '">' + index + '</a></li>';

        if ( !document.getElementById(id) ) {

            // CREATE NEW PAGE FOR THEM AS WELL
            $( '<div data-role="page" data-type="admin" id="' + id + '" data-title="' + index + '"></div>' )
                .appendTo( $.mobile.pageContainer ).html( content )
                .find( 'h1' ).html( index ).end()
                .find( 'input' ).attr( 'placeholder', index ).end()
            ;

        }
	});
	$( 'ul', page ).html( results ).listview( 'refresh' );
});

// INDIVIDUAL ADMIN PAGES
$(document).on( 'pagebeforeshow', 'div[data-role="page"][data-type="admin"]', function( e, data ) {

	var page = $(e.currentTarget)
		, path = page.data('path')
		, id = '#' + page.attr('id')
		, title = page.data('title')
		, content = $('#admin-page-content').html()
	;

	page.html( content );
	page.find( 'h1' ).html( title );
	page.find( 'input' ).attr( 'placeholder', title );
	page.trigger( 'pagecreate' );

	// LOAD LOV DATA FOR THIS SUBPAGE
	DD.promises.admin_lov.done(
		function( data ) {
			var results = '';
			$.each( data[title], function( key, value ) {
                var name = "checkbox-" + value.id;
                results += '<input type="checkbox" name="';
                results += name + '" id="' + name + '"';
                if (value.active) {
                    results += " checked=checked";
                }
                results += '>';
                results += '<label for="' + name + '">';
                results += value.displayName + '</label>';
			});
            $('fieldset', id).html( results ).trigger("create");
		}
	);
});
