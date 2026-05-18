// =====================================================
// RETO PARA LOS ALUMNOS
// =====================================================
// Cómo correrlo:   node 03-reto-alumnos.js
//
// INSTRUCCIONES:
// 1) Lee el código sin ejecutarlo.
// 2) Escribe en una hoja el orden EXACTO en que crees
//    que se imprimirán los console.log.
// 3) Corre el archivo y compara con tu predicción.
// 4) Si te equivocaste, intenta explicar por qué.
// =====================================================

console.log("🍳 Empieza la cocina");

setTimeout(() => {
  console.log("🥩 Plato del horno listo (timeout 0)");
}, 0);

setTimeout(() => {
  console.log("🥗 Ensalada lista (timeout 50)");
}, 50);

Promise.resolve().then(() => {
  console.log("🍞 Pan recién horneado (promise 1)");
});

Promise.resolve().then(() => {
  console.log("🧈 Mantequilla derretida (promise 2)");
});

console.log("🔪 Cortando ingredientes");

// -----------------------------------------------------
// PISTA: las promises (microtasks) tienen prioridad
// sobre los setTimeouts (macrotasks). Y dentro de cada
// cola, el orden es FIFO (primero en entrar, primero en salir).
// -----------------------------------------------------