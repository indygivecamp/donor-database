var DD = DD || {};

DD.sortByOrdinal = function (a, b) {

    return a.ordinal - b.ordinal;

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

$.subscribe("dom/loaded", function () {

    $.subscribe("app/loading", function () {

        $.mobile.loading("show");

    });

    $.subscribe("app/loaded", function () {

        $.mobile.loading("hide");

    });

});

$.ajax({
    beforeSend: function(){

        $.publish("app/loading");

    },
    complete: function(){

        $.publish("app/loaded");

    }
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

    DD.lov = {
        admin: {}
    };

});

$.subscribe("lov/update", function () {

    var promise = $.getJSON(DD.api.lovtype),
        deferred = $.Deferred(),
        adminDeferred = $.Deferred();

    $.publish("app/registerPromise", ["lov", deferred.promise()]);
    $.publish("app/registerPromise", ["admin_lov", adminDeferred.promise()]);

    promise.done(function (types) {

        $.each(types, function (i, type) {

            var name = type.LOVName;

            DD.lov.admin[name] = type.LOVs.map(function (lov) {

                return {
                    displayName: lov.Name,
                    id: lov.LOVID,
                    ordinal: lov.DisplayOrder
                };

            });

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

        deferred.resolveWith(this, [DD.lov]);
        adminDeferred.resolveWith(this, [DD.lov.admin]);

    });

    promise.fail(function () {

        $.publish("app/error", arguments);

    });

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