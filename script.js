function calcularConInput(area) {
  const areaMitad = area / 2;

  // Función original del cilindro
  const fn = `${areaMitad}*r - π*r^3`;

  const calcularAltura = (radio) => {
    console.log(radio)
    return parseFloat(((areaMitad / (3.14 * radio)) - radio).toFixed(2));
  }

  const calcularVolumen = (radio, altura) => ((3.14 * (radio) ** 2) * altura).toFixed(2);


  // Calcular la derivada
  const derivar = (fnToDerivar) =>
    math.derivative(fnToDerivar, 'r', { simplify: true });

  // Obtener los puntos críticos
  const obtenerCriticos = () => {
    const raices = [];
    const pi = 3.14;
    const a = (areaMitad / 3).toFixed(2);
    const b = (a / pi).toFixed(2);

    raices.push(parseFloat(Math.sqrt(b).toFixed(2)));
    raices.push(parseFloat(-Math.sqrt(b).toFixed(2)));

    return raices;
  };

  // Primera derivada
  const primeraDerivada = derivar(fn);

  // Obtener la expresión de la segunda derivada
  const segundaDerivada = derivar(primeraDerivada);

  // Obtener los puntos críticos (raíces)
  const listaRaices = obtenerCriticos();

  // Evaluar máximos y mínimos
  const evaluarMaxMin = (raices) => {
    const expresionLimpia = segundaDerivada.toString().replace('π', '3.14');
    const fnSegunda = math.simplify(expresionLimpia);
    const maxMin = { max: 0, min: 0 };

    raices.forEach((raiz) => {
      let value = fnSegunda.evaluate({ r: raiz }).toFixed(2);
      value < 0 ? (maxMin.max = raiz) : (maxMin.min = raiz);
    });

    return maxMin;
  };

  console.log('Área: ', area);
  console.log(`La derivada de ${fn} con respecto a r es: ${primeraDerivada}`);
  console.log(
    `La derivada de ${primeraDerivada} con respecto a r es: ${segundaDerivada}`
  );
  const radio = evaluarMaxMin(listaRaices);
  const altura = calcularAltura(radio.max)
  const volumen = calcularVolumen(radio.max, altura)

  return {
    fnOriginal: fn,
    primeraD: primeraDerivada.toString(),
    puntosCriticos: listaRaices,
    segundaD: segundaDerivada.toString(),
    maxRadio: radio.max,
    maxAltura: altura,
    maxVolumen: volumen
  };
}

// Exportar la función para que esté disponible para otros archivos
export { calcularConInput };
