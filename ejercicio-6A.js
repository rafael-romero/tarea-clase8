function crearInputsDeEdadFamiliares(numero) {
  for (i = 0; i < numero; i++) {
    const labelFamiliar = document.createElement("label");
    labelFamiliar.className = "labelsFamiliar";
    const textoEdadFamiliar = document.createTextNode(
      `Edad familiar nº${i + 1}`
    );

    const input = document.createElement("input");
    input.type = "number";
    input.id = `input-familiar-${[i]}`;
    input.className = "input-familiar";

    const elementoMain = document.querySelector("main");

    const b = document.createElement("b");
    b.className = "oculto";
    b.type = "text";
    b.id = `negrita-error-input-familiar-${[i]}`;

    const br = document.createElement("br");

    labelFamiliar.appendChild(textoEdadFamiliar);
    labelFamiliar.appendChild(input);
    labelFamiliar.appendChild(b);
    labelFamiliar.appendChild(br);
    elementoMain.appendChild(labelFamiliar);
  }
}

function validarCantidadFamiliares(cantidadFamiliares) {
  if (cantidadFamiliares === 0) {
    return "Debe ingresar al menos un familiar";
  }
  if (!/^\d+$/.test(cantidadFamiliares)) {
    return "Solo puede ingresar numeros enteros positivos";
  }
  return "";
}

const $botonSiguiente = document.querySelector("#siguiente");
const $botonCalcular = document.querySelector("#calcular");
const $botonEmpezarDeCero = document.querySelector("#resetear");

$botonSiguiente.onclick = function () {
  const $cantidadFamiliares = document.querySelector("#cantidad-familiares");
  const cantidadFamiliares = Number($cantidadFamiliares.value);
  const errorCantidadFamiliares = validarCantidadFamiliares(cantidadFamiliares);
  const $errorSiguiente = document.querySelector("#errorSiguiente");
  document.querySelector("#resultados").className = "oculto";

  if (errorCantidadFamiliares) {
    //si hubo error
    eliminarInputsEdadFamiliares();
    $errorSiguiente.innerText = "ADVERTENCIA: " + errorCantidadFamiliares; //escribe advertencia
    $errorSiguiente.className = ""; //muestra advertencia
    $cantidadFamiliares.classList.add("error"); //enmarca el input con error en rojo
    $botonCalcular.className = "oculto"; //oculta boton calcular
    $botonEmpezarDeCero.className = "oculto"; //oculta boton empezar de cero
  } else {
    // si no hubo error
    $cantidadFamiliares.classList.remove("error"); // elimina el marco rojo del input
    $errorSiguiente.className = "oculto"; // oculta la advertencia
    eliminarInputsEdadFamiliares();
    crearInputsDeEdadFamiliares(cantidadFamiliares);
    $botonCalcular.className = ""; // muestra boton calcular
    $botonEmpezarDeCero.className = ""; // muestra boton empezar de cero
  }
  return false;
};

function obtenerEdadesInputs(listaNodosEdadesFamiliares) {
  const edades = [];
  for (i = 0; i < listaNodosEdadesFamiliares.length; i++) {
    edades.push(Number(listaNodosEdadesFamiliares[i].value));
  }
  return edades;
}

function calcularEdadMayor(edades) {
  let numeroMayor = edades[0];
  for (i = 1; i < edades.length; i++) {
    if (edades[i] > numeroMayor) {
      numeroMayor = edades[i];
    }
  }
  return numeroMayor;
}

function calcularEdadMenor(edades) {
  let numeroMenor = edades[0];
  for (i = 1; i < edades.length; i++) {
    if (edades[i] < numeroMenor) {
      numeroMenor = edades[i];
    }
  }
  return numeroMenor;
}

function calcularEdadPromedio(edades) {
  let totalEdades = 0;
  for (i = 0; i < edades.length; i++) {
    totalEdades += edades[i];
  }
  return totalEdades / edades.length;
}

function validarEdadFamiliares(edads) {
  if (edads === 0) {
    return "Debe ingresar la edad de su familiar";
  } else if (!/^\d+$/.test(edads)) {
    return "Solo puede ingresar numeros enteros positivos";
  } else {
    return "";
  }
}

function marcarErroresEdades(objeto) {
  const llavesErrores = Object.keys(objeto);
  let cantidadErrores = 0;
  llavesErrores.forEach(function (llave) {
    const $errorTextual = objeto[llave];
    if ($errorTextual) {
      const $inputFamiliar = document.querySelector(`#${llave}`);
      $inputFamiliar.classList.add("error"); //marca el input  con rojo
      const $cartelEnNegritaDeError = document.querySelector(
        `#negrita-error-${llave}`
      );
      $cartelEnNegritaDeError.innerText = "ADVERTENCIA: " + $errorTextual; //escribe la advertencia
      $cartelEnNegritaDeError.className = ""; // muestra la advertencia
      cantidadErrores++;
    } else {
      const $inputFamiliar = document.querySelector(`#${llave}`);
      if ($inputFamiliar.classList.contains("error")) {
        $inputFamiliar.classList.remove("error");
        if (cantidadErrores > 0) {
          cantidadErrores--;
        }
      }
      const $cartelEnNegritaDeError = document.querySelector(
        `#negrita-error-${llave}`
      );
      $cartelEnNegritaDeError.innerText = "";
      $cartelEnNegritaDeError.className = "oculto";
    }
  });
  return cantidadErrores;
}

function calcularYMostrarResultados(edadFamiliares) {
  document.querySelector("#menor-edad").textContent =
    calcularEdadMenor(edadFamiliares);
  document.querySelector("#mayor-edad").textContent =
    calcularEdadMayor(edadFamiliares);
  document.querySelector("#promedio-edad").textContent =
    calcularEdadPromedio(edadFamiliares).toFixed(2);
  document.querySelector("#resultados").className = "";
}

$botonCalcular.onclick = function () {
  const $edadesFamiliares = document.querySelectorAll(".input-familiar");
  const edadFamiliares = obtenerEdadesInputs($edadesFamiliares);
  const objetoErrorEdades = {};
  edadFamiliares.forEach(function (edad, index) {
    const errorEdades = validarEdadFamiliares(edad);
    objetoErrorEdades[`input-familiar-${index}`] = errorEdades;
  });
  const sonValidasLasEdades = marcarErroresEdades(objetoErrorEdades) === 0;
  if (sonValidasLasEdades) {
    calcularYMostrarResultados(edadFamiliares);
  }
  return false;
};

function eliminarInputsEdadFamiliares() {
  const $labelsFamiliar = document.querySelectorAll(".labelsFamiliar");
  for (i = 0; i < $labelsFamiliar.length; i++) {
    $labelsFamiliar[i].remove();
  }
}

function eliminarDatosCalculados() {
  document.querySelector("#menor-edad").textContent = " ";
  document.querySelector("#mayor-edad").textContent = " ";
  document.querySelector("#promedio-edad").textContent = " ";
}

$botonEmpezarDeCero.onclick = function () {
  eliminarInputsEdadFamiliares();
  eliminarDatosCalculados();
  document.querySelector("#resultados").className = "oculto";
  $botonEmpezarDeCero.className = "oculto";
  $botonCalcular.className = "oculto";
  const $cantidadFamiliares = document.querySelector("#cantidad-familiares");
  $cantidadFamiliares.value = "";
  return false;
};
