var DD = DD || {};

$( window ).on( "pagechange", function (event, data) {

    if (data.options.target === "/view/contact.html") {

        var contact = data.options.entity,
            person = data.options.relatedEntity,
            contactScheduleDate = $("#contact-schedule-date"),
            contactCompleteDate = $("#contact-complete-date"),
            contactFundraiser = $("#contact-fundraiser"),
            contactChannel = $("#contact-channel"),
            contactOutcome = $("#contact-outcome"),
            contactNotes = $("#contact-notes");

        if (contact.ContactID) {

            if (contact.CompleteDate) {
                contactCompleteDate.val([
                    contact.CompleteDate.getFullYear(),
                    contact.CompleteDate.getMonth() + 1,
                    contact.CompleteDate.getDate()
                ].join("-"));
            }

            if (contact.ScheduleDate) {
                contactScheduleDate.val([
                    contact.ScheduleDate.getFullYear(),
                    contact.ScheduleDate.getMonth() + 1,
                    contact.ScheduleDate.getDate()
                ].join("-"));
            }

        }

        contactNotes.val(contact.Notes || "");
        //Contact Channels
        //Fundraisers
        $.each(DD.lov["Contact Outcomes"], function (i, opt) {
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


    }

});