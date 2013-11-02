(function (global, a, f) {

    var list = ["map", "filter", "some", "every", "reduce", "reduceRight", "sort"];

    function flip(fn) {

        return function (that, arg) {

            return arguments.length > 1 ? fn.call( that, this, arg ) : fn.call( that, this );

        };

    }

    function createGlobals(fName) {

        global[fName] = f.bind.bind( flip( a[fName] ) );
        global[fName + "To"] = f.bind.bind( a[fName] );
    }

    global.each = f.bind.bind( flip( a.forEach ) );
    global.eachTo = f.bind.bind( a.forEach );

    eachTo( list )( createGlobals );

}( this, Array.prototype, Function.prototype ));