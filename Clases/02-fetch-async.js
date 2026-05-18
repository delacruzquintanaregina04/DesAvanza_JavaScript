// =====================================================
// DEMO 2 — Asincronía con FETCH + setTimeout
// =====================================================
// Cómo correrlo:   node 02-fetch-async.js
// Requiere Node 18+ (fetch nativo).
//
// OBJETIVO: ver que aunque fetch tarda más, los timers
// breves se pueden disparar antes — y entender el orden
// real de las cosas.
// =====================================================

console.log("A — Inicio del programa");

setTimeout(() => {
  console.log("D — setTimeout de 100ms");
}, 100);

fetch("https://jsonplaceholder.typicode.com/users/1")
  .then((res) => res.json())
  .then((user) => {
    console.log("E — Usuario recibido del servidor:", user.name);
  })
  .catch((err) => console.error("Error en fetch:", err));

console.log("B — Continuamos con la siguiente línea (síncrono)");

Promise.resolve().then(() => {
  console.log("C — Microtask de Promise.resolve");
});

// -----------------------------------------------------
// SALIDA TÍPICA (puede variar el orden de D y E según red):
// A — Inicio del programa
// B — Continuamos con la siguiente línea (síncrono)
// C — Microtask de Promise.resolve
// D — setTimeout de 100ms
// E — Usuario recibido del servidor: Leanne Graham
//
// PUNTOS PARA DISCUTIR:
// - ¿Por qué C va antes que D si los dos son "asíncronos"?
//   → Microtasks (Promise) tienen prioridad sobre macrotasks.
// - ¿Por qué D suele ir antes que E?
//   → fetch a internet tarda más de 100ms en la mayoría de casos.
//   Si la red es muy rápida o estás en cache, podría invertirse.
// -----------------------------------------------------