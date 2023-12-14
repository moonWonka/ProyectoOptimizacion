const area = 500;
const areaMitad = area / 2;

// Función original del cilindro
const fn = `${areaMitad}*r - pi*r^3`;

// Calcular la derivada 
const derivar = (fnToDerivar) => math.derivative(fnToDerivar, 'r', { simplify: true });

const obtenerCriticos = () => {
  const raices = [];
  const pi = 3.14;
  const a = (areaMitad / 3);
  const b = ((a / pi).toFixed(2));

  raices.push(parseFloat(Math.sqrt(b).toFixed(2)));
  raices.push(parseFloat(-(Math.sqrt(b).toFixed(2))));

  return raices;
};

// Primera derivada
const primeraDerivada = derivar(fn);

// Obtener la expresión de la segunda derivada
const segundaDerivada = derivar(primeraDerivada);

// Obtener los puntos críticos (raíces)
const listaRaices = obtenerCriticos();

const evaluarMaxMin = (raices) => {
  const expresionLimpia = segundaDerivada.toString().replace('pi', '3.14');
  const fnSegunda = math.simplify(expresionLimpia);
  const maxMin = { max: 0, min: 0 };

  raices.forEach(raiz => {
    let value = fnSegunda.evaluate({ 'r': raiz }).toFixed(2);
    value < 0 ? maxMin.max = raiz : maxMin.min = raiz;
  });

  return maxMin;
};

console.log("area: ", area);
console.log(`La derivada de ${fn} con respecto a r es: ${primeraDerivada}`);
console.log(`La derivada de ${primeraDerivada} con respecto a r es: ${segundaDerivada}`);
resultado = evaluarMaxMin(listaRaices);
console.log(resultado.max);
