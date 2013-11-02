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

    var host = "http://lebanonboysgirlsclub.org.mytempweb.com/api/";

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

    function addTypes(types) {

    }

    function addRecord(record) {

    }

    function addRecords(records) {

    }



    $.getJSON(DD.api.lovtype)
        .done(function (types) {

            applyTypes(types);

            $.getJSON(DD.api.lov)
                .done(addRecords)
                .fail();
        })
        .fail()



});

$.subscribe("init", function () {

    $.publish("api/init");

    $.publish("lov/flush");

    $.publish("lov/udpate");

});

$.publish("init");