// PEOPLE PAGE
$( document ).on( "pagebeforeshow", 'div#people', function( e, data ) {

	var page = $(e.currentTarget);

	$.get( 'http://localhost:8000/src-test/People' ).done(
		function( data ) {

			var data = JSON.parse( data )
				, jqList = $('ul', page)
				, results = ''
			;
			$.each( data, function( index, item ) {
				console.log( item );
				var name =
					( !!item.Title ? item.Title + ' ' : '' ) +
					( !!item.FirstName ? item.FirstName + ' ' : '' ) +
					( !!item.LastName ? item.LastName + ' ' : '' ) +
					( !!item.Suffix ? item.Suffix + ' ' : '' ) +
					( !!item.OrgName ? '( ' + item.OrgName + ' )' : '' )
				;
				results += '<li><a href="#" data-uid="' + item.PersonID + '" data-entity="person" class="details">' + name + '</a></li>';
			});
			jqList.html( results ).listview( 'refresh' );
		}
	);
});