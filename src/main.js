var DD = DD || {};

DD.sortByOrdinal = function (a, b) {

    return a.ordinal - b.ordinal;

};

DD.error = function () {

    $.publish("app/error", arguments);

};

(function($) {

    var o = $({});

    $.subscribe = function() {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function() {
        o.off.apply(o, arguments);
    };

    $.publish = function() {
        o.trigger.apply(o, arguments);
    };

}(jQuery));

$.ajaxSetup({
    beforeSend: function(request){

        $.publish("app/loading");

    },
    complete: function(){

        $.publish("app/loaded");

    },
    crossDomain: true,
    xhrFields: {
        'withCredentials': true
    }
});

$.subscribe("dom/loaded", function () {

    $.subscribe("app/loading", function () {

        $.mobile.loading("show");

    });

    $.subscribe("app/loaded", function () {

        $.mobile.loading("hide");

    });

});

$.subscribe("api/init", function () {

    var host = "http://lebanonboysgirlsclub.org.mytempweb.com/api/";
    //var host = "http://localhost:8000/src-test/";

    var resources = [
        ["lov",         "LOV"       ],
        ["lovtype",     "LOVType"   ],
        ["person",      "Person"    ],
        ["donation",    "Donation"  ],
        ["interest",    "Interest"  ],
        ["contact",     "contact"   ],
        ["todo",        "Todo"      ]
    ];

    DD.api = {};

    $.each(resources, function (i, tuple) {
        DD.api[tuple[0]] = host + tuple[1];
    });

});

$.subscribe("app/registerPromise", function (_, name, promise) {

    DD.promises = DD.promises || {};

    DD.promises[name] = promise;

});

$.subscribe("app/error", function (event, promise, type, message) {
    console.log(arguments);
    $.mobile.changePage( "/view/error.html", { role: "dialog" } );
    if (message) {
        $(document).one("pageload", function () {
            $("#error-message").text(message);
        });
    }   
});

$.subscribe("lov/flush", function () {

    DD.lov = {};
    DD.admin_lov = {};

});

$.subscribe("lov/update", function () {

    var promise = $.getJSON(DD.api.lovtype),
        deferred = $.Deferred(),
        adminDeferred = $.Deferred();

    $.publish("app/registerPromise", ["admin_lov", adminDeferred.promise()]);
    $.publish("app/registerPromise", ["lov", deferred.promise()]);

    promise.done(function (types) {

        $.each(types, function (i, type) {

            var name = type.LOVName;

            DD.admin_lov[name] = type.LOVs;

            DD.lov[name] = type.LOVs.map(function (lov) {

                if (lov.Active) {

                    return {
                        displayName: lov.Name,
                        id: lov.LOVID,
                        ordinal: lov.DisplayOrder
                    };

                }

            });

            DD.lov[name].sort(DD.sortByOrdinal);

        });

        adminDeferred.resolveWith(this, [DD.admin_lov]);
        deferred.resolveWith(this, [DD.lov]);

    });

    promise.fail(DD.error);

});

$.subscribe("app/init", function () {

    $.publish("api/init");

    $.publish("lov/flush");

    $.publish("lov/update");

    $(function () {

        $.publish("dom/loaded");

    });

});

$.publish("app/init");

$.subscribe("person/load", function (_, id) {

    if (!id) {
        return;
    }

    $.getJSON(DD.api.person + "/" + id)
        .done(function (person) {
            $.mobile.changePage( "/view/person.html", {entity: person});
        })
        .fail(DD.error);

});

$.subscribe("donation/load", function (_, donation, person) {

    $.mobile.changePage( "/view/donation.html", {
        entity: donation,
        relatedEntity: person
    });

});

$.subscribe("contact/load", function (_, contact, person) {

    $.mobile.changePage( "/view/contact.html", {
        entity: contact,
        relatedEntity: person
    });

});