// Obtener referencia a los elementos del DOM
const inputNumero = document.getElementById("inputNumero");
const btnOptimizar = document.getElementById("btnOptimizar");
const listaInputs = document.getElementById("listaInputs");

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
  agregarInputALaLista(inputValue);

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
  historial.forEach((element) => {
    const botonHistorial = document.createElement("button");
    botonHistorial.textContent = `${element} cm²`;
    listaInputs.appendChild(botonHistorial);
  });
}
