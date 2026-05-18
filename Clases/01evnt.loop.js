// =====================================================
// DEMO 1 — EVENT LOOP: orden de ejecución
// =====================================================
// Cómo correrlo:   node 01-event-loop.js
//
// OBJETIVO: que los alumnos PREDIGAN el orden del output
// antes de correrlo, y luego entiendan por qué se imprime así.
// =====================================================

console.log("1 — Inicio (sincrónico)");

setTimeout(() => {
  console.log("4 — setTimeout 0ms (macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3 — Promise.then (microtask)");
});

console.log("2 — Fin (sincrónico)");

// -----------------------------------------------------
// SALIDA ESPERADA:
// 1 — Inicio (sincrónico)
// 2 — Fin (sincrónico)
// 3 — Promise.then (microtask)
// 4 — setTimeout 0ms (macrotask)
//
// EXPLICACIÓN PARA EL PROFE:
// 1) Todo lo síncrono se ejecuta primero (call stack).
// 2) Cuando el stack se vacía, el Event Loop atiende
//    PRIMERO la microtask queue (Promises).
// 3) Después atiende la macrotask queue (setTimeout, I/O).
// 4) Por eso `setTimeout(fn, 0)` NUNCA es realmente "0ms".
// -----------------------------------------------------