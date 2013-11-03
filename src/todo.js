// TODO PAGE
$( document ).on( "pagebeforeshow", 'div#todo', function( e, data ) {

	var page = $(e.currentTarget);

	$.get(DD.api.todo).done(
		function( data ) {

			var jqList = $('ul', page)
				, results = ''
                , currDt = new Date()
			;
			$.each( data, function( index, item ) {
                var due = new Date(item.ScheduleDate);
				var name =
					item.LOV_Fundraiser.Name + ' - ' +
					item.LOV_Channel.Name + ' - Due: ' +
                    (due < currDt ? "<span style='color: red;'>" + due.toLocaleString().split(" ")[0] + "</span>" : due.toLocaleString().split(" ")[0]);
				;
				results += '<li><a href="#" data-uid="' + item.PersonID + '" data-entity="person" class="details">' + name + '</a></li>';
			});
			jqList.html( results ).listview( 'refresh' );
		}
	);
});