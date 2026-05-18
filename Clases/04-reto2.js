// =====================================================
// RETO #2 PARA LOS ALUMNOS — Nivel: un escalón más arriba
// =====================================================
// Cómo correrlo:   node archivo
//
// INSTRUCCIONES:
// 1) NO corras el archivo todavía.
// 2) Lee el código con calma. Hay async/await, promises
//    anidadas y setTimeouts mezclados.
// 3) Escribe en una hoja el orden EXACTO de los console.log
//    (las letras A, B, C, D... te guían).
// 4) Corre el archivo y compara.
// 5) Si fallaste, márcalo con rojo y escribe en 1 línea
//    POR QUÉ te equivocaste. Ese "por qué" es el oro.
// =====================================================

console.log("A");

setTimeout(() => {
  console.log("B");
  Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => {
  console.log("D");
  setTimeout(() => console.log("E"), 0);
});

async function cocinar() {
  console.log("F");
  await Promise.resolve();
  console.log("G");
}

cocinar();

console.log("H");

// -----------------------------------------------------
// PISTAS (no mires hasta intentarlo):
//
// 1) Lo síncrono se ejecuta PRIMERO, de arriba abajo.
//    → A, F y H son síncronos. ¿En qué orden salen?
//
// 2) `await` pausa la función y lo que viene DESPUÉS del
//    await se convierte en una microtask.
//    → G espera en la cola de microtasks.
//
// 3) Microtasks (Promises) > Macrotasks (setTimeout).
//    Se vacía TODA la cola de microtasks antes de tocar
//    el primer setTimeout.
//
// 4) Un setTimeout nuevo creado dentro de una microtask
//    se encola al FINAL de los macrotasks.
//
// RETO EXTRA (para los rápidos):
// - Reemplaza el `await Promise.resolve()` por
//   `await fetch("https://jsonplaceholder.typicode.com/users/1")`
//   y predice el nuevo orden. ¿Dónde cae "G" ahora?
// -----------------------------------------------------