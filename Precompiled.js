
function test(a) {
    console.log(a);             // function a()
    var a = 123;
    console.log(a);            //  123
    function a() { }
    console.log(a);             //   123
    var b = function () { };
    console.log(b);             // fun ()
    function c() { };
}

test(1);




