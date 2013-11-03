// PEOPLE PAGE
$( document ).on( "pagebeforeshow", 'div#people', function( e, data ) {

	var page = $(e.currentTarget);

	$.get(DD.api.person).done(
		function( data ) {

			var jqList = $('ul', page)
				, results = ''
			;
			$.each( data, function( index, item ) {
				var name =
					( !!item.LastName ? item.LastName + ', ' : '' ) +
					( !!item.FirstName ? item.FirstName : '' ) +
					( !!item.Suffix ? ', ' + item.Suffix : '' ) +
					( !!item.OrgName ? ' ( ' + item.OrgName + ' )' : '' )
				;
				results += '<li><a href="#" data-uid="' + item.PersonID + '" data-entity="person" class="details">' + name + '</a></li>';
			});
			jqList.html( results ).listview( 'refresh' );
		}
	);
});