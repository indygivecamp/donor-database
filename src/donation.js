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

			var name =
				( !!person.Title ? person.Title + ' ' : '' ) +
				( !!person.FirstName ? person.FirstName + ' ' : '' ) +
				( !!person.LastName ? person.LastName + ' ' : '' ) +
				( !!person.Suffix ? person.Suffix + ' ' : '' ) +
				( !!person.OrgName ? '( ' + person.OrgName + ' )' : '' )
			;
			$( 'label#donation-donor', page ).html(name);
			// SELECT (SOURCE) OPTIONS
			var options = '';
			$.each(selectValues, function(key, value) {   
				options += '<option value="' + value.id + '">' + value.displayName + '</option>';
			});
			$('select#donation-source', page ).html( options );
			if( !!donation ) {
				$('select#donation-source', page ).val( donation.Source ).selectmenu("refresh");
				$('input#donation-amount', page ).val( donation.Amount );
				$('input#donation-date', page ).val(DD.dateToInput(new Date(donation.DonationDate)));
			}

			// ADD BACK HANDLER
			$( 'a[name="back"]', page ).off().on( 'click', function( e ) {
				$.mobile.changePage( "/view/person.html", {entity: person});
			});

			// ADD SAVE HANDLER
			$( 'a[name="save"]', page ).off().on( 'click', function( e ) {

				var date = $('input#donation-date', page).val()
					, amount = $('input#donation-amount', page).val()
					, source = $( 'select#donation-source', page).val()
				;

				if( !date || (!amount || isNaN(amount)) || !source ) {
					return;
				}
				// REQUIRED FIELDS PROVIDED, CONTINUE
				donation.PersonID = person.PersonID;
				donation.DonationDate = new Date( date ).toISOString();
				donation.Amount = amount;
				donation.Source = source;

				if( !donation.DonationID ) {
					// NEW DONATION
					$.post( DD.api.donation, donation ).done(
						function( data ) {
                            person.Donations.push(data);
							$.mobile.changePage( "/view/person.html", {entity: person});
						}
					);
				} else {
					// DONATION EXISTS
                    var d = JSON.parse(JSON.stringify(donation));
                    delete d.LOV_Source;
					$.ajax( DD.api.donation + '/' + donation.DonationID, {
						type: 'PUT'
						, data: JSON.stringify(d)
						, contentType: 'application/json'
					}).done(
						function( data ) {
                            for(var i = 0; i < person.Donations.length; i++) {
                                if(person.Donations[i].DonationID == donation.DonationID) {
                                    person.Donations[i].DonationDate = donation.DonationDate;
                                    person.Donations[i].Amount = donation.Amount;
                                    person.Donations[i].Source = donation.Source;
                                    break;
                                }
                            }
							$.mobile.changePage( "/view/person.html", {entity: person});
						}
					);
				}
			});
		}
	);
});