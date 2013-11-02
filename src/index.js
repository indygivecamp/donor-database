var DD = {};

$(document).on( 'pagebeforeshow', '#fundraisers', function() {
	
	// HANDLE ADD NEW FUNDRAISER CLICK
	$('#fundraisers').off().on( 'click', 'a', function(e) {
		var val = $('#fundraisers input').val();
		if( !!val ) {
			DD.saveNewListItem( 'api/fundraisers', { name: val } );
		}
	});

	// LOAD DATA
	DD.getListItems( '/api/fundraisers', $('#fundraisers ul') );
});

// LOAD JSON DATA (ID/NAME) AS LIST ITEMS FROM PATH
DD.getListItems = function( path, jqList ) {
	return $.getJSON( path, function( data ) {
		var results = '';
		$.each( data, function( index, item ) {
			results += '<li data-id="' + item.id + '">' + item.name + '</li>';
		});
		jqList.html( results );
		jqList.listview( 'refresh' );
	});
};

DD.saveNewListItem = function( path, data, jqList ) {
	return $.post( path, data, function( data ) {

	});
};
