var DD = DD || {};


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

	// HANDLE ADD NEW FUNDRAISER CLICK
	$( id ).off().on( 'click', 'a', function(e) {
		var val = $('input', id).val();
		if( !!val ) {
			DD.saveNewListItem( path, { name: val }, jqList );
		}
	});

	// LOAD DATA
	DD.getListItems( path, jqList );
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
