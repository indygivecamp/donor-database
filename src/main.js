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

$.ajax({
    beforeSend: function(){

        $.publish("app/loading");

    },
    complete: function(){

        $.publish("app/loaded");

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

    //var host = "http://lebanonboysgirlsclub.org.mytempweb.com/api/";
    var host = "http://localhost:8000/src-test/";

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
    //TODO make this pretty


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
            $.mobile.changePage( "/views/person.html", person);
        })
        .fail(DD.error);

});