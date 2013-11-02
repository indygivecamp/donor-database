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
		var id = index.toLowerCase().replace( / /g, '' )
		
		results += '<li><a href="#' + id + '" data-id="' + id + '">' + index + '</a></li>';
		// CREATE NEW PAGE FOR THEM AS WELL
		$( '<div data-role="page" data-type="admin" id="' + id + '" data-title="' + index + '"></div>' )
			.appendTo( $.mobile.pageContainer ).html( content )
			.find( 'h1' ).html( index ).end()
			.find( 'input' ).attr( 'placeholder', index ).end()
		;
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

	var jqList = $('ul', id);

	// HANDLE ADD NEW ITEM CLICK
	$( id, page ).off().on( 'click', 'a', function(e) {
		var val = $('input', id).val();
		if( !!val ) {
			DD.saveNewListItem( path, { name: val }, jqList );
		}
	});
	$( id, page ).off().on( 'click', 'a', function(e) {
		// SET ACTIVE/INACTIVE

	});

	// LOAD LOV DATA FOR THIS SUBPAGE
	DD.promises.lov.done(
		function( data ) {
			var results = '';
			$.each( data[title], function( key, value ) {
				results += '<li data-role="fieldcontain"><label>' + value.displayName + '</label><select name="toggle' + key + '" id="toggle' + key + '" data-role="slider"><option value="off">Hide</option><option value="on">Show</option></select></li>';
			});
			jqList.html( results ).listview( 'refresh' );
			$( 'select', jqList ).slider();
		}
	);
});

// LOAD JSON DATA (ID/NAME) AS LIST ITEMS FROM PATH
DD.getListItems = function( path, jqList ) {
	return $.getJSON( '/api/' + path, function( data ) {
		var results = '';
		$.each( data, function( index, item ) {
			results += '<li data-id="' + item.id + '">' + item.name + '</li>';
		});
		jqList.html( results );
		jqList.listview( 'refresh' );
	});
};

DD.saveNewListItem = function( path, data, jqList ) {
	return $.post( '/api/' + path, data, function( response ) {
		jqList.prepend( '<li data-id="' + response.id + '">' + data.name + '</li>' );
		jqList.listview( 'refresh' );
	});
};
