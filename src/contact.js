var DD = DD || {};

$( window ).on( "pagechange", function (event, data) {

    if (data.options.target === "/view/contact.html") {

        DD.promises.lov.done(function() {

            var contact = data.options.entity,
                person = data.options.relatedEntity,
                scheduleDate,
                completeDate,
                contactScheduleDate = $("#contact-schedule-date"),
                contactCompleteDate = $("#contact-complete-date"),
                contactFundraiser = $("#contact-fundraiser"),
                contactChannel = $("#contact-channel"),
                contactOutcome = $("#contact-outcome"),
                contactNotes = $("#contact-notes"),
                name = ( !!person.Title ? person.Title + ' ' : '' ) +
                    ( !!person.FirstName ? person.FirstName + ' ' : '' ) +
                    ( !!person.LastName ? person.LastName + ' ' : '' ) +
                    ( !!person.Suffix ? person.Suffix + ' ' : '' ) +
                    ( !!person.OrgName ? '( ' + person.OrgName + ' )' : '' );

            $("#contact-person").html(name);

            if (contact.ContactID) {

                if (contact.CompleteDate) {

                    contactCompleteDate.val(DD.dateToInput(new Date(contact.CompleteDate)));

                }

                if (contact.ScheduleDate) {

                    contactScheduleDate.val(DD.dateToInput(new Date(contact.ScheduleDate)));

                }

            }

            contactNotes.val(contact.Notes || "");
            //Contact Channels
            $.each(DD.lov["Contact Channels"], function (i, opt) {
                var option = "";

                option += '<option value="' + opt.id + '"';
                if (contact.Channel === opt.id) {
                    option += "checked=checked";
                }
                option += '>' + opt.displayName;
                option += '</option>';
                $(option).appendTo(contactChannel);
                contactChannel.selectmenu("refresh");
            });

            //Fundraisers
            $.each(DD.lov["Fundraisers"], function (i, opt) {
                var option = "";

                option += '<option value="' + opt.id + '"';
                if (contact.Fundraiser === opt.id) {
                    option += "checked=checked";
                }
                option += '>' + opt.displayName;
                option += '</option>';
                $(option).appendTo(contactFundraiser);
                contactFundraiser.selectmenu("refresh");
            });

            $.each(DD.lov["Contact Outcomes"], function (i, opt) {
                var option = "";

                option += '<option value="' + opt.id + '"';
                if (contact.Outcome === opt.id) {
                    option += "checked=checked";
                }
                option += '>' + opt.displayName;
                option += '</option>';
                $(option).appendTo(contactOutcome);
                contactOutcome.selectmenu("refresh");
            });
        });

    }

});