var DD = DD || {};

$( document).on("click", ".details", function (event) {

    var elm = event.target;

    if (elm.dataset && elm.dataset.entity && elm.dataset.uid) {

        $.publish(elm.dataset.entity + "/load", [elm.dataset.uid]);

    }

});

$( document).on("click", "#person-new-donation", function () {

    var person = DD.person[$(this).data("uid")];

    $.publish("donation/load", [{}, person]);

});

$( document).on("click", "li.person-edit-donation", function () {

    var donation = DD.donation[this.id],
        person = DD.person[this.dataset.uid];

    $.publish("donation/load", [donation, person]);

});

$( document).on("click", "#person-new-contact", function () {

    var person = DD.person[$(this).data("uid")];

    $.publish("contact/load", [{}, person]);

});

$( document).on("click", "li.person-edit-contact", function () {

    var contact = DD.contact[this.id],
        person = DD.person[this.dataset.uid];

    $.publish("contact/load", [contact, person]);

});

$( window ).on( "pagechange", function (event, data) {

    if (data.options.target === "/view/person.html") {

        //type
        var page = $('div#person'),
            person = data.options.entity,
            personType = $("#person-type"),
            personTitle = $("#person-title"),
            personFirstName = $("#person-first-name"),
            personLastName = $("#person-last-name"),
            personSuffix = $("#person-suffix"),
            personOrgName = $("#person-org-name"),
            personGender = $("#person-gender"),
            personNotes = $("#person-notes"),
            personAddress1 = $("#person-address1"),
            personAddress2 = $("#person-address2"),
            personCity = $("#person-city"),
            personState = $("#person-state"),
            personZip = $("#person-zip"),
            personCounty = $("#person-county"),

        //INTERESTS
            personInterests = $("#person-interests"),
            personAddInterests = $("#person-addinterests"),

        //CONTACT INFO
            personEmail = $("#person-email"),
            personPhone1 = $("#person-phone1"),
            personPhone2 = $("#person-phone2"),
            personPhone3 = $("#person-phone3"),
            personPhoneType1 = $("#person-phonetype1"),
            personPhoneType2 = $("#person-phonetype2"),
            personPhoneType3 = $("#person-phonetype3"),
            personContactPref = $("#person-contactpref"),

        //CONTACTS
            personContacts = $("#person-contacts"),

        //DONATIONS
            personDonations = $("#person-donations");


        DD.person = DD.person || {};

		 //build dropdowns
        $.each(DD.lov["Person Types"], function (i, opt) {
            var option = "";

            option += '<option value="' + opt.id + '"';
            if (person.PersonType === opt.id) {
                option += " selected";
            }
            option += '>' + opt.displayName;
            option += '</option>';
            $(option).appendTo(personType);
            personType.selectmenu("refresh");
        });
		$.each(DD.lov.Genders, function (i, opt) {
            var option = "";

            option += '<option value="' + opt.id + '"';
            if (person.Gender === opt.id) {
                option += " selected";
            }
            option += '>' + opt.displayName;
            option += '</option>';
            $(option).appendTo(personGender);
            personGender.selectmenu("refresh");
        });
		$.each(DD.lov.PhoneTypes, function (i, opt) {
            var optionPre = "", optionPost = "", option1Chk = "", option2Chk = "", option3Chk = "";
        
            if (person.PhoneType1 === opt.id) {
                option1Chk = " selected";
            }
            if (person.PhoneType2 === opt.id) {
                option2Chk = " selected";
            }
            if (person.PhoneType3 === opt.id) {
                option3Chk = " selected";
            }
            optionPre = '<option value="' + opt.id + '"';
            optionPost = '>' + opt.displayName + '</option>';
        
            $(optionPre+option1Chk+optionPost).appendTo(personPhoneType1);
            $(optionPre+option2Chk+optionPost).appendTo(personPhoneType2);
            $(optionPre+option3Chk+optionPost).appendTo(personPhoneType3);
            personPhoneType1.selectmenu("refresh");
            personPhoneType2.selectmenu("refresh");
            personPhoneType3.selectmenu("refresh");
        });
        $.each(DD.lov["Contact Preferences"], function (i, opt) {
            var option = "";

            option += '<option value="' + opt.id + '"';
            if (person.ContactPreference === opt.id) {
                option += " selected";
            }
            option += '>' + opt.displayName;
            option += '</option>';
            $(option).appendTo(personContactPref);
            personContactPref.selectmenu("refresh");
        });
        $.each(DD.lov.Interests, function (i, opt) {
            var option = '<option value="' + opt.id + '">' + opt.displayName + '</option>';
            $(option).appendTo(personAddInterests);
            personAddInterests.selectmenu("refresh");
        });
		
		if(person.PersonID){
        	DD.person[person.PersonID] = person;

	        $("#person-new-donation").data("uid", person.PersonID);
	        $("#person-new-contact").data("uid", person.PersonID);
        
	        personTitle.val(person.Title);
	        personFirstName.val(person.FirstName);
	        personLastName.val(person.LastName);
	        personSuffix.val(person.Suffix);
	        personOrgName.val(person.OrgName);
	        
	        personNotes.val(person.FamilyInfo);
	        personAddress1.val(person.Address1);
	        personAddress2.val(person.Address2);
	        personCity.val(person.City);
	        personState.val(person.State);
	        personZip.val(person.Zip);
	        personCounty.val(person.County);
	        personEmail.val(person.EmailAddress);
	        personPhone1.val(person.Phone1);
	        personPhone2.val(person.Phone2);
	        personPhone3.val(person.Phone3);
	        
	        $.each(person.Interests, function (i, opt) {
	            var item = "";

	            item += '<li data-icon="delete" id="int' + opt.InterestID + '"><a href="#" interestid="' + opt.InterestID + '">' + opt.LOV.Name;
	            item += '</a></li>';
	            $(item).appendTo(personInterests);
	            personInterests.listview("refresh");
	        });

	        $.each(person.Contacts || [], function (i, contact) {

	            var item = "",
	                parts = [];

	            DD.contact = DD.contact || {};

	            DD.contact[contact.ContactID] = contact;

	            item += '<li class="person-edit-contact" data-icon="gear" data-uid="';
	            item += person.PersonID;
	            item += '" id="';
	            item += contact.ContactID + '"><a href="#">';
	            item += new Date(contact.ScheduleDate).toLocaleString().split(" ")[0];
	            if (contact.LOV_Channel) {
	                parts.push(contact.LOV_Channel.Name);
	            }
	            if (contact.LOV_Fundraiser) {
	                parts.push(contact.LOV_Fundraiser.Name);
	            }
	            if (contact.LOV_Outcome) {
	                parts.push(contact.LOV_Outcome.Name);
	            }
	            if (parts.length) {
	                item += ' - ';
	            }
	            item += parts.join(" - ");
	            item += '</a></li>';

	            $(item).appendTo(personContacts);
	            personContacts.listview("refresh");

	        });

	        $.each(person.Donations || [], function (i, donation) {

	            var item = "";

	            DD.donation = DD.donation || {};

	            DD.donation[donation.DonationID] = donation;

	            item += '<li class="person-edit-donation" data-icon="gear" data-uid="';
	            item += person.PersonID;
	            item += '" id="';
	            item += donation.DonationID + '"><a href="#">';
	            item += new Date(donation.DonationDate).toLocaleString()
	                .replace(/(\S+)(.+)/, function (a,b) {
	                    return b;
	                });
	            item += ' - $';
	            item += String(donation.Amount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	            item += '</a></li>';

	            $(item).appendTo(personDonations);
	            personDonations.listview("refresh");

	        });
    	}
        // Add delete interest handler
        $( '#person-interests', page ).off().on( 'click', function( e ) {
            var intID = e.target.attributes.interestid.value;
            
            $.ajax( DD.api.interest + '/' + intID, {
                type: 'DELETE'
                , data: null
                , contentType: 'application/json'
            }).done(
                function( data ) {
                    $('#person-interests').find('li#int' + intID).remove();
                }
            );
        });
        
        // Add new interest handler
        $('#person-new-interest').off().on( 'click', function( e ) {
            var intID = $('#person-addinterests').val();
            $.ajax( DD.api.interest, {
                type: 'POST'
                , data: JSON.stringify({ PersonID: person.PersonID, Interest1: intID })
                , contentType: 'application/json'
            }).done(
                function( data ) {
                    var lov = DD.lov.Interests.filter(function(item){ return item.id === data.Interest1; })[0] || {Name: "Unknown"};
                    var item = '<li data-icon="delete" id="int' + data.InterestID + '"><a href="#" interestid="' + data.InterestID + '">' + lov.displayName;
                    item += '</a></li>';
                    $(item).appendTo(personInterests);
                    personInterests.listview("refresh");
                }
            );
        });

        // ADD BACK HANDLER
        $( 'a[name="back"]', page ).off().on( 'click', function( e ) {
            $.mobile.changePage( "/view/person.html", {entity: person});
        });
        
        // ADD SAVE HANDLER
        $( 'a[name="save"]', page ).off().on( 'click', function( e ) {

            if( !personType.val() || !personLastName.val() || !personGender.val() ) {
                return;
            }
            
            // REQUIRED FIELDS PROVIDED, CONTINUE
            person.PersonType = personType.val();
            person.Title = personTitle.val();
            person.FirstName = personFirstName.val();
            person.LastName = personLastName.val();
            person.Suffix = personSuffix.val();
            person.OrgName = personOrgName.val();
            person.Gender = personGender.val();
            person.FamilyInfo = personNotes.val();
            person.Address1 = personAddress1.val();
            person.Address2 = personAddress2.val();
            person.City = personCity.val();
            person.State = personState.val();
            person.Zip = personZip.val();
            person.County = personCounty.val();
            person.EmailAddress = personEmail.val();
            person.Phone1 = personPhone1.val();
            person.Phone2 = personPhone2.val();
            person.Phone3 = personPhone3.val();
            person.PhoneType1 = personPhoneType1.val();
            person.PhoneType2 = personPhoneType2.val();
            person.PhoneType3 = personPhoneType3.val();
            person.ContactPreference = personContactPref.val();
            //person. = person.val();

            if( !person.PersonID ) {
                // NEW PERSON
                $.post( DD.api.person, person ).done(
                    function( data ) {
                        $.mobile.changePage( "/view/person.html", {entity: person});
                    }
                );
            } else {
                // PERSON EXISTS
                var p = JSON.parse(JSON.stringify(person));
                delete p.LOV_ContactPreference;
                delete p.LOV_Gender;
                delete p.LOV_PersonType;
                delete p.LOV_PhoneType1;
                delete p.LOV_PhoneType2;
                delete p.LOV_PhoneType3;
                delete p.Contacts;
                delete p.Donations;
                delete p.Interests;
                $.ajax( DD.api.person + '/' + person.PersonID, {
                    type: 'PUT'
                    , data: JSON.stringify(p)
                    , contentType: 'application/json'
                }).done(
                    function( data ) {
                        $.mobile.changePage( "/view/person.html", {entity: person});
                    }
                );
            }
        });
    }

});