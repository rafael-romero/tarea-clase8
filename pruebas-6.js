function probarValidarCantidadFamiliares(){
    console.assert(
        validarCantidadFamiliares(0) === "Debe ingresar al menos un familiar",
        "ValidarCantidadFamiliares no valido que la cantidad sea mayor a cero"  
    );

    console.assert(
        validarCantidadFamiliares(1.23) === "Solo puede ingresar numeros enteros positivos",
        "ValidarCantidadFamiliares no valido que el numero ingresado sea entero"
    );

    console.assert(
        validarCantidadFamiliares(7) === "",
        "ValidarCantidadFamiliares fallo la validacion con un numero valido"
    );

}

function probarValidarEdadFamiliares(){
    console.assert(
        validarEdadFamiliares(0) === "Debe ingresar la edad de su familiar",
        "validarEdadFamiliares no valido que la edad sea mayor a cero"
    );
    
    console.assert(
        validarEdadFamiliares(3.85) === "Solo puede ingresar numeros enteros positivos",
        "ValidarEdadFamiliares no valido que el numero ingresado sea entero"
    );

    console.assert(
        validarEdadFamiliares(43) === "",
        "validarEdadFamiliares fallo la validacion con un numero valido"
    );
}


probarValidarCantidadFamiliares();
probarValidarEdadFamiliares();
