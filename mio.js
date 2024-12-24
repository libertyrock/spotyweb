function hola() {
    console.log("HOLA");
}
var pp = function (){
    return this;
}
pp.hola = "hola";

pp.saludo = hola;
