// TODO PAGE
$( document ).on( "pagebeforeshow", 'div#todo', function( e, data ) {

	var page = $(e.currentTarget);

	$.get( 'http://localhost:8000/src-test/Todo' ).done(
		function( data ) {

			var data = JSON.parse( data )
				, jqList = $('ul', page)
				, results = ''
			;
			$.each( data, function( index, item ) {
				console.log( item );
				var name =
					item.LOV_Fundraiser.Name + ' - ' +
					item.LOV_Channel.Name + ' - Due: ' +
					new Date(item.ScheduleDate).toLocaleString().split(" ")[0];
				;
				results += '<li><a href="#" data-uid="' + item.PersonID + '" data-entity="person" class="details">' + name + '</a></li>';
			});
			jqList.html( results ).listview( 'refresh' );
		}
	);
});