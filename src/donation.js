// ADMIN PAGE
$( window ).on( "pagechange", function (event, data) {

	if( data.options.target != '/view/donation.html' ) {
		return;
	}

	DD.promises.lov.done(
		function() {
			var person = data.options.relatedEntity
				, donation = data.options.entity || {}
				, page = $('div#donation')
				, selectValues = DD.lov['Donation Sources']
			;

			$( 'label#donation-donor', page ).html( person.Name );
			// SELECT (SOURCE) OPTIONS
			var options = '';
			$.each(selectValues, function(key, value) {   
				options += '<option value="' + key + '">' + value + '</option>';
			});
			$('select#donation-source', page ).html( options );
			if( !!donation ) {
				$('select#donation-source', page )
					.val( donation.Source )
					.selectmenu("refresh")
				;

				$('input#donation-amount', page ).html( donation.Amount );
				$('input#donation-date', page ).html( donation.DonationDate );
			}


			// ADD SAVE HANDLER
			$( 'a[name="save"]', page ).off().on( 'click', function( e ) {

				var date = $('input#donation-date', page).val()
					, amount = $('input#donation-date', page).val()
					, source = $( 'select#donation-source', page).val()
				;

				if( !date || (!amount || isNaN(amount)) || !source ) {
					return;
				}
				// REQUIRED FIELDS PROVIDED, CONTINUE
				donation.PersonID = person.PersonID;
				donation.DonationDate = new Date( date ).toISOString()
				donation.Amount = amount;
				donation.Source = source;

				if( !donation.DonationID ) {
					// NEW DONATION
					$.post( DD.api.donation, donation ).done(
						function( data ) {
							$.mobile.changePage( "/view/person.html", {entity: person});
						}
					);
				} else {
					// DONATION EXISTS
					$.ajax( DD.api.donation, {
						type: 'PUT'
						, data: donation
						, contentType: 'application/json'
					}).done(
						function( data ) {
							$.mobile.changePage( "/view/person.html", {entity: person});
						}
					);
				}
			});
		}
	);
});