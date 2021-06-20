const btnBuscar = document.getElementById("btn-buscar");
const inputNombre = document.getElementById("input-nombre");
const btnComprar = document.getElementById("btn-comprar");
const btnPrestar = document.getElementById("btn-prestar");
const btnCompraProds = document.getElementById("compra");
const btnAlquila = document.getElementById("alquila");

btnBuscar.addEventListener("click", function () {
  const inicial = inputNombre.value.slice(0, 1);
  const inicialMayus = inicial.toUpperCase();
  const resto = inputNombre.value.slice(1);
  const restoMins = resto.toLowerCase();
  const valueConMayus = inicialMayus + restoMins;
  window.location.href = "/buscar?nombre=" + valueConMayus;
});

btnComprar.addEventListener("click", function () {
  window.location.href = "/comprar";
});

btnPrestar.addEventListener("click", function () {
  window.location.href = "/prestar";
});

btnCompraProds.addEventListener("click", function () {
  window.location.href = "/detalleproducto";
});

btnAlquila.addEventListener("click", function () {
  window.location.href = "/detalleproducto";
});
