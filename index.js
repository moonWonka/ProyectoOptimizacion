import { calcularConInput } from './script.js';

// Obtener referencia a los elementos del DOM
const inputNumero = document.getElementById("inputNumero");
const btnOptimizar = document.getElementById("btnOptimizar");
const listaInputs = document.getElementById("listaInputs");
const resultado = document.getElementById("resultado")

// Historial de consultas
const historial = [];

// Asignar el evento click al botón de optimizar
btnOptimizar.addEventListener("click", validarInput);

function validarInput() {

  // Obtener el valor del input
  const inputValue = inputNumero.value.trim();

  // Verificar si el campo está vacío
  if (inputValue === "") {
    alert("Por favor, ingrese un número.");
    return;
  }

  // Verificar si el valor es un número positivo
  const numero = parseFloat(inputValue);
  if (isNaN(numero) || numero <= 0) {
    alert("Por favor, ingrese un número positivo válido.");
    return;
  }

  // Si pasa las validaciones, agregar a la lista como botón
  resultado.innerHTML = "";
  agregarInputALaLista(inputValue);

  // Llamar a la función de cálculos con el nuevo input
  const valoresOptimizacion = calcularConInput(numero);

  const parrafoEcuacion = document.createElement('p');
  parrafoEcuacion.innerHTML = `Superficie (area) = <span>${numero}</span> cm² => 2πr² + 2πrh = <span>${numero}</span>`;

  const fOriginal = document.createElement('p')
  fOriginal.innerHTML = `Funcion Objetivo: ${valoresOptimizacion.fnOriginal}`

  const pDerivada = document.createElement('p')
  pDerivada.innerHTML = `Primera Derivada: ${valoresOptimizacion.primeraD}`

  const pCriticos = document.createElement('p')
  pCriticos.innerHTML = `Puntos Criticos: ${valoresOptimizacion.puntosCriticos}`

  const sDerivada = document.createElement('p')
  sDerivada.innerHTML = `Segunda Derivada: ${valoresOptimizacion.segundaD}`

  const rMaximo = document.createElement('p')
  rMaximo.innerHTML = `Radio Optimizado: ${valoresOptimizacion.maxRadio} cm²`

  const aMaxima = document.createElement('p')
  aMaxima.innerHTML = `Altura Optimizada: ${valoresOptimizacion.maxAltura} cm²`

  const VMaximo = document.createElement('p')
  VMaximo.id = "volumen"
  VMaximo.innerHTML = `Volumen Optimizado: <strong>${valoresOptimizacion.maxVolumen} cm³</strong>`

  // Agrega el párrafo al body
  resultado.appendChild(parrafoEcuacion);
  resultado.appendChild(fOriginal);
  resultado.appendChild(pDerivada);
  resultado.appendChild(pCriticos);
  resultado.appendChild(sDerivada);
  resultado.appendChild(rMaximo);
  resultado.appendChild(aMaxima);
  resultado.appendChild(VMaximo);

  // Limpiar el campo después de agregarlo a la lista
  inputNumero.value = "";
}

function agregarInputALaLista(inputValue) {
  // Crear un nuevo elemento botón y agregarlo a la lista
  const nuevoBoton = document.createElement("button");
  nuevoBoton.textContent = `${inputValue} cm²`;

  // Verificar si el input ya está en el historial
  const indexEnHistorial = historial.indexOf(inputValue);
  if (indexEnHistorial !== -1) {
    // Si está, quitarlo del historial
    historial.splice(indexEnHistorial, 1);
  }

  // Agregar al principio del historial
  historial.unshift(inputValue);

  // Mantener el historial hasta un máximo de 9 elementos
  if (historial.length > 9) {
    historial.pop(); // Eliminar el último elemento
  }

  // Limpiar la lista antes de agregar elementos
  listaInputs.innerHTML = "";

  // Agregar todos los elementos del historial a la lista
  historial.forEach((area) => {
    const botonHistorial = document.createElement("button");
    botonHistorial.textContent = `${area} cm²`;
    // Asignar evento click a los botones del historial
    botonHistorial.addEventListener("click", () => {
      //asignar el area al input value
      inputNumero.value = area;
      validarInput();
    });

    listaInputs.appendChild(botonHistorial);
  });
}
