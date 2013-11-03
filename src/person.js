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
            personPhone3 = $("#person-phone3"),

        //CONTACTS
            personContacts = $("#person-contacts"),

        //DONATIONS
            personDonations = $("#person-donations");


        DD.person = DD.person || {};

        DD.person[person.PersonID] = person;

        $("#person-new-donation").data("uid", person.PersonID);
        $("#person-new-contact").data("uid", person.PersonID);

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

});