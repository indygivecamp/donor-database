var DD = DD || {};

//$(document).on( 'pagebeforeshow', 'div#person', function( e, data ) {
//
//    var page = $(e.currentTarget)
//        , path = page.data('path')
//        , id = '#' + page.attr('id')
//        , personType = $("#person-type")
//    ;
//
//    //fetch person
//    $.getJSON(DD.api.person + "");
//
//
//    //on fetch done create options for person-type
//    $.each(DD.lov["Person Types"], function (opt) {
//
//        var option = "";
//
//        option += '<option value="' + opt.id + '"';
////      make selected
////        if () {
////            option += ;
////        }
//        option += '>' + opt.displayName;
//        option += '</option>';
//
//        $( option ).appendTo( personType );
//
//    });
//
//});

$( document).on("click", ".details", function (event) {

    var elm = event.target;

    if (elm.dataset && elm.dataset.entity && elm.dataset.uid) {

        $.publish(elm.dataset.entity + "/load", [elm.dataset.uid]);

    }

});

$( window ).on( "pagechange", function (event, data) {

    if (data.options.target === "/view/person.html") {

        //TODO remove
        console.log(data.options.entity);

        //type
        var person = data.options.entity,
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

        //CONTACT INFO
            personEmail = $("#person-email"),
            personPhone1 = $("#person-phone1"),
            personPhone2 = $("#person-phone2"),
            personPhone3 = $("#person-phone3");

        //CONTACTS

        //DONATIONS

        $.each(DD.lov["Person Types"], function (i, opt) {
            var option = "";

            option += '<option value="' + opt.id + '"';
            if (person.PersonType === opt.id) {
                option += "checked=checked";
            }
            option += '>' + opt.displayName;
            option += '</option>';
            $(option).appendTo(personType);
            personType.selectmenu("refresh");
        });
        personTitle.val(person.Title);
        personFirstName.val(person.FirstName);
        personLastName.val(person.LastName);
        personSuffix.val(person.Suffix);
        personOrgName.val(person.OrgName);
        $.each(DD.lov.Genders, function (i, opt) {
            var option = "";

            option += '<option value="' + opt.id + '"';
            if (person.Gender === opt.id) {
                option += "checked=checked";
            }
            option += '>' + opt.displayName;
            option += '</option>';
            $(option).appendTo(personGender);
            personGender.selectmenu("refresh");
        });
        personNotes.val(person.FamilyInfo);
        personAddress1.val(person.Address1);
        personAddress2.val(person.Address2);
        personCity.val(person.City);
        personState.val(person.State);
        personZip.val(person.Zip);
        personCounty.val(person.County);
        personEmail.val(person.Email);
        //phones
        //set label
        //set value

    }

});