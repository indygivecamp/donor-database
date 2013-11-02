var DD = DD || {};

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

$.subscribe("lov/flush", function () {

    DD.lov = {};

});

$.subscribe("lov/update", function () {

    $.getJSON(DD.api.lovtype)
        .done(function (types) {

            $.each(types, function (i, type) {

                DD.lov[type.LOVName] = type.LOVs.map(function (lov) {

                    if (lov.Active) {

                        return {
                            displayName: lov.Name,
                            id: lov.LOVID,
                            ordinal: lov.DisplayOrder
                        };

                    }

                });

                DD.lov[type.LOVName].sort(function (a, b) {

                    return a.ordinal - b.ordinal;

                });

            });

        })
        .fail()

});

$.subscribe("init", function () {

    $.publish("api/init");

    $.publish("lov/flush");

    $.publish("lov/update");

});

$.publish("init");