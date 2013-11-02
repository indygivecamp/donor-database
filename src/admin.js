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
            $( '<div data-role="page" data-type="admin" data-lovtypeid="' + item.TypeId + '" id="' + id + '" data-title="' + index + '"></div>' )
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
		, id = '#' + page.attr('id')
		, title = page.data('title')
		, content = $('#admin-page-content').html()
		, lovTypeID = page.data( 'lovtypeid' )
	;

	page.html( content );
	page.find( 'h1' ).html( title );
	page.find( 'input' ).attr( 'placeholder', title );
	page.trigger( 'pagecreate' );

	var createRow = function( key, value ) {
        var name = "checkbox-" + value.LOVID
        	, results = '<input type="checkbox" data-key="' + key +  '" name="'
        ;
        results += name + '" id="' + name + '"';
        if (!!value.Active) {
            results += " checked=checked";
        }
        results += '>';
        results += '<label for="' + name + '">';
        results += value.Name + '</label>';
        return results;		
	};

	// LOAD LOV DATA FOR THIS SUBPAGE
	DD.promises.admin_lov.done(
		function( data ) {
			var results = ''
				, jqFieldSet = $('fieldset', id)
			;
			// CREATE ROWS
			$.each( data[title], function( key, value ) {
				results += createRow( key, value );
			});
            jqFieldSet.html( results ).trigger( 'create' );
            // ADD HANDLERS FOR 'ADD NEW' AND 'ACTIVE/INACTIVE'
            $('a[name="addNew"]', id).off().on( 'click', function( e ) {
            	//$.post();
            	var t = $(e.currentTarget)
            		, val = $('input[name="new"]').val()
            	;
            	if( !!val ) {
            		// SAVE NEW TYPE
            		var newData = {
            			Name: val
            			, Active: true
            			, LOVTypeID: lovTypeID
            			, DisplayOrder: 1
            		}
					$.post( DD.api.lov, newData, function( response ) {
						DD.admin_lov.flush();
						DD.admin_lov.update().done(
							function() {
								page.trigger('create');
							}
						);
					});
				}
            });

            $('fieldset input[type="checkbox"]', id).off().on( 'change', function( e ) {
            	var t = $(e.currentTarget)
            		, id = t.attr('name').split('-')[1]
            		, lov = data[title][t.data('key')]
            	;
            	lov.Active = t.prop( 'checked' );
            	$.ajax( DD.api.lov, {
            		type: 'PUT'
            		, contentType: 'application/json'
            		, data: lov
            	}).done(
					DD.admin_lov.flush();
					DD.admin_lov.update().done(
						function() {
							page.trigger('create');
						}
					);
            	);
            });
		}
	);
});
